import {
  changeFollowCount,
  changeLatestTweets,
  changeLikeCount,
  changePromotedPosts,
  changeReplyCount,
  changeRetweetCount,
  changeSearchBar1,
  changeSearchBar2,
  changeTopicsToFollow,
  changeTweetButton,
  changeWhoToFollow,
} from "./interface";
import {
  changeHomeButton,
  changeBookmarksButton,
  changeExploreButton,
  changeGrowButton,
  changeListsButton,
  changeMessagesButton,
  changeNavigationButtonsLabels,
  changeNavigationButtonsLabelsHover,
  changeNavigationCenter,
  changeNotificationsButton,
  changeTopArticlesButton,
  changeProfileButton,
} from "./navigation";
import {
  changeTimelineBorders,
  changeTimelineWidth,
  changeTweetBorders,
} from "./timeline";
import { changeWriterMode } from "./writer-mode";

// Array of user preferences, passed to `injectAllChanges`
export const userPreferences = [
  "timelineWidth", // 1
  "timelineBorders", // 2
  "homeButton", // 3
  "exploreButton", //
  "notificationsButton", //
  "messagesButton", //
  "bookmarksButton", //
  "topArticlesButon", //
  "listsButton", //
  "profileButton",
  "navigationButtonsLabelsHover", //
  "navigationButtonsLabels", //
  "navigationCenter", //
  "writerMode", //
  "replyCount", //
  "retweetCount", //
  "likeCount", //
  "followCount", //
  "hideTweetButton", //
  "hideSearch", //
  "transparentSearch", //
  "removePromotedPosts", //
  "whoToFollow", //
  "topicsToFollow", //
  "latestTweets", //
  "tweetBorders", //
  "typefullyGrowTab", //
];

export const injectAllChanges = (data) => {
  const {
    timelineWidth, // 1
    timelineBorders, // 2
    homeButton, // 3
    exploreButton, //
    notificationsButton, //
    messagesButton, //
    bookmarksButton, //
    topArticlesButton, //
    listsButton, //
    profileButton,
    navigationButtonsLabelsHover, //
    navigationButtonsLabels, //
    navigationCenter, //
    writerMode, //
    replyCount, //
    retweetCount, //
    likeCount, //
    followCount, //
    hideTweetButton, //
    hideSearch, //
    transparentSearch, //
    removePromotedPosts, //
    whoToFollow, //
    topicsToFollow, //
    latestTweets, //
    tweetBorders, //
    typefullyGrowTab, //
  } = data;
  changeTimelineWidth(timelineWidth); // Timeline Width
  changeTimelineBorders(timelineBorders); // Timeline Borders
  changeTweetBorders(tweetBorders); // Timeline Borders
  changeHomeButton(homeButton); // Home Button
  changeExploreButton(exploreButton); // Explore Button
  changeNotificationsButton(notificationsButton); // Notification Button
  changeMessagesButton(messagesButton); // Messages Button
  changeBookmarksButton(bookmarksButton); // Bookmarks Button
  changeTopArticlesButton(topArticlesButton); // Top Articles Button
  changeListsButton(listsButton); // Lists Button
  changeGrowButton(typefullyGrowTab); // Typefully Grow Button
  changeProfileButton(profileButton); // Profile Button
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
