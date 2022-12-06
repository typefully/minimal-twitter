import { changeFeedWidth, changeFeedBorders } from "./feed";
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
  changeZenMode,
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
} from "./extras";

export const injectAllChanges = (data) => {
  const {
    feedWidth,
    feedBorders,
    exploreButton,
    notificationsButton,
    messagesButton,
    bookmarksButton,
    listsButton,
    navigationButtonsLabelsHover,
    navigationButtonsLabels,
    navigationCenter,
    zenMode,
    replyCount,
    retweetCount,
    likeCount,
    followCount,
    hideTweetButton,
    hideSearch,
    transparentSearch,
    removePromotedPosts,
    whoToFollow,
    topicsToFollow,
    latestTweets,
  } = data;
  changeFeedWidth(feedWidth); // Feed Width
  changeFeedBorders(feedBorders); // Feed Borders
  changeExploreButton(exploreButton); // Explore Button
  changeNotificationsButton(notificationsButton); // Notification Button
  changeMessagesButton(messagesButton); // Messages Button
  changeBookmarksButton(bookmarksButton); // Bookmarks Button
  changeListsButton(listsButton); // Lists Button
  changeNavigationButtonsLabelsHover(navigationButtonsLabelsHover); // Navigation Buttons Labels on Hover
  changeNavigationButtonsLabels(navigationButtonsLabels); // Navigation Buttons Labels
  changeNavigationCenter(navigationCenter); // Center Navigation
  changeZenMode(zenMode); // Zen Mode
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
