import { checkHomeTimeline, checkUrlForFollow } from "./check";
import hideViewCount from "./options/hideViewCount";
import { addListsButton } from "./options/navigation";
import { addGrowButton } from "./options/typefully";
import { addWriterModeButton } from "./options/writer-mode";
import {
  addTypefullyPlug,
  addTypefullyReplyPlug,
  saveCurrentReplyToLink,
} from "./typefully";
import { colorsAreSet, extractColorsAsRootVars } from "./utilities/colors";
import removeElement from "./utilities/removeElement";
import throttle from "./utilities/throttle";

// Function to reveal Search Filters
const revealSearchFilters = () => {
  // Get grandparent of advanced search
  const advancedSearch = document.querySelector(
    `[data-testid="searchFiltersAdvancedSearch"]`
  );

  if (advancedSearch) {
    const searchFilters =
      advancedSearch.parentElement.parentElement.parentElement;
    if (!searchFilters.classList.contains("searchFilters")) {
      searchFilters.classList = searchFilters.classList + " searchFilters";
    }
    return;
  }
};

// Function to set search bar width to length of placeholder
const searchBarWidthReset = () => {
  const searchBar = document.querySelector(
    '[data-testid="SearchBox_Search_Input"]'
  );

  if (
    searchBar &&
    !window.location.pathname.includes("/search") &&
    !window.location.pathname.includes("/explore")
  ) {
    const searchBarPlaceholderWidth =
      searchBar.getAttribute("placeholder").length;

    searchBar.style.width = `${searchBarPlaceholderWidth + 1}ch`;
  }
};

// Function to add main stylesheet
export const addStylesheets = () => {
  const head = document.querySelector("head");
  const mainStylesheet = document.createElement("link");
  const typefullyStylesheet = document.createElement("link");
  const mainStylesheetGitHub = document.createElement("link");
  const typefullyStylesheetGitHub = document.createElement("link");

  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("css/main.css");
  head.appendChild(mainStylesheet);

  mainStylesheetGitHub.rel = "stylesheet";
  mainStylesheetGitHub.type = "text/css";
  mainStylesheetGitHub.href =
    "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5/css/main.css";
  head.appendChild(mainStylesheetGitHub);

  typefullyStylesheet.rel = "stylesheet";
  typefullyStylesheet.type = "text/css";
  typefullyStylesheet.href = chrome.runtime.getURL("css/typefully.css");
  head.appendChild(typefullyStylesheet);

  typefullyStylesheetGitHub.rel = "stylesheet";
  typefullyStylesheetGitHub.type = "text/css";
  typefullyStylesheetGitHub.href =
    "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5/css/typefully.css";
  head.appendChild(typefullyStylesheetGitHub);
};

// Function to start MutationObserver
export const observe = throttle(() => {
  const observer = new MutationObserver((mutationsList) => {
    if (mutationsList.length) {
      if (mutationIsNotRelevant(mutationsList)) return;

      if (!colorsAreSet()) {
        extractColorsAsRootVars(); // Extract colors first
      }

      let t;
      const runMutations = throttle(() => {
        clearTimeout(t);
        searchBarWidthReset();
        revealSearchFilters();
        addTypefullyPlug();
        saveCurrentReplyToLink();
        addTypefullyReplyPlug();
        checkUrlForFollow();
        checkHomeTimeline();
        addWriterModeButton();
        addListsButton();
        hideViewCount();

        t = setTimeout(() => {
          addGrowButton();
        });
      }, 500);

      runMutations();
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}, 1000);

const mutationIsNotRelevant = (mutationsList) => {
  const a = mutationsList[0]?.addedNodes[0]; // First added node
  const r = mutationsList[0]?.removedNodes[0]; // First removed node
  const t = mutationsList[0]?.target; // Target
  const el = a || r; // Element

  try {
    // Engagement counts
    if (
      (el?.nodeName === "SPAN" &&
        el?.firstChild?.nodeName === "SPAN" &&
        el?.firstChild?.firstChild?.nodeName === "SPAN") ||
      el?.parentNode?.parentNode?.getAttribute("data-testid") === "like"
    ) {
      return true;
    }

    // Images and videos
    if (
      el?.nodeName === "IMG" ||
      t?.nodeName === "IMG" ||
      el?.nodeName === "VIDEO" ||
      el?.firstChild?.nodeName === "VIDEO" ||
      el?.querySelector(":scope > img") ||
      el?.getAttribute("data-testid") === "tweetPhoto" ||
      el?.parentNode?.getAttribute("data-testid") === "tweetPhoto" ||
      t?.closest("[data-testid='videoPlayer']")
    ) {
      return true;
    }

    // Links previews (inside a data-testid="card.wrapper")
    if (el.closest("[data-testid='card.wrapper']")) {
      return true;
    }

    // Added or removed scripts
    if (el?.nodeName === "SCRIPT") return true;

    // Added or removed styles
    if (el?.nodeName === "STYLE") return true;

    // DM drawer
    if (
      el?.closest("[data-testid='DMDrawer']") ||
      t?.closest("[data-testid='DMDrawer']")
    )
      return true;

    // Trends drawer
    if (
      el?.closest("[data-testid='sidebarColumn']") ||
      t?.closest("[data-testid='sidebarColumn']")
    )
      return true;

    // Ignore text only nodes
    if (el?.nodeName === "#text") return true;

    // Ignore info button on tweets
    // it's a > div > div > div[data-testid="caret"]
    if (
      el?.nodeName === "DIV" &&
      el?.firstChild?.firstChild?.firstChild?.getAttribute("data-testid") ===
        "caret"
    ) {
      return true;
    }

    // SVG changes
    if (el?.nodeName === "path") return true;

    // Minimal Twitter injected elements
    if (el?.id?.startsWith("mt-") || el?.id?.startsWith("typefully-"))
      return true;
  } catch (e) {}

  return false;
};

// On resize, remove and re-add the sidebar buttons, because their original
// Twitter counterparts styles change programmatically based on window size,
// so we need to re-create them when the window size changes.
let t;
export const addResizeListener = () => {
  window.addEventListener(
    "resize",
    throttle(() => {
      clearTimeout(t);
      removeElement("mt-listsButtonNode");
      removeElement("mt-typefullyGrowButton");
      addListsButton();
      t = setTimeout(() => {
        addGrowButton();
      });
    }, 1000)
  );
};
