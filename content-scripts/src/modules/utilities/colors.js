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

export const extractColorsAsRootVars = () => {
  const root = document.documentElement;

  const bodyBgColor = window.getComputedStyle(
    document.querySelector("body")
  ).backgroundColor;
  root.style.setProperty("--body-bg-color", bodyBgColor);

  const borderColor = window.getComputedStyle(
    document.querySelector('[data-testid="primaryColumn"]')
  ).borderColor;
  root.style.setProperty("--border-color", borderColor);

  const mainText =
    document.querySelector("h2 > span") || document.querySelector("div > span");
  if (mainText) {
    const mainTextColor = window.getComputedStyle(mainText).color;
    root.style.setProperty("--main-text-color", mainTextColor);

    const mainTextColorRgb = mainTextColor.replace("rgb(", "").replace(")", "");
    root.style.setProperty("--main-text-color-rgb", mainTextColorRgb);
  }

  const secondaryText =
    document.querySelector("a > time") ||
    document.querySelector(
      "[data-testid='primaryColumn'] div[aria-haspopup='menu'] > div > div > svg"
    );
  if (secondaryText) {
    const secondaryTextColor = window.getComputedStyle(secondaryText).color;
    root.style.setProperty("--secondary-text-color", secondaryTextColor);

    const secondaryTextColorRgb = secondaryTextColor
      .replace("rgb(", "")
      .replace(")", "");
    root.style.setProperty("--secondary-text-color-rgb", secondaryTextColorRgb);
  }

  const link = document.querySelector("a");
  if (link) {
    const accentColor = window.getComputedStyle(link).color;
    root.style.setProperty("--accent-color", accentColor);

    const accentColorRgb = accentColor.replace("rgb(", "").replace(")", "");
    root.style.setProperty("--accent-color-rgb", accentColorRgb);
  }

  const glyphs = document.querySelector("div > svg");
  if (glyphs) {
    const glyphsColor = window.getComputedStyle(glyphs).color;
    root.style.setProperty("--glyphs-color", glyphsColor);

    const glyphsColorRgb = glyphsColor.replace("rgb(", "").replace(")", "");
    root.style.setProperty("--glyphs-color-rgb", glyphsColorRgb);
  }
};

export const colorsAreSet = () => {
  const root = document.documentElement;
  const bodyBgColor = root.style.getPropertyValue("--body-bg-color");
  const mainTextColor = root.style.getPropertyValue("--main-text-color");
  const secondaryTextColor = root.style.getPropertyValue(
    "--secondary-text-color"
  );
  const accentColor = root.style.getPropertyValue("--accent-color");
  const glyphsColor = root.style.getPropertyValue("--glyphs-color");

  if (
    bodyBgColor &&
    mainTextColor &&
    secondaryTextColor &&
    accentColor &&
    glyphsColor
  ) {
    return true;
  } else {
    return false;
  }
};
