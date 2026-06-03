import { KeyTitleNotifications } from "../../../../storage-keys";
import selectors from "../../selectors";
import addStyles, { removeStyles } from "../utilities/addStyles";
import { getStorage } from "../utilities/storage";

// Function to change title and favicon notification indicators
const titleNotificationRegex = /^(?:\(\d[\d,]*\+?\)\s*)+/;
const notificationFaviconRegex = /(^|\/)twitter-pip(?:\.[^./?#]+)*\.ico(?:[?#].*)?$/;
const codexFaviconBadgeMarker = "data-codex-favicon-badge";
const fallbackXFavicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='black'/%3E%3Cpath fill='white' d='M18.7 14.1 28.1 3h-2.2l-8.1 9.6L11.3 3H3.8l9.9 14.4L3.8 29h2.2l8.7-10.2 6.9 10.2h7.5L18.7 14.1Zm-3.1 3.6-1-1.4L6.7 4.7h3.2l6.4 9.4 1 1.4 8.3 12.1h-3.2l-6.8-9.9Z'/%3E%3C/svg%3E";
let titleNotificationsObserver;
let titleNotificationsSetting;
let titleNotificationsTimeout;
let cleanFaviconHref;

const getFavicons = () => document.querySelectorAll('link[rel~="icon"]');

const isNotificationFavicon = (href) => notificationFaviconRegex.test(href);

const isCodexFaviconBadge = (href) => href.includes(codexFaviconBadgeMarker);

const rememberCleanFavicon = () => {
  getFavicons().forEach((favicon) => {
    const href = favicon.getAttribute("href");

    if (!href || isNotificationFavicon(href) || isCodexFaviconBadge(href)) return;

    cleanFaviconHref = href;
  });
};

const stripTitleNotificationCount = () => {
  const title = document.title.replace(titleNotificationRegex, "");

  if (title !== document.title) {
    document.title = title;
  }
};

const updateFaviconNotificationState = (enabled) => {
  rememberCleanFavicon();

  if (enabled) return;

  getFavicons().forEach((favicon) => {
    const href = favicon.getAttribute("href");
    if (!href || !isNotificationFavicon(href)) return;

    favicon.setAttribute("href", cleanFaviconHref || fallbackXFavicon);
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
