import { addMutationsOnDomChanges, addMutationsOnNavigation, addMutationsOnResize, addStylesheets } from "./modules/initialize";
import { injectAllChanges, userPreferences } from "./modules/options/all";
import constructNewData from "./modules/utilities/constructNewData";
import { getStorage } from "./modules/utilities/storage";

/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#synchronous-response-to-storage-updates
- Listen to Chrome Storage changes
- Inject styles in respond to changes
--*/
chrome.storage.onChanged.addListener((changes) => {
  const newChangesData = constructNewData(changes);
  injectAllChanges(newChangesData);
});

/*--
- Initializing function, runs once at start
- Get Chrome Storage and inject respective styles
--*/
const init = async () => {
  addStylesheets();
  addMutationsOnDomChanges();
  addMutationsOnNavigation();
  addMutationsOnResize();

  // Inject user preferences
  const allData = await getStorage(userPreferences);
  injectAllChanges(allData);
};

init();
