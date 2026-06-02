import selectors from "../../selectors";

const focusPostMenuItemId = "mt-focus-post-menu-item";
const focusPostLabel = "Focus this post";
const menuContextMaxAge = 5000;
const tweetSelector = `${selectors.tweet}, article[role="article"], [data-testid="tweet"]`;
const tweetMenuButtonSelector = '[data-testid="caret"], [aria-label="More"]';
const menuSelector = '[role="menu"]';
const menuItemSelector = '[role="menuitem"]';
const postMenuXPath = "/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div[2]/div/div[3]/div/div/div";
const postMenuItemLabels = [
  "Unfollow @",
  "Follow @",
  "Add/remove from Lists",
  "Mute",
  "Block @",
  "View post activity",
  "Embed post",
  "Report post",
  "Write a Community Note",
  "Request Community Note",
];

let menuContext;
let isClickListenerAttached = false;
let isMenuObserverAttached = false;

const getFreshMenuTweet = () => {
  if (!menuContext) return null;

  const { tweet, capturedAt } = menuContext;

  if (!document.contains(tweet) || Date.now() - capturedAt > menuContextMaxAge) {
    menuContext = null;
    return null;
  }

  return tweet;
};

const getExpandedMenuTweet = () => {
  const expandedMenuButton = document.querySelector(`${tweetSelector} ${tweetMenuButtonSelector}[aria-expanded="true"]`);

  return expandedMenuButton?.closest(tweetSelector);
};

const getFocusedMenuTweet = () => {
  const focusedMenuButton = document.activeElement?.closest?.(`${tweetSelector} ${tweetMenuButtonSelector}`);

  return focusedMenuButton?.closest(tweetSelector);
};

const getElementByXPath = (xpath) => document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

const getMenuFromKnownPostAction = () => {
  const postActionTextElement = Array.from(document.querySelectorAll("span, div")).find((element) => {
    const text = element.textContent?.trim();

    return text && text.length < 80 && postMenuItemLabels.some((label) => text.startsWith(label));
  });

  const menuItem = postActionTextElement?.closest(menuItemSelector) || postActionTextElement?.closest('[tabindex="0"]');

  return menuItem?.closest(menuSelector) || menuItem?.parentElement || null;
};

const getOpenPostMenu = () =>
  document.querySelector(menuSelector) || getElementByXPath(postMenuXPath) || getMenuFromKnownPostAction() || document.querySelector(selectors.menuItem)?.parentElement;

const getPositionedMenuTweet = () => {
  const menu = getOpenPostMenu();
  if (!menu) return null;

  const menuRect = menu.getBoundingClientRect();
  const visibleTweets = Array.from(document.querySelectorAll(tweetSelector)).filter((tweet) => {
    const rect = tweet.getBoundingClientRect();

    return rect.width && rect.height && rect.bottom > 0 && rect.top < window.innerHeight;
  });

  const [closestTweet] = visibleTweets
    .map((tweet) => {
      const button = tweet.querySelector(tweetMenuButtonSelector);
      const rect = (button || tweet).getBoundingClientRect();

      return {
        tweet,
        distance: Math.abs(rect.top - menuRect.top) + Math.abs(rect.right - menuRect.left),
      };
    })
    .sort((a, b) => a.distance - b.distance);

  return closestTweet?.tweet || null;
};

const getMenuTweet = () => getFreshMenuTweet() || getExpandedMenuTweet() || getFocusedMenuTweet() || getPositionedMenuTweet();

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
  const menuItem = template ? template.cloneNode(true) : document.createElement("div");

  menuItem.id = focusPostMenuItemId;
  menuItem.setAttribute("aria-label", focusPostLabel);
  menuItem.setAttribute("role", "menuitem");
  menuItem.setAttribute("tabindex", "0");
  menuItem.removeAttribute("data-testid");

  if (!template) {
    menuItem.style.cssText = "box-sizing:border-box;display:flex;align-items:center;gap:12px;min-height:44px;padding:12px 16px;cursor:pointer;font:inherit;font-weight:700;";
    menuItem.innerHTML = `
      <svg viewBox="0 0 24 24" width="18.75" height="18.75" aria-hidden="true">
        <path d="M11.25 2.5h1.5v3.03a6.51 6.51 0 0 1 5.72 5.72h3.03v1.5h-3.03a6.51 6.51 0 0 1-5.72 5.72v3.03h-1.5v-3.03a6.51 6.51 0 0 1-5.72-5.72H2.5v-1.5h3.03a6.51 6.51 0 0 1 5.72-5.72V2.5Zm0 7v-2A4.99 4.99 0 0 0 7.5 11.25h2v1.5h-2a4.99 4.99 0 0 0 3.75 3.75v-2h1.5v2a4.99 4.99 0 0 0 3.75-3.75h-2v-1.5h2a4.99 4.99 0 0 0-3.75-3.75v2h-1.5Z" />
      </svg>
      <span>${focusPostLabel}</span>
    `;
  }

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
  const tweet = getMenuTweet();
  if (!tweet) return;

  const menu = getOpenPostMenu();
  const firstMenuItem = menu?.querySelector(menuItemSelector) || document.querySelector(selectors.menuItem);
  if (!menu) return;

  const existingFocusPostMenuItem = menu.querySelector(`#${focusPostMenuItemId}`);
  if (existingFocusPostMenuItem) return;

  const focusPostMenuItem = buildFocusPostMenuItem(firstMenuItem, tweet);

  menu.insertBefore(focusPostMenuItem, firstMenuItem || menu.firstElementChild);
};

const scheduleMenuInjection = () => {
  setTimeout(injectFocusPostMenuItem);
  setTimeout(injectFocusPostMenuItem, 50);
  setTimeout(injectFocusPostMenuItem, 150);
};

const captureMenuContext = (event) => {
  const menuButton = event.target?.closest?.(tweetMenuButtonSelector);
  const tweet = menuButton?.closest(tweetSelector);

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

const attachMenuObserver = () => {
  if (isMenuObserverAttached) return;

  const observer = new MutationObserver(() => {
    injectFocusPostMenuItem();
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });

  isMenuObserverAttached = true;
};

export const addFocusPostMenuItem = () => {
  attachCaretClickListener();
  attachMenuObserver();
  injectFocusPostMenuItem();
};
