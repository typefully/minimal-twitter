import addStyles, { removeStyles } from "../utilities/addStyles";

// Function to change Typefully Composer Buttons
export const changeTypefullyEnhancementsButtons = (typefullyEnhancementsButtons) => {
  switch (typefullyEnhancementsButtons) {
    case "off":
      addStyles(
        "typefullyEnhancementsButtons",
        `
        #typefully-link, 
        #typefully-link-inline,
        #typefully-reply-link, 
        #typefully-writermode-link, 
        #typefully-callout-box,
        #typefully-schedule-button,
        #typefully-image-download-button,
        #typefully-gif-download-button,
        #typefully-video-download-button {
          display: none;
        }
        `
      );
      break;

    case "on":
      removeStyles("typefullyEnhancementsButtons");
      break;
  }
};
