export const KeyExtensionStatus = "extensionStatus";
export const KeyListsButton = "listsButton";
export const KeyCommunitiesButton = "communitiesButton";
export const KeyTopicsButton = "topicsButton";
export const KeyXPremiumButton = "xPremiumButton";
export const KeyVerifiedOrgsButton = "verifiedOrgsButton";
export const KeyTypefullyGrowTab = "typefullyGrowTab";
export const KeyGrokButton = "grokButton";
export const KeyFollowingTimeline = "followingTimeline";
export const KeyTrendsHomeTimeline = "trendsHomeTimeline";
export const KeyRemoveTimelineTabs = "removeTimelineTabs";
export const KeyWriterMode = "writerMode";
export const KeyTimelineWidth = "timelineWidth";
export const KeyRemoveTimelineBorders = "timelineBorders";
export const KeyRemoveTweetBorders = "tweetBorders";
export const KeyStickyHeader = "stickyHeader";
export const KeySidebarLogo = "sidebarLogo";
export const KeyHomeButton = "homeButton";
export const KeyExploreButton = "exploreButton";
export const KeyNotificationsButton = "notificationsButton";
export const KeyMessagesButton = "messagesButton";
export const KeyBookmarksButton = "bookmarksButton";
export const KeyArticlesButton = "articles";
export const KeyProfileButton = "profileButton";
export const KeyNavigationButtonsLabelsHover = "navigationButtonsLabelsHover";
export const KeyNavigationButtonsLabels = "navigationButtonsLabels";
export const KeyNavigationCenter = "navigationCenter";
export const KeyUnreadCountBadge = "unreadCountBadge";
export const KeyAllVanity = "allVanity";
export const KeyReplyCount = "replyCount";
export const KeyRetweetCount = "retweetCount";
export const KeyLikeCount = "likeCount";
export const KeyFollowCount = "followCount";
export const KeyTweetButton = "tweetButton";
export const KeySearchBar = "searchBar";
export const KeyTransparentSearch = "transparentSearch";
export const KeyRemovePromotedPosts = "removePromotedPosts";
export const KeyRemoveTopicsToFollow = "removeTopicsToFollow";
export const KeyRecentMedia = "recentMedia";
export const KeyTypefullyComposerButtons = "typefullyComposerButtons";
export const KeyInterFont = "interFont";
export const KeyTitleNotifications = "titleNotifications";
export const KeyCustomCss = "customCss";
export const KeyHideViewCount = "hideViewCount";
export const KeyHideGrokDrawer = "hideGrokDrawer";

export const allSettingsKeys = [
  // Extension Status
  KeyExtensionStatus,

  // Timeline Features
  KeyTimelineWidth,
  KeyRemoveTimelineBorders,
  KeyRemoveTweetBorders,
  KeyStickyHeader,
  KeyWriterMode,
  KeyFollowingTimeline,
  KeyHideViewCount,
  KeyRecentMedia,
  KeyTrendsHomeTimeline,
  KeyRemovePromotedPosts,
  KeyRemoveTopicsToFollow,
  KeyRemoveTimelineTabs,
  KeyTypefullyComposerButtons,
  KeyFollowCount,
  KeyReplyCount,
  KeyRetweetCount,
  KeyLikeCount,

  // Navigation Features
  KeySidebarLogo,
  KeyNavigationButtonsLabels,
  KeyNavigationButtonsLabelsHover,
  KeyNavigationCenter,
  KeyUnreadCountBadge,
  KeyHideGrokDrawer,

  // Interface Features
  KeyInterFont,
  KeySearchBar,
  KeyTransparentSearch,
  KeyTitleNotifications,
  KeyTweetButton,

  // Sidebar Features
  KeyHomeButton,
  KeyExploreButton,
  KeyNotificationsButton,
  KeyMessagesButton,
  KeyBookmarksButton,
  KeyArticlesButton,
  KeyCommunitiesButton,
  KeyTopicsButton,
  KeyListsButton,
  KeyProfileButton,
  KeyXPremiumButton,
  KeyGrokButton,
  KeyVerifiedOrgsButton,
  KeyTypefullyGrowTab,

  // Advanced Features
  KeyCustomCss,

  // Legacy/Unused
  KeyAllVanity,
];

export const defaultPreferences = {
  // Extension Status
  [KeyExtensionStatus]: "on",

  // Timeline Features
  [KeyTimelineWidth]: 700,
  [KeyRemoveTimelineBorders]: "off",
  [KeyRemoveTweetBorders]: "off",
  [KeyStickyHeader]: "on",
  [KeyWriterMode]: "off",
  [KeyFollowingTimeline]: "off",
  [KeyHideViewCount]: "off",
  [KeyRecentMedia]: "off",
  [KeyTrendsHomeTimeline]: "off",
  [KeyRemovePromotedPosts]: "on",
  [KeyRemoveTopicsToFollow]: "on",
  [KeyRemoveTimelineTabs]: "off",
  [KeyTypefullyComposerButtons]: "on",
  [KeyFollowCount]: "on",
  [KeyReplyCount]: "on",
  [KeyRetweetCount]: "on",
  [KeyLikeCount]: "on",

  // Navigation Features
  [KeySidebarLogo]: "on",
  [KeyNavigationButtonsLabels]: "off",
  [KeyNavigationButtonsLabelsHover]: "on",
  [KeyNavigationCenter]: "off",
  [KeyUnreadCountBadge]: "off",
  [KeyHideGrokDrawer]: "off",

  // Interface Features
  [KeyInterFont]: "off",
  [KeySearchBar]: "on",
  [KeyTransparentSearch]: "off",
  [KeyTitleNotifications]: "on",
  [KeyTweetButton]: "on",

  // Sidebar Features
  [KeyHomeButton]: "on",
  [KeyExploreButton]: "on",
  [KeyNotificationsButton]: "on",
  [KeyMessagesButton]: "on",
  [KeyBookmarksButton]: "on",
  [KeyArticlesButton]: "on",
  [KeyCommunitiesButton]: "on",
  [KeyTopicsButton]: "off",
  [KeyListsButton]: "on",
  [KeyProfileButton]: "on",
  [KeyXPremiumButton]: "off",
  [KeyGrokButton]: "on",
  [KeyVerifiedOrgsButton]: "off",
  [KeyTypefullyGrowTab]: "on",

  // Advanced Features
  [KeyCustomCss]: "",
};
