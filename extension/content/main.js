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

// Function to change Navigation Button Labels on Hover
const changeNavigationButtonsLabelsHover = (navigationButtonsLabelsHover) => {
  switch (navigationButtonsLabelsHover) {
    case "off":
      addStyles(
        "mt-navigationButtonsLabelsHover",
        `
        nav[aria-label="Primary"] {
          width: fit-content !important;
        }
        nav[aria-label="Primary"] div[dir="auto"] {
          position: absolute !important;
        }
        nav[aria-label="Primary"] * div[dir="auto"]:not([aria-label]) > span {
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
      break;

    case "on":
      removeStyles("mt-navigationButtonsLabelsHover");
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

// Function to change Promoted Posts
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

/*-- 
  Not working in my tests —@ThomasWang 
--*/
// Function to change Latest Tweets
// const changeLatestTweets = (latestTweets) => {
//   if (latestTweets === "on") {
//     const showLatestTweets = () => {
//       const run = () => {
//         const timelineOptionButton = document.querySelector(
//           "div[aria-label='Timeline options"
//         );
//         const homeButton = document.querySelector("a[aria-label='Home']");
//         if (timelineOptionButton) {
//           timelineOptionButton.click();
//           document.querySelector("div[role='menuitem'][tabindex='0']").click();
//           document
//             .querySelector(
//               "div[data-testid='ScrollSnap-List'] > div:last-child > a"
//             )
//             .click();
//         }
//         if (homeButton) {
//           // Set onclick as well in case they nagivate to a non-home page when first loading the site
//           homeButton.onclick = () => {
//             setTimeout(showLatestTweets, 50);
//           };
//         }
//       };
//       setTimeout(run, 500);
//     };
//     if (document.readyState === "loading") {
//       console.log("loading...");
//       document.addEventListener("DOMContentLoaded", showLatestTweets);
//     } else {
//       console.log("running latest tweets...");
//       showLatestTweets();
//     }
//   }
// };

// Function to change Search Bar
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

// Function to change Reply Count
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

// Function to change Retweet Count
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

// Function to change Like Count
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

// Function to change Follow Count
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

// Function to change All Vanity Counts
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
  - 8. Navigation Buttons Labels on Hover
  - 9. Navigation Buttons Labels
  - 10. Center Navigation
  - 12. Zen Mode
  - 13. Remove Promoted Posts
  - 14. Always Show Latest Tweets
  - 15. Transparent Search Bar
  - 16. Hide All Vanity Counts
    - Hide Reply Count
    - Hide Retweet Count
    - Hide Like Count
    - Hide Following Count
    - Hide Follower Count
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
    navigationButtonsLabelsHover,
    navigationButtonsLabels,
    navigationCenter,
    zenMode,
    removePromotedPosts,
    // latestTweets,
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
  changeNavigationButtonsLabelsHover(navigationButtonsLabelsHover);
  // 9. Navigation Buttons Labels
  changeNavigationButtonsLabels(navigationButtonsLabels);
  // 10. Navigation Center
  changeNavigationCenter(navigationCenter);
  // 11. Zen Mode
  changeZenMode(zenMode);
  // 12. Remove Promoted Posts
  changePromotedPosts(removePromotedPosts);
  // 13. Always Show Latest Tweets
  // changeLatestTweets(latestTweets);
  // 13. Transparent Search
  changeSearchBar(transparentSearch);
  // 14. Reply Count
  changeReplyCount(replyCount);
  // 15. Retweet Count
  changeRetweetCount(retweetCount);
  // 16. Like Count
  changeLikeCount(likeCount);
  // 17. Follow Count
  changeFollowCount(followCount);
  // 18. All Vanity Count
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
      "navigationButtonsLabelsHover",
      "navigationButtonsLabels",
      "navigationCenter",
      "zenMode",
      "removePromotedPosts",
      // "latestTweets",
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
