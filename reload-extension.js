import { execFile } from "child_process";
import { copyFile, mkdir } from "fs/promises";
import path from "path";
import { promisify } from "util";

const open = promisify(execFile);
const extensionId = process.argv[2] || process.env.MINIMAL_TWITTER_EXTENSION_ID;
const browserApp = process.env.MINIMAL_TWITTER_BROWSER_APP || "Helium";
const bundleDirectory = "bundle/chrome";
const reloadPage = "dev-reload.html";

if (!extensionId) {
  console.error("Usage: yarn reload:chrome <extension-id>");
  process.exit(1);
}

await mkdir(bundleDirectory, { recursive: true });
await copyFile(reloadPage, path.join(bundleDirectory, reloadPage));

const cacheBuster = encodeURIComponent(
  `${Date.now()}-${Math.random().toString(36).slice(2)}`,
);
const reloadUrl = `chrome-extension://${extensionId}/dev-reload.html?t=${cacheBuster}`;

await open("open", ["-a", browserApp, reloadUrl]);

console.log(`Opened ${reloadUrl} in ${browserApp}`);
