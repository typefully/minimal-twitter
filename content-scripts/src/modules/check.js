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
        div[data-testid="primaryColumn"] a[href*="/i/connect_people?user_id="],
        div[data-testid="primaryColumn"] div[data-testid="UserCell"] {
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
    window.location.pathname === "/"
  ) {
    chrome.storage.sync.get("writerMode", (data) => {
      const { writerMode } = data;

      switch (writerMode) {
        case "on":
          addStyles(
            "mt-writerMode",
            `
            body {
              padding-left: 0 !important;
            }
            main[role="main"] > div {
              width: 100% !important;
              max-width: 100% !important;
            }
            header[role="banner"], 
            [data-testid="sidebarColumn"],
            [data-testid="primaryColumn"] > div > div:not(:nth-of-type(1)):not(:nth-of-type(2)):not(:nth-of-type(3)) {
              display: none !important;
            }
            [data-testid="primaryColumn"] > div > div:nth-of-type(1) {
              visibility: hidden !important;
            }
            div[data-testid="primaryColumn"] {
              border-style: hidden !important;
              padding-top: 3vh !important;
              margin: 0 auto;
            }
            div[aria-labelledby="modal-header"][role="dialog"] {
              width: 100vw !important;
              max-width: 100vw !important;
              top: 0 !important;
              border-radius: 0 !important;
            }
            div[role="group"] > div:empty {
              background-color: var(--body-bg-color) !important;
            }
            div[aria-labelledby="modal-header"][role="dialog"] > div {
              border-radius: 0 !important;
            }
            div[aria-labelledby="modal-header"][role="dialog"] > div > div > div {
              padding-bottom: 10vh !important;
            }
            `
          );
          setTimeout(() => {
            addTypefullyPlugToWriterMode();
          }, 1000);
          break;

        case "off":
          removeElement("mt-writerMode");
          removeTypefullyPlugFromWriterMode();
          break;
      }
    });
  }
};
