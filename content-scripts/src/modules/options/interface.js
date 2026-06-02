import { KeyTitleNotifications } from "../../../../storage-keys";
import selectors from "../../selectors";
import addStyles, { removeStyles } from "../utilities/addStyles";
import { getStorage } from "../utilities/storage";

// Function to change title and favicon notification indicators
const titleNotificationRegex = /^(?:\(\d[\d,]*\+?\)\s*)+/;
const notificationFaviconRegex = /(^|\/)twitter-pip(?:\.[^./]+)*\.ico/;
let titleNotificationsObserver;
let titleNotificationsSetting;
let titleNotificationsTimeout;

const getFavicons = () => document.querySelectorAll('link[rel~="icon"]');

const stripTitleNotificationCount = () => {
  const title = document.title.replace(titleNotificationRegex, "");

  if (title !== document.title) {
    document.title = title;
  }
};

const updateFaviconNotificationState = (enabled) => {
  getFavicons().forEach((favicon) => {
    const href = favicon.getAttribute("href");
    if (!href) return;

    const nextHref = enabled ? href.replace("twitter.ico", "twitter-pip.2.ico") : href.replace(notificationFaviconRegex, "$1twitter.ico");
    if (nextHref !== href) favicon.setAttribute("href", nextHref);
  });
};

const applyTitleNotificationsPreference = () => {
  if (titleNotificationsSetting === "on") {
    updateFaviconNotificationState(true);
    return;
  }

  stripTitleNotificationCount();
  updateFaviconNotificationState(false);

  clearTimeout(titleNotificationsTimeout);
  titleNotificationsTimeout = setTimeout(() => {
    updateFaviconNotificationState(false);
  });
};

const observeTitleNotifications = () => {
  if (titleNotificationsObserver) return;

  titleNotificationsObserver = new MutationObserver(() => {
    applyTitleNotificationsPreference();
  });

  titleNotificationsObserver.observe(document.head || document.documentElement, {
    attributes: true,
    attributeFilter: ["href"],
    characterData: true,
    childList: true,
    subtree: true,
  });
};

export const changeTitleNotifications = async (tf) => {
  titleNotificationsSetting = tf ?? (await getStorage(KeyTitleNotifications));
  applyTitleNotificationsPreference();
  observeTitleNotifications();
};

// Function to change to Inter Font
export const changeInterFont = (interFont) => {
  switch (interFont) {
    case "on":
      addStyles(
        "interFont",
        `
        @font-face {
          font-family: 'Inter';
          src: url('${chrome.runtime.getURL("fonts/inter-subset.woff2")}') format('woff2');
        }

        div, span, input, textarea {
          font-family: Inter, TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        }
        `,
      );
      break;

    case "off":
      removeStyles("interFont");
      break;
  }
};

// Function to change Tweet Button
export const changeTweetButton = (tweetButton) => {
  switch (tweetButton) {
    case "off":
      addStyles(
        "tweetButton",
        `
        ${selectors.tweetButton} {
          visibility: hidden;
        }
        `,
      );
      break;

    case "on":
      removeStyles("tweetButton");
      break;
  }
};

export const changeHideSearchBar = (searchBar) => {
  switch (searchBar) {
    case "off":
      addStyles(
        "searchBar",
        `${selectors.searchBox} {
          display: none;
          visibility: hidden;
        }`,
      );
      addStyles(
        "trendsHomeTimeline-more",
        `@media only screen and (min-width: 1265px) {
          ${selectors.rightSidebar} section[aria-labelledby^="accessible-list-"] {
            top: 12px !important;
          }
          .mt-recentMedia-photoGrid {
            top: 12px !important;
          }
        }`,
      );
      break;

    case "on":
      removeStyles("searchBar");
      addStyles(
        "trendsHomeTimeline-more",
        `@media only screen and (min-width: 1265px) {
          ${selectors.rightSidebar} section[aria-labelledby^="accessible-list-"] {
            top: unset;
          }
          .mt-recentMedia-photoGrid {
            top: unset !important;
          }
        }`,
      );
      break;
  }
};

export const changeTransparentSearchBar = (transparentSearch) => {
  switch (transparentSearch) {
    case "on":
      addStyles(
        "transparentSearch",
        `
        ${selectors.searchBox} > div:nth-child(1) > div {
          background-color: transparent;
        }
        ${selectors.searchBoxInput} {
          transform: translateX(2ch);
          margin-left: -2.5ch;
        }
        `,
      );
      break;

    case "off":
      removeStyles("transparentSearch");
      break;
  }
};
