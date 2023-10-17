import selectors from "../../selectors";
import svgAssets from "../svgAssets";
import addStyles from "../utilities/addStyles";
import { removeElementById } from "../utilities/removeElement";
import { getStorage } from "../utilities/storage";

// Utilities

export const changeSidebarSetting = (sidebarSelector, state, onAdd) => {
  switch (state) {
    case "off":
      addStyles(
        `mt-${sidebarSelector}`,
        `
        ${selectors.sidebarLinks[sidebarSelector]} {
          display: none;
        }
        `
      );
      break;

    case "on":
      removeElementById(`mt-${sidebarSelector}`);
      onAdd?.();
      break;
  }
};

export const addSidebarButton = ({ name, href, svgAsset, forced }) => {
  const existingElement = document.querySelector(`nav[role="navigation"] > a[aria-label="${name}"]`);
  if (existingElement) {
    if (forced) {
      existingElement.remove();
    } else {
      return;
    }
  }

  const templateNode = document.querySelector('nav[role="navigation"] > a[role="link"][data-testid="AppTabBar_Profile_Link"]');

  if (templateNode) {
    const node = templateNode.cloneNode(true);

    node.href = href;
    node.ariaLabel = name;
    node.removeAttribute("data-testid");
    node.firstChild.firstChild.firstChild.innerHTML = svgAsset;
    node.firstChild.lastChild.firstChild.innerText = name;
    templateNode.insertAdjacentElement("beforebegin", node);
  }
};

// Functions

export const changeHomeButton = (state) => changeSidebarSetting("home", state);
export const changeExploreButton = (state) => changeSidebarSetting("explore", state);
export const changeNotificationsButton = (state) => changeSidebarSetting("notifications", state);
export const changeMessagesButton = (state) => changeSidebarSetting("messages", state);
export const changeBookmarksButton = (state) => changeSidebarSetting("bookmarks", state);
export const changeTopArticlesButton = (state) => changeSidebarSetting("articles", state);
export const changeTwitterBlueButton = (state) => changeSidebarSetting("twitterBlue", state, addTwitterBlueButton);
export const changeVerifiedOrgsButton = (state) => changeSidebarSetting("verifiedOrgs", state, addVerifiedOrgsButton);
export const changeTopicsButton = (state) => changeSidebarSetting("topics", state, addTopicsButton);
export const changeCirclesButton = (state) => changeSidebarSetting("circles", state, addCirclesButton);
export const changeCommunitiesButton = (state) => changeSidebarSetting("communities", state, addCommunitiesButton);
export const changeListsButton = (state) => changeSidebarSetting("lists", state, addListsButton);
export const changeProfileButton = (state) => changeSidebarSetting("profile", state);

let bt;
export const addTwitterBlueButton = (forced) => {
  clearTimeout(bt);

  if (document.querySelector(selectors.sidebarLinks.twitterBlue)) return;

  bt = setTimeout(() => {
    addSidebarButton({
      name: "Twitter Blue",
      href: "/settings/twitter_blue",
      svgAsset: svgAssets.twitterBlue.normal,
      forced,
    });
  }, 500);
};

export const addVerifiedOrgsButton = (forced) => {
  addSidebarButton({
    name: "Verified Orgs",
    href: "/i/verified-orgs-signup",
    svgAsset: svgAssets.verifiedOrgs.normal,
    forced,
  });
};

export const addTopicsButton = (forced) => {
  addSidebarButton({
    name: "Topics",
    href: "/topics",
    svgAsset: svgAssets.topics.normal,
    forced,
  });
};

export const addCirclesButton = (forced) => {
  addSidebarButton({
    name: "Circles",
    href: "/i/circles",
    svgAsset: svgAssets.circles.normal,
    forced,
  });
};

export const addCommunitiesButton = (forced) => {
  addSidebarButton({
    name: "Communities",
    href: "/communities",
    svgAsset: svgAssets.communities.normal,
    forced,
  });
};

export const addListsButton = (forced) => {
  addSidebarButton({
    name: "Lists",
    href: "/lists",
    svgAsset: svgAssets.lists.normal,
    forced,
  });
};

export const changeUnreadCountBadge = (unreadCountBadge) => {
  switch (unreadCountBadge) {
    case "on":
      removeElementById("mt-unreadCountBadge");
      break;

    case "off":
      addStyles(
        "mt-unreadCountBadge",
        `
        ${selectors.leftSidebarLinks} div[dir][aria-label][aria-live] {
          display: none;
        }
        `
      );
      break;
  }
};

const removeHover = () => {
  addStyles(
    "mt-navigationButtonsLabelsHover",
    `
    ${selectors.leftSidebarLinks} div + div[dir] {
      display: none;
    }
    ${selectors.leftSidebarLinks} * div[dir]:not([aria-label]) > span {
      display: none;
    }
    ${selectors.leftSidebar} > div > div > div > div:last-child {
      width: fit-content;
    }
    ${selectors.accountSwitcherButton} {
      bottom: 12px;
      width: fit-content;
    }
    ${selectors.accountSwitcherButton} > div:not(:first-child) {
      display: none;
    }
    `
  );
};

export const changeNavigationButtonsLabelsHover = async (navigationButtonsLabelsHover) => {
  switch (navigationButtonsLabelsHover) {
    case "off":
      const data = await getStorage(["navigationButtonsLabels"]);

      if (data?.navigationButtonsLabels === "on") return;

      removeHover();

      break;

    case "on":
      removeElementById("mt-navigationButtonsLabelsHover");
      break;
  }
};

export const changeNavigationButtonsLabels = async (navigationButtonsLabels) => {
  switch (navigationButtonsLabels) {
    case "on":
      removeElementById("mt-navigationButtonsLabelsHover");
      addStyles(
        "mt-navigationButtonsLabels",
        `
        ${selectors.leftSidebarLinks} * div[dir]:not([aria-label]) > span,
        ${selectors.accountSwitcherButton} > div:not(:first-child) {
          opacity: 1;
        }
        `
      );
      break;

    case "off":
      const data = await getStorage(["navigationButtonsLabelsHover"]);

      if (data?.navigationButtonsLabelsHover !== "off") return;

      removeHover();
      removeElementById("mt-navigationButtonsLabels");

      break;
  }
};

export const changeNavigationCenter = (navigationCenter) => {
  switch (navigationCenter) {
    case "on":
      addStyles(
        "mt-navigationCenter",
        `
        ${selectors.leftSidebar} > div > div > div {
          justify-content: center;
          padding-top: 0;
        }
        `
      );
      break;

    case "off":
      removeElementById("mt-navigationCenter");
      break;
  }
};
