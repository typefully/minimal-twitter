// Utility function to inject CSS into page
const addStyles = (css) => {
  var head = document.querySelector("head");
  var style = document.createElement("style");
  style.textContent = `${css}`;
  head.appendChild(style);
};

// Function to change Feed Width
const changeFeedWidth = (feedWidth) => {
  switch (feedWidth) {
    case 600:
      addStyles(`
      @media only screen and (min-width: 988px) {
        [data-testid="primaryColumn"] {
          width: 600px !important;
          max-width: 600px !important;
        }
      }
      `);
      break;
    case 650:
      addStyles(`
      @media only screen and (min-width: 988px) {
        [data-testid="primaryColumn"] {
          width: 650px !important;
          max-width: 650px !important;
        }
      }
      `);
      break;
    case 700:
      addStyles(`
      @media only screen and (min-width: 988px) {
        [data-testid="primaryColumn"] {
          width: 700px !important;
          max-width: 700px !important;
        }
      }
      `);
      break;
    case 750:
      addStyles(`
      @media only screen and (min-width: 988px) {
        [data-testid="primaryColumn"] {
          width: 750px !important;
          max-width: 750px !important;
        }
      }
      `);
      break;
    case 800:
      addStyles(`
      @media only screen and (min-width: 988px) {
        [data-testid="primaryColumn"] {
          width: 800px !important;
          max-width: 800px !important;
        }
      }
      `);
      break;
  }
};

// Function to change Feed Borders
const changefeedBorders = (feedBorders) => {
  switch (feedBorders) {
    case "on":
      addStyles(`
      @media only screen and (min-width: 988px) {
        div[data-testid="primaryColumn"] {
          border-left-width: 1px !important;
          border-right-width: 1px !important;
        }
      }
      `);
      break;

    case "off":
      addStyles(`
      @media only screen and (min-width: 988px) {
        div[data-testid="primaryColumn"] {
          border-left-width: 0 !important;
          border-right-width: 0 !important;
        }
      }
      `);
      break;
  }
};

// Function to add or remove Explore Button
const changeExploreButton = (exploreButton) => {
  switch (exploreButton) {
    case "remove":
      addStyles(`
      [data-testid="AppTabBar_Explore_Link"] {
        display: none !important;
      }
      `);
      break;

    case "add":
      addStyles(`
      [data-testid="AppTabBar_Explore_Link"] {
        display: flex !important;
      }
      `);
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
  - 7. Top Articles Button
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
    notificationButton,
    messageButton,
    bookmarkButton,
    topArticlesButtons,
    navigationButtonsLabels,
    zenMode,
    removePromotedPosts,
    hideReplyCount,
    hideRetweetCount,
    hideLikeCount,
    hideFollowingCount,
    hideFollowerCount,
  } = data;

  // 1. Feed Width
  changeFeedWidth(feedWidth);

  // 2. Feed Borders
  changefeedBorders(feedBorders);

  // 3. Navigation Button
  // changeExploreButton(exploreButton);
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
  chrome.storage.sync.get(["feedWidth", "feedBorders"], (data) => {
    injectAllChanges(data);
  });
};

init();
