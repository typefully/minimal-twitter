export const isExtensionUnpacked = () => {
  return new Promise((resolve) => {
    if (chrome.runtime.id) {
      resolve(false);
    } else {
      resolve(true);
    }
  });
};
