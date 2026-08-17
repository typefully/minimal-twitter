const pageReloadRequest = "minimal-twitter:dev-reload-page";

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type !== pageReloadRequest) {
    return;
  }

  setTimeout(() => window.location.reload(), 200);
});
