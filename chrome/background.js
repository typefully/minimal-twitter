chrome.browserAction.onClicked.addListener(function(activeTab) {
  var newURL = "https://twitter.com/";
  chrome.tabs.create({ url: newURL });
});
