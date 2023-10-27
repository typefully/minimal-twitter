import {
  KeyBookmarksButton,
  KeyCommunitiesButton,
  KeyCustomCss,
  KeyExploreButton,
  KeyFollowCount,
  KeyFollowingTimeline,
  KeyHideViewCount,
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
  KeySidebarLogo,
  KeyStickyHeader,
  KeyTimelineWidth,
  KeyTitleNotifications,
  KeyTopArticlesButton,
  KeyTopicsButton,
  KeyTransparentSearch,
  KeyTrendsHomeTimeline,
  KeyTweetButton,
  KeyTypefullyComposerButtons,
  KeyTypefullyGrowTab,
  KeyUnreadCountBadge,
  KeyVerifiedOrgsButton,
  KeyWriterMode,
  KeyXPremiumButton,
} from "../../../../storage-keys";
import { changeCustomCss } from "./advanced";
import { changeFollowCount, changeLikeCount, changeReplyCount, changeRetweetCount } from "./hideVanityCounts";
import changeHideViewCounts from "./hideViewCount";
import { changeHideSearchBar, changeInterFont, changeTitleNotifications, changeTransparentSearchBar, changeTweetButton } from "./interface";
import {
  changeAnalyticsButton,
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
  changeSidebarLogo,
  changeTopArticlesButton,
  changeTopicsButton,
  changeUnreadCountBadge,
  changeVerifiedOrgsButton,
  changeXPremiumButton,
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

export const injectAllChanges = (data) => {
  changeTimelineWidth(data[KeyTimelineWidth]);
  changeTimelineBorders(data[KeyRemoveTimelineBorders]);
  changeTweetBorders(data[KeyRemoveTweetBorders]);
  changeStickyHeader(data[KeyStickyHeader]);
  changeNavigationButtonsLabels(data[KeyNavigationButtonsLabels]);
  changeNavigationButtonsLabelsHover(data[KeyNavigationButtonsLabelsHover]);
  changeNavigationCenter(data[KeyNavigationCenter]);
  changeUnreadCountBadge(data[KeyUnreadCountBadge]);
  changeWriterMode(data[KeyWriterMode]);

  // Sidebar
  changeSidebarLogo(data[KeySidebarLogo]);
  changeHomeButton(data[KeyHomeButton]);
  changeExploreButton(data[KeyExploreButton]);
  changeNotificationsButton(data[KeyNotificationsButton]);
  changeMessagesButton(data[KeyMessagesButton]);
  changeBookmarksButton(data[KeyBookmarksButton]);
  changeTopArticlesButton(data[KeyTopArticlesButton]);
  changeCommunitiesButton(data[KeyCommunitiesButton]);
  changeTopicsButton(data[KeyTopicsButton]);
  changeListsButton(data[KeyListsButton]);
  changeProfileButton(data[KeyProfileButton]);
  changeXPremiumButton(data[KeyXPremiumButton]);
  changeVerifiedOrgsButton(data[KeyVerifiedOrgsButton]);
  changeAnalyticsButton(data[KeyTypefullyGrowTab]);

  // Timeline
  changeFollowingTimeline(data[KeyFollowingTimeline]);
  changeHideViewCounts(data[KeyHideViewCount]);
  changeRecentMedia(data[KeyRecentMedia]);
  changeTrendsHomeTimeline(data[KeyTrendsHomeTimeline], data[KeyWriterMode]);
  changePromotedPosts(data[KeyRemovePromotedPosts]);
  changeWhoToFollow(data[KeyRemoveWhoToFollow]);
  changeTopicsToFollow(data[KeyRemoveTopicsToFollow]);
  changeTimelineTabs(data[KeyRemoveTimelineTabs], data[KeyWriterMode]);
  changeTypefullyComposerButtons(data[KeyTypefullyComposerButtons]);
  changeFollowCount(data[KeyFollowCount]);
  changeReplyCount(data[KeyReplyCount]);
  changeRetweetCount(data[KeyRetweetCount]);
  changeLikeCount(data[KeyLikeCount]);

  // Interface
  changeInterFont(data[KeyInterFont]);
  changeHideSearchBar(data[KeySearchBar]);
  changeTransparentSearchBar(data[KeyTransparentSearch]);
  changeTitleNotifications(data[KeyTitleNotifications]);
  changeTweetButton(data[KeyTweetButton]);

  // Advanced
  changeCustomCss(data[KeyCustomCss]);
};
