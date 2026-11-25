import selectors from "../../selectors";
import addStyles, { removeStyles, stylesExist } from "../utilities/addStyles";

export default async function changeHideViewCounts(setting) {
  // X's rewritten web app: one stylesheet covers every post, including ones rendered later
  if (setting === "on") {
    if (!stylesExist("hideViewCount")) {
      addStyles("hideViewCount", `${selectors.newApp.root} ${selectors.newApp.viewCount} { display: none; }`);
    }
  } else if (setting === "off") {
    removeStyles("hideViewCount");
  }

  const viewCounts = Array.from(document.querySelectorAll(selectors.viewCount));

  if (!viewCounts.length) return;

  if (setting === "off") {
    viewCounts.forEach((el) => {
      el.parentElement && (el.parentElement.style.display = "flex");
    });
  } else if (setting === "on") {
    viewCounts.forEach((el) => {
      el.parentElement && (el.parentElement.style.display = "none");
    });
  }
}
