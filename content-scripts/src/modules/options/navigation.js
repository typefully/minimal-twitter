import selectors from "../../selectors";
import svgAssets from "../svgAssets";
import addStyles, { removeStyles } from "../utilities/addStyles";
import { createTypefullyUrl } from "../utilities/createTypefullyUrl";
import { addSidebarButton } from "../utilities/sidebar";

// Utilities

export const changeSidebarSetting = (sidebarSelector, state, onAdd) => {
  switch (state) {
    case "off":
      addStyles(
        sidebarSelector,
        `${selectors.sidebarLinks[sidebarSelector]} {
          display: none;
        }`
      );
      break;

    case "on":
      removeStyles(sidebarSelector);
      onAdd?.();
      break;
  }
};

// Functions

export const changeSidebarLogo = (state) => changeSidebarSetting("logo", state);
export const changeHomeButton = (state) => changeSidebarSetting("home", state);
export const changeExploreButton = (state) => changeSidebarSetting("explore", state);
export const changeNotificationsButton = (state) => changeSidebarSetting("notifications", state);
export const changeMessagesButton = (state) => changeSidebarSetting("messages", state);
export const changeBookmarksButton = (state) => changeSidebarSetting("bookmarks", state);
export const changeJobsButton = (state) => changeSidebarSetting("jobs", state);
export const changeArticlesButton = (state) => changeSidebarSetting("articles", state);
export const changeVerifiedOrgsButton = (state) => changeSidebarSetting("verifiedOrgs", state);
export const changeProfileButton = (state) => changeSidebarSetting("profile", state);
export const changeXPremiumButton = (state) => changeSidebarSetting("xPremium", state, addXPremiumButton);
export const changeGrokButton = (state) => changeSidebarSetting("grok", state);
export const changeTopicsButton = (state) => changeSidebarSetting("topics", state, addTopicsButton);
export const changeCommunitiesButton = (state) => changeSidebarSetting("communities", state, addCommunitiesButton);
export const changeListsButton = (state) => changeSidebarSetting("lists", state, addListsButton);
export const changeAnalyticsButton = (state) => changeSidebarSetting("analytics", state, addAnalyticsButton);

let tm1;
export const addXPremiumButton = () => {
  clearTimeout(tm1);
  tm1 = setTimeout(() => {
    addSidebarButton({
      name: "Premium",
      href: "/settings/premium",
      svgAsset: svgAssets.xPremium.normal,
    });
  }, 100);
};

let tm2;
export const addAnalyticsButton = () => {
  clearTimeout(tm2);
  tm2 = setTimeout(() => {
    addSidebarButton({
      name: "Analytics",
      svgAsset: svgAssets.grow.normal,
      onClick: () => {
        const screenName = document.querySelector(selectors.sidebarLinks.profile)?.getAttribute("href").replace("/", "");

        const url = createTypefullyUrl(
          {
            utm_content: "sidebar-grow-button",
            "mt-screen-name": screenName,
          },
          "grow"
        );

        if (screenName) window.open(url, "_blank");
      },
    });
  }, 200);
};

export const addTopicsButton = () => {
  addSidebarButton({
    name: "Topics",
    userHref: "/topics",
    svgAsset: svgAssets.topics.normal,
  });
};

export const addCommunitiesButton = () => {
  addSidebarButton({
    name: "Communities",
    userHref: "/communities",
    svgAsset: svgAssets.communities.normal,
  });
};

export const addListsButton = () => {
  addSidebarButton({
    name: "Lists",
    userHref: "/lists",
    svgAsset: svgAssets.lists.normal,
  });
};

export const changeUnreadCountBadge = (unreadCountBadge) => {
  switch (unreadCountBadge) {
    case "on":
      removeStyles("unreadCountBadge");
      break;
    case "off":
      addStyles(
        "unreadCountBadge",
        `${selectors.leftSidebarUnreadBadge} {
          display: none;
        }`
      );
      break;
  }
};

const collapsedLabelsStyle = `
    ${selectors.leftSidebarRail},
    ${selectors.leftSidebarRail} * {
      --x-sidebar-expanded: 0 !important;
    }
    `;

const addStyleToRemoveLabels = () => {
  addStyles("removeLabels", collapsedLabelsStyle);
};

const addStyleToShowLabelsOnHover = () => {
  addStyles("hideLabels", collapsedLabelsStyle);
  addStyles(
    "showLabelsOnHover",
    `
    ${selectors.leftSidebarRail}:hover,
    ${selectors.leftSidebarRail}:hover * {
      --x-sidebar-expanded: 1 !important;
    }
    ${selectors.leftSidebarRail}:hover {
      background-color: var(--body-bg-color);
    }
    `
  );
};

export const changeNavigationButtonsLabels = async (setting) => {
  const isMessagesPage = window.location.pathname.startsWith("/messages") || window.location.pathname.startsWith("/i/chat");
  const isSearchPage = window.location.pathname.startsWith("/search");

  if (isMessagesPage || isSearchPage) {
    removeStyles("navigation-position");
    addStyles(
      "customDMsAndSearchStyle",
      `
${selectors.leftSidebar} {
flex: 0.5 1 auto;
}
@media only screen and (min-width: 1200px) {
  ${selectors.leftSidebar} {
    flex: 0.3 1 auto;
  }
}
${selectors.mainWrapper} {
align-items: flex-start;
}
`
    );
  } else {
    removeStyles("customDMsAndSearchStyle");
  }

  switch (setting) {
    case "never":
      addStyleToRemoveLabels();
      removeStyles("showLabelsOnHover");

      break;
    case "always":
      removeStyles("hideLabels");
      removeStyles("removeLabels");
      removeStyles("showLabelsOnHover");

      break;
    case "hover":
      removeStyles("removeLabels");
      addStyleToShowLabelsOnHover();

      break;
  }
};

export const changeNavigationCenter = (navigationCenter) => {
  switch (navigationCenter) {
    case "on":
      addStyles(
        "navigationCenter",
        `
        ${selectors.leftSidebarRail} [data-rail-overflow] {
          justify-content: center;
        }
        `
      );
      break;

    case "off":
      removeStyles("navigationCenter");
      break;
  }
};

export const hideGrokDrawer = (state) => {
  switch (state) {
    case "on":
      // Only hide the closed launcher, so Grok still opens from a post's Grok button.
      addStyles(
        "grokDrawer",
        `${selectors.grokDrawer}[data-closed] {
          display: none !important;
        }`
      );
      break;
    case "off":
      removeStyles("grokDrawer");
      break;
  }
};
