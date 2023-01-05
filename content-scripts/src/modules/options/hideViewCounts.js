import selectors from "../../selectors";

export default async function hideViewCounts() {
  chrome.storage.sync.get(["hideViewCounts"], (result) => {
    const viewCounts = Array.from(
      document.querySelectorAll(selectors.viewCount)
    );
    if (result.hideViewCounts === "off") {
      viewCounts.forEach((el) => {
        el.parentElement && (el.parentElement.style.display = "flex");
      });
    } else {
      viewCounts.forEach((el) => {
        el.parentElement && (el.parentElement.style.display = "none");
      });
    }
  });
}
