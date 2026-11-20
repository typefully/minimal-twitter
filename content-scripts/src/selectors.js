const selectors = {};

// Layout
selectors.mainColumn = `main`;
selectors.mainWrapper = `div:has(> main)`;
selectors.pageWrapper = `body > div:has(main)`;
selectors.topHeader = `${selectors.mainColumn} header[data-page-header]`;
selectors.leftSidebar = `div:has(+ div > main)`;
selectors.leftSidebarRail = `div:has(> div > [data-rail-overflow])`;
selectors.leftSidebarLinks = `[data-rail-overflow] > nav`;
selectors.leftSidebarUnreadBadge = `${selectors.leftSidebarLinks} a > span > span:first-child > :not(:first-child)`;
selectors.sidebarLinks = {
  logo: `${selectors.leftSidebar} a:has(> svg[data-icon="icon-logo-x"])`,
  home: `${selectors.leftSidebarLinks} > a[href="/home"]`,
  explore: `${selectors.leftSidebarLinks} > a[href="/explore"]`,
  notifications: `${selectors.leftSidebarLinks} > a[href="/notifications"]`,
  messages: `${selectors.leftSidebarLinks} > :is(a[href="/i/chat"], a[href^="/messages"])`,
  bookmarks: `${selectors.leftSidebarLinks} > a[href*="bookmarks"]`,
  jobs: `${selectors.leftSidebarLinks} > a[href*="jobs"]`,
  articles: 'a[href="/compose/articles"]',
  topics: `${selectors.leftSidebarLinks} > a[href*="topics"]`,
  circles: `${selectors.leftSidebarLinks} > a[href*="circles"]`,
  communities: `${selectors.leftSidebarLinks} > a[href$="/communities"]`,
  profile: `${selectors.leftSidebarLinks} > a:has(svg[data-icon="icon-person"])`,
  lists: `${selectors.leftSidebarLinks} > a[href$="/lists"]`,
  xPremium: `${selectors.leftSidebarLinks} > a[href*="premium"]`,
  verifiedOrgs: `${selectors.leftSidebarLinks} > a[href*="verified-orgs"]`,
  analytics: `${selectors.leftSidebarLinks} > .mt-sidebar-button[aria-label="Analytics"]`,
  grok: `${selectors.leftSidebarLinks} > a[href*="grok"]`,
};
selectors.accountSwitcherButton = `[data-rail-overflow] + div > button`;
selectors.leftSidebarLabel = `${selectors.leftSidebarLinks} > a > span > span:last-child`;
selectors.accountSwitcherLabel = `${selectors.accountSwitcherButton} > span:not(:first-child)`;
selectors.leftSidebarLabel_hover = `${selectors.leftSidebarLinks}:hover > a > span > span:last-child`;
selectors.accountSwitcherLabel_hover = `${selectors.accountSwitcherButton}:hover > span:not(:first-child)`;
selectors.rightSidebar = `${selectors.mainColumn} + aside`;
selectors.trendsSection = `${selectors.rightSidebar} section:has(> a[href="/explore"])`;
selectors.dockWindow = `[data-slot="xds-dock-window"]`;
selectors.grokDrawer = `${selectors.dockWindow}:has(> [data-slot="xds-dock-launcher"] svg[data-icon="icon-logo-grok"])`;
selectors.chatDrawer = `${selectors.dockWindow}:has(> [data-slot="xds-dock-launcher"] svg[data-icon="icon-chat"])`;
// Timeline
selectors.timelineTablist = `div[data-testid='ScrollSnap-List'][role='tablist']`;
// Row holding the Home tabs and the "Manage timelines" button
selectors.timelineTabs = `${selectors.topHeader} > div:has([role="tablist"])`;
selectors.timelineTab = `div[role='tab']`;
selectors.timelineOptions = `div[aria-label='Timeline options']`;
selectors.topTweetsOn = `div[aria-label='Top Tweets on']`;
selectors.menuItem = `div[role='menuitem'][tabindex='0']`;
selectors.tweetCounts = `article [role="group"]`;
selectors.viewCount = selectors.tweetCounts + " a[href$='/analytics']";
selectors.tweet = `article`;
selectors.promotedPost = `${selectors.mainColumn} li:has(> [role="link"] > article):not(:has(> [role="link"] > article a[href*="/status/"]:not([href$="/analytics"], [href*="/photo/"], [href*="/video/"])))`;
selectors.engagementAction = (action) => `[data-engagement-action="${action}"]`;

// Search
selectors.searchBox = `${selectors.rightSidebar} form[role="search"]`;
selectors.searchBoxInput = `${selectors.searchBox} input[role="combobox"]`;
selectors.searchListBox = `${selectors.searchBox} [role="listbox"]`;
// Composer
selectors.composerForm = `form:has(textarea)`;
// Modals
selectors.modalWrapper = `[role="dialog"][data-slot="xds-modal-surface"]`;
selectors.modalUi = `${selectors.modalWrapper} [data-slot="xds-modal-content-box"]`;
selectors.tweetButton = `#sidebar-compose-post`;
// Settings
selectors.securityAndAccountAccess = `[data-testid="accountAccessScreen"]`;

export default selectors;
