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

// Reveal Search Filters
const revealSearchFilters = () => {
  const observer = new MutationObserver((mutationsList) => {
    if (mutationsList.length) {
      // Get grandparent of advanced search
      const advancedSearch = document.querySelector(
        `[data-testid="searchFiltersAdvancedSearch"]`
      );

      if (advancedSearch) {
        const searchFilters =
          advancedSearch.parentElement.parentElement.parentElement;
        searchFilters.classList = searchFilters.classList + " searchFilters";
        return;
      }
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};

// Function to change Feed Width
const changeFeedWidth = (feedWidth) => {
  switch (feedWidth) {
    case 600:
      addStyles(
        "mt-feedWidth",
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
        "mt-feedWidth",
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
        "mt-feedWidth",
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
        "mt-feedWidth",
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
        "mt-feedWidth",
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
      removeStyles("mt-feedBorders");
      break;

    case "off":
      addStyles(
        "mt-feedBorders",
        `
        @media only screen and (min-width: 988px) {
          div[data-testid="primaryColumn"] {
            border-style: hidden !important;
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
        "mt-exploreButton",
        `
        [data-testid="AppTabBar_Explore_Link"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeStyles("mt-exploreButton");
      break;
  }
};

// Function to change Notifications Button
const changeNotificationsButton = (notificationsButton) => {
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
      removeStyles("mt-notificationsButton");
      break;
  }
};

// Function to change Messages Button
const changeMessagesButton = (messagesButton) => {
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
      removeStyles("mt-messagesButton");
      break;
  }
};

// Function to change Bookmarks Button
const changeBookmarksButton = (bookmarksButton) => {
  switch (bookmarksButton) {
    case "off":
      addStyles(
        "mt-bookmarksButton",
        `
        [aria-label="Bookmarks"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeStyles("mt-bookmarksButton");
      break;
  }
};

// Function to change Lists Button
const changeListsButton = (listsButton) => {
  switch (listsButton) {
    case "off":
      addStyles(
        "mt-listsButton",
        `
        [aria-label="Lists"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeStyles("mt-listsButton");
      break;
  }
};

// Function to change Navigation Button Labels
const changeNavigationButtonsLabels = (navigationButtonsLabels) => {
  switch (navigationButtonsLabels) {
    case "on":
      addStyles(
        "mt-navigationButtonsLabels",
        `
        nav[aria-label="Primary"] * div[dir="auto"]:not([aria-label]) > span,
        [data-testid="SideNav_AccountSwitcher_Button"] > div:not(:first-child) {
          opacity: 1 !important;
        }
        `
      );
      break;

    case "off":
      removeStyles("mt-navigationButtonsLabels");
      break;
  }
};

// Function to change Navigation Vertical Centering
const changeNavigationCenter = (navigationCenter) => {
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
      removeStyles("mt-navigationCenter");
      break;
  }
};

// Function to change Zen Mode
const changeZenMode = (zenMode) => {
  switch (zenMode) {
    case "on":
      addStyles(
        "mt-zenMode",
        `
        header[role="banner"], 
        [data-testid="sidebarColumn"],
        [data-testid="primaryColumn"] > div > div:not(:nth-of-type(1)):not(:nth-of-type(2))  {
          display: none !important;
        }

        div[data-testid="primaryColumn"] {
          border-style: hidden !important;
        }
        `
      );
      break;

    case "off":
      removeStyles("mt-zenMode");
      break;
  }
};

// Change Promoted Posts
const changePromotedPosts = (removePromotedPosts) => {
  switch (removePromotedPosts) {
    case "off":
      addStyles(
        "mt-removePromotedPosts",
        `
        [data-testid="placementTracking"] article {
          display: flex !important;
        }
        `
      );
      break;

    case "on":
      removeStyles("mt-removePromotedPosts");
      break;
  }
};

// Change Search Bar
const changeSearchBar = (transparentSearch) => {
  switch (transparentSearch) {
    case "on":
      addStyles(
        "mt-transparentSearch",
        `
        form[aria-label="Search Twitter"][role="search"] > div:nth-child(1) > div {
          background-color: transparent !important;
        }
        [data-testid="sidebarColumn"] [placeholder="Search Twitter"] {
          padding-left: 34px !important;
          margin-left: -24px !important;
        }
        `
      );
      break;

    case "off":
      removeStyles("mt-transparentSearch");
      break;
  }
};

// Change Reply Count
const changeReplyCount = (replyCount) => {
  switch (replyCount) {
    case "on":
      addStyles(
        "mt-replyCount",
        `
        article [data-testid="reply"] span { 
          display: none !important;
        }
        `
      );
      break;

    case "off":
      removeStyles("mt-replyCount");
      break;
  }
};

// Change Retweet Count
const changeRetweetCount = (retweetCount) => {
  switch (retweetCount) {
    case "on":
      addStyles(
        "mt-retweetCount",
        `
        article [href$="/retweets"],
        article [href$="/retweets/with_comments"],
        article [data-testid="retweet"] span,
        article [data-testid="unretweet"] span {
           display: none !important;
        }
        `
      );
      break;

    case "off":
      removeStyles("mt-retweetCount");
      break;
  }
};

// Change Like Count
const changeLikeCount = (likeCount) => {
  switch (likeCount) {
    case "on":
      addStyles(
        "mt-likeCount",
        `
        article [href$="/likes"][href*="/status/"],
        article [data-testid="like"] span,
        article [data-testid="unlike"] span {
           display: none !important
        }
        `
      );
      break;

    case "off":
      removeStyles("mt-likeCount");
      break;
  }
};

// Change Follow Count
const changeFollowCount = (followCount) => {
  switch (followCount) {
    case "on":
      addStyles(
        "mt-followCount",
        `
        [href$="/following"][dir="auto"][role="link"] > span:first-child,
        [href$="/followers"][dir="auto"][role="link"] > span:first-child {
          display: none !important;
        }
        `
      );
      break;

    case "off":
      removeStyles("mt-followCount");
      break;
  }
};

// Change All Vanity Counts
const changeVanityCount = (allVanity) => {
  changeReplyCount(allVanity);
  changeRetweetCount(allVanity);
  changeLikeCount(allVanity);
  changeFollowCount(allVanity);
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
  - 9. Center Navigation
  - 10. Zen Mode
  - 11. Remove Promoted Posts
  - 12. Transparent Search Bar
  - 13. Hide vanity counts
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
    navigationCenter,
    zenMode,
    removePromotedPosts,
    transparentSearch,
    replyCount,
    retweetCount,
    likeCount,
    followCount,
    allVanity,
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
  // 9. Navigation Center
  changeNavigationCenter(navigationCenter);
  // 9. Zen Mode
  changeZenMode(zenMode);
  // 10. Remove Promoted Posts
  changePromotedPosts(removePromotedPosts);
  // 11. Transparent Search
  changeSearchBar(transparentSearch);
  // 12. Reply Count
  changeReplyCount(replyCount);
  // 13. Retweet Count
  changeRetweetCount(retweetCount);
  // 14. Like Count
  changeLikeCount(likeCount);
  // 15. Follow Count
  changeFollowCount(followCount);
  // 16. All Vanity Count
  changeVanityCount(allVanity);
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

  // Reveal search filters
  revealSearchFilters();
  const pushState = history.pushState;
  history.pushState = () => {
    pushState.apply(history, revealSearchFilters);
    fireEvents("pushState", revealSearchFilters);
  };

  // Inject user preferences
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
      "navigationCenter",
      "zenMode",
      "removePromotedPosts",
      "transparentSearch",
      "replyCount",
      "retweetCount",
      "likeCount",
      "followCount",
      "allVanity",
    ],
    (data) => {
      injectAllChanges(data);
    }
  );
};

init();
