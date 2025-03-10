import selectors from "../selectors";
import svgAssets from "./svgAssets";
import addStyles, { removeStyles } from "./utilities/addStyles";
import addTooltip from "./utilities/addTooltip";
import { createTypefullyUrl } from "./utilities/createTypefullyUrl";
import { removeElementById } from "./utilities/removeElement";
import addTypefullyBox from "./utilities/addTypefullyBox";

const MODAL_PLUG_ID = "typefully-link";
const INLINE_PLUG_ID = "typefully-link-inline";
const REPLY_PLUG_ID = "typefully-reply-link";
const SCHEDULE_PLUG_ID = "typefully-schedule-link";

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

    const url = createTypefullyUrl({
      utm_content: "save-draft-callout",
    });

    const innerHTML = `<ul>
  <li>💬 Share your drafts and get comments</li>
  <li>🤖 Improve your tweets with AI</li>
  <li>📈 Track your growth with insights and metrics</li>
  <li>📆 Schedule for later</li>
</ul>
<p>Powered by <a href="${url}" target="_blank">Typefully</a>, the makers of the Minimal Twitter extension.</p>`;

    addTypefullyBox(
      modal,
      innerHTML,
      {
        withArrow: true,
      }
    );

    modal.appendChild(element);
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

export const addTypefullySecurityAndAccountAccessPlug = () => {
  const securityAndAccountAccess = document.querySelector(selectors.securityAndAccountAccess);

  if (securityAndAccountAccess && !document.getElementById("typefully-callout-box")) {
    const url = createTypefullyUrl({
      utm_content: "typefully-teams-callout"
    });

    const innerHTML = `<p>You can use <a href="${url}" target="_blank">Typefully</a> to easily collaborate on multiple Twitter accounts with your team or clients and to share & comment on draft posts.</p>`;

    addTypefullyBox(
      securityAndAccountAccess,
      innerHTML,
      {
        className: "typefully-teams-box",
        withArrow: false,
      }
    );
  }
};

export const addTypefullySchedulePlug = () => {
  const scheduleConfirmButton = document.querySelector('[data-testid="scheduledConfirmationPrimaryAction"]');

  if (scheduleConfirmButton && !document.getElementById("typefully-schedule-button")) {
    const scheduleButton = scheduleConfirmButton.cloneNode(true);

    // remove data-testid from the scheduleButton
    scheduleButton.removeAttribute("data-testid");

    // remove any elements inside the scheduleButton
    scheduleButton.innerHTML = "";

    const element = createTypefullyLinkElement(SCHEDULE_PLUG_ID, "typefully-schedule-link");
    const typefullyLogo = createTypefullyLogo();
    const typefullyText = document.createElement("div");

    element.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully(null, "schedule-button");
    });

    typefullyText.innerText = "Schedule with Typefully";
    element.appendChild(typefullyLogo);
    element.appendChild(typefullyText);

    scheduleButton.appendChild(element);
    scheduleButton.id = "typefully-schedule-button";

    addTooltip(scheduleButton, {
      id: "typefully-schedule-tooltip",
      title: "Schedule with Typefully",
      description: "Grow an audience faster with Typefully's social media scheduling tool.",
    });

    scheduleConfirmButton.parentElement.insertBefore(scheduleButton, scheduleConfirmButton);
  }
}

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

export const getCurrentTextAndSendToTypefully = (replyingToLink, utm_content) => {
  let tweetTextAreaNumber = 0;
  let typefullyContent = "";

  while (true) {
    if (document.querySelector(`[data-testid="tweetTextarea_${tweetTextAreaNumber}"]`)) {
      if (tweetTextAreaNumber > 0) {
        typefullyContent = `${typefullyContent}---typefully-split---`;
      }

      let tweetTextItems = Array.from(document.querySelectorAll(`[data-testid="tweetTextarea_${tweetTextAreaNumber}"] [data-text="true"]`));

      // remove trailing newlines at end of tweets (there is always one last <br> on the first tweet DOM node)
      tweetTextItems = tweetTextItems.filter((item, index) => !(item.tagName === "BR" && index === tweetTextItems.length - 1));

      tweetTextItems.forEach((item, index) => {
        const isLastItem = index === tweetTextItems.length - 1;
        const isTagOrMention = (item) => !!item.parentElement.parentElement.attributes.style;

        if (item.tagName === "BR" && !isLastItem && index !== 0) {
          typefullyContent += "\n";
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
    utm_content: utm_content ?? "save-draft-button",
    new: typefullyContent,
    ...(replyingToLink && { replyTo: replyingToLink }),
  });

  window.open(url.toString());
};
