import selectors from "../../selectors";

const focusPostMenuItemId = "mt-focus-post-menu-item";
const focusPostLabel = "Focus this post";
const menuContextMaxAge = 5000;
const tweetMenuButtonSelector = '[data-testid="caret"], [aria-label="More"]';
const menuSelector = '[role="menu"]';
const menuItemSelector = '[role="menuitem"]';

let menuContext;
let isClickListenerAttached = false;

const getFreshMenuTweet = () => {
  if (!menuContext) return null;

  const { tweet, capturedAt } = menuContext;

  if (!document.contains(tweet) || Date.now() - capturedAt > menuContextMaxAge) {
    menuContext = null;
    return null;
  }

  return tweet;
};

const getTimelineHeaderBottom = () => {
  const primaryColumn = document.querySelector(selectors.mainColumn);
  const primaryColumnTop = primaryColumn?.getBoundingClientRect().top ?? 0;
  const headerCandidates = [document.querySelector(selectors.topHeader), document.querySelector(selectors.timelineTablist)?.closest("nav")];

  const headerBottom = headerCandidates.reduce(
    (bottom, header) => {
      if (!header) return bottom;

      const rect = header.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.height > 160 || rect.top > primaryColumnTop + 120 || rect.bottom <= primaryColumnTop) return bottom;

      return Math.max(bottom, rect.bottom);
    },
    Math.max(primaryColumnTop, 0),
  );

  return headerBottom + 1;
};

const focusTweet = (tweet) => {
  const alignTweet = () => {
    const targetTop = getTimelineHeaderBottom();
    const tweetTop = tweet.getBoundingClientRect().top;

    window.scrollBy({
      top: tweetTop - targetTop,
      behavior: "auto",
    });
  };

  alignTweet();
  requestAnimationFrame(() => requestAnimationFrame(alignTweet));
};

const replaceMenuItemIcon = (menuItem) => {
  const svg = menuItem.querySelector("svg");
  if (!svg) return;

  svg.setAttribute("viewBox", "0 0 24 24");
  svg.innerHTML =
    '<path d="M11.25 2.5h1.5v3.03a6.51 6.51 0 0 1 5.72 5.72h3.03v1.5h-3.03a6.51 6.51 0 0 1-5.72 5.72v3.03h-1.5v-3.03a6.51 6.51 0 0 1-5.72-5.72H2.5v-1.5h3.03a6.51 6.51 0 0 1 5.72-5.72V2.5Zm0 7v-2A4.99 4.99 0 0 0 7.5 11.25h2v1.5h-2a4.99 4.99 0 0 0 3.75 3.75v-2h1.5v2a4.99 4.99 0 0 0 3.75-3.75h-2v-1.5h2a4.99 4.99 0 0 0-3.75-3.75v2h-1.5Z" />';
};

const replaceMenuItemLabel = (menuItem) => {
  const spans = Array.from(menuItem.querySelectorAll("span"));

  if (!spans.length) {
    menuItem.textContent = focusPostLabel;
    return;
  }

  spans.forEach((span, index) => {
    if (index === 0) {
      span.textContent = focusPostLabel;
    } else {
      span.remove();
    }
  });
};

const buildFocusPostMenuItem = (template, tweet) => {
  const menuItem = template.cloneNode(true);

  menuItem.id = focusPostMenuItemId;
  menuItem.setAttribute("aria-label", focusPostLabel);
  menuItem.setAttribute("role", "menuitem");
  menuItem.setAttribute("tabindex", "0");
  menuItem.removeAttribute("data-testid");

  replaceMenuItemIcon(menuItem);
  replaceMenuItemLabel(menuItem);

  const onSelect = (event) => {
    event.preventDefault();
    event.stopPropagation();

    focusTweet(tweet);
  };

  menuItem.addEventListener("click", onSelect);
  menuItem.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    onSelect(event);
  });

  return menuItem;
};

const injectFocusPostMenuItem = () => {
  const tweet = getFreshMenuTweet();
  if (!tweet) return;

  const menu = document.querySelector(menuSelector) || document.querySelector(selectors.menuItem)?.parentElement;
  const firstMenuItem = menu?.querySelector(menuItemSelector) || document.querySelector(selectors.menuItem);
  if (!firstMenuItem || !menu) return;

  const focusPostMenuItem = buildFocusPostMenuItem(firstMenuItem, tweet);
  const existingFocusPostMenuItem = menu.querySelector(`#${focusPostMenuItemId}`);

  if (existingFocusPostMenuItem) {
    existingFocusPostMenuItem.replaceWith(focusPostMenuItem);
    return;
  }

  menu.insertBefore(focusPostMenuItem, firstMenuItem);
};

const scheduleMenuInjection = () => {
  setTimeout(injectFocusPostMenuItem);
  setTimeout(injectFocusPostMenuItem, 50);
  setTimeout(injectFocusPostMenuItem, 150);
};

const captureMenuContext = (event) => {
  const menuButton = event.target?.closest?.(tweetMenuButtonSelector);
  const tweet = menuButton?.closest(selectors.tweet);

  menuContext = tweet ? { tweet, capturedAt: Date.now() } : null;

  if (tweet) scheduleMenuInjection();
};

const attachCaretClickListener = () => {
  if (isClickListenerAttached) return;

  ["pointerdown", "mousedown", "click"].forEach((eventName) => {
    document.addEventListener(eventName, captureMenuContext, true);
  });

  isClickListenerAttached = true;
};

export const addFocusPostMenuItem = () => {
  attachCaretClickListener();
  injectFocusPostMenuItem();
};
