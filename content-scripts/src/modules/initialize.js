import { checkUrlForFollow } from "./check";
import { addListsButton } from "./options/navigation";
import {
  addTypefullyPlug,
  addTypefullyReplyPlug,
  saveCurrentReplyToLink,
} from "./typefully";

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

function saveBgColorToRootVar() {
  const root = document.documentElement;

  const bodyBgColor = window.getComputedStyle(
    document.querySelector("body")
  ).backgroundColor;
  root.style.setProperty("--body-bg-color", bodyBgColor);

  const mainText =
    document.querySelector("h2 > span") || document.querySelector("div > span");
  if (mainText) {
    const mainTextColor = window.getComputedStyle(mainText).color;
    root.style.setProperty("--main-text-color", mainTextColor);
  }

  const secondaryText =
    document.querySelector("a > time") ||
    document.querySelector(
      "[data-testid='primaryColumn'] div[aria-haspopup='menu'] > div > div > svg"
    );
  if (secondaryText) {
    const secondaryTextColor = window.getComputedStyle(secondaryText).color;
    root.style.setProperty("--secondary-text-color", secondaryTextColor);
  }

  const link = document.querySelector("a");
  if (link) {
    const accentColor = window.getComputedStyle(link).color;
    root.style.setProperty("--accent-color", accentColor);
  }
}

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
      saveBgColorToRootVar();
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};
