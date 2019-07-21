browser.browserAction.onClicked.addListener(function(activeTab) {
  var newURL = "https://twitter.com/";
  browser.tabs.create({ url: newURL });
});
