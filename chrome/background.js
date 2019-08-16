chrome.browserAction.onClicked.addListener(function(activeTab) {
  var newURL =
    "https://twitter.com/search?q=filter%3Afollows%20-filter%3Areplies&src=typd";
  chrome.tabs.create({ url: newURL });
});
