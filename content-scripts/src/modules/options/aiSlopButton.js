import selectors from "../../selectors";
import addStyles, { removeStyles } from "../utilities/addStyles";

const BUTTON_CLASS = "mt-ai-slop-button";
const CONTROL_CLASS = "mt-ai-slop-control";
const TWEET_CLASS = "mt-ai-slop-tweet";
const STYLE_ID = "aiSlopButton";
const DIALOG_SELECTOR = '[role="dialog"]';
const MENU_SELECTOR = '[role="menu"]';
const ACTION_SELECTOR = 'button, [role="button"], [role="menuitem"], [role="radio"], label, [tabindex="0"]';
const AI_SLOP_ICON_PATHS = [
  "M16.4833 22.2777C16.3184 23.3047 15.508 23.996 14.4943 23.9961C12.2459 23.9964 9.99752 23.9975 7.74914 24C6.56047 24.0013 5.69754 23.1776 5.73401 21.9847C5.75153 21.4113 5.61855 21.1064 5.06297 20.8144C3.65508 20.0743 2.93385 18.8233 2.80853 17.2352C2.80503 17.1908 2.79701 17.1468 2.79223 17.1111C1.35444 16.9004 0.415209 16.1096 0.133396 14.6992C-0.0997623 13.5323 -0.0896994 12.3537 0.677551 11.3239C1.20367 10.6177 1.90879 10.2316 2.777 10.1557C2.81573 9.77423 2.82899 9.39645 2.89571 9.02837C3.23145 7.17648 4.78465 5.67963 6.64471 5.50386C7.64359 5.40947 8.65598 5.4571 9.66231 5.44319C9.98418 5.43874 10.3062 5.44249 10.6565 5.44249C10.6565 4.87803 10.6618 4.33538 10.6489 3.79317C10.6475 3.73422 10.5518 3.6493 10.4826 3.62435C9.19952 3.16192 8.78866 1.6044 9.71268 0.600048C10.3591 -0.102542 11.5065 -0.252143 12.3543 0.496813C13.0623 1.12234 13.1825 2.30062 12.5438 3.01395C12.3197 3.26412 11.9843 3.41329 11.7054 3.6163C11.6282 3.67246 11.5162 3.75468 11.5139 3.82788C11.4974 4.35428 11.5051 4.88144 11.5051 5.4464C11.6146 5.4464 11.7128 5.44651 11.811 5.44638C12.8473 5.44501 13.8835 5.44344 14.9198 5.44222C17.0057 5.43976 18.8152 6.86773 19.27 8.90174C19.3596 9.30208 19.3602 9.7223 19.4037 10.1514C20.302 10.224 21.0324 10.6461 21.5613 11.3963C21.9359 11.9276 22.1268 12.528 22.1329 13.1823C22.1391 13.8453 22.1649 14.5103 21.9245 15.1475C21.5006 16.2709 20.6578 16.9274 19.4564 17.1011C19.3109 17.6507 19.2208 18.1997 19.0202 18.7048C18.5849 19.8015 17.794 20.5814 16.7051 21.0435C16.5419 21.1127 16.4843 21.1923 16.4923 21.3667C16.5058 21.6619 16.4923 21.9583 16.4833 22.2777ZM4.38193 7.76317C3.91565 8.37749 3.65534 9.07104 3.65163 9.84099C3.64156 11.9317 3.64874 14.0225 3.64927 16.1133C3.64936 16.4833 3.61835 16.8566 3.65628 17.2228C3.86038 19.1927 5.39731 20.5576 7.38412 20.5568C9.89118 20.5558 12.3982 20.5561 14.9053 20.5585C16.8818 20.5604 18.5304 18.9171 18.5289 16.947C18.5272 14.6342 18.5265 12.3214 18.5311 10.0086C18.5351 7.94848 16.98 6.33381 14.9127 6.31358C12.4151 6.28915 9.91716 6.30061 7.41936 6.30238C6.19237 6.30325 5.17264 6.75402 4.38193 7.76317ZM9.83428 21.4201C8.74953 21.4201 7.66478 21.4201 6.5589 21.4201C6.5589 21.5898 6.55923 21.7646 6.55884 21.9393C6.55725 22.6498 7.03916 23.1458 7.75049 23.1567C8.12949 23.1626 8.50869 23.155 8.8878 23.1552C10.7279 23.1558 12.568 23.1583 14.408 23.1572C15.0587 23.1568 15.5865 22.7194 15.646 22.1191C15.6702 21.8751 15.65 21.6266 15.65 21.4203C13.7113 21.4203 11.8006 21.4203 9.83428 21.4201ZM20.2185 15.9382C20.5878 15.7196 20.8453 15.407 21.0361 15.0234C21.3027 14.4875 21.283 13.916 21.2834 13.345C21.2837 12.8549 21.1659 12.395 20.9014 11.9794C20.55 11.4273 20.0507 11.1086 19.3859 11.0186C19.3859 12.7654 19.3859 14.4867 19.3859 16.2776C19.6796 16.1618 19.9325 16.062 20.2185 15.9382ZM2.0614 11.2596C1.68756 11.4656 1.39456 11.7503 1.1994 12.1336C0.754387 13.0074 0.773388 13.923 1.06141 14.8161C1.32132 15.622 1.92839 16.0944 2.79558 16.2257C2.79558 14.4817 2.79558 12.7591 2.79558 10.986C2.54136 11.0771 2.3188 11.157 2.0614 11.2596ZM11.4118 2.81407C11.4692 2.78495 11.5281 2.75844 11.5838 2.72629C12.0821 2.4385 12.2508 1.84441 11.9699 1.3692C11.6867 0.889917 11.0476 0.72657 10.5706 1.01151C10.1335 1.27256 9.96197 1.76158 10.1436 2.2286C10.326 2.69769 10.8287 2.94232 11.4118 2.81407Z",
  "M13.5231 11.8741C14.3331 11.2084 15.4353 11.2987 16.0897 12.0706C16.7127 12.8055 16.6094 13.8818 15.8518 14.5504C15.1564 15.164 14.0498 15.1008 13.4004 14.4103C12.7217 13.6887 12.7676 12.6089 13.5231 11.8741ZM15.5295 13.6137C15.7225 13.2419 15.6661 12.8915 15.3945 12.5926C15.1501 12.3237 14.8355 12.2154 14.4689 12.3226C14.099 12.4308 13.8703 12.6726 13.794 13.049C13.7122 13.4522 13.9456 13.8682 14.336 14.0342C14.7789 14.2225 15.2055 14.0839 15.5295 13.6137Z",
  "M8.11876 14.8622C7.18019 15.1569 6.27219 14.7823 5.88111 13.9556C5.51822 13.1886 5.78163 12.2155 6.47889 11.7474C7.35419 11.1597 8.51474 11.4106 9.02759 12.2983C9.56081 13.2212 9.20132 14.3382 8.21523 14.8217C8.19045 14.8338 8.16429 14.8432 8.11876 14.8622ZM7.50171 14.1102C7.97579 14.0694 8.28726 13.8175 8.39707 13.386C8.48375 13.0454 8.32145 12.6496 8.01266 12.4485C7.66266 12.2205 7.26277 12.2332 6.92941 12.483C6.64312 12.6975 6.50184 13.0876 6.59142 13.4162C6.70192 13.8216 6.99701 14.059 7.50171 14.1102Z",
  "M10.2506 17.8965C9.82523 17.8968 9.42754 17.8999 9.02991 17.8965C8.72549 17.8938 8.55676 17.7407 8.55452 17.4766C8.55245 17.2328 8.74512 17.0554 9.03506 17.0549C10.413 17.0522 11.791 17.0522 13.1689 17.0561C13.4472 17.0569 13.6233 17.2253 13.6275 17.4681C13.6322 17.7318 13.463 17.8961 13.1638 17.897C12.202 17.9 11.2402 17.8971 10.2506 17.8965Z",
];
const BUTTON_COLOR = "rgb(113, 118, 123)";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeText = (text) => (text || "").replace(/\s+/g, " ").trim();

const isVisible = (element) => {
  if (!element || !(element instanceof HTMLElement)) return false;

  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
};

const isActionable = (element) => isVisible(element) && !element.disabled && element.getAttribute("aria-disabled") !== "true";

const waitFor = async (callback, timeout = 4000) => {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const result = callback();
    if (result) return result;
    await sleep(100);
  }

  throw new Error("Timed out waiting for X action dialog");
};

const matchesAny = (text, patterns) => {
  const normalized = normalizeText(text);
  return patterns.some((pattern) => pattern.test(normalized));
};

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const findVisibleByText = (patterns, { root = document, selector = ACTION_SELECTOR, predicate = () => true } = {}) =>
  Array.from(root.querySelectorAll(selector)).find(
    (element) => isActionable(element) && matchesAny(element.textContent || element.getAttribute("aria-label"), patterns) && predicate(element)
  );

const clickVisibleByText = (patterns, options) => {
  const element = findVisibleByText(patterns, options);
  if (!element) return false;

  element.click();
  return true;
};

const getLatestDialog = () => {
  const dialogs = Array.from(document.querySelectorAll(DIALOG_SELECTOR)).filter(isVisible);
  return dialogs[dialogs.length - 1];
};

const clickDialogAction = (patterns) => {
  const dialog = getLatestDialog();
  if (!dialog) return false;

  const element = findVisibleByText(patterns, {
    root: dialog,
    selector: 'button, [role="button"]',
  });

  if (!element) return false;

  element.click();
  return normalizeText(element.textContent || element.getAttribute("aria-label"));
};

const closeDialogIfPresent = () => {
  const dialog = getLatestDialog();
  if (!dialog) return;

  const closeButton = dialog.querySelector('[aria-label="Close"]');
  if (isVisible(closeButton)) closeButton.click();
};

const isSelectedChoice = (element) =>
  element.getAttribute("aria-checked") === "true" || element.getAttribute("aria-selected") === "true" || Boolean(element.closest('[aria-checked="true"], [aria-selected="true"]'));

const getTweetAuthorHandle = (tweet) => {
  const statusLink = Array.from(tweet.querySelectorAll('a[href*="/status/"]')).find((link) => {
    try {
      const url = new URL(link.href);
      return /^\/[^/]+\/status\/\d+/.test(url.pathname);
    } catch {
      return false;
    }
  });

  if (!statusLink) return null;

  try {
    return new URL(statusLink.href).pathname.split("/")[1];
  } catch {
    return null;
  }
};

const clickTweetMenuItem = async (tweet, patterns) => {
  const caret = tweet.querySelector('[data-testid="caret"]');
  if (!caret) throw new Error("Could not find X post menu button");

  caret.click();

  const menu = await waitFor(() => {
    const menus = Array.from(document.querySelectorAll(MENU_SELECTOR)).filter(isVisible);
    return menus[menus.length - 1];
  });

  const menuItem = findVisibleByText(patterns, {
    root: menu,
    selector: '[role="menuitem"], [role="menuitemradio"], [role="button"]',
  });

  if (!menuItem) throw new Error("Could not find X post menu action");

  menuItem.click();
};

const completeSpamReport = async () => {
  await waitFor(getLatestDialog, 6000);

  let selectedSpam = false;
  let blockedAuthor = false;

  for (let step = 0; step < 10; step++) {
    const dialog = getLatestDialog();
    if (!dialog && selectedSpam) return blockedAuthor;
    if (!dialog) {
      await sleep(500);
      continue;
    }

    if (clickDialogAction([/^block\b/i])) {
      blockedAuthor = true;
      await sleep(700);
      continue;
    }

    if (clickDialogAction([/^done$/i])) {
      await sleep(300);
      return blockedAuthor;
    }

    if (clickDialogAction([/^next$/i, /^continue$/i, /^submit$/i, /^report$/i])) {
      await sleep(700);
      continue;
    }

    if (
      clickVisibleByText([/\bspam\b/i], {
        root: dialog,
        selector: ACTION_SELECTOR,
        predicate: (element) => !isSelectedChoice(element),
      })
    ) {
      selectedSpam = true;
      await sleep(500);
      continue;
    }

    await sleep(500);
  }

  closeDialogIfPresent();
  throw new Error("Could not complete X spam report flow");
};

const reportTweetAsSpam = async (tweet) => {
  await clickTweetMenuItem(tweet, [/^report post$/i, /^report tweet$/i, /^report$/i]);
  return completeSpamReport();
};

const blockTweetAuthor = async (tweet, authorHandle) => {
  const blockPatterns = authorHandle ? [new RegExp(`^block\\s+@?${escapeRegExp(authorHandle)}$`, "i"), /^block\b/i] : [/^block\b/i];

  await clickTweetMenuItem(tweet, blockPatterns);
  await waitFor(getLatestDialog, 5000);

  if (!clickDialogAction([/^block$/i])) {
    throw new Error("Could not confirm X block dialog");
  }
};

const setButtonState = (button, state, label) => {
  button.dataset.state = state;
  button.title = label;
  button.setAttribute("aria-label", label);
};

const getDirectChild = (ancestor, descendant) => {
  let child = descendant;

  while (child?.parentElement && child.parentElement !== ancestor) {
    child = child.parentElement;
  }

  return child?.parentElement === ancestor ? child : null;
};

const getTweetActionPlacement = (tweet) => {
  const caret = tweet.querySelector('[data-testid="caret"]');
  if (!caret) return null;

  const grokButton = tweet.querySelector('button[aria-label="Grok actions"]');
  let actionsContainer = null;

  if (grokButton) {
    let node = caret.parentElement;

    while (node && node !== tweet) {
      if (node.contains(grokButton) && node.contains(caret)) {
        actionsContainer = node;
        break;
      }

      node = node.parentElement;
    }
  }

  if (!actionsContainer) {
    actionsContainer = caret.parentElement?.parentElement;
  }

  const caretSlot = actionsContainer ? getDirectChild(actionsContainer, caret) : null;
  const grokSlot = actionsContainer && grokButton ? getDirectChild(actionsContainer, grokButton) : null;

  if (!actionsContainer || !caretSlot) return null;

  return { actionsContainer, caretSlot, grokSlot };
};

const tintAiSlopButton = (button) => {
  button.style.color = BUTTON_COLOR;

  button.querySelectorAll("[style]").forEach((element) => {
    element.style.color = BUTTON_COLOR;
  });
};

const createAiSlopIcon = (className) => {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 23 24");
  icon.setAttribute("aria-hidden", "true");
  if (className) icon.setAttribute("class", className);

  AI_SLOP_ICON_PATHS.forEach((pathData) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", "currentColor");
    icon.appendChild(path);
  });

  return icon;
};

const replaceButtonIcon = (button) => {
  const existingIcon = button.querySelector("svg");
  const icon = createAiSlopIcon(existingIcon?.getAttribute("class"));

  if (existingIcon) {
    existingIcon.replaceWith(icon);
  } else {
    button.appendChild(icon);
  }
};

const createFallbackAiSlopControl = () => {
  const wrapper = document.createElement("div");
  wrapper.className = CONTROL_CLASS;

  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("role", "button");
  button.className = BUTTON_CLASS;
  replaceButtonIcon(button);
  wrapper.appendChild(button);

  return wrapper;
};

const createAiSlopControl = (grokSlot) => {
  const wrapper = grokSlot ? grokSlot.cloneNode(true) : createFallbackAiSlopControl();
  wrapper.classList.add(CONTROL_CLASS);

  const button = wrapper.querySelector("button") || wrapper;
  button.classList.add(BUTTON_CLASS);
  button.type = "button";
  button.dataset.state = "idle";
  button.removeAttribute("aria-expanded");
  button.removeAttribute("aria-haspopup");
  button.removeAttribute("data-testid");
  setButtonState(button, "idle", "AI slop");
  replaceButtonIcon(button);
  tintAiSlopButton(button);
  button.addEventListener("click", handleAiSlopClick);

  return wrapper;
};

const handleAiSlopClick = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const button = event.currentTarget;
  const tweet = button.closest(selectors.tweet);
  const authorHandle = getTweetAuthorHandle(tweet);
  const target = authorHandle ? `@${authorHandle}` : "this account";

  if (button.dataset.state === "loading") return;
  if (!window.confirm(`Report this post as spam and block ${target}?`)) return;

  try {
    setButtonState(button, "loading", "working");
    const blockedFromReportFlow = await reportTweetAsSpam(tweet);
    await sleep(300);
    if (!blockedFromReportFlow) await blockTweetAuthor(tweet, authorHandle);
    setButtonState(button, "done", "blocked");
  } catch (error) {
    console.warn("Minimal Twitter: AI Slop action failed", error);
    setButtonState(button, "error", "failed");
  } finally {
    setTimeout(() => setButtonState(button, "idle", "ai slop"), 2500);
  }
};

const addAiSlopButtonToTweet = (tweet) => {
  if (tweet.querySelector(`.${BUTTON_CLASS}`)) return;

  const placement = getTweetActionPlacement(tweet);
  if (!placement) return;

  tweet.classList.add(TWEET_CLASS);

  const control = createAiSlopControl(placement.grokSlot);
  placement.actionsContainer.insertBefore(control, placement.grokSlot || placement.caretSlot);
};

const removeAiSlopButtons = () => {
  document.querySelectorAll(`.${CONTROL_CLASS}`).forEach((control) => control.remove());
  document.querySelectorAll(`.${TWEET_CLASS}`).forEach((tweet) => tweet.classList.remove(TWEET_CLASS));
};

const addAiSlopStyles = () => {
  addStyles(
    STYLE_ID,
    `
    .${BUTTON_CLASS} {
      color: ${BUTTON_COLOR} !important;
    }

    .${BUTTON_CLASS} [style] {
      color: ${BUTTON_COLOR} !important;
    }

    .${BUTTON_CLASS} svg,
    .${BUTTON_CLASS} path {
      color: currentColor;
      fill: currentColor;
    }

    .${BUTTON_CLASS} svg {
      transform: scale(0.9);
      transform-origin: center;
    }

    .${BUTTON_CLASS}:hover,
    .${BUTTON_CLASS}:focus-visible {
      outline: none;
    }

    .${BUTTON_CLASS}[data-state="loading"] {
      cursor: wait;
      opacity: 0.75;
    }

    `
  );
};

export const changeAiSlopButton = (aiSlopButton) => {
  switch (aiSlopButton) {
    case "off":
      removeAiSlopButtons();
      removeStyles(STYLE_ID);
      break;

    case "on":
      addAiSlopStyles();
      document.querySelectorAll(selectors.tweet).forEach(addAiSlopButtonToTweet);
      break;
  }
};
