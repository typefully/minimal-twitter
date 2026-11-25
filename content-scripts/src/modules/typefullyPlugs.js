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

const SAVE_DRAFT_CALLOUT = (url) => `<ul>
  <li>💬 Share your drafts and get comments</li>
  <li>🤖 Improve your tweets with AI</li>
  <li>📈 Track your growth with insights and metrics</li>
  <li>📆 Schedule for later</li>
</ul>
<p>Powered by <a href="${url}" target="_blank">Typefully</a>, the makers of the Minimal Twitter extension.</p>`;

// Function to add "Continue draft in Typefully" in the page inline composer and the modal composer
export const addTypefullyComposerPlug = () => {
  if (document.querySelector(selectors.newApp.root)) {
    addNewAppComposerPlugs();
    return;
  }

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

    addTypefullyBox(modal, SAVE_DRAFT_CALLOUT(url), {
      withArrow: true,
    });

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

// Module-level so re-adding it on every dynamic features pass is a no-op instead of
// stacking another listener on each reply button.
function logLink(ev) {
  const linkElement = ev.target;
  const tweet = linkElement.closest('[data-testid="tweet"]');
  const tweetLinks = tweet.querySelectorAll("a[role='link']");
  const tweetLink = Array.from(tweetLinks).find((link) => link.href.includes("/status/")).href;
  sessionStorage.setItem(REPLY_TO_STORAGE_KEY, tweetLink);
}

// Function to save current reply-to link so we can use it in the plug below
export const saveCurrentReplyToLink = () => {
  const reply = Array.from(document.querySelectorAll('[data-testid="reply"]'));

  if (!reply.length) return;

  reply.forEach((replyButton) => {
    replyButton.addEventListener("click", logLink);
  });
};

/* ------------------------- X's rewritten web app ------------------------- */

// Its composer is a plain <textarea> per post, and replies open it at /compose/post?in_reply_to=<id>
const addNewAppComposerPlugs = () => {
  const dialog = document.querySelector(selectors.newApp.composerDialog);
  const modalBody = dialog?.querySelector('[data-slot="xds-modal-body"]');
  const replyingToLink = getNewAppReplyingToLink();
  const plugId = replyingToLink ? REPLY_PLUG_ID : MODAL_PLUG_ID;

  // X can keep the dialog mounted from a new post to a reply, so swap a plug made for the other one
  const otherPlug = document.getElementById(replyingToLink ? MODAL_PLUG_ID : REPLY_PLUG_ID);
  if (otherPlug) {
    otherPlug.remove();
    // Only the dialog's own callout: Writer Mode keeps one in <main> with the same id
    modalBody?.querySelector("#typefully-callout-box")?.remove();
  }

  if (modalBody && !document.getElementById(plugId)) {
    const element = replyingToLink
      ? createTypefullyLinkElement(REPLY_PLUG_ID, "typefully-reply-button")
      : createTypefullyLinkElement(MODAL_PLUG_ID, "typefully-save-draft-button");
    const typefullyText = document.createElement("span");

    typefullyText.innerText = replyingToLink ? "Reply with Typefully" : "Save draft to Typefully";
    element.appendChild(createTypefullyLogo());
    element.appendChild(typefullyText);
    // Read the replied post at click time: X can keep the dialog, and this plug, from one reply to the next
    element.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully(replyingToLink ? getNewAppReplyingToLink() : null);
    });

    if (!replyingToLink) {
      addTypefullyBox(modalBody, SAVE_DRAFT_CALLOUT(createTypefullyUrl({ utm_content: "save-draft-callout" })), {
        withArrow: true,
      });
    }

    modalBody.appendChild(element);
  }

  // The inline composer's last button is Post. typefully.css hides the plug while Post is disabled (no text),
  // since typing only toggles that attribute and the mutation observer doesn't watch attributes.
  const inlineForm = document.querySelector(`main ${selectors.newApp.composerForm}`);
  const postButton = inlineForm && [...inlineForm.querySelectorAll(selectors.newApp.composerButton)].pop();
  const inlinePlug = document.getElementById(INLINE_PLUG_ID);

  if (!postButton) {
    inlinePlug?.remove();
    return;
  }

  if (inlinePlug) return;

  const element = createTypefullyLinkElement(INLINE_PLUG_ID, "typefully-save-draft-button ghost");
  element.appendChild(createTypefullyLogo());
  element.addEventListener("click", () => {
    getCurrentTextAndSendToTypefully();
  });
  postButton.insertAdjacentElement("beforebegin", element);

  addTooltip(element, {
    id: "typefully-tooltip",
    title: "Save draft in Typefully",
    description: "Save all your post ideas, enhance with AI, schedule, and boost engagement.",
  });
};

// The composer's open schedule trigger points at its picker, whose last button confirms
const getNewAppScheduleButton = () => {
  const trigger = document.querySelector(selectors.newApp.composerScheduleTrigger);
  const picker = trigger && document.getElementById(trigger.getAttribute("aria-controls"));

  return picker ? [...picker.querySelectorAll(selectors.newApp.composerButton)].pop() : null;
};

// Replies open the composer at /compose/post?in_reply_to=<id>
const getNewAppReplyingToLink = () => {
  const replyingTo = new URLSearchParams(window.location.search).get("in_reply_to");
  return /^\d+$/.test(replyingTo ?? "") ? getNewAppPostUrl(replyingTo) : null;
};

const getNewAppPostUrl = (postId) => {
  const postPath = document.querySelector(`[data-href$="/status/${postId}"]`)?.dataset.href;
  return `https://x.com${postPath ?? `/i/status/${postId}`}`;
};

// One textarea per post in a thread, in the open dialog or else the page's inline composer
const getNewAppComposerText = () => {
  const composer = document.querySelector(selectors.newApp.composerDialog) ?? document.querySelector(`main ${selectors.newApp.composerForm}`);

  return [...(composer?.querySelectorAll("textarea") ?? [])].map((textarea) => textarea.value).join("---typefully-split---");
};

// Function to add "Reply with Typefully"
export const addTypefullyReplyPlug = () => {
  // X's rewritten web app gets its reply plug from addNewAppComposerPlugs
  if (document.querySelector(selectors.newApp.root)) return;

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
  const scheduleConfirmButton = document.querySelector('[data-testid="scheduledConfirmationPrimaryAction"]') ?? getNewAppScheduleButton();

  if (scheduleConfirmButton && !document.getElementById("typefully-schedule-button")) {
    const scheduleButton = scheduleConfirmButton.cloneNode(true);

    // remove data-testid from the scheduleButton, and anything that would make the clone submit or stay inert
    scheduleButton.removeAttribute("data-testid");
    scheduleButton.removeAttribute("disabled");
    scheduleButton.setAttribute("type", "button");

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
  let typefullyContent = document.querySelector(selectors.newApp.root) ? getNewAppComposerText() : "";

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
