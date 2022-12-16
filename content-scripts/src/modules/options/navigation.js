import selectors from "../../selectors";
import svgAssets from "../svgAssets";
import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";

// Function to change Home Button
export const changeHomeButton = (homeButton) => {
  switch (homeButton) {
    case "off":
      addStyles(
        "mt-homeButton",
        `
        ${selectors.sidebarLinks.home} {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-homeButton");
      break;
  }
};

// Function to change Explore Button
export const changeExploreButton = (exploreButton) => {
  switch (exploreButton) {
    case "off":
      addStyles(
        "mt-exploreButton",
        `
        ${selectors.sidebarLinks.explore} {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-exploreButton");
      break;
  }
};

// Function to change Notifications Button
export const changeNotificationsButton = (notificationsButton) => {
  switch (notificationsButton) {
    case "off":
      addStyles(
        "mt-notificationsButton",
        `
        ${selectors.sidebarLinks.notifications} {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-notificationsButton");
      break;
  }
};

// Function to change Messages Button
export const changeMessagesButton = (messagesButton) => {
  switch (messagesButton) {
    case "off":
      addStyles(
        "mt-messagesButton",
        `
        ${selectors.sidebarLinks.messages} {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-messagesButton");
      break;
  }
};

// Function to change Bookmarks Button
export const changeBookmarksButton = (bookmarksButton) => {
  switch (bookmarksButton) {
    case "off":
      addStyles(
        "mt-bookmarksButton",
        `
        ${selectors.sidebarLinks.bookmarks} {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-bookmarksButton");
      break;
  }
};

// Function to change Top Articles Button
export const changeTopArticlesButton = (topArticlesButton) => {
  switch (topArticlesButton) {
    case "off":
      addStyles(
        "mt-topArticlesButton",
        `
        ${selectors.sidebarLinks.articles} {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-topArticlesButton");
      break;
  }
};

// Function to change Top Articles Button
export const changeCommunitiesButton = (communitiesButton) => {
  switch (communitiesButton) {
    case "off":
      addStyles(
        "mt-communitiesButton",
        `
        ${selectors.sidebarLinks.communities} {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-communitiesButton");
      break;
  }
};

// Function to change Profile Button
export const changeProfileButton = (profileButton) => {
  switch (profileButton) {
    case "off":
      addStyles(
        "mt-profileButton",
        `
        ${selectors.sidebarLinks.profile} {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-profileButton");
      break;
  }
};

// Function to change Lists Button
export const changeListsButton = (listsButton) => {
  switch (listsButton) {
    case "off":
      removeElement("mt-listsButtonNode");
      addStyles(
        "mt-listsButton",
        `
        ${selectors.sidebarLinks.lists} {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-listsButton");
      addListsButton();

      break;
  }
};

// Function to add Lists button
export const addListsButton = () => {
  if (!document.querySelector(selectors.sidebarLinks.lists)) {
    const profileNode = document.querySelector(
      'a[role="link"][data-testid="AppTabBar_Profile_Link"]'
    );

    if (profileNode) {
      const listsButton = profileNode.cloneNode(true);

      listsButton.id = "mt-listsButtonNode";
      listsButton.href += "/lists";
      listsButton.ariaLabel = "Minimal Twitter Lists";
      listsButton.removeAttribute("data-testid");
      listsButton.firstChild.firstChild.firstChild.innerHTML =
        svgAssets.lists.normal;
      listsButton.firstChild.lastChild.firstChild.innerText = "Lists";
      profileNode.insertAdjacentElement("beforebegin", listsButton);
    }
  }
};

// Function to remove Navigation Button Labels on Hover
const removeHover = () => {
  addStyles(
    "mt-navigationButtonsLabelsHover",
    `
    ${selectors.leftSidebarLinks} div + div[dir] {
      display: none !important;
    }
    ${selectors.leftSidebarLinks} * div[dir]:not([aria-label]) > span {
      display: none !important;
    }
    ${selectors.leftSidebar} > div > div > div > div:last-child {
      width: fit-content !important;
    }
    ${selectors.accountSwitcherButton} {
      bottom: 12px !important;
      width: fit-content !important;
    }
    ${selectors.accountSwitcherButton} > div:not(:first-child) {
      display: none !important;
    }
    `
  );
};

// Function to change Navigation Button Labels on Hover
export const changeNavigationButtonsLabelsHover = (
  navigationButtonsLabelsHover
) => {
  switch (navigationButtonsLabelsHover) {
    case "off":
      chrome.storage.sync.get(["navigationButtonsLabels"], (result) => {
        if (result.navigationButtonsLabels !== "on") {
          removeHover();
        }
      });
      break;

    case "on":
      removeElement("mt-navigationButtonsLabelsHover");
      break;
  }
};

// Function to change Navigation Button Labels
export const changeNavigationButtonsLabels = (navigationButtonsLabels) => {
  switch (navigationButtonsLabels) {
    case "on":
      removeElement("mt-navigationButtonsLabelsHover");
      addStyles(
        "mt-navigationButtonsLabels",
        `
        ${selectors.leftSidebarLinks} * div[dir]:not([aria-label]) > span,
        ${selectors.accountSwitcherButton} > div:not(:first-child) {
          opacity: 1 !important;
        }
        `
      );
      break;

    case "off":
      chrome.storage.sync.get(["navigationButtonsLabelsHover"], (result) => {
        if (result.navigationButtonsLabelsHover === "off") {
          removeHover();
        }
      });

      removeElement("mt-navigationButtonsLabels");
      break;
  }
};

// Function to change Navigation Vertical Centering
export const changeNavigationCenter = (navigationCenter) => {
  switch (navigationCenter) {
    case "on":
      addStyles(
        "mt-navigationCenter",
        `
        ${selectors.leftSidebar} > div > div > div {
          justify-content: center !important;
          padding-top: 0;
        }
        `
      );
      break;

    case "off":
      removeElement("mt-navigationCenter");
      break;
  }
};
