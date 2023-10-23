import {
  KeyCommunitiesButton,
  KeyFollowingTimeline,
  KeyListsButton,
  KeyRemoveTimelineTabs,
  KeyTopicsButton,
  KeyTrendsHomeTimeline,
  KeyTypefullyGrowTab,
  KeyWriterMode,
  KeyXPremiumButton,
} from "../../../storage-keys";
import { checkUrlForFollow } from "./check";
import hideViewCount from "./options/hideViewCount";
import { addAnalyticsButton, addCommunitiesButton, addListsButton, addTopicsButton, addXPremiumButton } from "./options/navigation";
import { changeFollowingTimeline, changeRecentMedia, changeTimelineTabs, changeTrendsHomeTimeline } from "./options/timeline";
import { addWriterModeButton, changeWriterMode } from "./options/writer-mode";
import { addTypefullyPlug, addTypefullyReplyPlug, saveCurrentReplyToLink } from "./typefully";
import { extractColorsAsRootVars } from "./utilities/colors";
import debounce from "./utilities/debounce";
import hideRightSidebar from "./utilities/hideRightSidebar";
import isMutationSkippable from "./utilities/isMutationSkippable";
import { addSmallerSearchBarStyle } from "./utilities/other-styles";
import { getStorage } from "./utilities/storage";
import throttle from "./utilities/throttle";

// Function to add main stylesheet
export const addStylesheets = async () => {
  const head = document.querySelector("head");
  const mainStylesheet = document.createElement("link");
  const typefullyStylesheet = document.createElement("link");
  const externalStylesheet = document.createElement("style");

  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("css/main.css");

  typefullyStylesheet.rel = "stylesheet";
  typefullyStylesheet.type = "text/css";
  typefullyStylesheet.href = chrome.runtime.getURL("css/typefully.css");

  externalStylesheet.id = "mt-external-stylesheet";

  head.appendChild(mainStylesheet);
  head.appendChild(typefullyStylesheet);
  head.insertBefore(externalStylesheet, typefullyStylesheet.nextSibling);

  const mainStylesheetFromCDN = await fetch(`https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@6.0/css/main.css?t=${Date.now()}`);
  const typefullyStylesheetFromCDN = await fetch(`https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@6.0/css/typefully.css?t=${Date.now()}`);
  const mainText = (await mainStylesheetFromCDN.text()).trim();
  const typefullyText = (await typefullyStylesheetFromCDN.text()).trim();
  const styleSheetText = document.createTextNode(mainText.concat("\n\n").concat(typefullyText));

  externalStylesheet.appendChild(styleSheetText);
};

const runDocumentMutations = throttle(async () => {
  extractColorsAsRootVars();

  const data = await getStorage([KeyWriterMode, KeyFollowingTimeline, KeyTrendsHomeTimeline, KeyRemoveTimelineTabs]);

  if (data) {
    if (data[KeyWriterMode] === "on") {
      changeWriterMode(data[KeyWriterMode]);
    } else {
      changeTimelineTabs(data[KeyRemoveTimelineTabs], data[KeyWriterMode]);
      changeTrendsHomeTimeline(data[KeyTrendsHomeTimeline], data[KeyWriterMode]);
      changeFollowingTimeline(data[KeyFollowingTimeline]);
      addTypefullyPlug();
    }
  }

  saveCurrentReplyToLink();
  addTypefullyReplyPlug();
  checkUrlForFollow();
  hideViewCount();
  changeRecentMedia();
  hideRightSidebar();
  addSmallerSearchBarStyle();

  const scheduleButton = document.querySelector('div[data-testid="scheduleOption"]');
  if (scheduleButton) addWriterModeButton(scheduleButton);

  return;
}, 250);

// Function to start MutationObserver
export const addMutationsOnDomChanges = () => {
  const observer = new MutationObserver((mutationsList) => {
    if (!mutationsList.length) return;
    if (isMutationSkippable(mutationsList)) return;
    runDocumentMutations();
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};

function runPageLoadMutations() {
  addSidebarButtons(false);
  runDocumentMutations();
}

export const addMutationsOnNavigation = () => {
  window.onload = runPageLoadMutations;
  window.addEventListener("popstate", runPageLoadMutations);
};

// On resize, remove and re-add the sidebar buttons, because their original
// Twitter counterparts styles change programmatically based on window size,
// so we need to re-create them when the window size changes.
export const addMutationsOnResize = () => {
  window.addEventListener(
    "resize",
    debounce(() => {
      addSidebarButtons(true);
    }, 50)
  );
};

// Use "forced" when you want to re-add a button even if it's already there
async function addSidebarButtons(forced) {
  const data = await getStorage([KeyListsButton, KeyCommunitiesButton, KeyTopicsButton, KeyXPremiumButton, KeyTypefullyGrowTab]);

  if (!data) return;

  if (data[KeyListsButton] === "on") addListsButton(forced);
  if (data[KeyCommunitiesButton] === "on") addCommunitiesButton(forced);
  if (data[KeyTopicsButton] === "on") addTopicsButton(forced);
  if (data[KeyXPremiumButton] === "on") addXPremiumButton(forced);
  if (data[KeyTypefullyGrowTab] === "on") addAnalyticsButton(forced);
}
