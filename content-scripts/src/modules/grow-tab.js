import svgAssets from "./svgAssets";
import { getCurrentTheme } from "./utilities/colors";
import { removeElementById } from "./utilities/removeElement";

let gt; // Grow Tab timeout
export const showGrowTab = () => {
  const main = document.querySelector("main[role='main']");
  const existingGrowTab = document.querySelector("#typefully-grow-tab");

  if (existingGrowTab) {
    existingGrowTab.style.display = "block";
    return;
  }

  const growTab = document.createElement("iframe");
  growTab.id = "typefully-grow-tab";

  const screenName = document.querySelector(`a[role="link"][data-testid="AppTabBar_Profile_Link"]`).getAttribute("href").replace("/", "");

  growTab.src = `https://typefully.com/grow?mt-embed=true&mt-theme=${getCurrentTheme()}&mt-screen-name=${screenName}`;

  growTab.style = `
    width: 100%;
    height: 100%;
    border: none;
    `;
  main.before(growTab);
  main.style.display = "none";
  document.body.style.overflow = "hidden";

  clearTimeout(gt);
  gt = setTimeout(() => {
    document.addEventListener("click", (e) => {
      // Don't hide if click on self
      if (e.target.closest("#mt-typefullyGrowButton")) return;

      // Don't hide when composing tweets
      if (e.target.closest("a[href='/compose/tweet']")) return;

      // Don't close when clicking in modals
      if (e.target.closest("div[role='dialog'][aria-modal='true']")) return;

      if (!e.target.closest("#mt-typefullyGrowButton")) {
        removeGrowTab();
      }
    });
  }, 500);
};

export const removeGrowTab = () => {
  const main = document.querySelector("main[role='main']");
  const growTab = document.querySelector("#typefully-grow-tab");
  const growButton = document.querySelector("#mt-typefullyGrowButton");

  main.style.display = "flex";
  document.body.style.overflow = "auto";

  if (growTab) {
    removeElementById("typefully-grow-tab");
  }

  if (growButton && growButton.firstChild.firstChild.firstChild) {
    growButton.firstChild.firstChild.firstChild.innerHTML = svgAssets.grow.normal;
    growButton.querySelector("span").style.fontWeight = "400";
  }

  location.reload();
};
