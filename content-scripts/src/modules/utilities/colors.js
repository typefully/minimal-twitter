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
    const root = document.documentElement;

    if (!color) return;

    const colorVarAlreadySet = root.style.getPropertyValue(`--${varName}-color`);

    if (colorVarAlreadySet) return;

    const colorRgb = color.replace("rgb(", "").replace(")", "");
    root.style.setProperty(`--${varName}-color`, color);
    root.style.setProperty(`--${varName}-color-rgb`, colorRgb);
  }
};

export const extractColorsAsRootVars = () => {
  extractColor("body", "body-bg");
  extractColor('[data-testid="primaryColumn"]', "border");
  extractColor("h2 > span", "main-text");
  extractColor("div > span", "main-text");
  extractColor("a > time", "secondary-text");
  extractColor("[data-testid='primaryColumn'] div[aria-haspopup='menu'] > div > div > svg", "secondary-text");
  extractColor("a", "accent");
  extractColor("div > svg", "glyphs");
};
