import selectors from "../../selectors";

export default async function hideViewCount() {
  chrome.storage.sync.get(["hideViewCount"], (result) => {
    const viewCounts = Array.from(
      document.querySelectorAll(selectors.viewCount)
    );
    if (result.hideViewCount === "off") {
      viewCounts.forEach((el) => {
        el.parentElement && (el.parentElement.style.display = "flex");
      });

      if (window.location.pathname.includes("/status/")) {
        const viewsElement = document.querySelector("a[href*='/analytics']");
        viewsElement.style.display = "";
      }
    } else {
      viewCounts.forEach((el) => {
        el.parentElement && (el.parentElement.style.display = "none");
      });

      if (window.location.pathname.includes("/status/")) {
        const viewsElement = document.querySelector("a[href*='/analytics']");
        viewsElement.style.display = "none";
      }
    }
  });
}
