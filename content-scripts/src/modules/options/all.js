import {
  KeyBookmarksButton,
  KeyCirclesButton,
  KeyCommunitiesButton,
  KeyCssTextEdited,
  KeyExploreButton,
  KeyFollowCount,
  KeyFollowingTimeline,
  KeyHomeButton,
  KeyInterFont,
  KeyLikeCount,
  KeyListsButton,
  KeyMessagesButton,
  KeyNavigationButtonsLabels,
  KeyNavigationButtonsLabelsHover,
  KeyNavigationCenter,
  KeyNotificationsButton,
  KeyProfileButton,
  KeyRecentMedia,
  KeyRemovePromotedPosts,
  KeyRemoveTimelineBorders,
  KeyRemoveTimelineTabs,
  KeyRemoveTopicsToFollow,
  KeyRemoveTweetBorders,
  KeyRemoveWhoToFollow,
  KeyReplyCount,
  KeyRetweetCount,
  KeySearchBar,
  KeyStickyHeader,
  KeyTimelineWidth,
  KeyTitleNotifications,
  KeyTopArticlesButton,
  KeyTopicsButton,
  KeyTransparentSearch,
  KeyTrendsHomeTimeline,
  KeyTweetButton,
  KeyTwitterBlueButton,
  KeyTypefullyComposerButtons,
  KeyTypefullyGrowTab,
  KeyUnreadCountBadge,
  KeyVerifiedOrgsButton,
  KeyWriterMode,
} from "../../../../storage-keys";
import { changeCSSTextEdited } from "./advanced";
import { changeFollowCount, changeLikeCount, changeReplyCount, changeRetweetCount } from "./hideVanityCounts";
import hideViewCount from "./hideViewCount";
import { changeHideSearchBar, changeInterFont, changeTitleNotifications, changeTransparentSearchBar, changeTweetButton } from "./interface";
import {
  changeBookmarksButton,
  changeCirclesButton,
  changeCommunitiesButton,
  changeExploreButton,
  changeGrowButton,
  changeHomeButton,
  changeListsButton,
  changeMessagesButton,
  changeNavigationButtonsLabels,
  changeNavigationButtonsLabelsHover,
  changeNavigationCenter,
  changeNotificationsButton,
  changeProfileButton,
  changeTopArticlesButton,
  changeTopicsButton,
  changeTwitterBlueButton,
  changeUnreadCountBadge,
  changeVerifiedOrgsButton,
} from "./navigation";
import {
  changeFollowingTimeline,
  changePromotedPosts,
  changeRecentMedia,
  changeStickyHeader,
  changeTimelineBorders,
  changeTimelineTabs,
  changeTimelineWidth,
  changeTopicsToFollow,
  changeTrendsHomeTimeline,
  changeTweetBorders,
  changeWhoToFollow,
} from "./timeline";
import { changeTypefullyComposerButtons } from "./typefully";
import { changeWriterMode } from "./writer-mode";

// Array of user preferences, passed to `injectAllChanges`
export const userPreferences = [
  KeyTimelineWidth,
  KeyRemoveTimelineBorders,
  KeyRemoveTweetBorders,
  KeyStickyHeader,
  KeyHomeButton,
  KeyExploreButton,
  KeyNotificationsButton,
  KeyMessagesButton,
  KeyBookmarksButton,
  KeyTopArticlesButton,
  KeyCommunitiesButton,
  KeyTopicsButton,
  KeyCirclesButton,
  KeyListsButton,
  KeyTwitterBlueButton,
  KeyVerifiedOrgsButton,
  KeyTypefullyGrowTab,
  KeyProfileButton,
  KeyNavigationButtonsLabelsHover,
  KeyNavigationButtonsLabels,
  KeyNavigationCenter,
  KeyUnreadCountBadge,
  KeyWriterMode,
  KeyReplyCount,
  KeyRetweetCount,
  KeyLikeCount,
  KeyFollowCount,
  KeyTweetButton,
  KeySearchBar,
  KeyTransparentSearch,
  KeyRemovePromotedPosts,
  KeyRemoveWhoToFollow,
  KeyRemoveTopicsToFollow,
  KeyRemoveTimelineTabs,
  KeyFollowingTimeline,
  KeyTrendsHomeTimeline,
  KeyRecentMedia,
  KeyTypefullyComposerButtons,
  KeyInterFont,
  KeyTitleNotifications,
  KeyCssTextEdited,
];

export const injectAllChanges = (data) => {
  changeTimelineWidth(data[KeyTimelineWidth]); // Timeline Width
  changeTimelineBorders(data[KeyRemoveTimelineBorders]); // Timeline Borders
  changeTweetBorders(data[KeyRemoveTweetBorders]); // Timeline Borders
  changeStickyHeader(data[KeyStickyHeader]); // Sticky Header

  // Sidebar
  changeHomeButton(data[KeyHomeButton]);
  changeExploreButton(data[KeyExploreButton]);
  changeNotificationsButton(data[KeyNotificationsButton]);
  changeMessagesButton(data[KeyMessagesButton]);
  changeBookmarksButton(data[KeyBookmarksButton]);
  changeTopArticlesButton(data[KeyTopArticlesButton]);
  changeCommunitiesButton(data[KeyCommunitiesButton]);
  changeCirclesButton(data[KeyCirclesButton]);
  changeTopicsButton(data[KeyTopicsButton]);
  changeListsButton(data[KeyListsButton]);
  changeProfileButton(data[KeyProfileButton]);
  changeTwitterBlueButton(data[KeyTwitterBlueButton]);
  changeVerifiedOrgsButton(data[KeyVerifiedOrgsButton]);
  changeGrowButton(data[KeyTypefullyGrowTab]);

  changeNavigationButtonsLabelsHover(data[KeyNavigationButtonsLabelsHover]); // Navigation Buttons Labels on Hover
  changeNavigationButtonsLabels(data[KeyNavigationButtonsLabels]); // Navigation Buttons Labels
  changeNavigationCenter(data[KeyNavigationCenter]); // Center Navigation
  changeUnreadCountBadge(data[KeyUnreadCountBadge]); // Unread Count Badge
  changeWriterMode(data[KeyWriterMode]); // Writer Mode
  changeReplyCount(data[KeyReplyCount]); // Hide Reply Count
  changeRetweetCount(data[KeyRetweetCount]); // Hide Retweet Count
  changeLikeCount(data[KeyLikeCount]); // Hide Like Count
  changeFollowCount(data[KeyFollowCount]); // Hide Follow
  changeTweetButton(data[KeyTweetButton]); // Hide Tweet Button
  changeHideSearchBar(data[KeySearchBar]); // Hide Search Bar
  changeTransparentSearchBar(data[KeyTransparentSearch]); // Transparent Search Bar
  changePromotedPosts(data[KeyRemovePromotedPosts]); // Remove Promoted Posts
  changeWhoToFollow(data[KeyRemoveWhoToFollow]); // Who to Follow
  changeTopicsToFollow(data[KeyRemoveTopicsToFollow]); // Topics to Follow
  changeTimelineTabs(data[KeyRemoveTimelineTabs], data[KeyWriterMode]); // For you / Following tabs

  changeFollowingTimeline(data[KeyFollowingTimeline]); // Always Show Following Timeline
  changeTrendsHomeTimeline(data[KeyTrendsHomeTimeline], data[KeyWriterMode]); // Show Trends on Home Timeline
  changeRecentMedia(data[KeyRecentMedia]); // Show Recent Media on Profiles
  changeTypefullyComposerButtons(data[KeyTypefullyComposerButtons]); // Typefully Composer Buttons
  changeInterFont(data[KeyInterFont]); // Change `font-family` to Inter
  changeTitleNotifications(data[KeyTitleNotifications]); // Change Title Notifications
  changeCSSTextEdited(data[KeyCssTextEdited]); // Change User Edited CSS

  hideViewCount(); // Hide View Counts (checks setting internally)
};
