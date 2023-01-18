import selectors from "../../selectors";
import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";

export default async function hideViewCount() {
  const viewCounts = Array.from(document.querySelectorAll(selectors.viewCount));

  if (!viewCounts.length) return;

  chrome.storage.sync.get(["hideViewCount"], (result) => {
    if (result.hideViewCount === "off") {
      viewCounts.forEach((el) => {
        el.parentElement && (el.parentElement.style.display = "flex");
      });

      if (window.location.pathname.includes("/status/")) {
        const viewsElement = document.querySelector("a[href*='/analytics']");
        viewsElement.style.display = "";

        removeElement("mt-hideViewCount");
      }
    } else {
      viewCounts.forEach((el) => {
        el.parentElement && (el.parentElement.style.display = "none");
      });

      if (window.location.pathname.includes("/status/")) {
        const viewsElement = document.querySelector("a[href*='/analytics']");
        viewsElement.style.display = "none";

        addStyles(
          "mt-hideViewCount",
          `
          article[data-testid="tweet"] div[dir="ltr"] > div > a ~ span {
            display: none;
          }
          `
        );
      }
    }
  });
}
