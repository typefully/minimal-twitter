import { addStyles, removeElement } from "../utilities";

// Function to change Timeline Width
export const changeTimelineWidth = (timelineWidth) => {
  switch (timelineWidth) {
    case 600:
      addStyles(
        "mt-timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          [data-testid="primaryColumn"] {
            width: 600px !important;
            max-width: 600px !important;
          }
        }
        `
      );
      break;
    case 650:
      addStyles(
        "mt-timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          [data-testid="primaryColumn"] {
            width: 650px !important;
            max-width: 650px !important;
          }
        }
        `
      );
      break;
    case 700:
      addStyles(
        "mt-timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          [data-testid="primaryColumn"] {
            width: 700px !important;
            max-width: 700px !important;
          }
        }
        `
      );
      break;
    case 750:
      addStyles(
        "mt-timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          [data-testid="primaryColumn"] {
            width: 750px !important;
            max-width: 750px !important;
          }
        }
        `
      );
      break;
    case 800:
      addStyles(
        "mt-timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          [data-testid="primaryColumn"] {
            width: 800px !important;
            max-width: 800px !important;
          }
        }
        `
      );
      break;
  }
};

// Function to change Timeline Borders
export const changeTimelineBorders = (timelineBorders) => {
  switch (timelineBorders) {
    case "on":
      removeElement("mt-timelineBorders");
      break;

    case "off":
      addStyles(
        "mt-timelineBorders",
        `
        @media only screen and (min-width: 988px) {
          div[data-testid="primaryColumn"] {
            border-style: hidden !important;
          }
        }
        `.trim()
      );
      break;
  }
};

// Function to change Tweet Borders
export const changeTweetBorders = (tweetBorders) => {
  switch (tweetBorders) {
    case "on":
      removeElement("mt-tweetBorders");
      break;

    case "off":
      addStyles(
        "mt-tweetBorders",
        `
        main[role="main"] section > div > div > div > div {
          border-style: hidden !important;
        }
        [data-testid="primaryColumn"] > div > div:empty {
          background: transparent !important;
        }
        `.trim()
      );
      break;
  }
};
