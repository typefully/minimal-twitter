import selectors from "../../selectors";
import addStyles, { removeStyles, stylesExist } from "./addStyles";

export default async function hideRightSidebar() {
  const isSearchPage = window.location.pathname === "/search";

  if (isSearchPage) {
    removeStyles("hide-sidebar");
    if (stylesExist("search-sidebar")) return;

    addStyles(
      "search-sidebar",
      `${selectors.rightSidebar} section:not(:has(a[href^="/search-advanced"])) {
        display: none;
      }`
    );
  } else {
    removeStyles("search-sidebar");
    if (stylesExist("hide-sidebar")) return;

    addStyles(
      "hide-sidebar",
      `${selectors.rightSidebar} {
        position: fixed;
        visibility: hidden;
        width: 0;
        margin: 0;
        padding: 0;
        z-index: 1;
      }
      @media only screen and (min-width: 1000px) {
        div:has(> ${selectors.rightSidebar}) {
          grid-template-columns: var(--x-main-column-width) !important;
          justify-content: center;
        }
      }`
    );
  }
}
