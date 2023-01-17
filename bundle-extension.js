// Credit to @webbertakken for the gist:
// https://gist.github.com/webbertakken/ed82572b50f4e166562906757aede40a

import { exec } from "child_process";
import { copy } from "fs-extra";
import { copyFile, readdir, rm, writeFile } from "fs/promises";
import { resolve } from "path";
import process from "process";
import readline from "readline";
import zipper from "zip-local";

const runCommand = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });

let manifest = {
  name: "Minimal Theme for Twitter",
  short_name: "Minimal Twitter",
  description: "Refine and declutter the Twitter web experience.",
  version: "5.0.1",
  icons: {
    16: "images/MinimalTwitterIcon16.png",
    32: "images/MinimalTwitterIcon32.png",
    48: "images/MinimalTwitterIcon48.png",
    128: "images/MinimalTwitterIcon128.png",
  },
  permissions: ["storage"],
  options_ui: {
    page: "index.html",
    open_in_tab: true,
  },
};

const MANIFEST_CHROME = {
  ...manifest,
  manifest_version: 3,
  background: {
    service_worker: "background.js",
    type: "module",
  },
  content_scripts: [
    {
      run_at: "document_end",
      matches: ["https://twitter.com/*", "https://mobile.twitter.com/*"],
      js: ["dist/main.js"],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "css/main.css",
        "css/typefully.css",
        "fonts/inter-subset.woff2",
        "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5/css/main.css",
        "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5/css/typefully.css",
      ],
      matches: ["https://twitter.com/*", "https://mobile.twitter.com/*"],
    },
  ],
  action: {
    default_icon: {
      16: "images/MinimalTwitterIcon16.png",
      32: "images/MinimalTwitterIcon32.png",
      48: "images/MinimalTwitterIcon48.png",
    },
    default_title: "Minimal Twitter",
    default_popup: "index.html",
  },
};

const MANIFEST_FIREFOX = {
  ...manifest,
  manifest_version: 2,
  browser_specific_settings: {
    gecko: {
      id: "{e7476172-097c-4b77-b56e-f56a894adca9}",
    },
  },
  background: {
    scripts: ["background.js"],
    persistent: false,
  },
  content_scripts: [
    {
      run_at: "document_idle",
      matches: ["https://twitter.com/*", "https://mobile.twitter.com/*"],
      js: ["dist/main.js"],
    },
  ],
  web_accessible_resources: [
    "css/main.css",
    "css/typefully.css",
    "fonts/inter-subset.woff2",
    "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5/css/main.css",
    "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5/css/typefully.css",
  ],
  browser_action: {
    default_icon: {
      16: "images/MinimalTwitterIcon16.png",
      32: "images/MinimalTwitterIcon32.png",
      48: "images/MinimalTwitterIcon48.png",
    },
    default_title: "Minimal Twitter",
    default_popup: "index.html",
  },
};

const getFilesInDirectoryRecursively = async (directory) => {
  const dirents = await readdir(directory, { withFileTypes: true });

  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(directory, dirent.name);
      return dirent.isDirectory() ? getFilesInDirectoryRecursively(res) : res;
    })
  );
  return Array.prototype.concat(...files);
};

const bundle = async (manifest, bundleDirectory) => {
  try {
    // Remove old bundle directory
    await rm(bundleDirectory, { recursive: true, force: true }); // requires node 14+
    console.log(`🧹  Cleaned up \`${bundleDirectory}\` directory.`);

    // Run both build scripts
    const runBuildScript = (directory) => {
      return new Promise(async (resolve, reject) => {
        let intervalId;
        let spinner = "\\";
        const startBuilding = () => {
          let P = ["\\", "|", "/", "-"];
          intervalId = setInterval(() => {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            spinner = P[P.indexOf(spinner) + 1] || P[0];
            process.stdout.write(
              `${spinner}   Building popup and content scripts...`
            );
          }, 250);
        };

        startBuilding();

        try {
          await runCommand(`cd ./${directory} && yarn && yarn build`);
          clearInterval(intervalId);
          resolve();
        } catch (error) {
          clearInterval(intervalId);
          console.error(
            `Error running build script for ${directory}: ${error}`
          );
          reject(error);
        }
      });
    };

    await runBuildScript("popup");
    await runBuildScript("content-scripts");

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log("🔥  Built popup and content scripts.");

    // Bundle popup Next.js export
    await copy("popup/out", `${bundleDirectory}`);
    console.log(`🚗  Moved export to bundle.`);

    // Bundle content-scripts
    await copy("content-scripts/dist", `${bundleDirectory}/dist`);
    console.log(`🚗  Moved content_scripts to bundle.`);

    // Bundle background.js
    await copyFile("background.js", `${bundleDirectory}/background.js`);
    console.log(`🚗  Moved background.js to bundle.`);

    // Bundle css
    await copy("css", `${bundleDirectory}/css`);
    console.log(`🚗  Moved css to bundle.`);

    // Bundle fonts
    await copy("fonts", `${bundleDirectory}/fonts`);
    console.log(`🚗  Moved fonts to bundle.`);

    // Bundle images
    await copy("images", `${bundleDirectory}/images`);
    console.log(`🚗  Moved images to bundle.`);

    // Create manifest
    await writeFile(
      `${bundleDirectory}/manifest.json`,
      Buffer.from(JSON.stringify(manifest, null, 2)),
      "utf8"
    );

    // Done.
    console.log(`📦  Bundled \`${bundleDirectory}\`.`);

    // Zip the directory
    zipper.sync
      .zip(`./${bundleDirectory}`)
      .compress()
      .save(`./bundle/${bundleDirectory.replace("bundle/", "")}.zip`);

    console.log(
      `🧬  Zipped \`${bundleDirectory}\` to \`bundle/${bundleDirectory.replace(
        "bundle/",
        ""
      )}.zip\`.`
    );
  } catch (error) {
    console.error(error);
  }
};

const zipSafari = async () => {
  const promise = new Promise((resolve, reject) => {
    let intervalId;
    let spinner = "\\";
    const startBuilding = () => {
      let P = ["\\", "|", "/", "-"];
      intervalId = setInterval(() => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        spinner = P[P.indexOf(spinner) + 1] || P[0];
        process.stdout.write(`${spinner}   Converting to Safari...`);
      }, 250);
    };

    startBuilding();

    setTimeout(() => {
      clearInterval(intervalId);

      try {
        zipper.sync
          .zip(`./bundle/safari`)
          .compress()
          .save(`./bundle/safari.zip`);

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log(`🍎  Converted Firefox to Safari.`);
        console.log(`🧬  Zipped \`bundle/safari\` to \`bundle/safari.zip\`.`);

        resolve();
      } catch (error) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log(`🍎  Converted Firefox to Safari.`);
        console.log(
          `❌  Could not zip Firefox to Safari, try running script again.`
        );

        reject(error);
      }
    }, 1000);
  });

  return promise;
};

const bundleAll = async () => {
  await bundle(MANIFEST_CHROME, "bundle/chrome");
  await bundle(MANIFEST_FIREFOX, "bundle/firefox");
  exec(
    "xcrun safari-web-extension-converter bundle/firefox --project-location bundle/safari"
  );
  await zipSafari();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Which browser would you like to bundle for? [All / Chrome / Firefox / Safari] ",
  async (browser) => {
    switch (browser) {
      case "Chrome":
        await bundle(MANIFEST_CHROME, "bundle/chrome");
        break;

      case "Firefox":
        await bundle(MANIFEST_FIREFOX, "bundle/firefox");
        break;

      case "Safari":
        await bundle(MANIFEST_FIREFOX, "bundle/firefox");
        exec(
          "xcrun safari-web-extension-converter bundle/firefox --project-location bundle/safari"
        );
        await zipSafari();
        break;

      case "All":
        await bundleAll();
        break;

      default:
        await bundleAll();
    }

    rl.close();
  }
);

rl.on("close", () => {
  process.exit(0);
});

/*--- Bundle without prompting
await bundleAll();
process.exit(0);
---*/
