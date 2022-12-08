import { showGrowTab } from "../grow-tab";
import svgAssets from "../svgAssets";
import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";
import { getStorage } from "../utilities/storage";

// Function to change Explore Button
export const changeExploreButton = (exploreButton) => {
  switch (exploreButton) {
    case "off":
      addStyles(
        "mt-exploreButton",
        `
        [data-testid="AppTabBar_Explore_Link"] {
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
        [data-testid="AppTabBar_Notifications_Link"] {
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
        [data-testid="AppTabBar_DirectMessage_Link"] {
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
        a[href="/i/bookmarks"] {
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

// Function to change Lists Button
export const changeListsButton = (listsButton) => {
  switch (listsButton) {
    case "off":
      removeElement("mt-listsButtonNode");
      addStyles(
        "mt-listsButton",
        `
        a[href*="/lists"][role="link"][aria-label] {
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
  if (!document.querySelector('a[href$="/lists"][role="link"][aria-label]')) {
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

// Function to change Grow Button
export const changeGrowButton = (growButton) => {
  switch (growButton) {
    case "off":
      removeElement("mt-typefullyGrowButton");
    case "on":
      addGrowButton();
      break;
  }
};

// Function to add Grow button
export const addGrowButton = async () => {
  const userSetting = await getStorage("typefullyGrowTab");
  if (userSetting !== "on") return;
  const exists = document.querySelector("#mt-typefullyGrowButton");
  if (exists) return;

  const profileNode = document.querySelector(
    'a[role="link"][data-testid="AppTabBar_Profile_Link"]'
  );

  if (profileNode) {
    const growButton = document.createElement("div");
    growButton.innerHTML = profileNode.innerHTML;

    growButton.id = "mt-typefullyGrowButton";
    growButton.ariaLabel = "Typefully Grow";
    growButton.style.cursor = "pointer";
    growButton.firstChild.firstChild.firstChild.innerHTML =
      svgAssets.grow.normal;

    growButton.onclick = () => {
      growButton.firstChild.firstChild.firstChild.innerHTML =
        svgAssets.grow.selected;
      if (growButton.querySelector("span"))
        growButton.querySelector("span").style.fontWeight = "700";
      showGrowTab();
    };

    growButton.firstChild.lastChild.firstChild.innerText = "Grow";
    profileNode.insertAdjacentElement("beforebegin", growButton);
  }
};

// Function to remove Navigation Button Labels on Hover
const removeHover = () => {
  addStyles(
    "mt-navigationButtonsLabelsHover",
    `
    header[role="banner"] nav[role="navigation"] {
      width: fit-content !important;
    }
    header[role="banner"] nav[role="navigation"] div[dir] {
      position: absolute !important;
    }
    header[role="banner"] nav[role="navigation"] * div[dir]:not([aria-label]) > span {
      display: none !important;
    }
  
    header[role="banner"] > div > div > div > div:last-child {
      width: fit-content !important;
    }
  
    [data-testid="SideNav_AccountSwitcher_Button"] {
      bottom: 12px !important;
      width: fit-content !important;
    }
  
    [data-testid="SideNav_AccountSwitcher_Button"] > div:not(:first-child) {
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
        header[role="banner"] nav[role="navigation"] * div[dir]:not([aria-label]) > span,
        [data-testid="SideNav_AccountSwitcher_Button"] > div:not(:first-child) {
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
        header[role="banner"] > div > div > div {
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
