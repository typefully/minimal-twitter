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

// Function to change Twitter Blue in Navigation
export const changeTwitterBlueButton = (twitterBlueButton) => {
  switch (twitterBlueButton) {
    case "off":
      removeElement("mt-twitterBlueButtonNode");
      addStyles(
        "mt-twitterBlueButton",
        `
        ${selectors.sidebarLinks.twitterBlue} {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-twitterBlueButton");
      addTwitterBlueButton();
      break;
  }
};

// Function to add Twitter Blue button
export const addTwitterBlueButton = () => {
  setTimeout(() => {
    if (!document.querySelector(selectors.sidebarLinks.twitterBlue)) {
      const profileNode = document.querySelector(
        'a[role="link"][data-testid="AppTabBar_Profile_Link"]'
      );

      if (profileNode) {
        const twitterBlueButton = profileNode.cloneNode(true);

        twitterBlueButton.id = "mt-twitterBlueButtonNode";
        twitterBlueButton.href = "https://twitter.com/settings/twitter_blue";
        twitterBlueButton.ariaLabel = "Minimal Twitter Twitter Blue";
        twitterBlueButton.removeAttribute("data-testid");
        twitterBlueButton.firstChild.firstChild.firstChild.innerHTML =
          svgAssets.twitterBlue.normal;
        twitterBlueButton.firstChild.lastChild.firstChild.innerText =
          "Twitter Blue";
        profileNode.insertAdjacentElement("beforebegin", twitterBlueButton);
      }
    }
  }, 500);
};

// Function to change Communities Button
export const changeCommunitiesButton = (communitiesButton) => {
  switch (communitiesButton) {
    case "off":
      removeElement("mt-communitiesButtonNode");
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
      addCommunitiesButton();
      break;
  }
};

// Function to add Communities button
export const addCommunitiesButton = () => {
  if (!document.querySelector(selectors.sidebarLinks.communities)) {
    const profileNode = document.querySelector(
      'a[role="link"][data-testid="AppTabBar_Profile_Link"]'
    );

    if (profileNode) {
      const communitiesButton = profileNode.cloneNode(true);

      communitiesButton.id = "mt-communitiesButtonNode";
      communitiesButton.href += "/communities";
      communitiesButton.ariaLabel = "Minimal Twitter Communities";
      communitiesButton.removeAttribute("data-testid");
      communitiesButton.firstChild.firstChild.firstChild.innerHTML =
        svgAssets.communities.normal;
      communitiesButton.firstChild.lastChild.firstChild.innerText =
        "Communities";
      profileNode.insertAdjacentElement("beforebegin", communitiesButton);
    }
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

// Function to change Unread Count Badge
export const changeUnreadCountBadge = (unreadCountBadge) => {
  switch (unreadCountBadge) {
    case "on":
      removeElement("mt-unreadCountBadge");
      break;

    case "off":
      addStyles(
        "mt-unreadCountBadge",
        `
        ${selectors.leftSidebarLinks} div[dir][aria-label][aria-live] {
          display: none !important;
        }
        `
      );
      break;
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
