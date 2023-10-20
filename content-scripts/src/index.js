import { KeyExtensionStatus, allSettingsKeys } from "../../storage-keys";
import { addMutationsOnDomChanges, addMutationsOnNavigation, addMutationsOnResize, addStylesheets } from "./modules/initialize";
import { injectAllChanges } from "./modules/options/all";
import constructNewData from "./modules/utilities/constructNewData";
import { getStorage } from "./modules/utilities/storage";

/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#synchronous-response-to-storage-updates
- Listen to Chrome Storage changes
- Inject styles in respond to changes
--*/
chrome.storage.onChanged.addListener(async (changes) => {
  const status = await getStorage(KeyExtensionStatus);
  if (changes[KeyExtensionStatus]) window.location.reload();

  const newChangesData = constructNewData(changes);
  injectAllChanges(newChangesData);
});

/*--
- Initializing function, runs once at start
- Get Chrome Storage and inject respective styles
--*/
const init = async () => {
  const status = await getStorage(KeyExtensionStatus);
  console.log({ status });
  if (status === "off") return;

  addStylesheets();
  addMutationsOnDomChanges();
  addMutationsOnNavigation();
  addMutationsOnResize();

  // Inject user preferences
  const allData = await getStorage(allSettingsKeys);
  injectAllChanges(allData);
};

init();
