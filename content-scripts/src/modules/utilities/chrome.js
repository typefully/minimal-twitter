export const isDevelopment = () => {
  return !("update_url" in chrome.runtime.getManifest()) || !!chrome.runtime.id;
};
