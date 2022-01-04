// Utility function to inject CSS into page
const addStyles = (css) => {
  var head = document.querySelector("head");
  var style = document.createElement("style");
  style.textContent = `${css}`;
  head.appendChild(style);
};

// Function to change feed width
const changeFeedWidth = (feedWidth) => {
  switch (feedWidth) {
    case 600:
      addStyles(`
      [data-testid="primaryColumn"] {
        width: 600px !important;
        max-width: 600px !important;
      }
      `);
      break;
    case 650:
      addStyles(`
      [data-testid="primaryColumn"] {
        width: 650px !important;
        max-width: 650px !important;
      }
      `);
      break;
    case 700:
      addStyles(`
      [data-testid="primaryColumn"] {
        width: 700px !important;
        max-width: 700px !important;
      }
      `);
      break;
    case 750:
      addStyles(`
      [data-testid="primaryColumn"] {
        width: 750px !important;
        max-width: 750px !important;
      }
      `);
      break;
    case 800:
      addStyles(`
      [data-testid="primaryColumn"] {
        width: 800px !important;
        max-width: 800px !important;
      }
      `);
      break;
  }
};

/*--
- Listen to Chrome Storage changes
- Inject styles in respond to changes:
  - 1. Feed Width
  - 2. Feed Borders
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#synchronous-response-to-storage-updates
--*/
chrome.storage.onChanged.addListener((changes) => {
  // 1. Respond to feed width changes
  const feedWidth = changes["feedWidth"];
  changeFeedWidth(feedWidth.newValue);

  // 2. Respond to feed borders changes
  // const feedBorders = changes["feedBorders"];
  // if (feedBorders.newValue === true) {
  // }
});

const init = () => {
  chrome.storage.sync.get(["feedWidth"], (result) => {
    changeFeedWidth(result.feedWidth);
  });
};

init();
