import addStyles, { removeStyles } from "../utilities/addStyles";

// Function to change Typefully Composer Buttons
export const changeTypefullyComposerButtons = (typefullyComposerButtons) => {
  switch (typefullyComposerButtons) {
    case "off":
      addStyles(
        "typefullyComposerButtons",
        `
        #typefully-link, 
        #typefully-link-inline,
        #typefully-reply-link, 
        #typefully-writermode-link, 
        #typefully-writermode-box {
          display: none;
        }
        `
      );
      break;

    case "on":
      removeStyles("typefullyComposerButtons");
      break;
  }
};
