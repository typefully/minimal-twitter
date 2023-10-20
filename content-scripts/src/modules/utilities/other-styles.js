import selectors from "../../selectors";
import addStyles from "./addStyles";

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
};
