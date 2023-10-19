import { KeyHideViewCount } from "../../../../storage-keys";
import selectors from "../../selectors";
import { getStorage } from "../utilities/storage";

export default async function hideViewCount() {
  const viewCounts = Array.from(document.querySelectorAll(selectors.viewCount));

  if (!viewCounts.length) return;

  const setting = await getStorage(KeyHideViewCount);

  if (setting === "off") {
    viewCounts.forEach((el) => {
      el.parentElement && (el.parentElement.style.display = "flex");
    });
  } else {
    viewCounts.forEach((el) => {
      el.parentElement && (el.parentElement.style.display = "none");
    });
  }
}
