chrome.browserAction.onClicked.addListener(function() {
  var newURL = "https://twitter.com/";
  chrome.tabs.create({ url: newURL });
});
