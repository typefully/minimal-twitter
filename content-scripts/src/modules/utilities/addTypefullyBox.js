import svgAssets from "../svgAssets";
import { getStorage, setStorage } from "./storage";
import { createTypefullyUrl } from "./createTypefullyUrl";

export default async function addTypefullyBox(rootElement, utmContent, options = {}) {
  const { withArrow } = options ?? {};

  const key = "tp-box-seen:typefully-callout";

  const seen = await getStorage(key);

  const url = createTypefullyUrl({
    utm_content: utmContent,
  });

  const innerHTML = `<ul>
  <li>💬 Share your drafts and get comments</li>
  <li>🤖 Improve your tweets with AI</li>
  <li>📈 Track your growth with insights and metrics</li>
  <li>📆 Schedule for later</li>
</ul>
<p>Powered by <a href="${url}" target="_blank">Typefully</a>, the makers of the Minimal Twitter extension.</p>`;

  if (seen !== "true") {
    const typefullyBox = document.createElement("div");
    typefullyBox.id = "typefully-callout-box";
    typefullyBox.className = "typefully-box";

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
