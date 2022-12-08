import svgAssets from "../svgAssets";
import {
  createTypefullyLinkElement,
  createTypefullyLogo,
  getCurrentTextAndSendToTypefully,
} from "../typefully";
import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";
import { getStorage, setStorage } from "../utilities/storage";

export const changeWriterMode = (writerMode) => {
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
        [data-testid="primaryColumn"] > div > div:not(:nth-of-type(2)):not(:nth-of-type(3)) {
          display: none !important;
        }
        div[data-testid="primaryColumn"] {
          border-style: hidden !important;
          padding-top: 10vh !important;
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
};

const addTypefullyPlugToWriterMode = async () => {
  const main = document.querySelector('main[role="main"]');

  if (!main) return;
  if (document.getElementById("typefully-writermode-link")) return;

  /* ---------------------------- Typefully Button ---------------------------- */

  const typefullyLinkElement = createTypefullyLinkElement(
    "typefully-writermode-link",
    "typefully-writermode-button"
  );
  typefullyLinkElement.addEventListener("click", () => {
    getCurrentTextAndSendToTypefully();
  });

  const typefullyLogo = createTypefullyLogo();
  const typefullyText = document.createElement("span");
  typefullyText.innerText = "Save draft to Typefully";

  typefullyLinkElement.appendChild(typefullyLogo);
  typefullyLinkElement.appendChild(typefullyText);

  /* ----------------- Typefully box callout with explanation ---------------- */

  const typefullyBoxSeen = await getStorage("typefullyBoxSeen");

  if (typefullyBoxSeen !== "true") {
    const typefullyBox = document.createElement("div");
    typefullyBox.id = "typefully-writermode-box";
    typefullyBox.className = "typefully-box";

    typefullyBox.innerHTML = `
    <h3>Save and share your drafts</h3>
    <p><a href="https://typefully.com/?ref=minimal-twitter">Typefully</a> — the maker of this Chrome extension — is a free tool built for Twitter creators.</p>
    <ul>
      <li>✅ Never lose your work by syncing your drafts</li>
      <li>💬 Share your drafts with anyone for feedback</li>
      <li>🤖 Improve your tweets with AI</li>
      <li>📈 Grow faster with insights and metrics</li>
    </ul>
    <p>Click the button below to get started:</p>
    `;

    // Create svg element for the close button
    const closeButton = document.createElement("div");
    closeButton.id = "box-close-button";
    closeButton.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 12" stroke="black" stroke-width="2"/>
    <path d="M12 12L2 2" stroke="black" stroke-width="2"/>
    </svg>`;

    closeButton.addEventListener("click", () => {
      setStorage({ typefullyBoxSeen: "true" }).then(() => {
        typefullyBox.remove();
      });
    });

    typefullyBox.appendChild(closeButton);

    main.appendChild(typefullyBox);
  }

  main.appendChild(typefullyLinkElement);
};

const removeTypefullyPlugFromWriterMode = () => {
  const typefullyLinkElement = document.getElementById(
    "typefully-writermode-link"
  );
  typefullyLinkElement && typefullyLinkElement.remove();
  const typefullyBox = document.getElementById("typefully-writermode-box");
  typefullyBox && typefullyBox.remove();
};

// Function to add an expand icon to the buttons in the tweet composer
export const addWriterModeButton = () => {
  if (document.querySelector("#mt-writer-mode-composer-button")) return;

  const geoButton = document.querySelector('div[data-testid="geoButton"]');

  if (!geoButton) return;

  const writerModeButton = geoButton.cloneNode(true);

  writerModeButton.id = "mt-writer-mode-composer-button";
  writerModeButton.ariaLabel = "Writer Mode";
  writerModeButton.removeAttribute("data-testid");

  writerModeButton.firstChild.firstChild.firstChild.innerHTML =
    svgAssets.composerWriterMode.normal;
  geoButton.insertAdjacentElement("afterend", writerModeButton);

  writerModeButton.onclick = toggleWriterMode;

  addStyles(
    "mt-writer-mode-composer-button-style",
    `
  #mt-writer-mode-composer-button:hover {
    background-color: rgba(var(--accent-color-rgb), 0.1);
  }
      `
  );
};

const toggleWriterMode = async () => {
  const userSetting = await getStorage("writerMode");

  const writerModeButton = document.querySelector(
    "#mt-writer-mode-composer-button"
  );

  try {
    await setStorage({ writerMode: userSetting === "off" ? "on" : "off" });
  } catch (error) {
    console.error(error);
  }

  if (!writerModeButton) return;

  if (userSetting === "off") {
    writerModeButton.firstChild.firstChild.firstChild.innerHTML =
      svgAssets.composerWriterMode.selected;
  } else {
    writerModeButton.firstChild.firstChild.firstChild.innerHTML =
      svgAssets.composerWriterMode.normal;
  }
};
