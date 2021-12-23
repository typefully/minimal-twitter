function addStyles(css) {
  var head = document.querySelector("head");
  var style = document.createElement("style");
  style.textContent = `${css}`;
  head.appendChild(style);
}

function showLatestTweets() {
  const run = () => {
    const timelineOptionButton = document.querySelector("div[aria-label='Timeline options");
    const homeButton = document.querySelector("a[aria-label='Home']");

    if (timelineOptionButton) {
      timelineOptionButton.click();
      document.querySelector("div[role='menuitem'][tabindex='0']").click();
      document.querySelector("div[data-testid='ScrollSnap-List'] > div:last-child > a").click();
    }

    if (homeButton) {
      // Set onclick as well in case they nagivate to a non-home page when first loading the site
      homeButton.onclick = () => {
        setTimeout(showLatestTweets, 50);
      };
    }
  };

  setTimeout(run, 500);
}

chrome.storage.sync.get(
  {
    feedWidth: "700",
    showLatest: false,
    centerNavigation: false,
    noTweetButton: false,
    feedBorders: false,
    noBorders: false,
    noLikes: false,
    noRetweets: false,
    noComment: false,
    noNavbarText: false,
    noExploreButton: false,
    noNotificationsButton: false,
    noBookmarksButton: false,
    noListsButton: false,
    noMessagesButton: false
  },
  function (items) {
    if (items.feedWidth === "600") {
      addStyles(`
      div[data-testid="primaryColumn"],
      div[data-testid="primaryColumn"] > div > div,
      div[data-testid="primaryColumn"] > div > div > div:nth-child(2),
      div[data-testid="primaryColumn"] > div > div > div:nth-child(3),
      div[data-testid="primaryColumn"] > div > div > div:nth-child(4),
      div[data-testid="primaryColumn"] > div > div > div:nth-child(2) > div > div {
        max-width: 600px !important;
      }
      `);
    } else if (items.feedWidth === "800") {
      addStyles(`
      div[data-testid="primaryColumn"],
      div[data-testid="primaryColumn"] > div > div,
      div[data-testid="primaryColumn"] > div > div > div:nth-child(2),
      div[data-testid="primaryColumn"] > div > div > div:nth-child(3),
      div[data-testid="primaryColumn"] > div > div > div:nth-child(4),
      div[data-testid="primaryColumn"] > div > div > div:nth-child(2) > div > div {
        max-width: 800px !important;
      }
      `);
    } else {
      addStyles(`
      div[data-testid="primaryColumn"],
      div[data-testid="primaryColumn"] > div > div,
      div[data-testid="primaryColumn"] > div > div > div:nth-child(2),
      div[data-testid="primaryColumn"] > div > div > div:nth-child(3),
      div[data-testid="primaryColumn"] > div > div > div:nth-child(4),
      div[data-testid="primaryColumn"] > div > div > div:nth-child(2) > div > div {
        max-width: 700px !important;
      }
      `);
    }

    if (items.showLatest === true) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", showLatestTweets);
      } else {
        showLatestTweets();
      }
    }

    if (items.centerNavigation === true) {
      addStyles(`
      header[role="banner"] > div > div > div {
        justify-content: center !important;
        padding-top: 0;
      }
      `);
    }

    if (items.noTweetButton === true) {
      addStyles(`
      a[aria-label="Tweet"][role="link"] {
        display: none !important;
      }
      `);
    }

    if (items.feedBorders === true) {
      addStyles(`
      div[data-testid="primaryColumn"] {
        border-left-width: 1px !important;
        border-right-width: 1px !important;
      }
      `);
    }

    if (items.noBorders === true) {
      addStyles(`
      div[aria-label="Timeline: Your Home Timeline"] > div > div > div,
      div[aria-label="Timeline: Your Home Timeline"] > div > div > div > div {
        border-bottom-color: transparent;
      }

      div[aria-label="Timeline: Explore"] > div > div > div,
      div[aria-label="Timeline: Explore"] > div > div > div > div {
        border-bottom-color: transparent;
      }
      `);
    }

    if (items.noLikes === true) {
      addStyles(`div[data-testid="like"] > div > div:nth-child(2) {
        visibility: hidden !important;
      }`);
    }

    if (items.noRetweets === true) {
      addStyles(`div[data-testid="retweet"] > div > div:nth-child(2) {
        visibility: hidden !important;
      }`);
    }

    if (items.noComment === true) {
      addStyles(`div[data-testid="reply"] > div > div:nth-child(2) {
        visibility: hidden !important;
      }`);
    }

    if (items.noNavbarText === true) {
      addStyles(`nav[aria-label="Primary"] > a {
        width: auto;
      }`);

      addStyles(`nav[aria-label="Primary"] > * > div > div:last-child {
        display: none !important;
      }`);
    }

    if (items.noExploreButton === true) {
      addStyles(`a[data-testid="AppTabBar_Explore_Link"] {
        display: none !important;
      }`);
    }

    if (items.noNotificationsButton === true) {
      addStyles(`a[data-testid="AppTabBar_Notifications_Link"] {
        display: none !important;
      }`);
    }

    if (items.noMessagesButton === true) {
      addStyles(`a[data-testid="AppTabBar_DirectMessage_Link"] {
        display: none !important;
      }`);
    }

    if (items.noBookmarksButton === true) {
      addStyles(`header > div > div > div > div > div:nth-child(2) > nav > a:nth-child(5) {
        display: none !important;
      }`);
    }

    if (items.noListsButton === true) {
      addStyles(`header > div > div > div > div > div:nth-child(2) > nav > a:nth-child(6) {
        display: none !important;
      }`);
    }
  }
);
