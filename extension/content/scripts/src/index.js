import { addStylesheets, observe } from "./modules/initialize";
import { constructNewData } from "./modules/utilities";
import { injectAllChanges } from "./modules/options/all";

/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#synchronous-response-to-storage-updates
- Listen to Chrome Storage changes
- Inject styles in respond to changes
--*/
chrome.storage.onChanged.addListener((changes) => {
  const newChangesData = constructNewData(changes);
  injectAllChanges(newChangesData);
});

/*--
- Initializing function, runs once at start
- Get Chrome Storage and inject respective styles
--*/
const init = () => {
  addStylesheets();

  // Start MutationObserver
  observe();

  // Inject user preferences
  chrome.storage.sync.get(
    [
      "feedWidth",
      "feedBorders",
      "exploreButton",
      "notificationsButton",
      "messagesButton",
      "bookmarksButton",
      "listsButton",
      "navigationButtonsLabelsHover",
      "navigationButtonsLabels",
      "navigationCenter",
      "zenMode",
      "replyCount",
      "retweetCount",
      "likeCount",
      "followCount",
      "hideTweetButton",
      "hideSearch",
      "transparentSearch",
      "removePromotedPosts",
      "whoToFollow",
      "topicsToFollow",
      "latestTweets",
    ],
    (data) => {
      injectAllChanges(data);
    }
  );
};

init();
