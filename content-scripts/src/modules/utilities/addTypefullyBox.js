import svgAssets from "../svgAssets";
import { getStorage, setStorage } from "./storage";

export default async function addTypefullyBox(rootElement, innerHTML, options = {}) {
  const { withArrow, className } = options ?? {};

  const key = "tp-box-seen:typefully-callout";

  const seen = await getStorage(key);

  if (seen !== "true") {
    const typefullyBox = document.createElement("div");
    typefullyBox.id = "typefully-callout-box";
    typefullyBox.className = className ?? "typefully-box";

    typefullyBox.innerHTML = innerHTML;

    // Create svg element for the close button
    const closeButton = document.createElement("div");
    closeButton.id = "box-close-button";
    closeButton.innerHTML = svgAssets.typefullyBox.close;
    typefullyBox.appendChild(closeButton);

    if (withArrow) {
      const arrow = document.createElement("div");
      arrow.id = "box-arrow";
      arrow.innerHTML = svgAssets.typefullyBox.arrow;
      typefullyBox.appendChild(arrow);
    }

    function markSeen() {
      setStorage({ [key]: "true" }).then(() => {
        if (typefullyBox) typefullyBox.remove();
      });
    }

    closeButton.addEventListener("click", markSeen);

    rootElement.appendChild(typefullyBox);
  }
}
