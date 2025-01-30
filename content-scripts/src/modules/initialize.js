import { allSettingsKeys } from "../../../storage-keys";
import { runDynamicFeatures } from "./features/dynamic";
import { applyStaticFeatures } from "./features/static";
import addStyleSheet from "./utilities/addStyleSheet";
import { extractColorsAsRootVars } from "./utilities/colors";
import debounce from "./utilities/debounce";
import isMutationSkippable from "./utilities/isMutationSkippable";
import { getStorage } from "./utilities/storage";

/**
 * Initialization:
 * - Sets up MutationObserver for dynamic features
 * - Adds load/resize event listeners
 * - Loads and caches required stylesheets
 * - Extracts Twitter theme colors
 */

export const addStylesheets = async () => {
  addStyleSheet("main", chrome.runtime.getURL("css/main.css"));
  addStyleSheet("typefully", chrome.runtime.getURL("css/typefully.css"));

  // Load cached CSS
  const mainStylesheetFromCDN = await fetch("https://raw.githubusercontent.com/typefully/minimal-twitter/main/css/main.css");
  const typefullyStylesheetFromCDN = await fetch("https://raw.githubusercontent.com/typefully/minimal-twitter/main/css/typefully.css");
  const mainText = (await mainStylesheetFromCDN.text()).trim();
  const typefullyText = (await typefullyStylesheetFromCDN.text()).trim();
  addStyleSheet("external", null, mainText.concat("\n\n").concat(typefullyText));
};

const addMutationObserver = () => {
  const observer = new MutationObserver((mutations) => {
    if (!mutations.length || isMutationSkippable(mutations)) return;
    runDynamicFeatures();
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};

const addPageLoadListener = () => {
  document.addEventListener("DOMContentLoaded", () => {
    runDynamicFeatures();
  });
};

const addResizeListener = () => {
  window.addEventListener(
    "resize",
    debounce(() => {
      runDynamicFeatures();
    }, 50)
  );
};

export const initializeExtension = async () => {
  await addStylesheets();

  const allData = await getStorage(allSettingsKeys);
  applyStaticFeatures(allData);
  runDynamicFeatures();

  addMutationObserver();
  addPageLoadListener();
  addResizeListener();

  extractColorsAsRootVars();
  setTimeout(() => {
    // Let's extract colors when the page is likely fully loaded again
    extractColorsAsRootVars();
  }, 3000);
};
