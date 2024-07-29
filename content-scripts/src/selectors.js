const selectors = {};

// Layout
selectors.mainWrapper = `main[role="main"]`;
selectors.mainColumn = `[data-testid="primaryColumn"]`;
selectors.topHeader = `${selectors.mainColumn} > div > div:nth-of-type(1)`;
selectors.timelineTabs = `${selectors.mainColumn} > div:first-child > div:first-child > div:first-child > div:only-child > nav:only-child`;
selectors.leftSidebar = `header[role="banner"]`;
selectors.leftSidebarLinks = `${selectors.leftSidebar} nav[role="navigation"]`;
selectors.leftSidebarUnreadBadge = `${selectors.leftSidebarLinks} a svg + div[aria-label]:only-of-type`;
selectors.sidebarLinks = {
  logo: `${selectors.leftSidebar} div:first-child > div:first-child div:first-child > div:first-child > h1:only-child[role="heading"]`,
  home: `${selectors.leftSidebar} [data-testid="AppTabBar_Home_Link"]`,
  explore: `${selectors.leftSidebar} [data-testid="AppTabBar_Explore_Link"]`,
  notifications: `${selectors.leftSidebar} [data-testid="AppTabBar_Notifications_Link"]`,
  messages: `${selectors.leftSidebar} [data-testid="AppTabBar_DirectMessage_Link"]`,
  bookmarks: `${selectors.leftSidebar} a[href*="bookmarks"]`,
  articles: `${selectors.leftSidebar} a[href*="i/articles"]`,
  topics: `${selectors.leftSidebar} a[href*=topics]`,
  circles: `${selectors.leftSidebar} a[href*=circles]`,
  communities: `${selectors.leftSidebar} a[href*=communities]`,
  profile: `${selectors.leftSidebar} [data-testid="AppTabBar_Profile_Link"]`,
  lists: `${selectors.leftSidebar} a[href*="lists"][role="link"][aria-label]`,
  xPremium: `${selectors.leftSidebar} a[href*="premium"][role="link"][aria-label]`,
  verifiedOrgs: `${selectors.leftSidebar} a[href*="verified-orgs"][role="link"][aria-label]`,
  analytics: `${selectors.leftSidebar} .mt-sidebar-button[aria-label="Analytics"]`,
  grok: `${selectors.leftSidebar} a[href*="grok"][role="link"][aria-label]`,
};
selectors.accountSwitcherButton = `[data-testid="SideNav_AccountSwitcher_Button"]`;
selectors.leftSidebarLabel = `${selectors.leftSidebarLinks} * div:last-child > span:only-child`;
selectors.accountSwitcherLabel = `${selectors.accountSwitcherButton} > div:not(:first-child)`;
selectors.leftSidebarLabel_hover = `${selectors.leftSidebarLinks}:hover * div:last-child > span:only-child`;
selectors.accountSwitcherLabel_hover = `${selectors.accountSwitcherButton}:hover > div:not(:first-child)`;
selectors.rightSidebar = `[data-testid="sidebarColumn"]`;
// Timeline
selectors.tweetCounts = `[role="group"][id*="id__"]:only-child`;
selectors.viewCount = selectors.tweetCounts + " a[href*='/analytics']";
selectors.tweet = `[data-testid="tweet"][role="article"]`;
selectors.tweetSpan = `${selectors.tweet} div > div:only-child > span:only-child > span`;
// Search
selectors.searchBox = `${selectors.rightSidebar} form[role="search"]`;
selectors.searchBoxInput = `${selectors.searchBox} input:only-child`;
// Modals
selectors.modalExternalWrapper = `div[role="group"]`;
selectors.modalBackground = `${selectors.modalExternalWrapper} > div:empty`;
selectors.modalWrapper = `div[aria-labelledby="modal-header"][role="dialog"]`;
selectors.modalUi = `${selectors.modalWrapper} > div`;

export default selectors;
