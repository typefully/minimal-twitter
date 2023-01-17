import removeElement from "../utilities/removeElement";

// Function to change user edited CSS
export const changeCSSTextEdited = (cssTextEdited) => {
  if (cssTextEdited) {
    // First remove before adding
    removeElement("cssTextEdited");

    const externalStylesheet = document.getElementById(
      "mt-external-stylesheet"
    );
    const head = document.querySelector("head");
    const style = document.createElement("style");
    style.id = "cssTextEdited";
    style.textContent = `${cssTextEdited}`;
    head.insertBefore(style, externalStylesheet.nextSibling);
  }
  return;
};
