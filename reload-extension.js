import { execFile } from "child_process";
import { copyFile, mkdir } from "fs/promises";
import path from "path";
import { promisify } from "util";

const open = promisify(execFile);
const extensionId = process.argv[2] || process.env.MINIMAL_TWITTER_EXTENSION_ID;
const browserApp = process.env.MINIMAL_TWITTER_BROWSER_APP || "Helium";
const bundleDirectory = "bundle/chrome";
const reloadPage = "dev-reload.html";
const reloadScript = "dev-reload.js";
const foreground = process.argv.includes("--foreground");

if (!extensionId) {
  console.error("Usage: yarn reload:chrome <extension-id>");
  process.exit(1);
}

await mkdir(bundleDirectory, { recursive: true });
await copyFile(reloadPage, path.join(bundleDirectory, reloadPage));
await copyFile(reloadScript, path.join(bundleDirectory, reloadScript));

const cacheBuster = encodeURIComponent(
  `${Date.now()}-${Math.random().toString(36).slice(2)}`,
);
const reloadUrl = `chrome-extension://${extensionId}/dev-reload.html?t=${cacheBuster}`;

const reloadInBackground = async () => {
  await open("osascript", [
    "-e",
    `tell application "${browserApp}"`,
    "-e",
    "set targetWindow to front window",
    "-e",
    "set previousTabIndex to active tab index of targetWindow",
    "-e",
    `set reloadTab to make new tab at end of tabs of targetWindow with properties {URL:"${reloadUrl}"}`,
    "-e",
    "set active tab index of targetWindow to previousTabIndex",
    "-e",
    "delay 0.2",
    "-e",
    "set active tab index of targetWindow to previousTabIndex",
    "-e",
    "delay 0.8",
    "-e",
    "try",
    "-e",
    "delete reloadTab",
    "-e",
    "end try",
    "-e",
    "set active tab index of targetWindow to previousTabIndex",
    "-e",
    "end tell",
  ]);
};

if (foreground) {
  await open("open", ["-a", browserApp, reloadUrl]);
} else {
  try {
    await reloadInBackground();
  } catch (error) {
    await open("open", ["-g", "-a", browserApp, reloadUrl]);
    console.warn(`Background reload failed; opened ${reloadUrl} without activating ${browserApp}.`);
    console.warn(error.message);
  }
}

console.log(`Reloaded ${reloadUrl} in ${browserApp}${foreground ? "" : " without changing the active tab"}`);
