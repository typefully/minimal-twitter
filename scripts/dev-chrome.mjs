#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import chokidar from "chokidar";
import { copy } from "fs-extra";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const developmentBundle = path.join(projectRoot, "bundle/chrome-dev");
const chromeProfile = path.join(projectRoot, ".chrome-dev-profile");
const manifestSource = path.join(projectRoot, "extension-manifests.js");
const reloadServerPort = 43999;
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const launchChrome = process.argv.includes("--launch");
const bundleMappings = [
  ["content-scripts/dist", "dist"],
  ["css", "css"],
  ["fonts", "fonts"],
  ["images", "images"],
  ["background.js", "background.js"],
  ["scripts/dev-background.js", "dev-background.js"],
  ["scripts/dev-reload.js", "dev-reload.js"],
].map(([source, destination]) => ({
  source: path.join(projectRoot, source),
  destination: path.join(developmentBundle, destination),
}));

const childProcesses = new Set();
const cleanupTasks = [];
let popupOutputEntries = [];
let shuttingDown = false;

const log = (message) => console.log(`[dev] ${message}`);

const runCommand = (args) =>
  new Promise((resolve, reject) => {
    const child = spawn(pnpm, args, {
      cwd: projectRoot,
      stdio: "inherit",
    });

    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`${pnpm} ${args.join(" ")} exited with ${signal || code}`),
        );
      }
    });
  });

const startCommand = (args, label, { cleanExit = false } = {}) => {
  const child = spawn(pnpm, args, {
    cwd: projectRoot,
    stdio: "inherit",
  });

  childProcesses.add(child);
  child.once("error", (error) => {
    console.error(`[dev] ${label} failed to start:`, error);
    void shutdown(1);
  });
  child.once("exit", (code) => {
    childProcesses.delete(child);
    if (!shuttingDown) {
      if (cleanExit && code === 0) {
        log(`${label} closed.`);
        void shutdown();
        return;
      }

      console.error(`[dev] ${label} stopped unexpectedly.`);
      void shutdown(code || 1);
    }
  });

  return child;
};

const writeDevelopmentManifest = async () => {
  const { createDevelopmentManifest, MANIFEST_CHROME } = await import(
    `${pathToFileURL(manifestSource).href}?updated=${Date.now()}`
  );
  const manifest = createDevelopmentManifest(MANIFEST_CHROME);
  await writeFile(
    path.join(developmentBundle, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
};

const copyPopupOutput = async () => {
  const popupOutput = path.join(projectRoot, "popup/out");

  await Promise.all(
    popupOutputEntries.map((entry) =>
      rm(path.join(developmentBundle, entry), { recursive: true, force: true }),
    ),
  );

  popupOutputEntries = await readdir(popupOutput);
  await copy(popupOutput, developmentBundle);
};

const stageDevelopmentBundle = async () => {
  await rm(developmentBundle, { recursive: true, force: true });
  await mkdir(developmentBundle, { recursive: true });

  await Promise.all([
    copyPopupOutput(),
    ...bundleMappings.map(({ source, destination }) =>
      copy(source, destination),
    ),
    writeDevelopmentManifest(),
  ]);
};

const buildInitialAssets = async () => {
  log("Building popup and content scripts...");
  await Promise.all([
    runCommand(["--dir", "popup", "build"]),
    runCommand(["--dir", "content-scripts", "build"]),
  ]);
};

let reloadServerVersion = Date.now();
let reloadDebounceTimeout;
let reloadReason;

const scheduleVersionChange = (reason) => {
  reloadReason = reason;
  clearTimeout(reloadDebounceTimeout);
  reloadDebounceTimeout = setTimeout(() => {
    reloadServerVersion += 1;
    log(
      `Changes ready (${reloadReason}); reloading the extension and open X tabs.`,
    );
  }, 500);
};

const startReloadServer = () => {
  const server = createServer((request, response) => {
    if (request.url !== "/version") {
      response.writeHead(404).end();
      return;
    }

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain",
    });
    response.end(`${reloadServerVersion}`);
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(reloadServerPort, "127.0.0.1", () => resolve(server));
  });
};

const findOutputMapping = (sourcePath) => {
  for (const { source, destination } of bundleMappings) {
    const relativePath = path.relative(source, sourcePath);

    if (!relativePath.startsWith("..") && !path.isAbsolute(relativePath)) {
      return path.join(destination, relativePath);
    }
  }
};

const syncOutput = async (event, sourcePath, notifyBrowser = true) => {
  if (!["add", "change", "unlink"].includes(event)) {
    return;
  }

  const destination = findOutputMapping(sourcePath);
  if (!destination) {
    return;
  }

  if (event === "unlink" || event === "unlinkDir") {
    await rm(destination, { recursive: true, force: true });
  } else {
    await mkdir(path.dirname(destination), { recursive: true });
    await copy(sourcePath, destination);
  }

  if (notifyBrowser) {
    scheduleVersionChange(path.relative(projectRoot, sourcePath));
  }
};

const startOutputWatcher = () => {
  const contentOutput = path.join(projectRoot, "content-scripts/dist");
  let initialContentBuild = true;
  let initialContentBuildTimeout = setTimeout(() => {
    initialContentBuild = false;
  }, 2000);
  const watcher = chokidar.watch(
    [...bundleMappings.map(({ source }) => source), manifestSource],
    { ignoreInitial: true },
  );

  watcher.on("all", (event, sourcePath) => {
    const isContentOutput =
      sourcePath === contentOutput ||
      sourcePath.startsWith(`${contentOutput}${path.sep}`);

    const operation =
      sourcePath === manifestSource
        ? writeDevelopmentManifest().then(() =>
            scheduleVersionChange("extension-manifests.js"),
          )
        : syncOutput(
            event,
            sourcePath,
            !initialContentBuild || !isContentOutput,
          );

    operation.catch((error) =>
      console.error(`[dev] Failed to sync ${sourcePath}:`, error),
    );
  });

  cleanupTasks.push(() => {
    clearTimeout(initialContentBuildTimeout);
    return watcher.close();
  });
};

const startPopupWatcher = () => {
  const popupDirectory = path.join(projectRoot, "popup");
  const ignoredDirectories = [
    path.join(popupDirectory, ".next"),
    path.join(popupDirectory, "node_modules"),
    path.join(popupDirectory, "out"),
  ];
  const watcher = chokidar.watch(
    [
      popupDirectory,
      path.join(projectRoot, "storage-keys.js"),
      path.join(
        projectRoot,
        "content-scripts/src/modules/utilities/createTypefullyUrl.js",
      ),
    ],
    {
      ignoreInitial: true,
      ignored: (watchedPath) =>
        ignoredDirectories.some(
          (directory) =>
            watchedPath === directory ||
            watchedPath.startsWith(`${directory}${path.sep}`),
        ),
    },
  );

  let buildRequested = false;
  let buildRunning = false;
  let debounceTimeout;

  const buildPopup = async () => {
    if (buildRunning) {
      buildRequested = true;
      return;
    }

    buildRunning = true;
    do {
      buildRequested = false;
      try {
        log("Rebuilding popup...");
        await runCommand(["--dir", "popup", "build"]);
        await copyPopupOutput();
        scheduleVersionChange("popup");
      } catch (error) {
        console.error(
          "[dev] Popup build failed; watching for another change.",
          error,
        );
      }
    } while (buildRequested);
    buildRunning = false;
  };

  watcher.on("all", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => void buildPopup(), 150);
  });

  cleanupTasks.push(() => {
    clearTimeout(debounceTimeout);
    return watcher.close();
  });
};

async function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  clearTimeout(reloadDebounceTimeout);
  await Promise.allSettled(cleanupTasks.map((cleanup) => cleanup()));
  childProcesses.forEach((child) => child.kill("SIGTERM"));
  process.exitCode = exitCode;
}

const main = async () => {
  await buildInitialAssets();
  await stageDevelopmentBundle();
  log(`Development extension ready at ${developmentBundle}`);

  const reloadServer = await startReloadServer();
  cleanupTasks.push(
    () =>
      new Promise((resolve) => {
        reloadServer.close(resolve);
      }),
  );

  startOutputWatcher();
  startPopupWatcher();
  startCommand(["--dir", "content-scripts", "watch"], "Content-script watcher");

  if (launchChrome) {
    startCommand(
      [
        "exec",
        "web-ext",
        "run",
        "--target",
        "chromium",
        "--source-dir",
        developmentBundle,
        "--start-url",
        "https://x.com",
        "--chromium-profile",
        chromeProfile,
        "--profile-create-if-missing",
        "--keep-profile-changes",
        "--no-reload",
      ],
      "Chrome",
      { cleanExit: true },
    );
  } else {
    log(
      "Load bundle/chrome-dev once at chrome://extensions, then leave this running.",
    );
  }
};

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());

main().catch((error) => {
  console.error("[dev] Could not start Chrome development mode:", error);
  void shutdown(1);
});
