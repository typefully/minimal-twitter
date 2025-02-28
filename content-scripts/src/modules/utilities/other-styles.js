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

const handleSidebarSearchWidthStyle = () => {
  const sidebarSearchForm = document.querySelector(selectors.searchBox);

  if (sidebarSearchForm) {
    const applyWidthStyle = () => {
      addStyles(
        "sidebarSearchWidth",
        `${selectors.searchBox} { width: 374px; }`
      );
    };

    // Check if listbox is currently visible (form has focus)
    const listBox = document.querySelector(selectors.searchListBox);
    if (listBox) {
      applyWidthStyle();
    }

    sidebarSearchForm.addEventListener('focusin', applyWidthStyle);
    
    sidebarSearchForm.addEventListener('click', (e) => {
      const clickedListbox = e.target.closest('[role="listbox"]');
      if (clickedListbox) {
        applyWidthStyle();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest(selectors.searchBox)) {
        removeStyles("sidebarSearchWidth");
      }
    });
  }
};
