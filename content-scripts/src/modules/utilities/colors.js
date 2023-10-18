export const getCurrentTheme = () => {
  const body = document.querySelector("body");
  const bodyBackgroundColor = window.getComputedStyle(body).backgroundColor;

  if (bodyBackgroundColor === "rgb(255, 255, 255)") {
    return "white";
  } else if (bodyBackgroundColor === "rgb(21, 32, 43)") {
    return "dim";
  } else if (bodyBackgroundColor === "rgb(0, 0, 0)") {
    return "black";
  }
};

const extractColor = (selector, varName) => {
  const element = document.querySelector(selector);
  if (element) {
    const color = window.getComputedStyle(element).color;
    const root = document.documentElement;
    const existingColor = root.style.getPropertyValue(`--${varName}-color`);

    if (!existingColor) {
      const colorRgb = color.replace("rgb(", "").replace(")", "");
      root.style.setProperty(`--${varName}-color`, color);
      root.style.setProperty(`--${varName}-color-rgb`, colorRgb);
    }
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

export const colorsAreSet = () => {
  const root = document.documentElement;
  const bodyBgColor = root.style.getPropertyValue("--body-bg-color");
  const mainTextColor = root.style.getPropertyValue("--main-text-color");
  const secondaryTextColor = root.style.getPropertyValue("--secondary-text-color");
  const accentColor = root.style.getPropertyValue("--accent-color");
  const glyphsColor = root.style.getPropertyValue("--glyphs-color");

  if (bodyBgColor && mainTextColor && secondaryTextColor && accentColor && glyphsColor) {
    return true;
  } else {
    return false;
  }
};
