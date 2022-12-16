import removeElement from "./removeElement";

// Utility function to inject CSS into page
export default function addStyles(id, css) {
  // First remove before adding
  removeElement(id);

  const head = document.querySelector("head");
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `${css}`;
  head.appendChild(style);
}
