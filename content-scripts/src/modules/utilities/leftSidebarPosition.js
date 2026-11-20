import selectors from "../../selectors";
import addStyles, { stylesExist } from "./addStyles";

export function updateLeftSidebarPositioning() {
    if (!stylesExist("layout")) {
      addStyles(
        "layout",
        `@media only screen and (min-width: 1000px) {
          ${selectors.pageWrapper} {
            max-width: none !important;
          }
          div:has(> div > ${selectors.mainColumn}) {
            justify-content: center;
            overflow-x: clip;
          }
          ${selectors.tweetButton} {
            position: fixed;
            right: 16px;
            bottom: 24px;
            width: auto;
            z-index: 3;
          }
        }
        @media only screen and (min-width: 1100px) {
          ${selectors.searchBox} {
            visibility: visible;
            position: fixed;
            top: 12px;
            right: 16px;
            width: auto;
            z-index: 3;
          }
          ${selectors.searchBox}:focus-within {
            width: 374px;
            backdrop-filter: blur(12px);
          }
        }`
      );
    }

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
