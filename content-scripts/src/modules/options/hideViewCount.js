import selectors from "../../selectors";
import { getStorage } from "../utilities/storage";

export default async function hideViewCount() {
  const viewCounts = Array.from(document.querySelectorAll(selectors.viewCount));

  if (!viewCounts.length) return;

  const data = await getStorage(["hideViewCount"]);

  if (data?.hideViewCount === "off") {
    viewCounts.forEach((el) => {
      el.parentElement && (el.parentElement.style.display = "flex");
    });
  } else {
    viewCounts.forEach((el) => {
      el.parentElement && (el.parentElement.style.display = "none");
    });
  }
}
