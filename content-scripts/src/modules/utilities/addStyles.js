import { removeElementById } from "./removeElement";

export default function addStyles(id, css) {
  const textContent = css.trim().split("\n").join("");

  // Dynamic features call this on every DOM change. Re-inserting an unchanged style element would
  // re-match every html:has(style#mt-style-…) rule in css/main.css and restyle the whole page.
  if (document.getElementById("mt-style-" + id)?.textContent === textContent) return;

  removeElementById("mt-style-" + id);

  const head = document.querySelector("head");
  const style = document.createElement("style");
  style.id = "mt-style-" + id;
  style.textContent = textContent;
  head.appendChild(style);
}

export function removeStyles(id) {
  removeElementById("mt-style-" + id);
}

export function stylesExist(id) {
  return document.getElementById("mt-style-" + id);
}
