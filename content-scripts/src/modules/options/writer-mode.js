import svgAssets from "../svgAssets";
import {
  createTypefullyLinkElement,
  createTypefullyLogo,
  getCurrentTextAndSendToTypefully,
} from "../typefully";
import addStyles from "../utilities/addStyles";
import addTypefullyBox from "../utilities/addTypefullyBox";
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

  addTypefullyBox(
    main,
    "writer-mode",
    `<ul>
  <li>💬 Share your drafts and get comments</li>
  <li>🤖 Improve your tweets with AI</li>
  <li>📈 Track your growth with insights and metrics</li>
  <li>📆 Schedule for later</li>
</ul>
<p>Powered by <a href="https://typefully.com/?ref=minimal-twitter">Typefully</a>, the makers of the Minimal Twitter extension.</p>`,
    {
      withArrow: true,
    }
  );

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
export const addWriterModeButton = async () => {
  const scheduleButton = document.querySelector(
    'div[data-testid="scheduleOption"]'
  );

  if (!scheduleButton) return;

  const writerModeButton = scheduleButton.cloneNode(true);

  writerModeButton.id = "mt-writer-mode-composer-button";
  writerModeButton.ariaLabel = "Writer Mode";
  writerModeButton.removeAttribute("data-testid");

  const userSetting = await getStorage("writerMode");
  if (userSetting === "on") {
    writerModeButton.firstChild.firstChild.firstChild.innerHTML =
      svgAssets.composerWriterMode.selected;
  } else {
    writerModeButton.firstChild.firstChild.firstChild.innerHTML =
      svgAssets.composerWriterMode.normal;
  }
  writerModeButton.onclick = toggleWriterMode;

  if (document.querySelector("#mt-writer-mode-composer-button")) {
    writerModeButton.remove();
    return;
  } else {
    scheduleButton.parentNode.appendChild(writerModeButton);

    addStyles(
      "mt-writer-mode-composer-button-style",
      `
    #mt-writer-mode-composer-button:hover {
      background-color: rgba(var(--accent-color-rgb), 0.1);
    }
        `
    );
  }
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

    // scroll body to top
    document.body.scrollTop = 0;
  }
};
