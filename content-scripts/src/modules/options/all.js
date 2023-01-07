import {
  changeFollowCount,
  changeLikeCount,
  changeReplyCount,
  changeRetweetCount,
  changeRetweetCount,
} from "./hideVanityCounts";
import hideViewCount from "./hideViewCount";
import {
  changeInterFont,
  changeSearchBar1,
  changeSearchBar2,
  changeTweetButton,
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
  changeTwitterBlueButton,
} from "./navigation";
import {
  changeLatestTweets,
  changePromotedPosts,
  changeTimelineBorders,
  changeTimelineWidth,
  changeTopicsToFollow,
  changeTrendsHomeTimeline,
  changeTweetBorders,
  changeWhoToFollow,
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
  "removeWhoToFollow",
  "removeTopicsToFollow",
  "typefullyGrowTab",
  "latestTweets",
  "trendsHomeTimeline",
  "typefullyComposerButtons",
  "interFont",
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
  changeTwitterBlueButton(data?.twitterBlueButton); // Twitter Blue Button
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
  changeWhoToFollow(data?.removeWhoToFollow); // Who to Follow
  changeTopicsToFollow(data?.removeTopicsToFollow); // Topics to Follow
  changeGrowButton(data?.typefullyGrowTab); // Typefully Grow Button
  changeLatestTweets(data?.latestTweets); // Always Show Latest Tweets
  changeTrendsHomeTimeline(data?.trendsHomeTimeline); // Show Trends on Home Timeline
  changeTypefullyComposerButtons(data?.typefullyComposerButtons); // Typefully Composer Buttons
  changeInterFont(data?.interFont); // Change `font-family` to Inter

  hideViewCount(); // Hide View Counts (checks setting internally)
};
