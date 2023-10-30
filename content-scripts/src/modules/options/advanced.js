export const changeCustomCss = (cssText) => {
  const existingStyleEl = document.getElementById("custom-css");
  if (existingStyleEl) {
    existingStyleEl.textContent = cssText;
  } else {
    const externalStylesheet = document.getElementById("mt-external-stylesheet");
    if (!externalStylesheet) return;
    const head = document.querySelector("head");
    const styleEl = document.createElement("style");
    styleEl.id = "custom-css";
    styleEl.textContent = cssText;
    head.insertBefore(styleEl, externalStylesheet.nextSibling);
  }
};
