import { KeyWriterMode } from "../../../../storage-keys";
import selectors from "../../selectors";
import svgAssets from "../svgAssets";
import { createTypefullyLinkElement, createTypefullyLogo, getCurrentTextAndSendToTypefully } from "../typefullyPlugs";
import addStyles, { removeStyles, stylesExist } from "../utilities/addStyles";
import addTooltip, { hideAllTooltips } from "../utilities/addTooltip";
import addTypefullyBox from "../utilities/addTypefullyBox";
import { createTypefullyUrl } from "../utilities/createTypefullyUrl";
import { getStorage, setStorage } from "../utilities/storage";

const escKeyListener = async (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    toggleWriterMode();
  }
};

let t; // Typefully Plug timeout
let zt1; // Zen Writer Mode timeout 1
let zt2; // Zen Writer Mode timeout 2
export const changeWriterMode = (writerMode) => {
  if (window.location.pathname.includes("/home") || window.location.pathname === "/" || window.location.pathname.includes("/compose/tweet")) {
    switch (writerMode) {
      case "on":
        document.addEventListener("keydown", escKeyListener);

        if (stylesExist("writerMode")) return;

        clearTimeout(zt1);
        zt1 = setTimeout(() => {
          document.title = "Writer Mode";
        }, 500);

        addStyles(
          "writerMode",
          `
            body {
              padding-left: 0;
              overflow: hidden;
            }
            ${selectors.mainColumn} {
              border-style: hidden;
              padding-top: 3vh;
              margin: 0 auto;
            }
            ${selectors.mainWrapper} {
              flex-basis: 100%;
            }
            ${selectors.mainWrapper} > div {
              width: 100%;
              max-width: 100%;
            }
            ${selectors.leftSidebar},
            ${selectors.rightSidebar},
            ${selectors.mainColumn} > div > div:not(:nth-of-type(1)):not(:nth-of-type(2)):not(:nth-of-type(3)) {
              overflow: hidden;
              visibility: hidden;
              opacity: 0;
              width: 0;
              height: 0;
            }
            ${selectors.topHeader} {
              visibility: hidden;
            }
            ${selectors.modalWrapper} {
              width: 100vw;
              max-width: 100vw;
              top: 0;
              border-radius: 0;
            }
            div[role="group"] > div:empty {
              background-color: var(--body-bg-color);
            }
            ${selectors.modalUi} {
              border-radius: 0;
            }
            ${selectors.modalWrapper} > div > div > div {
              padding-bottom: 10vh;
            }
            `
        );

        clearTimeout(t);
        t = setTimeout(() => {
          addTypefullyPlugToWriterMode();
        }, 100);

        break;

      case "off":
        document.removeEventListener("keydown", escKeyListener);

        if (!stylesExist("writerMode")) break;

        clearTimeout(zt2);
        zt2 = setTimeout(() => {
          document.title = "Twitter";
        }, 500);

        removeStyles("writerMode");
        removeTypefullyPlugFromWriterMode();
        break;
    }
  } else {
    removeStyles("writerMode");
    removeTypefullyPlugFromWriterMode();
    return;
  }
};

export const addTypefullyPlugToWriterMode = async () => {
  if (window.location.pathname.includes("/home") || window.location.pathname === "/") {
    const main = document.querySelector('main[role="main"]');

    if (!main) return;
    if (document.getElementById("typefully-writermode-link")) return;

    /* ---------------------------- Typefully Button ---------------------------- */

    const typefullyLinkElement = createTypefullyLinkElement("typefully-writermode-link", "typefully-save-draft-button ghost");
    typefullyLinkElement.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully();
    });

    const typefullyLogo = createTypefullyLogo();
    const typefullyText = document.createElement("span");
    typefullyText.innerText = "Save draft to Typefully";

    typefullyLinkElement.appendChild(typefullyLogo);
    typefullyLinkElement.appendChild(typefullyText);

    /* ----------------- Typefully box callout with explanation ---------------- */

    const url = createTypefullyUrl({
      utm_content: "writer-mode-callout",
    });

    addTypefullyBox(
      main,
      "writer-mode",
      `<ul>
  <li>💬 Share your drafts and get comments</li>
  <li>🤖 Improve your tweets with AI</li>
  <li>📈 Track your growth with insights and metrics</li>
  <li>📆 Schedule for later</li>
</ul>
<p>Powered by <a href="${url}" target="_blank">Typefully</a>, the makers of the Minimal Twitter extension.</p>`,
      {
        withArrow: true,
      }
    );

    main.appendChild(typefullyLinkElement);
  }
};

export const removeTypefullyPlugFromWriterMode = () => {
  const typefullyLinkElement = document.getElementById("typefully-writermode-link");
  typefullyLinkElement && typefullyLinkElement.remove();

  const typefullyBox = document.getElementById("typefully-writermode-box");
  typefullyBox && typefullyBox.remove();
};

// Function to add an expand icon to the buttons in the tweet composer
export const addWriterModeButton = async () => {
  const composerButtonInner = document.querySelector(
    `${selectors.mainColumn} nav[role="navigation"] [role="tablist"][data-testid="ScrollSnap-List"] div[role="presentation"]:last-child div[role="button"]`
  );
  // X recently wrapped these buttons in a div
  const composerButton = composerButtonInner?.parentNode;

  if (!composerButton) return;

  if (!window.location.pathname.includes("/home") || !window.location.pathname === "/" || document.getElementById("mt-writer-mode-composer-button")) {
    return;
  }
  const writerModeButton = composerButton.cloneNode(true);
  const userSetting = await getStorage(KeyWriterMode);

  writerModeButton.id = "mt-writer-mode-composer-button";
  writerModeButton.removeAttribute("data-testid");

  if (userSetting === "on") {
    writerModeButton.firstChild.firstChild.firstChild.firstChild.innerHTML = svgAssets.composerWriterMode.selected;

    addTooltip(writerModeButton, {
      id: "writer-mode",
      title: "Close Zen Writer Mode",
    });
  } else {
    writerModeButton.firstChild.firstChild.firstChild.firstChild.innerHTML = svgAssets.composerWriterMode.normal;

    addTooltip(writerModeButton, {
      id: "writer-mode",
      title: "Zen Writer Mode",
      description: "Added by Minimal Twitter.",
    });
  }
  writerModeButton.onclick = toggleWriterMode;

  if (document.querySelector("#mt-writer-mode-composer-button")) {
    writerModeButton.remove();
    return;
  } else {
    composerButton.parentNode.appendChild(writerModeButton);

    addStyles(
      "writer-mode-composer-button-style",
      `
      #mt-writer-mode-composer-button:hover {
        background-color: rgba(var(--accent-color-rgb), 0.1);
        border-radius: 9999px;
      }
      `
    );
  }
};

const toggleWriterMode = async () => {
  const userSetting = await getStorage(KeyWriterMode);

  const writerModeButton = document.querySelector("#mt-writer-mode-composer-button");

  try {
    await setStorage({ writerMode: userSetting === "off" ? "on" : "off" });
  } catch (error) {
    console.error(error);
  }

  if (!writerModeButton) return;

  hideAllTooltips();

  if (userSetting === "off") {
    writerModeButton.firstChild.firstChild.firstChild.innerHTML = svgAssets.composerWriterMode.selected;

    addTooltip(writerModeButton, {
      id: "writer-mode",
      title: "Close Zen Writer Mode",
    });
  } else {
    writerModeButton.firstChild.firstChild.firstChild.innerHTML = svgAssets.composerWriterMode.normal;

    addTooltip(writerModeButton, {
      id: "writer-mode",
      title: "Zen Writer Mode",
      description: "Added by Minimal Twitter.",
    });

    // scroll body to top
    document.body.scrollTop = 0;
  }
};
