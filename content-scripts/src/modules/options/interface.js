import selectors from "../../selectors";
import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";

// Function to change the title notification count
export const changeTitleNotifications = (tf) => {
  const run = () => {
    let titleNotifications = tf;

    if (!tf) {
      chrome.storage.sync.get(["titleNotifications"], (result) => {
        titleNotifications = result.titleNotifications;
      });
    }

    const favicon = document.querySelector('link[rel="shortcut icon"]');

    if (titleNotifications === "on") {
      favicon.setAttribute(
        "href",
        favicon.href.replace("twitter.ico", "twitter-pip.2.ico")
      );
    } else {
      if (document.title.charAt(0) === "(") {
        document.title = document.title.split(" ").slice(1).join(" ");
      }

      if (document.title.charAt(0) === "(") {
        document.title = document.title.split(" ").slice(1).join(" ");
      }

      setTimeout(() => {
        favicon.setAttribute("href", favicon.href.replace("-pip.2", ""));
      });
    }
  };

  run();

  const observer = new MutationObserver(() => {
    run();
  });
  const config = { subtree: true, characterData: true, childList: true };
  const target = document.querySelector("title");

  observer.observe(target, config);
};

// Function to change to Inter Font
export const changeInterFont = (interFont) => {
  switch (interFont) {
    case "on":
      addStyles(
        "mt-interFont",
        `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400..800&display=swap');

        * {
          font-family: Inter, TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        }
        `
      );
      break;

    case "off":
      removeElement("mt-interFont");
      break;
  }
};

// Function to change Tweet Button
export const changeTweetButton = (tweetButton) => {
  switch (tweetButton) {
    case "off":
      addStyles(
        "mt-tweetButton",
        `
        [data-testid="SideNav_NewTweet_Button"] {
          visibility: hidden;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-tweetButton");
      break;
  }
};

// Function to change Search Bar 1
export const changeSearchBar1 = (searchBar) => {
  switch (searchBar) {
    case "off":
      addStyles(
        "mt-searchBar",
        `
        ${selectors.searchBox} {
          display: none !important;
          visibility: hidden !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-searchBar");
      break;
  }
};

// Function to change Search Bar 2
export const changeSearchBar2 = (transparentSearch) => {
  switch (transparentSearch) {
    case "on":
      addStyles(
        "mt-transparentSearch",
        `
        ${selectors.searchBox} > div:nth-child(1) > div {
          background-color: transparent !important;
        }
        ${selectors.searchBoxInput} {
          transform: translateX(2ch);
          margin-left: -2.5ch !important;
        }
        `
      );
      break;

    case "off":
      removeElement("mt-transparentSearch");
      break;
  }
};
