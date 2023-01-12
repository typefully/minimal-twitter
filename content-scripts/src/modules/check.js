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
let zt1; // Zen Writer Mode timeout 1
let zt2; // Zen Writer Mode timeout 2
export const checkHomeTimeline = () => {
  if (
    window.location.pathname.includes("/home") ||
    window.location.pathname.includes("compose/tweet") ||
    window.location.pathname === "/"
  ) {
    chrome.storage.sync.get("writerMode", (result) => {
      const { writerMode } = result;

      if (writerMode !== "on") {
        chrome.storage.sync.get("trendsHomeTimeline", (result) => {
          const { trendsHomeTimeline } = result;

          switch (trendsHomeTimeline) {
            case "off":
              removeElement("mt-trendsHomeTimeline");
              break;

            case "on":
              addStyles(
                "mt-trendsHomeTimeline",
                `
                @keyframes render {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                    transform: none;
                  }
                }
                
                @media only screen and (min-width: 1265px) {
                  ${selectors.rightSidebar} section[aria-labelledby^="accessible-list-"] {
                    visibility: visible;
                    position: fixed;
                    right: 16px;
                    border-radius: 16px;
                    border-color: var(--border-color);
                    border-width: 1px;
                    background-color: var(--body-bg-color);
                    opacity: 0;
                    will-change: opacity;
                    animation-name: render;
                    animation-duration: 0s;
                    animation-fill-mode: forwards;
                    animation-delay: 500ms;
                    width: 300px;
                    margin-top: 4px;
                  }
    
                  [data-testid="primaryColumn"] {
                    transform: translateX(-64px);
                  }
                }
                `
              );
              break;
          }
        });
      }

      switch (writerMode) {
        case "on":
          if (document.getElementById("mt-writerMode")) return;

          document.body.classList.add("mt-writerMode-on");

          clearTimeout(zt1);
          zt1 = setTimeout(() => {
            document.title = "Zen Writer Mode / Twitter";
          }, 500);

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
          document.body.classList.remove("mt-writerMode-on");

          clearTimeout(zt2);
          zt2 = setTimeout(() => {
            document.title = "Home / Twitter";
          }, 500);

          removeElement("mt-writerMode");
          removeTypefullyPlugFromWriterMode();

          break;
      }
    });
  } else {
    removeElement("mt-trendsHomeTimeline");
    removeElement("mt-writerMode");
    removeTypefullyPlugFromWriterMode();
  }
};
