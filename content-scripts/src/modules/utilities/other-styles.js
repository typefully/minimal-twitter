import selectors from "../../selectors";
import addStyles, { removeStyles } from "./addStyles";

export const addSmallerSearchBarStyle = () => {
  const searchInput = document.querySelector(selectors.searchBoxInput);

  if (!searchInput) return;

  if (window.location.pathname.includes("/search") || window.location.pathname.includes("/explore")) return;

  if (document.activeElement === searchInput) return;

  const searchBarPlaceholderWidth = searchInput.getAttribute("placeholder").length;

  addStyles(
    "searchInputWidth",
    `${selectors.searchBoxInput} {
      width: ${searchBarPlaceholderWidth + 4}ch;
    }`
  );

  handleSidebarSearchWidthStyle();
};

const applyWidthStyle = () => {
  addStyles(
    "sidebarSearchWidth",
    `${selectors.searchBox} { width: 374px; }`
  );
};

const handleListboxClick = (e) => {
  const clickedListbox = e.target.closest('[role="listbox"]');
  if (clickedListbox) {
    applyWidthStyle();
  }
};

const handleOutsideClick = (e) => {
  if (!e.target.closest(selectors.searchBox)) {
    removeStyles("sidebarSearchWidth");
  }
};

// This runs on every dynamic features pass, so listeners must be named functions:
// re-adding the same function is a no-op, while inline closures piled up a new
// document listener on every DOM mutation batch.
const handleSidebarSearchWidthStyle = () => {
  const sidebarSearchForm = document.querySelector(selectors.searchBox);

  if (sidebarSearchForm) {
    // Check if listbox is currently visible (form has focus)
    const listBox = document.querySelector(selectors.searchListBox);
    if (listBox) {
      applyWidthStyle();
    }

    sidebarSearchForm.addEventListener('focusin', applyWidthStyle);
    sidebarSearchForm.addEventListener('click', handleListboxClick);
    document.addEventListener('click', handleOutsideClick);
  }
};
