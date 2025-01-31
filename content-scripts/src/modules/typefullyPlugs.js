import svgAssets from "./svgAssets";
import addStyles, { removeStyles } from "./utilities/addStyles";
import addTooltip from "./utilities/addTooltip";
import { createTypefullyUrl } from "./utilities/createTypefullyUrl";
import { removeElementById } from "./utilities/removeElement";

const MODAL_PLUG_ID = "typefully-link";
const INLINE_PLUG_ID = "typefully-link-inline";
const REPLY_PLUG_ID = "typefully-reply-link";

// Function to add "Continue draft in Typefully" in the page inline composer and the modal composer
export const addTypefullyComposerPlug = () => {
  const existingReplyPlug = document.getElementById(REPLY_PLUG_ID);

  // If there's a reply plug already, let's not add this regular plug
  if (existingReplyPlug) return;

  const modal = document.querySelector('[aria-labelledby="modal-header"][role="dialog"]');
  const tweetComposeArea = modal?.querySelector("div.public-DraftStyleDefault-block");
  const tweetButtonInlineDisabled = document.querySelector(`[data-testid="tweetButtonInline"][aria-disabled]`);
  const tweetButtonInlineNotDisabled = document.querySelector(`[data-testid="tweetButtonInline"]:not([aria-disabled])`);

  // Modal plug
  if (modal && tweetComposeArea && !document.getElementById(MODAL_PLUG_ID)) {
    const element = createTypefullyLinkElement(MODAL_PLUG_ID, "typefully-save-draft-button");
    const typefullyLogo = createTypefullyLogo();
    const typefullyText = document.createElement("span");

    element.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully();
    });

    typefullyText.innerText = "Save draft to Typefully";
    element.appendChild(typefullyLogo);
    element.appendChild(typefullyText);
    modal.appendChild(element);

    addTooltip(element, {
      id: "typefully-tooltip",
      description: "Save all your post ideas, enhance with AI, schedule, and boost engagement.",
    });
  }

  if (tweetButtonInlineDisabled && document.getElementById(INLINE_PLUG_ID)) {
    removeElementById(INLINE_PLUG_ID);
    removeStyles(INLINE_PLUG_ID);
  }

  // Inline plug
  if (tweetButtonInlineNotDisabled && !document.getElementById(INLINE_PLUG_ID)) {
    const tweetButtonInline = document.querySelector(`[data-testid="tweetButtonInline"]`);
    const container = tweetButtonInline.parentElement;
    const element = createTypefullyLinkElement(INLINE_PLUG_ID, "typefully-save-draft-button ghost");
    const typefullyLogo = createTypefullyLogo();

    element.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully();
    });
    element.appendChild(typefullyLogo);
    container.appendChild(element);

    addStyles(
      INLINE_PLUG_ID,
      `[data-testid="tweetButtonInline"] {
        margin-left: 8px;
        order: 2;
      }`
    );

    addTooltip(element, {
      id: "typefully-tooltip",
      title: "Save draft in Typefully",
      description: "Save all your post ideas, enhance with AI, schedule, and boost engagement.",
    });
  }
};

const REPLY_TO_STORAGE_KEY = "typefully-replying-to";

// Function to save current reply-to link so we can use it in the plug below
export const saveCurrentReplyToLink = () => {
  const reply = Array.from(document.querySelectorAll('[data-testid="reply"]'));

  if (!reply.length) return;

  function logLink(ev) {
    const linkElement = ev.target;
    const tweet = linkElement.closest('[data-testid="tweet"]');
    const tweetLinks = tweet.querySelectorAll("a[role='link']");
    const tweetLink = Array.from(tweetLinks).find((link) => link.href.includes("/status/")).href;
    sessionStorage.setItem(REPLY_TO_STORAGE_KEY, tweetLink);
  }

  reply.forEach((replyButton) => {
    replyButton.removeEventListener("click", logLink);
    replyButton.addEventListener("click", logLink);
  });
};

// Function to add "Reply with Typefully"
export const addTypefullyReplyPlug = () => {
  setTimeout(() => {
    const modal = document.querySelector('[aria-labelledby="modal-header"][role="dialog"]');
    const toolbar = modal && modal.querySelector('[data-testid="toolBar"]');
    const replyButton = modal && modal.querySelector('[data-testid="tweetButton"]');

    const tweetComposeArea = modal?.querySelector("div.public-DraftStyleDefault-block");

    const replyingToLink = sessionStorage.getItem(REPLY_TO_STORAGE_KEY);

    if (modal && toolbar && replyButton && replyingToLink && tweetComposeArea && !document.getElementById(REPLY_PLUG_ID)) {
      sessionStorage.removeItem(REPLY_TO_STORAGE_KEY);

      const typefullyReplyLinkElement = createTypefullyLinkElement(REPLY_PLUG_ID, "typefully-reply-button");
      typefullyReplyLinkElement.addEventListener("click", () => {
        getCurrentTextAndSendToTypefully(replyingToLink);
      });

      const typefullyLogo = createTypefullyLogo();

      const typefullyText = document.createElement("span");
      typefullyText.innerText = "Reply with Typefully";

      typefullyReplyLinkElement.appendChild(typefullyLogo);
      typefullyReplyLinkElement.appendChild(typefullyText);

      const existingDraftPlug = document.getElementById(MODAL_PLUG_ID);

      if (existingDraftPlug) {
        existingDraftPlug.replaceWith(typefullyReplyLinkElement);
      } else {
        modal.appendChild(typefullyReplyLinkElement);
      }
    }
    // A small delay so let the regular drag plug appear first, so we can replace it
  }, 100);
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
  typefullyLogo.className = "typefully-logo";
  typefullyLogo.innerHTML = svgAssets.typefully.logo;
  typefullyLogo.style.position = "relative";
  return typefullyLogo;
};

export const getCurrentTextAndSendToTypefully = (replyingToLink) => {
  let tweetTextAreaNumber = 0;
  let typefullyContent = "";

  while (true) {
    if (document.querySelector(`[data-testid="tweetTextarea_${tweetTextAreaNumber}"]`)) {
      if (tweetTextAreaNumber > 0) {
        typefullyContent = `${typefullyContent}\n\n\n\n\n`;
      }

      let tweetTextItems = Array.from(document.querySelectorAll(`[data-testid="tweetTextarea_${tweetTextAreaNumber}"] [data-text="true"]`));

      // remove trailing newlines at end of tweets (there is always one last <br> on the first tweet DOM node)
      tweetTextItems = tweetTextItems.filter((item, index) => !(item.tagName === "BR" && index === tweetTextItems.length - 1));

      tweetTextItems.forEach((item, index) => {
        const isLastItem = index === tweetTextItems.length - 1;
        const isTagOrMention = (item) => !!item.parentElement.parentElement.attributes.style;

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

  const url = createTypefullyUrl({
    utm_content: "save-draft-button",
    new: typefullyContent,
    ...(replyingToLink && { replyTo: replyingToLink }),
  });

  window.open(url.toString());
};
