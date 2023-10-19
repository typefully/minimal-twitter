import { removeElementById } from "./removeElement";

// Utility function to inject CSS into page
export default function addStyles(id, css) {
  // First remove before adding
  removeElementById("mt-style-" + id);

  const head = document.querySelector("head");
  const style = document.createElement("style");
  style.id = "mt-style-" + id;
  style.textContent = `${css}`;
  head.appendChild(style);
}

export function removeStyles(id) {
  removeElementById("mt-style-" + id);
}

export function stylesExist(id) {
  return document.getElementById("mt-style-" + id);
}
