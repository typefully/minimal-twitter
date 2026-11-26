import { allSettingsKeys } from "../../../storage-keys";
import { runDynamicFeatures } from "./features/dynamic";
import { applyStaticFeatures } from "./features/static";
import addStyleSheet from "./utilities/addStyleSheet";
import { extractColorsAsRootVars } from "./utilities/colors";
import debounce from "./utilities/debounce";
import { isDevelopmentMode } from "./utilities/isDevelopmentMode";
import isMutationSkippable from "./utilities/isMutationSkippable";
import { getStorage } from "./utilities/storage";

/**
 * Initialization:
 * - Sets up MutationObserver for dynamic features
 * - Adds load/resize event listeners
 * - Loads and caches required stylesheets
 * - Extracts Twitter theme colors
 */

const fetchStylesheetsFromCDN = async (stylesheet) => {
  try {
    const texts = await Promise.all(
      ["main", "typefully"].map(async (name) => {
        const response = await fetch(`https://raw.githubusercontent.com/typefully/minimal-twitter/main/css/${name}.css`);
        return (await response.text()).trim();
      })
    );
    stylesheet.textContent = texts.join("\n\n");
  } catch (error) {
    console.error("Can't fetch stylesheets from CDN", error);
  }
};

export const addStylesheets = async () => {
  addStyleSheet("main", chrome.runtime.getURL("css/main.css"));
  addStyleSheet("typefully", chrome.runtime.getURL("css/typefully.css"));

  // Only fetch from CDN in production
  if (!(await isDevelopmentMode())) {
    // Settings apply with the bundled stylesheets without waiting for the CDN: X's timeline keeps each post's
    // first measured height, so a setting that lands after the first posts render leaves gaps or overlaps.
    // The CDN copy fills an element added now, so it still comes before the settings' styles in the cascade.
    fetchStylesheetsFromCDN(addStyleSheet("external", null, "/* Loading from CDN */"));
  } else {
    console.log("🚧 Development mode, not adding CDN-cached stylesheets");
  }
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
