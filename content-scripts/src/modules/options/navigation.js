import selectors from "../../selectors";
import svgAssets from "../svgAssets";
import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";
import { getStorage } from "../utilities/storage";

// Function to change Home Button
export const changeHomeButton = (homeButton) => {
  switch (homeButton) {
    case "off":
      addStyles(
        "mt-homeButton",
        `
        ${selectors.sidebarLinks.home} {
          display: none;
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
          display: none;
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
          display: none;
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
          display: none;
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
          display: none;
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
          display: none;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-topArticlesButton");
      break;
  }
};

// Function to add Twitter Blue button
let bt; // Twitter Blue button timeout
export const addTwitterBlueButton = () => {
  clearTimeout(bt);

  if (document.querySelector(selectors.sidebarLinks.twitterBlue)) return;

  bt = setTimeout(() => {
    const profileNode = document.querySelector(
      'a[role="link"][data-testid="AppTabBar_Profile_Link"]'
    );

    if (profileNode) {
      const twitterBlueButton = profileNode.cloneNode(true);

      twitterBlueButton.id = "mt-twitterBlueButtonNode";
      twitterBlueButton.href = "/settings/twitter_blue";
      twitterBlueButton.ariaLabel = "Minimal Twitter Twitter Blue";
      twitterBlueButton.removeAttribute("data-testid");
      twitterBlueButton.firstChild.firstChild.firstChild.innerHTML =
        svgAssets.twitterBlue.normal;
      twitterBlueButton.firstChild.lastChild.firstChild.innerText =
        "Twitter Blue";
      profileNode.insertAdjacentElement("beforebegin", twitterBlueButton);
    }
  }, 500);
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
          display: none;
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

// Function to change Verified Organizations in Navigation
export const changeVerifiedOrganizationsButton = (verifiedOrganizationsButton) => {
  switch (verifiedOrganizationsButton) {
    case "off":
      addStyles(
        "mt-verifiedOrganizationsButton",
        `
        ${selectors.sidebarLinks.verifiedOrganizations} {
          display: none;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-verifiedOrganizationsButton");
      break;
  }
};

// Function to add Communities button
export const addTopicsButton = () => {
  if (document.querySelector(selectors.sidebarLinks.topics)) return;

  const profileNode = document.querySelector(
    'a[role="link"][data-testid="AppTabBar_Profile_Link"]'
  );

  if (profileNode) {
    const topicsButton = profileNode.cloneNode(true);

    topicsButton.id = "mt-topicsButtonNode";
    topicsButton.href += "/topics";
    topicsButton.ariaLabel = "Minimal Twitter Topics";
    topicsButton.removeAttribute("data-testid");
    topicsButton.firstChild.firstChild.firstChild.innerHTML =
      svgAssets.topics.normal;
    topicsButton.firstChild.lastChild.firstChild.innerText = "Topics";
    profileNode.insertAdjacentElement("beforebegin", topicsButton);
  }
};

// Function to change Communities Button
export const changeTopicsButton = (topicsButton) => {
  switch (topicsButton) {
    case "off":
      removeElement("mt-topicsButtonNode");
      addStyles(
        "mt-topicsButton",
        `
        ${selectors.sidebarLinks.topics} {
          display: none;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-topicsButton");
      addTopicsButton();
      break;
  }
};

// Function to add Communities button
export const addCirclesButton = () => {
  if (document.querySelector(selectors.sidebarLinks.circles)) return;

  const profileNode = document.querySelector(
    'a[role="link"][data-testid="AppTabBar_Profile_Link"]'
  );

  if (profileNode) {
    const circlesButton = profileNode.cloneNode(true);

    circlesButton.id = "mt-circlesButtonNode";
    circlesButton.href = "/i/circles";
    circlesButton.ariaLabel = "Minimal Twitter Circles";
    circlesButton.removeAttribute("data-testid");
    circlesButton.firstChild.firstChild.firstChild.innerHTML =
      svgAssets.circles.normal;
    circlesButton.firstChild.lastChild.firstChild.innerText = "Circles";
    profileNode.insertAdjacentElement("beforebegin", circlesButton);
  }
};

// Function to change Communities Button
export const changeCirclesButton = (circlesButton) => {
  switch (circlesButton) {
    case "off":
      removeElement("mt-circlesButtonNode");
      addStyles(
        "mt-circlesButton",
        `
        ${selectors.sidebarLinks.circles} {
          display: none;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-circlesButton");
      addCirclesButton();
      break;
  }
};

// Function to add Communities button
export const addCommunitiesButton = () => {
  if (document.querySelector(selectors.sidebarLinks.communities)) return;

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
    communitiesButton.firstChild.lastChild.firstChild.innerText = "Communities";
    profileNode.insertAdjacentElement("beforebegin", communitiesButton);
  }
};

// Function to change Communities Button
export const changeCommunitiesButton = (communitiesButton) => {
  switch (communitiesButton) {
    case "off":
      removeElement("mt-communitiesButtonNode");
      addStyles(
        "mt-communitiesButton",
        // Add important below to override it coming back: https://github.com/typefully/minimal-twitter/issues/156#issuecomment-1412600111
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

// Function to add Lists button
export const addListsButton = () => {
  if (document.querySelector(selectors.sidebarLinks.lists)) return;

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
          display: none;
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

// Function to change Profile Button
export const changeProfileButton = (profileButton) => {
  switch (profileButton) {
    case "off":
      addStyles(
        "mt-profileButton",
        `
        ${selectors.sidebarLinks.profile} {
          display: none;
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
          display: none;
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

// Function to change Navigation Button Labels on Hover
export const changeNavigationButtonsLabelsHover = async (
  navigationButtonsLabelsHover
) => {
  switch (navigationButtonsLabelsHover) {
    case "off":
      const data = await getStorage(["navigationButtonsLabels"]);

      if (data?.navigationButtonsLabels === "on") return;

      removeHover();

      break;

    case "on":
      removeElement("mt-navigationButtonsLabelsHover");
      break;
  }
};

// Function to change Navigation Button Labels
export const changeNavigationButtonsLabels = async (
  navigationButtonsLabels
) => {
  switch (navigationButtonsLabels) {
    case "on":
      removeElement("mt-navigationButtonsLabelsHover");
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
          justify-content: center;
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
