// Used by the manifest v3 extension

chrome.runtime.onInstalled.addListener((object) => {
  if (object.reason === "install") {
    chrome.tabs.create({
      url: "https://typefully.com/minimal-twitter/welcome",
    });
  }
});
