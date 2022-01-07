// Utility function to remove injected CSS
const removeStyles = (id) => {
  const element = document.getElementById(id);
  element && element.remove();
};

// Utility function to inject CSS into page
const addStyles = (id, css) => {
  // First remove before adding
  removeStyles(id);

  const head = document.querySelector("head");
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `${css}`;
  head.appendChild(style);
};

// Function to add main stylesheet
const addMainStylesheet = () => {
  const head = document.querySelector("head");
  const mainStylesheet = document.createElement("link");
  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("content/main.css");
  head.appendChild(mainStylesheet);
};

// Function to change Feed Width
const changeFeedWidth = (feedWidth) => {
  switch (feedWidth) {
    case 600:
      addStyles(
        "feedWidth",
        `
        @media only screen and (min-width: 988px) {
          [data-testid="primaryColumn"] {
            width: 600px !important;
            max-width: 600px !important;
          }
        }
        `
      );
      break;
    case 650:
      addStyles(
        "feedWidth",
        `
        @media only screen and (min-width: 988px) {
          [data-testid="primaryColumn"] {
            width: 650px !important;
            max-width: 650px !important;
          }
        }
        `
      );
      break;
    case 700:
      addStyles(
        "feedWidth",
        `
        @media only screen and (min-width: 988px) {
          [data-testid="primaryColumn"] {
            width: 700px !important;
            max-width: 700px !important;
          }
        }
        `
      );
      break;
    case 750:
      addStyles(
        "feedWidth",
        `
        @media only screen and (min-width: 988px) {
          [data-testid="primaryColumn"] {
            width: 750px !important;
            max-width: 750px !important;
          }
        }
        `
      );
      break;
    case 800:
      addStyles(
        "feedWidth",
        `
        @media only screen and (min-width: 988px) {
          [data-testid="primaryColumn"] {
            width: 800px !important;
            max-width: 800px !important;
          }
        }
        `
      );
      break;
  }
};

// Function to change Feed Borders
const changefeedBorders = (feedBorders) => {
  switch (feedBorders) {
    case "on":
      removeStyles("feedBorders");
      break;

    case "off":
      addStyles(
        "feedBorders",
        `
        @media only screen and (min-width: 988px) {
          div[data-testid="primaryColumn"] {
            border-style: hidden;
          }
        }
        `
      );
      break;
  }
};

// Function to change Explore Button
const changeExploreButton = (exploreButton) => {
  switch (exploreButton) {
    case "off":
      addStyles(
        "exploreButton",
        `
        [data-testid="AppTabBar_Explore_Link"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeStyles("exploreButton");
      break;
  }
};

// Function to change Notifications Button
const changeNotificationsButton = (notificationsButton) => {
  switch (notificationsButton) {
    case "off":
      addStyles(
        "notificationsButton",
        `
        [data-testid="AppTabBar_Notifications_Link"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeStyles("notificationsButton");
      break;
  }
};

// Function to change Messages Button
const changeMessagesButton = (messagesButton) => {
  switch (messagesButton) {
    case "off":
      addStyles(
        "messagesButton",
        `
        [data-testid="AppTabBar_DirectMessage_Link"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeStyles("messagesButton");
      break;
  }
};

// Function to change Bookmarks Button
const changeBookmarksButton = (bookmarksButton) => {
  switch (bookmarksButton) {
    case "off":
      addStyles(
        "bookmarksButton",
        `
        [aria-label="Bookmarks"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeStyles("bookmarksButton");
      break;
  }
};

// Function to change Lists Button
const changeListsButton = (listsButton) => {
  switch (listsButton) {
    case "off":
      addStyles(
        "listsButton",
        `
        [aria-label="Lists"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeStyles("listsButton");
      break;
  }
};

// Function to change Navigation Button Labels
const changeNavigationButtonsLabels = (navigationButtonsLabels) => {
  switch (navigationButtonsLabels) {
    case "on":
      addStyles(
        "navigationButtonsLabels",
        `
        @media only screen and (min-width: 988px) {
          nav[aria-label="Primary"] div[dir="auto"]:not([aria-live]) {
            position: relative !important;
          }
          nav[aria-label="Primary"] * div[dir="auto"]:not([aria-label]) > span {
            display: inline !important;
          }
          [data-testid="SideNav_AccountSwitcher_Button"] > div:not(:first-child) {
            display: flex !important;
          }
        }
        `
      );
      break;

    case "off":
      removeStyles("navigationButtonsLabels");
      break;
  }
};

// Function to change Zen Mode
const changeZenMode = (zenMode) => {
  switch (zenMode) {
    case "on":
      addStyles(
        "zenMode",
        `
        header[role="banner"], 
        [data-testid="sidebarColumn"],
        [data-testid="primaryColumn"] > div > div:not(:nth-of-type(1)):not(:nth-of-type(2))  {
          display: none !important;
        }

        div[data-testid="primaryColumn"] {
          border-style: hidden;
        }
        `
      );
      break;

    case "off":
      removeStyles("zenMode");
      break;
  }
};

// Change Promoted Posts
const changePromotedPosts = (removePromotedPosts) => {
  switch (removePromotedPosts) {
    case "on":
      addStyles(
        "removePromotedPosts",
        `
        [data-testid="placementTracking"] article {
          display: none !important;
        }
        `
      );
      break;

    case "off":
      removeStyles("removePromotedPosts");
      break;
  }
};

// Utility function to create data for `injectAllChanges()`
const constructNewData = (changes) => {
  // Creates an array of objects from changes
  // The value of each object is the new value
  const newValuesArray = Object.entries(changes).map((item) => {
    const itemKey = item[0];
    const itemValue = item[1]?.newValue;
    return { [itemKey]: itemValue };
  });

  // Recreate a hash map to pass to `injectAllChanges()`
  const newChangesData = Object.fromEntries(
    newValuesArray.map((item) => {
      const itemKey = Object.keys(item)[0];
      const itemValue = Object.values(item)[0];
      return [itemKey, itemValue];
    })
  );

  return newChangesData;
};

/*-- 
- Function to inject all changes:
  - 1. Feed Width
  - 2. Feed Borders
  - 3. Explore Button
  - 4. Notification Button
  - 5. Message Button
  - 6. Bookmark Button
  - 7. Lists Button
  - 8. Navigation Buttons Labels
  - 9. Zen Mode
  - 10. Remove promoted posts
  - 11. Hide vanity counts
    - Hide reply count
    - Hide retweet count
    - Hide like count
    - Hide following count
    - Hide follower count
--*/
const injectAllChanges = (data) => {
  const {
    feedWidth,
    feedBorders,
    exploreButton,
    notificationsButton,
    messagesButton,
    bookmarksButton,
    listsButton,
    navigationButtonsLabels,
    zenMode,
    removePromotedPosts,
    // hideReplyCount,
    // hideRetweetCount,
    // hideLikeCount,
    // hideFollowingCount,
    // hideFollowerCount,
  } = data;

  // 1. Feed Width
  changeFeedWidth(feedWidth);
  // 2. Feed Borders
  changefeedBorders(feedBorders);
  // 3. Explore Button
  changeExploreButton(exploreButton);
  // 4. Notification Button
  changeNotificationsButton(notificationsButton);
  // 5. Message Button
  changeMessagesButton(messagesButton);
  // 6. Bookmark Button
  changeBookmarksButton(bookmarksButton);
  // 7. Lists Button
  changeListsButton(listsButton);
  // 8. Navigation Buttons Labels
  changeNavigationButtonsLabels(navigationButtonsLabels);
  // 9. Zen Mode
  changeZenMode(zenMode);
  // 10. Promoted Posts
  changePromotedPosts(removePromotedPosts);
};

/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#synchronous-response-to-storage-updates
- Listen to Chrome Storage changes
- Inject styles in respond to changes
--*/
chrome.storage.onChanged.addListener((changes) => {
  const newChangesData = constructNewData(changes);
  injectAllChanges(newChangesData);
});

/*--
- Initializing function, runs once at start
- Get Chrome Storage and inject respective styles
--*/
const init = () => {
  addMainStylesheet();

  chrome.storage.sync.get(
    [
      "feedWidth",
      "feedBorders",
      "exploreButton",
      "notificationsButton",
      "messagesButton",
      "bookmarksButton",
      "listsButton",
      "navigationButtonsLabels",
      "zenMode",
      "removePromotedPosts",
      // "hideReplyCount",
      // "hideRetweetCount",
      // "hideLikeCount",
      // "hideFollowingCount",
      // "hideFollowerCount",
    ],
    (data) => {
      injectAllChanges(data);
    }
  );
};

init();
