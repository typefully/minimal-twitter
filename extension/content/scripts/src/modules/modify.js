import { addStyles, removeElement } from "./utilities";

// Function to check url for /following or /followers
export const checkUrlForFollow = () => {
  if (
    window.location.pathname.includes("/followers") ||
    window.location.pathname.includes("/following") ||
    window.location.pathname.includes("/i/") ||
    window.location.pathname.includes("/search") ||
    window.location.pathname.includes("/explore")
  ) {
    if (!document.getElementById("mt-followOverride")) {
      addStyles(
        "mt-followOverride",
        `
        div[data-testid="primaryColumn"] a[href*="/i/connect_people?user_id="],
        div[data-testid="primaryColumn"] div[data-testid="UserCell"] {
          display: block !important;
        }
        `
      );
    }
  } else {
    if (document.getElementById("mt-followOverride")) {
      removeElement("mt-followOverride");
    }
  }
};
