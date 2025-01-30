import {
  KeyCommunitiesButton,
  KeyFollowingTimeline,
  KeyHideGrokDrawer,
  KeyListsButton,
  KeyRemoveTimelineTabs,
  KeyTopicsButton,
  KeyTrendsHomeTimeline,
  KeyTypefullyGrowTab,
  KeyWriterMode,
  KeyXPremiumButton,
} from "../../../storage-keys";
import changeHideViewCounts from "./options/hideViewCount";
import { addAnalyticsButton, addCommunitiesButton, addListsButton, addTopicsButton, addXPremiumButton, hideGrokDrawer } from "./options/navigation";
import { changeFollowingTimeline, changeRecentMedia, changeTimelineTabs, changeTrendsHomeTimeline } from "./options/timeline";
import { addWriterModeButton, changeWriterMode } from "./options/writer-mode";
import { addTypefullyPlug, addTypefullyReplyPlug, saveCurrentReplyToLink } from "./typefully";
import addStyleSheet from "./utilities/addStyleSheet";
import { extractColorsAsRootVars } from "./utilities/colors";
import debounce from "./utilities/debounce";
import hideRightSidebar from "./utilities/hideRightSidebar";
import isMutationSkippable from "./utilities/isMutationSkippable";
import { addSmallerSearchBarStyle } from "./utilities/other-styles";
import { getStorage } from "./utilities/storage";
import throttle from "./utilities/throttle";

// Function to add main stylesheet
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

export const runDocumentMutations = throttle(async () => {
  extractColorsAsRootVars();

  const data = await getStorage([KeyWriterMode, KeyFollowingTimeline, KeyTrendsHomeTimeline, KeyRemoveTimelineTabs, KeyHideGrokDrawer]);

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
  changeHideViewCounts();
  changeRecentMedia();
  hideRightSidebar();
  addSmallerSearchBarStyle();
  addWriterModeButton();
  hideGrokDrawer(data?.[KeyHideGrokDrawer]);

  return;
}, 50);

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

export const addMutationsOnPageLoad = () => {
  // Inject on page load
  document.addEventListener("DOMContentLoaded", () => {
    addSidebarButtons(false);
    runDocumentMutations();
  });
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
