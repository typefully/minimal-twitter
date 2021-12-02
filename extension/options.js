// Saves options to chrome.storage
function save_options() {
  const feedWidth = document.getElementById("feed-width").value;
  const showLatest = document.getElementById("latest").checked;
  const centerNavigation = document.getElementById("center-navigation").checked;
  const noTweetButton = document.getElementById("tweet").checked;
  const noFeedBorders = document.getElementById("feed-borders").checked;
  const noLikes = document.getElementById("like").checked;
  const noRetweets = document.getElementById("retweet").checked;
  const noComment = document.getElementById("comment").checked;
  const noExploreButton = document.getElementById("explore").checked;
  const noNotificationsButton = document.getElementById("notifications").checked;
  const noBookmarksButton = document.getElementById("bookmarks").checked;
  const noListsButton = document.getElementById("lists").checked;
  
  chrome.storage.sync.set(
    {
      feedWidth: feedWidth,
      showLatest: showLatest,
      centerNavigation: centerNavigation,
      noTweetButton: noTweetButton,
      noFeedBorders: noFeedBorders,
      noLikes: noLikes,
      noRetweets: noRetweets,
      noComment: noComment,
      noExploreButton: noExploreButton,
      noNotificationsButton: noNotificationsButton,
      noBookmarksButton: noBookmarksButton,
      noListsButton: noListsButton,
    },
    function () {
      // Update status to let user know options were saved.
      const status = document.getElementById("status");
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
      noFeedBorders: false,
      noLikes: false,
      noRetweets: false,
      noComment: false,
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
      document.getElementById("feed-borders").checked = items.noFeedBorders;
      document.getElementById("like").checked = items.noLikes;
      document.getElementById("retweet").checked = items.noRetweets;
      document.getElementById("comment").checked = items.noComment;
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
