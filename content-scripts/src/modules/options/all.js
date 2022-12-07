import { changeTimelineWidth, changeTimelineBorders } from "./timeline";
import {
  changeExploreButton,
  changeNotificationsButton,
  changeMessagesButton,
  changeBookmarksButton,
  changeListsButton,
  changeNavigationButtonsLabelsHover,
  changeNavigationButtonsLabels,
  changeNavigationCenter,
} from "./navigation";
import {
  changeWriterMode,
  changeReplyCount,
  changeRetweetCount,
  changeLikeCount,
  changeFollowCount,
  changeTweetButton,
  changeSearchBar1,
  changeSearchBar2,
  changePromotedPosts,
  changeWhoToFollow,
  changeTopicsToFollow,
  changeLatestTweets,
} from "./interface";

// Array of user preferences, passed to `injectAllChanges`
export const userPreferences = [
  "timelineWidth", // 1
  "timelineBorders", // 2
  "exploreButton", // 3
  "notificationsButton", // 4
  "messagesButton", // 5
  "bookmarksButton", // 6
  "listsButton", // 7
  "navigationButtonsLabelsHover", // 8
  "navigationButtonsLabels", // 9
  "navigationCenter", // 10
  "writerMode", // 11
  "replyCount", // 12
  "retweetCount", // 13
  "likeCount", // 14
  "followCount", // 15
  "hideTweetButton", // 16
  "hideSearch", // 17
  "transparentSearch", // 18
  "removePromotedPosts", // 19
  "whoToFollow", // 20
  "topicsToFollow", // 21
  "latestTweets", // 22
];

export const injectAllChanges = (data) => {
  const {
    timelineWidth, // 1
    timelineBorders, // 2
    exploreButton, // 3
    notificationsButton, // 4
    messagesButton, // 5
    bookmarksButton, // 6
    listsButton, // 7
    navigationButtonsLabelsHover, // 8
    navigationButtonsLabels, // 9
    navigationCenter, // 10
    writerMode, // 11
    replyCount, // 12
    retweetCount, // 13
    likeCount, // 14
    followCount, // 15
    hideTweetButton, // 16
    hideSearch, // 17
    transparentSearch, // 18
    removePromotedPosts, // 19
    whoToFollow, // 20
    topicsToFollow, // 21
    latestTweets, // 22
  } = data;
  changeTimelineWidth(timelineWidth); // Timeline Width
  changeTimelineBorders(timelineBorders); // Timeline Borders
  changeExploreButton(exploreButton); // Explore Button
  changeNotificationsButton(notificationsButton); // Notification Button
  changeMessagesButton(messagesButton); // Messages Button
  changeBookmarksButton(bookmarksButton); // Bookmarks Button
  changeListsButton(listsButton); // Lists Button
  changeNavigationButtonsLabelsHover(navigationButtonsLabelsHover); // Navigation Buttons Labels on Hover
  changeNavigationButtonsLabels(navigationButtonsLabels); // Navigation Buttons Labels
  changeNavigationCenter(navigationCenter); // Center Navigation
  changeWriterMode(writerMode); // Writer Mode
  changeReplyCount(replyCount); // Hide Reply Count
  changeRetweetCount(retweetCount); // Hide Retweet Count
  changeLikeCount(likeCount); // Hide Like Count
  changeFollowCount(followCount); // Hide Follow
  changeTweetButton(hideTweetButton); // Hide Tweet Button
  changeSearchBar1(hideSearch); // Hide Search Bar
  changeSearchBar2(transparentSearch); // Transparent Search Bar
  changePromotedPosts(removePromotedPosts); // Remove Promoted Posts
  changeWhoToFollow(whoToFollow); // Who to Follow
  changeTopicsToFollow(topicsToFollow); // Topics to Follow
  changeLatestTweets(latestTweets); // Always Show Latest Tweets
};
