import selectors from "../selectors";
import { removeTypefullyPlugFromWriterMode } from "./options/writer-mode";
import addStyles from "./utilities/addStyles";
import removeElement from "./utilities/removeElement";

// Function to check url for /following or /followers
export const checkUrlForFollow = () => {
  if (
    window.location.pathname.includes("/followers") ||
    window.location.pathname.includes("/following") ||
    window.location.pathname.includes("/i/") ||
    window.location.pathname.includes("/search") ||
    window.location.pathname.includes("/explore")
  ) {
    if (!document.getElementById("mt-followOverride")) {
      addStyles(
        "mt-followOverride",
        `
        ${selectors.mainColumn} a[href*="/i/connect_people?user_id="],
        ${selectors.mainColumn} div[data-testid="UserCell"] {
          display: block !important;
        }
        `
      );
    }
  } else {
    if (document.getElementById("mt-followOverride")) {
      removeElement("mt-followOverride");
    }
  }
};

// Check Home Timeline and add Writer Mode if needed
export const checkHomeTimeline = () => {
  if (
    window.location.pathname.includes("/home") ||
    window.location.pathname.includes("compose/tweet") ||
    window.location.pathname === "/"
  ) {
    chrome.storage.sync.get("writerMode", (data) => {
      const { writerMode } = data;

      switch (writerMode) {
        case "on":
          if (document.getElementById("mt-writerMode")) return;
          addStyles(
            "mt-writerMode",
            `
            body {
              padding-left: 0 !important;
            }
            ${selectors.mainWrapper} > div {
              width: 100% !important;
              max-width: 100% !important;
            }
            ${selectors.leftSidebar}, 
            ${selectors.rightSidebar},
            ${selectors.mainColumn} > div > div:not(:nth-of-type(1)):not(:nth-of-type(2)):not(:nth-of-type(3)) {
              display: none !important;
            }
            ${selectors.topHeader} > div > div:nth-of-type(1) {
              visibility: hidden !important;
            }
            ${selectors.mainColumn} {
              border-style: hidden !important;
              padding-top: 3vh !important;
              margin: 0 auto;
            }
            ${selectors.modalWrapper} {
              width: 100vw !important;
              max-width: 100vw !important;
              top: 0 !important;
              border-radius: 0 !important;
            }
            ${selectors.modalBackground} {
              background-color: var(--body-bg-color) !important;
            }
            ${selectors.modalUi} {
              border-radius: 0 !important;
            }
            ${selectors.modalWrapper} > div > div > div {
              padding-bottom: 10vh !important;
            }
            `
          );
          break;

        case "off":
          removeElement("mt-writerMode");
          removeTypefullyPlugFromWriterMode();
          break;
      }
    });
  } else {
    removeElement("mt-writerMode");
    removeTypefullyPlugFromWriterMode();
  }
};
