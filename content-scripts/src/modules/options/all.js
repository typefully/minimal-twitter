import hideViewCounts from "./hideViewCounts";
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
  changeBookmarksButton,
  changeCommunitiesButton,
  changeExploreButton,
  changeHomeButton,
  changeListsButton,
  changeMessagesButton,
  changeNavigationButtonsLabels,
  changeNavigationButtonsLabelsHover,
  changeNavigationCenter,
  changeNotificationsButton,
  changeProfileButton,
  changeTopArticlesButton,
} from "./navigation";
import {
  changeTimelineBorders,
  changeTimelineWidth,
  changeTweetBorders,
} from "./timeline";
import { changeGrowButton, changeTypefullyComposerButtons } from "./typefully";
import { changeWriterMode } from "./writer-mode";

// Array of user preferences, passed to `injectAllChanges`
export const userPreferences = [
  "timelineWidth",
  "timelineBorders",
  "tweetBorders",
  "homeButton",
  "exploreButton",
  "notificationsButton",
  "messagesButton",
  "bookmarksButton",
  "topArticlesButton",
  "communitiesButton",
  "listsButton",
  "profileButton",
  "navigationButtonsLabelsHover",
  "navigationButtonsLabels",
  "navigationCenter",
  "writerMode",
  "replyCount",
  "retweetCount",
  "likeCount",
  "followCount",
  "tweetButton",
  "searchBar",
  "transparentSearch",
  "removePromotedPosts",
  "whoToFollow",
  "topicsToFollow",
  "typefullyGrowTab",
  "latestTweets",
  "typefullyComposerButtons",
];

export const injectAllChanges = (data) => {
  changeTimelineWidth(data?.timelineWidth); // Timeline Width
  changeTimelineBorders(data?.timelineBorders); // Timeline Borders
  changeTweetBorders(data?.tweetBorders); // Timeline Borders
  changeHomeButton(data?.homeButton); // Home Button
  changeExploreButton(data?.exploreButton); // Explore Button
  changeNotificationsButton(data?.notificationsButton); // Notification Button
  changeMessagesButton(data?.messagesButton); // Messages Button
  changeBookmarksButton(data?.bookmarksButton); // Bookmarks Button
  changeTopArticlesButton(data?.topArticlesButton); // Top Articles Button
  changeCommunitiesButton(data?.communitiesButton); // Communities Button
  changeListsButton(data?.listsButton); // Lists Button
  changeProfileButton(data?.profileButton); // Profile Button
  changeNavigationButtonsLabelsHover(data?.navigationButtonsLabelsHover); // Navigation Buttons Labels on Hover
  changeNavigationButtonsLabels(data?.navigationButtonsLabels); // Navigation Buttons Labels
  changeNavigationCenter(data?.navigationCenter); // Center Navigation
  changeWriterMode(data?.writerMode); // Writer Mode
  changeReplyCount(data?.replyCount); // Hide Reply Count
  changeRetweetCount(data?.retweetCount); // Hide Retweet Count
  changeLikeCount(data?.likeCount); // Hide Like Count
  changeFollowCount(data?.followCount); // Hide Follow
  changeTweetButton(data?.tweetButton); // Hide Tweet Button
  changeSearchBar1(data?.searchBar); // Hide Search Bar
  changeSearchBar2(data?.transparentSearch); // Transparent Search Bar
  changePromotedPosts(data?.removePromotedPosts); // Remove Promoted Posts
  changeWhoToFollow(data?.whoToFollow); // Who to Follow
  changeTopicsToFollow(data?.topicsToFollow); // Topics to Follow
  changeGrowButton(data?.typefullyGrowTab); // Typefully Grow Button
  changeLatestTweets(data?.latestTweets); // Always Show Latest Tweets
  changeTypefullyComposerButtons(data?.typefullyComposerButtons); // Typefully Composer Buttons
  hideViewCounts(); // Hide View Counts (checks setting internally)
};
