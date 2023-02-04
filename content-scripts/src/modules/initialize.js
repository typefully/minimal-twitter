import { checkUrlForFollow } from "./check";
import hideViewCount from "./options/hideViewCount";
import {
  addCirclesButton,
  addCommunitiesButton,
  addListsButton,
  addTopicsButton,
  addTwitterBlueButton,
} from "./options/navigation";
import {
  changeFollowingTimeline,
  changeRecentMedia,
  changeTrendsHomeTimeline,
} from "./options/timeline";
import { addGrowButton } from "./options/typefully";
import { addWriterModeButton, changeWriterMode } from "./options/writer-mode";
import {
  addTypefullyPlug,
  addTypefullyReplyPlug,
  saveCurrentReplyToLink,
} from "./typefully";
import { colorsAreSet, extractColorsAsRootVars } from "./utilities/colors";
import removeElement from "./utilities/removeElement";
import { getStorage } from "./utilities/storage";
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
export const addStylesheets = async () => {
  const head = document.querySelector("head");
  const mainStylesheet = document.createElement("link");
  const typefullyStylesheet = document.createElement("link");
  const externalStylsheet = document.createElement("style");

  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("css/main.css");

  typefullyStylesheet.rel = "stylesheet";
  typefullyStylesheet.type = "text/css";
  typefullyStylesheet.href = chrome.runtime.getURL("css/typefully.css");

  externalStylsheet.id = "mt-external-stylesheet";

  head.appendChild(mainStylesheet);
  head.appendChild(typefullyStylesheet);
  head.insertBefore(externalStylsheet, typefullyStylesheet.nextSibling);

  const mainStylesheetFromCDN = await fetch(
    `https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5/css/main.css?t=${Date.now()}`
  );
  const typefullyStylesheetFromCDN = await fetch(
    `https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5/css/typefully.css?t=${Date.now()}`
  );
  const mainText = (await mainStylesheetFromCDN.text()).trim();
  const typefullyText = (await typefullyStylesheetFromCDN.text()).trim();
  const styleSheetText = document.createTextNode(
    mainText.concat("\n\n").concat(typefullyText)
  );

  externalStylsheet.appendChild(styleSheetText);
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

    const runDocumentMutations = throttle(async () => {
      const data = await getStorage([
        "listsButton",
        "communitiesButton",
        "topicsButton",
        "circlesButton",
        "twitterBlueButton",
        "typefullyGrowTab",
        "followingTimeline",
        "trendsHomeTimeline",
        "writerMode",
      ]);

      if (data?.writerMode === "on") {
        changeWriterMode(data?.writerMode);
      } else {
        changeTrendsHomeTimeline(data?.trendsHomeTimeline, data?.writerMode);
        changeFollowingTimeline(data?.followingTimeline);
      }

      if (data?.listsButton === "on") addListsButton();
      if (data?.communitiesButton === "on") addCommunitiesButton();
      if (data?.topicsButton === "on") addTopicsButton();
      if (data?.circlesButton === "on") addCirclesButton();
      if (data?.twitterBlueButton === "on") addTwitterBlueButton();
      if (data?.typefullyGrowTab === "on") {
        clearTimeout(mt);
        mt = setTimeout(() => {
          addGrowButton();
        });
      }

      addTypefullyPlug();
      saveCurrentReplyToLink();
      addTypefullyReplyPlug();
      checkUrlForFollow();
      hideViewCount();
      changeRecentMedia();

      const searchBar = document.querySelector(
        '[data-testid="SearchBox_Search_Input"]'
      );
      const advancedSearch = document.querySelector(
        `[data-testid="searchFiltersAdvancedSearch"]`
      );

      if (searchBar) searchBarWidthReset(searchBar);
      if (advancedSearch) revealSearchFilters(advancedSearch);

      const scheduleButton = document.querySelector(
        'div[data-testid="scheduleOption"]'
      );
      if (scheduleButton) addWriterModeButton(scheduleButton);

      return;
    }, 1000);

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
    throttle(async () => {
      removeElement("mt-listsButtonNode");
      removeElement("mt-communitiesButton");
      removeElement("mt-topicsButton");
      removeElement("mt-circlesButton");
      removeElement("mt-twitterBlueButton");
      removeElement("mt-typefullyGrowButton");

      const data = await getStorage([
        "listsButton",
        "communitiesButton",
        "topicsButton",
        "circlesButton",
        "twitterBlueButton",
        "typefullyGrowTab",
      ]);

      if (data?.listsButton === "on") addListsButton();
      if (data?.communitiesButton === "on") addCommunitiesButton();
      if (data?.topicsButton === "on") addTopicsButton();
      if (data?.circlesButton === "on") addCirclesButton();
      if (data?.twitterBlueButton === "on") addTwitterBlueButton();
      if (data?.typefullyGrowTab === "on") {
        clearTimeout(gt);
        gt = setTimeout(() => {
          addGrowButton();
        });
      }
    }, 1000)
  );
};
