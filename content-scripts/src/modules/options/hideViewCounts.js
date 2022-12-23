import selectors from "../../selectors";

export default async function hideViewCounts(passedSetting) {
  chrome.storage.sync.get(["hideViewCounts"], (result) => {
    const viewCounts = Array.from(
      document.querySelectorAll(selectors.viewCount)
    );
    if (result.hideViewCounts === "on") {
      viewCounts.forEach((el) => {
        console.log(el);
        el.parentElement && (el.parentElement.style.display = "none");
      });
    } else {
      viewCounts.forEach((el) => {
        el.parentElement && (el.parentElement.style.display = "flex");
      });
    }
  });
}
