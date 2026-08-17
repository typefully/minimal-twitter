import "./background.js";

const reloadServerUrl = "http://127.0.0.1:43999/version";
const pageReloadRequest = "minimal-twitter:dev-reload-page";

let currentVersion;
let lastKeepAliveAt = 0;
let reloadScheduled = false;
let serverWasUnavailable = false;

const getDevelopmentVersion = async () => {
  try {
    const response = await fetch(reloadServerUrl, { cache: "no-store" });
    return response.ok ? response.text() : null;
  } catch {
    return null;
  }
};

const reloadExtensionAndPages = async () => {
  if (reloadScheduled) {
    return;
  }

  reloadScheduled = true;

  const tabs = await chrome.tabs.query({
    url: [
      "https://twitter.com/*",
      "https://mobile.twitter.com/*",
      "https://x.com/*",
    ],
  });

  await Promise.allSettled(
    tabs.map(({ id }) =>
      id === undefined
        ? Promise.resolve()
        : chrome.tabs.sendMessage(id, { type: pageReloadRequest }),
    ),
  );

  setTimeout(() => chrome.runtime.reload(), 50);
};

const keepServiceWorkerAlive = async () => {
  if (Date.now() - lastKeepAliveAt >= 20_000) {
    // Extension API calls reset Chrome's 30-second service-worker idle timer.
    await chrome.runtime.getPlatformInfo();
    lastKeepAliveAt = Date.now();
  }
};

const pollForChanges = async () => {
  const nextVersion = await getDevelopmentVersion();

  if (
    nextVersion &&
    ((currentVersion && nextVersion !== currentVersion) ||
      (!currentVersion && serverWasUnavailable))
  ) {
    await reloadExtensionAndPages();
    return;
  }

  if (nextVersion) {
    currentVersion = nextVersion;
  } else {
    serverWasUnavailable = true;
  }

  await keepServiceWorkerAlive();
  setTimeout(pollForChanges, nextVersion ? 750 : 3000);
};

pollForChanges();
