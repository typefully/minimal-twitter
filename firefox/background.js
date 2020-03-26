browser.browserAction.onClicked.addListener(function() {
  var newURL = "https://twitter.com/";
  browser.tabs.create({ url: newURL });
});
