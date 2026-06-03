const manifest = chrome.runtime.getManifest();
const url = new URL(window.location.href);
const token = url.searchParams.get("t");

if (manifest.update_url) {
  document.body.textContent = "Dev reload is disabled for store installs.";
} else if (!token || !/^\d+-[a-z0-9]+$/.test(token)) {
  document.body.textContent = "Dev reload requires the local reload helper.";
} else {
  document.body.textContent = "Reloading Minimal Twitter...";
  chrome.runtime.reload();
  window.close();
  setTimeout(() => window.close(), 100);
}
