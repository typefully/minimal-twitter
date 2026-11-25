const extractColor = (selector, varName) => {
  const element = document.querySelector(selector);
  if (element) {
    let color;
    if (varName.includes("bg")) {
      color = window.getComputedStyle(element).backgroundColor;
    } else if (varName.includes("border")) {
      color = window.getComputedStyle(element).borderColor;
    } else {
      color = window.getComputedStyle(element).color;
    }
    setRootColor(varName, color);
  }
};

// X's rewritten web app defines its theme colors as CSS variables, so they're known before content renders.
// The probe sits in <head>, where the mutation observer ignores changes.
const extractColorFromVariable = (cssVariable, varName) => {
  if (!getComputedStyle(document.documentElement).getPropertyValue(cssVariable)) return;

  const probe = document.createElement("span");
  probe.style.color = `var(${cssVariable})`;
  document.head.appendChild(probe);
  setRootColor(varName, getComputedStyle(probe).color);
  probe.remove();
};

const setRootColor = (varName, color) => {
  const root = document.documentElement;

  if (!color) return;

  const colorVarAlreadySet = root.style.getPropertyValue(`--${varName}-color`);

  if (colorVarAlreadySet) return;

  const colorRgb = color.replace("rgb(", "").replace(")", "");
  root.style.setProperty(`--${varName}-color`, color);
  root.style.setProperty(`--${varName}-color-rgb`, colorRgb);
};

export const extractColorsAsRootVars = () => {
  extractColor("body", "body-bg");
  extractColor('[data-testid="primaryColumn"]', "border");
  // X's rewritten web app: the first color found wins, so these come before the generic fallbacks
  extractColor("html[data-app-version] main", "border");
  extractColorFromVariable("--x-fg-brand", "accent");
  extractColor("h2 > span", "main-text");
  extractColor("div > span", "main-text");
  extractColor("a > time", "secondary-text");
  extractColor("[data-testid='primaryColumn'] div[aria-haspopup='menu'] > div > div > svg", "secondary-text");
  extractColor("a", "accent");
  extractColor("div > svg", "glyphs");
};
