import selectors from "../../selectors";
import addStyles, { removeStyles } from "./addStyles";

// This extension makes the left sidebar position fixed,
// but in the DMs /messages page we want to revert to the default position
// to avoid having the sidebar overlap the DMs interface
export function updateLeftSidebarPositioning() {
  const isMessagesPage = window.location.pathname.startsWith("/messages");

  if (isMessagesPage) {
    removeStyles("navigation-position");
  } else {
    addStyles(
      "navigation-position",
      `@media only screen and (min-width: 1000px) {
        ${selectors.leftSidebar} {
          position: fixed;
          left: 0;
        }
      }
      /* Add padding equal to navigation size when between 1000px-1265px */
      @media only screen and (min-width: 1000px) and (max-width: 1265px) {
        body {
          padding-left: 88px;
        }
      }`
    );
  }
}
