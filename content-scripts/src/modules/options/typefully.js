import selectors from "../../selectors";
import { showGrowTab } from "../grow-tab";
import svgAssets from "../svgAssets";
import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";
import { getStorage } from "../utilities/storage";

// Function to change Typefully Composer Buttons
export const changeTypefullyComposerButtons = (typefullyComposerButtons) => {
  switch (typefullyComposerButtons) {
    case "off":
      addStyles(
        "mt-typefullyComposerButtons",
        `
        #typefully-link, 
        #typefully-reply-link, 
        #typefully-writermode-link, 
        #typefully-writermode-box {
          display: none;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-typefullyComposerButtons");
      break;
  }
};

// Function to change Grow Button
export const changeGrowButton = (growButton) => {
  switch (growButton) {
    case "off":
      removeElement("mt-typefullyGrowButton");
      break;

    case "on":
      addGrowButton();
      break;
  }
};

// Function to add Grow button
export const addGrowButton = async () => {
  const userSetting = await getStorage("typefullyGrowTab");
  if (userSetting !== "on") return;

  const exists = document.querySelector("#mt-typefullyGrowButton");
  if (exists) return;

  const profileNode = document.querySelector(selectors.sidebarLinks.profile);

  if (profileNode) {
    const growButton = document.createElement("div");
    growButton.innerHTML = profileNode.innerHTML;

    growButton.id = "mt-typefullyGrowButton";
    growButton.ariaLabel = "Typefully Grow";
    growButton.style.cursor = "pointer";
    growButton.firstChild.firstChild.firstChild.innerHTML =
      svgAssets.grow.normal;

    growButton.onclick = () => {
      growButton.firstChild.firstChild.firstChild.innerHTML =
        svgAssets.grow.selected;
      if (growButton.querySelector("span"))
        growButton.querySelector("span").style.fontWeight = "700";
      showGrowTab();
    };

    growButton.firstChild.lastChild.firstChild.innerText = "Grow";
    profileNode.insertAdjacentElement("beforebegin", growButton);
  }
};
