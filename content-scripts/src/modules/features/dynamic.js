/**
 * Dynamic features that respond to Twitter's DOM updates:
 * - Writer mode
 * - Navigation buttons
 * - Timeline customizations
 * - View counts
 * - Typefully integration
 * Applied via MutationObserver on relevant DOM changes
 */

import {
  KeyCommunitiesButton,
  KeyFollowingTimeline,
  KeyHideGrokDrawer,
  KeyHideViewCount,
  KeyListsButton,
  KeyRemoveTimelineTabs,
  KeyTopicsButton,
  KeyTrendsHomeTimeline,
  KeyTypefullyGrowTab,
  KeyWriterMode,
  KeyXPremiumButton,
  KeyNavigationButtonsLabels
} from "../../../../storage-keys";
import changeHideViewCounts from "../options/hideViewCount";
import { addAnalyticsButton, addCommunitiesButton, addListsButton, addTopicsButton, addXPremiumButton, hideGrokDrawer, changeNavigationButtonsLabels } from "../options/navigation";
import { changeFollowingTimeline, changeRecentMedia, changeTimelineTabs, changeTrendsHomeTimeline, addMediaDownloadButtons, enableGrokDrawerOnGrokButtonClick } from "../options/timeline";
import { changeWriterMode } from "../options/writerMode";
import { addTypefullyComposerPlug, addTypefullyReplyPlug, saveCurrentReplyToLink, addTypefullySecurityAndAccountAccessPlug, addTypefullySchedulePlug } from "../typefullyPlugs";
import hideRightSidebar from "../utilities/hideRightSidebar";
import { updateLeftSidebarPositioning } from "../utilities/leftSidebarPosition";
import { addSmallerSearchBarStyle } from "../utilities/other-styles";
import { getStorage } from "../utilities/storage";
import throttle from "../utilities/throttle";

export const dynamicFeatures = {
  general: async () => {
    const data = await getStorage([KeyHideViewCount, KeyHideGrokDrawer]);

    changeHideViewCounts(data[KeyHideViewCount]);
    changeRecentMedia();
    hideRightSidebar();
    addSmallerSearchBarStyle();
    updateLeftSidebarPositioning();
    addMediaDownloadButtons();
    enableGrokDrawerOnGrokButtonClick(data[KeyHideGrokDrawer]);
  },
  typefullyPlugs: () => {
    saveCurrentReplyToLink();
    addTypefullyReplyPlug();
    addTypefullyComposerPlug();
    addTypefullySecurityAndAccountAccessPlug();
    addTypefullySchedulePlug();
  },
  navigation: (data) => {
    changeNavigationButtonsLabels(data[KeyNavigationButtonsLabels]);
  },
  sidebarButtons: async () => {
    const data = await getStorage([KeyListsButton, KeyCommunitiesButton, KeyTopicsButton, KeyXPremiumButton, KeyTypefullyGrowTab]);

    if (!data) return;

    if (data[KeyListsButton] === "on") addListsButton();
    if (data[KeyCommunitiesButton] === "on") addCommunitiesButton();
    if (data[KeyTopicsButton] === "on") addTopicsButton();
    if (data[KeyXPremiumButton] === "on") addXPremiumButton();
    if (data[KeyTypefullyGrowTab] === "on") addAnalyticsButton();
  },
  writerMode: async (data) => {
    if (data[KeyWriterMode] === "on") {
      changeWriterMode(data[KeyWriterMode]);
    } else {
      changeTimelineTabs(data[KeyRemoveTimelineTabs], data[KeyWriterMode]);
      changeTrendsHomeTimeline(data[KeyTrendsHomeTimeline], data[KeyWriterMode]);
      changeFollowingTimeline(data[KeyFollowingTimeline]);
    }
  },
};

export const runDynamicFeatures = throttle(async () => {
  const data = await getStorage([KeyWriterMode, KeyFollowingTimeline, KeyTrendsHomeTimeline, KeyRemoveTimelineTabs, KeyHideGrokDrawer, KeyNavigationButtonsLabels]);

  if (data) {
    dynamicFeatures.general();
    dynamicFeatures.typefullyPlugs();
    await dynamicFeatures.sidebarButtons();
    await dynamicFeatures.writerMode(data);
    dynamicFeatures.navigation(data);

    // The Grok drawer appears dynamically, so we need to handle it here as well
    // as in the static features module
    hideGrokDrawer(data?.[KeyHideGrokDrawer]);
  }
}, 50);
