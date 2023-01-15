import svgAssets from "./svgAssets";
import removeElement from "./utilities/removeElement";

// Function to add "Continue Thread in Typefully"
export const addTypefullyPlug = () => {
  const modal = document.querySelector(
    '[aria-labelledby="modal-header"][role="dialog"]'
  );
  const tweetComposeArea = modal?.querySelector(
    "div.public-DraftStyleDefault-block"
  );
  const tweet2Exist = document.querySelector(`[data-testid="tweetTextarea_1"]`);
  const tweetButtonInlineDisabled = document.querySelector(
    `[data-testid="tweetButtonInline"][aria-disabled]`
  );
  const tweetButtonInlineNotDisabled = document.querySelector(
    `[data-testid="tweetButtonInline"]:not([aria-disabled])`
  );

  if (
    modal &&
    tweet2Exist &&
    tweetComposeArea &&
    !document.getElementById("typefully-link")
  ) {
    const typefullyLinkElement = createTypefullyLinkElement(
      "typefully-link",
      "typefully-save-draft-button"
    );
    const typefullyLogo = createTypefullyLogo();
    const typefullyText = document.createElement("span");

    typefullyLinkElement.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully();
    });

    typefullyText.innerText = "Save draft to Typefully";
    typefullyLinkElement.appendChild(typefullyLogo);
    typefullyLinkElement.appendChild(typefullyText);
    modal.appendChild(typefullyLinkElement);
  }

  if (tweetButtonInlineDisabled && document.getElementById("typefully-link")) {
    removeElement("typefully-link");
  }

  if (
    tweetButtonInlineNotDisabled &&
    !document.getElementById("typefully-link")
  ) {
    const tweetButtonInline = document.querySelector(
      `[data-testid="tweetButtonInline"]`
    );
    const container = tweetButtonInline.parentElement;
    const typefullyLinkElement = createTypefullyLinkElement(
      "typefully-link",
      "typefully-save-draft-button"
    );
    const typefullyLogo = createTypefullyLogo();
    const typefullyText = document.createElement("span");

    typefullyLinkElement.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully();
    });
    typefullyText.innerText = "Save draft";
    typefullyLinkElement.appendChild(typefullyLogo);
    typefullyLinkElement.appendChild(typefullyText);
    typefullyLinkElement.style.marginLeft = "8px";
    container.appendChild(typefullyLinkElement);
  }
};

// Function to save current reply
export const saveCurrentReplyToLink = () => {
  const reply = Array.from(document.querySelectorAll('[data-testid="reply"]'));

  if (!reply.length) return;

  function logLink(ev) {
    const linkElement = ev.target;
    const tweet = linkElement.closest('[data-testid="tweet"]');
    const tweetLinks = tweet.querySelectorAll("a[role='link']");
    const tweetLink = Array.from(tweetLinks).find((link) =>
      link.href.includes("/status/")
    ).href;
    sessionStorage.setItem("typefully-replying-to", tweetLink);
  }

  reply.forEach((replyButton) => {
    replyButton.removeEventListener("click", logLink);
    replyButton.addEventListener("click", logLink);
  });
};

// Function to add "Reply with Typefully"
export const addTypefullyReplyPlug = () => {
  const modal = document.querySelector(
    '[aria-labelledby="modal-header"][role="dialog"]'
  );
  const toolbar = modal && modal.querySelector('[data-testid="toolBar"]');
  const replyButton =
    modal && modal.querySelector('[data-testid="tweetButton"]');

  const tweetComposeArea = modal?.querySelector(
    "div.public-DraftStyleDefault-block"
  );

  const replyingToLink = sessionStorage.getItem("typefully-replying-to");

  if (
    modal &&
    toolbar &&
    replyButton &&
    replyingToLink &&
    // tweet2Exist &&
    tweetComposeArea &&
    !document.getElementById("typefully-reply-link")
  ) {
    sessionStorage.removeItem("typefully-replying-to");

    const typefullyReplyLinkElement = createTypefullyLinkElement(
      "typefully-reply-link",
      "typefully-reply-button"
    );
    typefullyReplyLinkElement.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully(replyingToLink);
    });

    const typefullyLogo = createTypefullyLogo();

    const typefullyText = document.createElement("span");
    typefullyText.innerText = "Reply with Typefully";

    typefullyReplyLinkElement.appendChild(typefullyLogo);
    typefullyReplyLinkElement.appendChild(typefullyText);

    modal.appendChild(typefullyReplyLinkElement);
  }
};

/* ----------------------------- Typefully Utils ---------------------------- */

export const createTypefullyLinkElement = (id, className) => {
  const typefullyReplyLink = document.createElement("a");
  typefullyReplyLink.id = id;
  typefullyReplyLink.className = className;
  typefullyReplyLink.setAttribute("role", "button");
  typefullyReplyLink.setAttribute("tabindex", "0");
  return typefullyReplyLink;
};

export const createTypefullyLogo = () => {
  const typefullyLogo = document.createElement("div");
  typefullyLogo.innerHTML = svgAssets.typefully.logo;
  typefullyLogo.style.position = "relative";
  typefullyLogo.style.margin = "0 2px -4px 3px";
  return typefullyLogo;
};

export const getCurrentTextAndSendToTypefully = (replyingToLink) => {
  let tweetTextAreaNumber = 0;
  let typefullyContent = "";

  while (true) {
    if (
      document.querySelector(
        `[data-testid="tweetTextarea_${tweetTextAreaNumber}"]`
      )
    ) {
      if (tweetTextAreaNumber > 0) {
        typefullyContent = `${typefullyContent}\n\n\n\n\n`;
      }

      let tweetTextItems = Array.from(
        document.querySelectorAll(
          `[data-testid="tweetTextarea_${tweetTextAreaNumber}"] [data-text="true"]`
        )
      );

      // remove trailing newlines at end of tweets (there is always one last <br> on the first tweet DOM node)
      tweetTextItems = tweetTextItems.filter(
        (item, index) =>
          !(item.tagName === "BR" && index === tweetTextItems.length - 1)
      );

      tweetTextItems.forEach((item, index) => {
        const isLastItem = index === tweetTextItems.length - 1;
        const isTagOrMention = (item) =>
          !!item.parentElement.parentElement.attributes.style;

        // handle hard break (2 newlines) within single tweet
        if (item.tagName === "BR" && !isLastItem) {
          typefullyContent += "\n\n";
        }
        // handle regular text (<span> elements)
        else {
          typefullyContent = `${typefullyContent}${item.innerText}`;

          // this handles non-hard breaks (just one newline) within a single tweet
          if (!isLastItem && !isTagOrMention(tweetTextItems[index + 1])) {
            typefullyContent += "\n";
          }
        }
      });
    } else {
      break;
    }

    tweetTextAreaNumber = tweetTextAreaNumber + 1;
  }

  // With URLSearchParams
  const url = new URL("https://typefully.com/");
  url.searchParams.set("ref", "minimal-twitter");
  url.searchParams.set("new", typefullyContent);
  if (replyingToLink) {
    url.searchParams.set("replyTo", replyingToLink);
  }
  window.open(url.toString());
};
