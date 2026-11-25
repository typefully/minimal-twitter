import selectors from "../../selectors";
import addStyles from "./addStyles";

export function updateLeftSidebarPositioning() {
  // changeNavigationButtonsLabels removes this style on these pages, so adding it back on every
  // pass made X's rewritten web app switch layouts back and forth
  const { pathname } = window.location;
  if (pathname.startsWith("/messages") || pathname.startsWith("/search")) return;

    addStyles(
      "navigation-position",
      `@media only screen and (min-width: 1000px) {
        ${selectors.leftSidebar} {
          position: fixed;
          left: 0;
        }
      }
      /* Add padding equal to navigation size when between 1000px-1265px */
      /* Only with the old navigation: X's rewritten web app has no header[role="banner"], and the padding would shift its layout */
      @media only screen and (min-width: 1000px) and (max-width: 1265px) {
        body:has(${selectors.leftSidebar}) {
          padding-left: 88px;
        }
      }`
    );
}
