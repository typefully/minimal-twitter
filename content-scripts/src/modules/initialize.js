import selectors from "../selectors";
import { checkHomeTimeline, checkUrlForFollow } from "./check";
import hideViewCount from "./options/hideViewCount";
import {
  addCommunitiesButton,
  addListsButton,
  addTwitterBlueButton,
} from "./options/navigation";
import { changeRecentMedia } from "./options/timeline";
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
const revealSearchFilters = (advancedSearch) => {
  const searchFilters =
    advancedSearch.parentElement.parentElement.parentElement;
  if (!searchFilters.classList.contains("searchFilters")) {
    searchFilters.classList = searchFilters.classList + " searchFilters";
  }
  return;
};

// Function to set search bar width to length of placeholder
const searchBarWidthReset = (searchBar) => {
  if (
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

  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("css/main.css");

  typefullyStylesheet.rel = "stylesheet";
  typefullyStylesheet.type = "text/css";
  typefullyStylesheet.href = chrome.runtime.getURL("css/typefully.css");

  head.appendChild(mainStylesheet);
  head.appendChild(typefullyStylesheet);

  const applyExternalStylesheets = async () => {
    const mainStylesheet = await fetch(
      "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5/css/main.css"
    );
    const typefullyStylesheet = await fetch(
      "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5/css/typefully.css"
    );

    const mainText = (await mainStylesheet.text()).trim();
    const typefullyText = (await typefullyStylesheet.text()).trim();

    const styleSheetText = document.createTextNode(
      mainText.concat("\n\n").concat(typefullyText)
    );

    const externalStylsheet = document.createElement("style");
    externalStylsheet.id = "mt-external-stylesheet";
    externalStylsheet.appendChild(styleSheetText);
    head.appendChild(externalStylsheet);
  };

  applyExternalStylesheets();
};

// Function to start MutationObserver
let mt; // Mutations timeout
export const observe = () => {
  const observer = new MutationObserver((mutationsList) => {
    if (!mutationsList.length) return;
    if (mutationIsNotRelevant(mutationsList)) return;

    if (!colorsAreSet()) {
      extractColorsAsRootVars(); // Extract colors first
    }

    const runDocumentMutations = throttle(() => {
      addTypefullyPlug();
      saveCurrentReplyToLink();
      addTypefullyReplyPlug();
      checkUrlForFollow();
      checkHomeTimeline();
      hideViewCount();
      changeRecentMedia();

      const searchBar = document.querySelector(
        '[data-testid="SearchBox_Search_Input"]'
      );
      const advancedSearch = document.querySelector(
        `[data-testid="searchFiltersAdvancedSearch"]`
      );
      const scheduleButton = document.querySelector(
        'div[data-testid="scheduleOption"]'
      );
      const leftSideBar = document.querySelector(selectors.leftSidebar);

      if (searchBar) searchBarWidthReset(searchBar);
      if (scheduleButton) addWriterModeButton(scheduleButton);
      if (advancedSearch) revealSearchFilters(advancedSearch);
      if (leftSideBar) {
        chrome.storage.sync.get(
          [
            "listsButton",
            "communitiesButton",
            "twitterBlueButton",
            "typefullyGrowTab",
          ],
          (result) => {
            const {
              listsButton,
              communitiesButton,
              twitterBlueButton,
              typefullyGrowTab,
            } = result;

            if (listsButton) addListsButton();
            if (communitiesButton) addCommunitiesButton();
            if (twitterBlueButton) addTwitterBlueButton();
            if (typefullyGrowTab) {
              clearTimeout(mt);
              mt = setTimeout(() => {
                addGrowButton();
              });
            }
          }
        );
      }
    }, 500);

    runDocumentMutations();
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};

const mutationIsNotRelevant = (mutationsList) => {
  const a = mutationsList[0]?.addedNodes[0]; // First added node
  const r = mutationsList[0]?.removedNodes[0]; // First removed node
  const t = mutationsList[0]?.target; // Target
  const el = a || r; // Element

  try {
    // Minimal Twitter injected elements
    if (
      el?.id?.startsWith("mt-") ||
      el?.id?.startsWith("typefully-") ||
      t?.className?.startsWith("mt-") // For example .mt-tooltip ends up here
    )
      return true;

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

    return false;
  } catch (e) {}

  return false;
};

// On resize, remove and re-add the sidebar buttons, because their original
// Twitter counterparts styles change programmatically based on window size,
// so we need to re-create them when the window size changes.
let gt; // Grow Tab timeout
export const addResizeListener = () => {
  window.addEventListener(
    "resize",
    throttle(() => {
      removeElement("mt-listsButtonNode");
      removeElement("mt-communitiesButton");
      removeElement("mt-typefullyGrowButton");

      chrome.storage.sync.get(
        [
          "listsButton",
          "communitiesButton",
          "twitterBlueButton",
          "typefullyGrowTab",
        ],
        (result) => {
          const {
            listsButton,
            communitiesButton,
            twitterBlueButton,
            typefullyGrowTab,
          } = result;

          if (listsButton) addListsButton();
          if (communitiesButton) addCommunitiesButton();
          if (twitterBlueButton) addTwitterBlueButton();
          if (typefullyGrowTab) {
            clearTimeout(gt);
            gt = setTimeout(() => {
              addGrowButton();
            });
          }
        }
      );
    }, 1000)
  );
};
