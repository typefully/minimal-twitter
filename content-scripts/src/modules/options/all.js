import { changeCSSTextEdited } from "./advanced";
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
  changeTitleNotifications,
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
  changeUnreadCountBadge,
} from "./navigation";
import {
  changeFollowingTimeline,
  changeLatestTweets,
  changePromotedPosts,
  changeRecentMedia,
  changeStickyHeader,
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
  "stickyHeader",
  "homeButton",
  "exploreButton",
  "notificationsButton",
  "messagesButton",
  "bookmarksButton",
  "topArticlesButton",
  "communitiesButton",
  "listsButton",
  "twitterBlueButton",
  "typefullyGrowTab",
  "profileButton",
  "navigationButtonsLabelsHover",
  "navigationButtonsLabels",
  "navigationCenter",
  "unreadCountBadge",
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
  "followingTimeline",
  "latestTweets",
  "trendsHomeTimeline",
  "recentMedia",
  "typefullyComposerButtons",
  "interFont",
  "titleNotifications",
  "cssTextEdited",
];

export const injectAllChanges = (data) => {
  changeTimelineWidth(data?.timelineWidth); // Timeline Width
  changeTimelineBorders(data?.timelineBorders); // Timeline Borders
  changeTweetBorders(data?.tweetBorders); // Timeline Borders
  changeStickyHeader(data?.stickyHeader); // Sticky Header
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
  changeUnreadCountBadge(data?.unreadCountBadge); // Unread Count Badge
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
  changeFollowingTimeline(data?.followingTimeline); // Always Show Following Timeline
  changeLatestTweets(data?.latestTweets); // Always Show Latest Tweets
  changeTrendsHomeTimeline(data?.trendsHomeTimeline, data?.writerMode); // Show Trends on Home Timeline
  changeRecentMedia(data?.recentMedia); // Show Recent Media on Profiles
  changeTypefullyComposerButtons(data?.typefullyComposerButtons); // Typefully Composer Buttons
  changeInterFont(data?.interFont); // Change `font-family` to Inter
  changeTitleNotifications(data?.titleNotifications); // Change Title Notifications
  changeCSSTextEdited(data?.cssTextEdited); // Change User Edited CSS

  hideViewCount(); // Hide View Counts (checks setting internally)
};
