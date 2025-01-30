/**
 * Determine if the extension is running in development mode,
 * but only for Chrome (for other browsers, we always assume production mode).
 */
export const isDevelopmentMode = async () => {
  try {
    const browserType = navigator.userAgent.toLowerCase();
    const isChrome = browserType.includes("chrome");

    if (!isChrome) return false;

    const manifest = chrome.runtime.getManifest();

    return !("update_url" in manifest);
  } catch (error) {
    // If anything fails, default to production mode for safety
    console.error("Failed to determine dev mode:", error);
    return false;
  }
};
