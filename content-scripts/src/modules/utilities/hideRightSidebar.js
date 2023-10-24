import selectors from "../../selectors";
import addStyles, { removeStyles, stylesExist } from "./addStyles";

export default async function hideRightSidebar() {
  const isSearchPage = window.location.pathname === "/search";

  if (isSearchPage) {
    removeStyles("hide-sidebar");
    removeOtherSections();
    setTimeout(() => {
      removeOtherSections();
    }, 500); // Sometimes the trends appear with a delay
  } else {
    if (stylesExist("hide-sidebar")) return;

    addStyles(
      "hide-sidebar",
      `${selectors.rightSidebar} {
        visibility: hidden;
        width: 0;
        margin: 0;
        padding: 0;
        z-index: 1;
      }`
    );
  }
}

function removeOtherSections() {
  const sidebar = document.querySelector(selectors.rightSidebar);
  if (!sidebar) return;
  sidebar.querySelector(`aside[role="complementary"]`)?.parentElement?.remove();
  sidebar.querySelector(`section[role="region"]`)?.parentElement?.parentElement?.remove();
}
