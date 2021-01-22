function addStyles(css) {
  var head = document.querySelector("head");
  var style = document.createElement("style");
  style.textContent = `${css}`;
  head.appendChild(style);
}

function showLatestTweets() {
  const run = () => {
    const button = document.querySelector("div[aria-label='Top Tweets on']");
    const home = document.querySelector("a[aria-label='Home']");

    if (button) {
      button.click();
      document.querySelector("div[role='menuitem'][tabindex='0']").click();
    }

    if (home) {
      // Set onclick as well in case they nagivate to a non-home page when first loading the site
      home.onclick = () => {
        setTimeout(showLatestTweets, 50);
      };
    }
  };

  setTimeout(run, 500);
}

chrome.storage.sync.get(
  {
    feedWidth: "600",
    topNavigation: false,
    showLatest: false,
    noTweetButton: false,
    showMessageDrawer: false,
    feedBorders: false,
    noBorders: false,
    noLikes: false,
    noRetweets: false,
    noExploreButton: false,
    noNotificationsButton: false,
    noBookmarksButton: false,
    noListsButton: false,
  },
  function (items) {
    if (items.feedWidth === "700") {
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
    }

    if (items.topNavigation === true) {
      addStyles(`
      header[role="banner"] > div > div > div {
        justify-content: space-between !important;
        padding-top: 6px;
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

    if (items.noTweetButton === true) {
      addStyles(`
      a[aria-label="Tweet"][role="button"] {
        display: none !important;
      }
      `);
    }

    if (items.showMessageDrawer === true) {
      addStyles(`
      div[data-testid="DMDrawer"] {
        visibility: hidden !important;
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
