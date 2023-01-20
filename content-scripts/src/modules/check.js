import selectors from "../selectors";
import addStyles from "./utilities/addStyles";
import removeElement from "./utilities/removeElement";

// Function to check url for /following or /followers
export const checkUrlForFollow = () => {
  if (
    window.location.pathname.includes("/followers") ||
    window.location.pathname.includes("/following") ||
    window.location.pathname.includes("/i/") ||
    window.location.pathname.includes("/search") ||
    window.location.pathname.includes("/explore")
  ) {
    if (document.getElementById("mt-followOverride")) return;

    addStyles(
      "mt-followOverride",
      `
        ${selectors.mainColumn} a[href*="/i/connect_people?user_id="],
        ${selectors.mainColumn} div[data-testid="UserCell"] {
          display: block;
        }
        `
    );
  } else {
    removeElement("mt-followOverride");
  }
};
