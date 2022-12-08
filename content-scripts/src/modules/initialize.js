import { checkUrlForFollow } from "./check";
import { addWriterModeButton } from "./options/interface";
import { addGrowButton, addListsButton } from "./options/navigation";
import {
  addTypefullyPlug,
  addTypefullyReplyPlug,
  saveCurrentReplyToLink,
} from "./typefully";
import { extractColorsAsRootVars } from "./utilities/colors";
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

  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("content/main.css");
  head.appendChild(mainStylesheet);

  typefullyStylesheet.rel = "stylesheet";
  typefullyStylesheet.type = "text/css";
  typefullyStylesheet.href = chrome.runtime.getURL("content/typefully.css");
  head.appendChild(typefullyStylesheet);
};

// Function to start MutationObserver
export const observe = () => {
  const observer = new MutationObserver((mutationsList) => {
    if (mutationsList.length) {
      searchBarWidthReset();
      revealSearchFilters();
      addTypefullyPlug();
      saveCurrentReplyToLink();
      addTypefullyReplyPlug();
      checkUrlForFollow();
      addListsButton();
      addWriterModeButton();
      setTimeout(() => {
        addGrowButton();
      });
      extractColorsAsRootVars();
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};

// On resize, remove and re-add the sidebar buttons, because their original
// Twitter counterparts styles change programmatically based on window size,
// so we need to re-create them when the window size changes.
export const addResizeListener = () => {
  window.addEventListener(
    "resize",
    throttle(() => {
      removeElement("mt-listsButtonNode");
      removeElement("mt-typefullyGrowButton");
      addListsButton();
      setTimeout(() => {
        addGrowButton();
      });
    }, 1000)
  );
};
