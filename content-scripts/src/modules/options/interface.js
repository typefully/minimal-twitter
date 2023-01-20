import selectors from "../../selectors";
import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";
import { getStorage } from "../utilities/storage";

// Function to change the title notification count
let nt; // Title Notifications timeout
export const changeTitleNotifications = (tf) => {
  const run = async () => {
    let titleNotifications = tf;

    if (!tf) {
      const data = await getStorage(["titleNotifications"]);
      titleNotifications = data?.titleNotifications;
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

      clearTimeout(nt);
      nt = setTimeout(() => {
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

  if (target) observer.observe(target, config);
};

// Function to change to Inter Font
export const changeInterFont = (interFont) => {
  switch (interFont) {
    case "on":
      addStyles(
        "mt-interFont",
        `
        @font-face {
          font-family: 'Inter';
          src: url('${chrome.runtime.getURL(
            "fonts/inter-subset.woff2"
          )}') format('woff2');
        }

        * {
          font-family: Inter, TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
          display: none;
          visibility: hidden;
        }
        `
      );
      addStyles(
        "mt-trendsHomeTimeline-more",
        `
        @media only screen and (min-width: 1265px) {
          ${selectors.rightSidebar} section[aria-labelledby^="accessible-list-"] {
            top: 12px !important;
          }
          .mt-recentMedia-photoGrid {
            top: 12px !important;
          }
        }
        `
      );
      break;

    case "on":
      removeElement("mt-searchBar");
      addStyles(
        "mt-trendsHomeTimeline-more",
        `
        @media only screen and (min-width: 1265px) {
          ${selectors.rightSidebar} section[aria-labelledby^="accessible-list-"] {
            top: unset !important;
          }
          .mt-recentMedia-photoGrid {
            top: unset !important;
          }
        }
        `
      );
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
          background-color: transparent;
        }
        ${selectors.searchBoxInput} {
          transform: translateX(2ch);
          margin-left: -2.5ch;
        }
        `
      );
      break;

    case "off":
      removeElement("mt-transparentSearch");
      break;
  }
};
