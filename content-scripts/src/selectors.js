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
  jobs: `${selectors.leftSidebar} a[href*="jobs"]`,
  articles: 'a[href="/compose/articles"]',
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
selectors.leftSidebarLabel = `${selectors.leftSidebarLinks} * div + div:last-child > span:only-child`;
selectors.accountSwitcherLabel = `${selectors.accountSwitcherButton} > div:not(:first-child)`;
selectors.leftSidebarLabel_hover = `${selectors.leftSidebarLinks}:hover * div:last-child > span:only-child`;
selectors.accountSwitcherLabel_hover = `${selectors.accountSwitcherButton}:hover > div:not(:first-child)`;
selectors.rightSidebar = `[data-testid="sidebarColumn"]`;
// Add Grok drawer selector
selectors.grokDrawer = `[data-testid="GrokDrawer"]`;
selectors.grokDrawerHeader = `div[data-testid="GrokDrawerHeader"]`;
// Timeline
selectors.tweetCounts = `[role="group"][id*="id__"]:only-child`;
selectors.viewCount = selectors.tweetCounts + " a[href*='/analytics']";
selectors.tweet = `[data-testid="tweet"][role="article"]`;
selectors.tweetSpan = `${selectors.tweet} div > div:only-child > span:only-child > span`;
selectors.grokSvg = 'svg:has(path[d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"])';

// Search
selectors.searchBox = `${selectors.rightSidebar} form[role="search"]`;
selectors.searchBoxInput = `${selectors.searchBox} input:only-child`;
selectors.searchListBox = `${selectors.searchBox} div[role="listbox"]`;
// Modals
selectors.modalExternalWrapper = `div[role="group"]`;
selectors.modalBackground = `${selectors.modalExternalWrapper} > div:empty`;
selectors.modalWrapper = `div[aria-labelledby="modal-header"][role="dialog"]`;
selectors.modalUi = `${selectors.modalWrapper} > div`;
selectors.tweetButton = `[data-testid="SideNav_NewTweet_Button"]`;
// Settings
selectors.securityAndAccountAccess = `[data-testid="accountAccessScreen"]`;

export default selectors;
