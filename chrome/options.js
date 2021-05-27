// Saves options to chrome.storage
function save_options() {
  var feedWidth = document.getElementById("feed-width").value;
  var showLatest = document.getElementById("latest").checked;
  var centerNavigation = document.getElementById("center-navigation").checked;
  var noTweetButton = document.getElementById("tweet").checked;
  var feedBorders = document.getElementById("feed-borders").checked;
  var noBorders = document.getElementById("borders").checked;
  var noLikes = document.getElementById("like").checked;
  var noRetweets = document.getElementById("retweet").checked;
  var noExploreButton = document.getElementById("explore").checked;
  var noNotificationsButton = document.getElementById("notifications").checked;
  var noBookmarksButton = document.getElementById("bookmarks").checked;
  var noListsButton = document.getElementById("lists").checked;
  chrome.storage.sync.set(
    {
      feedWidth: feedWidth,
      showLatest: showLatest,
      centerNavigation: centerNavigation,
      noTweetButton: noTweetButton,
      feedBorders: feedBorders,
      noBorders: noBorders,
      noLikes: noLikes,
      noRetweets: noRetweets,
      noExploreButton: noExploreButton,
      noNotificationsButton: noNotificationsButton,
      noBookmarksButton: noBookmarksButton,
      noListsButton: noListsButton,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(
    {
      feedWidth: "700",
      showLatest: false,
      centerNavigation: false,
      noTweetButton: false,
      feedBorders: false,
      noBorders: false,
      noLikes: false,
      noRetweets: false,
      noExploreButton: false,
      noNotificationsButton: false,
      noBookmarksButton: false,
      noListsButton: false,
    },
    function (items) {
      document.getElementById("feed-width").value = items.feedWidth;
      document.getElementById("latest").checked = items.showLatest;
      document.getElementById("center-navigation").checked =
        items.centerNavigation;
      document.getElementById("tweet").checked = items.noTweetButton;
      document.getElementById("feed-borders").checked = items.feedBorders;
      document.getElementById("borders").checked = items.noBorders;
      document.getElementById("like").checked = items.noLikes;
      document.getElementById("retweet").checked = items.noRetweets;
      document.getElementById("explore").checked = items.noExploreButton;
      document.getElementById("notifications").checked =
        items.noNotificationsButton;
      document.getElementById("bookmarks").checked = items.noBookmarksButton;
      document.getElementById("lists").checked = items.noListsButton;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
