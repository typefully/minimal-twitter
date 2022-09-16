// Utility function to remove DOM element
const removeElement = (id) => {
  const element = document.getElementById(id);
  element && element.remove();
};

// Utility function to inject CSS into page
const addStyles = (id, css) => {
  // First remove before adding
  removeElement(id);

  const head = document.querySelector("head");
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `${css}`;
  head.appendChild(style);
};

// Function to add main stylesheet
const addStylesheets = () => {
  const head = document.querySelector("head");
  const mainStylesheet = document.createElement("link");
  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("content/main.css");
  head.appendChild(mainStylesheet);

  const additionsStylesheet = document.createElement("link");
  additionsStylesheet.rel = "stylesheet";
  additionsStylesheet.type = "text/css";
  additionsStylesheet.href = chrome.runtime.getURL("content/additions.css");
  head.appendChild(additionsStylesheet);
};

// Function to reveal Search Filters
const revealSearchFilters = () => {
  // Get grandparent of advanced search
  const advancedSearch = document.querySelector(
    `[data-testid="searchFiltersAdvancedSearch"]`
  );

  if (advancedSearch) {
    const searchFilters =
      advancedSearch.parentElement.parentElement.parentElement;
    if (!searchFilters.classList.contains("searchFilters")) {
      searchFilters.classList = searchFilters.classList + " searchFilters";
    }
    return;
  }
};

/* ----------------------------- Typefully Links ---------------------------- */

// Function to add "Continue Thread in Typefully"
const addTypefullyPlug = () => {
  const modal = document.querySelector(
    '[aria-labelledby="modal-header"][role="dialog"]'
  );
  const tweetComposeArea = modal?.querySelector(
    "div.public-DraftStyleDefault-block"
  );
  const tweet2Exist = document.querySelector(`[data-testid="tweetTextarea_1"]`);

  if (
    modal &&
    tweet2Exist &&
    tweetComposeArea &&
    !document.getElementById("typefully-link")
  ) {
    const typefullyLinkElement = createTypefullyLinkElement(
      "typefully-link",
      "typefully-modal-button"
    );
    typefullyLinkElement.addEventListener("click", () => {
      getCurrentTextAndSendToTypefully();
    });

    const typefullyLogo = createTypefullyLogo();
    const typefullyText = document.createElement("span");
    typefullyText.innerText = "Continue thread in Typefully";

    typefullyLinkElement.appendChild(typefullyLogo);
    typefullyLinkElement.appendChild(typefullyText);

    modal.appendChild(typefullyLinkElement);
  }
};

const saveCurrentReplyToLink = () => {
  function logLink(ev) {
    const linkElement = ev.target;
    const tweet = linkElement.closest('[data-testid="tweet"]');
    const tweetLinks = tweet.querySelectorAll("a[role='link']");
    const tweetLink = Array.from(tweetLinks).find((link) =>
      link.href.includes("/status/")
    ).href;
    sessionStorage.setItem("typefully-replying-to", tweetLink);
  }

  document.querySelectorAll('[data-testid="reply"]').forEach((replyButton) => {
    replyButton.removeEventListener("click", logLink);
    replyButton.addEventListener("click", logLink);
  });
};

// Function to add "Reply with Typefully"
const addTypefullyReplyPlug = () => {
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

const createTypefullyLinkElement = (id, className) => {
  const typefullyReplyLink = document.createElement("a");
  typefullyReplyLink.id = id;
  typefullyReplyLink.className = className;
  typefullyReplyLink.setAttribute("role", "button");
  typefullyReplyLink.setAttribute("tabindex", "0");
  return typefullyReplyLink;
};

const createTypefullyLogo = () => {
  const typefullyLogo = document.createElement("div");
  typefullyLogo.innerHTML = `<svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M99.5245 11.5985C78.3619 14.5225 58.8203 35.9628 48.5 53.157C32.5 79.814 29.7308 117.192 31.0696 117.039C31.8856 117.212 41.5 96 46.5 88C54.5 83 64 75.5 64 75.5C64 75.5 50.4269 80.1561 51.5 78.5C53.444 75.5 56.2926 72.5773 56.2926 72.5773C78.9391 65.0252 83.916 53.157 83.916 53.157C83.916 53.157 77.3237 54.812 74.6461 55.117C71.076 55.5236 68.8896 55.4107 67.5 55.117C72.6914 49.101 77.1928 45.9517 82 44.5C85.9147 43.15 93.0515 38.6801 98 34.5C102.103 27.8334 100.351 18.8543 99.5245 11.5985Z" fill="white"/>
<circle cx="82.5" cy="107.5" r="8.5" fill="white"/>
</svg>`;
  typefullyLogo.style.position = "relative";
  typefullyLogo.style.margin = "0 2px -4px 3px";
  return typefullyLogo;
};

const getCurrentTextAndSendToTypefully = (replyingToLink) => {
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

  // Refactor with parametrics URLSearchParams
  const url = new URL("https://typefully.com/");
  url.searchParams.set("via", "thomas");
  url.searchParams.set("new", encodeURIComponent(typefullyContent));
  if (replyingToLink) {
    url.searchParams.set("replyTo", encodeURIComponent(replyingToLink));
  }
  window.open(url.toString());
};

// Function to check url for /following or /followers
const checkUrlForFollow = () => {
  if (
    window.location.pathname.includes("/followers") ||
    window.location.pathname.includes("/following") ||
    window.location.pathname.includes("/i/") ||
    window.location.pathname.includes("/search")
  ) {
    if (!document.getElementById("mt-followOverride")) {
      addStyles(
        "mt-followOverride",
        `
        div[data-testid="primaryColumn"] a[href*="/i/connect_people?user_id="],
        div[data-testid="primaryColumn"] div[data-testid="UserCell"] {
          display: block !important;
        }
        `
      );
    }
  } else {
    if (document.getElementById("mt-followOverride")) {
      removeElement("mt-followOverride");
    }
  }
};

// Function to add Lists button
const addListsButton = () => {
  if (!document.querySelector('a[href$="/lists"][role="link"][aria-label]')) {
    const profileNode = document.querySelector(
      'a[role="link"][data-testid="AppTabBar_Profile_Link"]'
    );

    if (profileNode) {
      const profileNodeClone = profileNode.cloneNode(true);

      profileNodeClone.id = "mt-listsButtonNode";
      profileNodeClone.href += "/lists";
      profileNodeClone.ariaLabel = "Minimal Twitter Lists";
      profileNodeClone.removeAttribute("data-testid");
      profileNodeClone.firstChild.firstChild.firstChild.innerHTML = `<g>
        <path d="M19.75 22H4.25C3.01 22 2 20.99 2 19.75V4.25C2 3.01 3.01 2 4.25 2h15.5C20.99 2 22 3.01 22 4.25v15.5c0 1.24-1.01 2.25-2.25 2.25zM4.25 3.5c-.414 0-.75.337-.75.75v15.5c0 .413.336.75.75.75h15.5c.414 0 .75-.337.75-.75V4.25c0-.413-.336-.75-.75-.75H4.25z"></path>
        <path d="M17 8.64H7c-.414 0-.75-.337-.75-.75s.336-.75.75-.75h10c.414 0 .75.335.75.75s-.336.75-.75.75zm0 4.11H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75zm-5 4.11H7c-.414 0-.75-.335-.75-.75s.336-.75.75-.75h5c.414 0 .75.337.75.75s-.336.75-.75.75z"></path>
      </g>`;
      profileNodeClone.firstChild.lastChild.firstChild.innerText = "Lists";
      profileNode.insertAdjacentElement("beforebegin", profileNodeClone);
    }
  }
};

// Function to start MutationObserver
const observe = () => {
  const observer = new MutationObserver((mutationsList) => {
    if (mutationsList.length) {
      revealSearchFilters();
      addTypefullyPlug();
      saveCurrentReplyToLink();
      addTypefullyReplyPlug();
      checkUrlForFollow();
      addListsButton();
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};

// Function to change Feed Width
const changeFeedWidth = (feedWidth) => {
  switch (feedWidth) {
    case 600:
      addStyles(
        "mt-feedWidth",
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
        "mt-feedWidth",
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
        "mt-feedWidth",
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
        "mt-feedWidth",
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
        "mt-feedWidth",
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

// Function to change Feed Borders
const changefeedBorders = (feedBorders) => {
  switch (feedBorders) {
    case "on":
      removeElement("mt-feedBorders");
      break;

    case "off":
      addStyles(
        "mt-feedBorders",
        `
        @media only screen and (min-width: 988px) {
          div[data-testid="primaryColumn"] {
            border-style: hidden !important;
          }
        }
        `
      );
      break;
  }
};

// Function to change Explore Button
const changeExploreButton = (exploreButton) => {
  switch (exploreButton) {
    case "off":
      addStyles(
        "mt-exploreButton",
        `
        [data-testid="AppTabBar_Explore_Link"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-exploreButton");
      break;
  }
};

// Function to change Notifications Button
const changeNotificationsButton = (notificationsButton) => {
  switch (notificationsButton) {
    case "off":
      addStyles(
        "mt-notificationsButton",
        `
        [data-testid="AppTabBar_Notifications_Link"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-notificationsButton");
      break;
  }
};

// Function to change Messages Button
const changeMessagesButton = (messagesButton) => {
  switch (messagesButton) {
    case "off":
      addStyles(
        "mt-messagesButton",
        `
        [data-testid="AppTabBar_DirectMessage_Link"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-messagesButton");
      break;
  }
};

// Function to change Bookmarks Button
const changeBookmarksButton = (bookmarksButton) => {
  switch (bookmarksButton) {
    case "off":
      addStyles(
        "mt-bookmarksButton",
        `
        a[href="/i/bookmarks"] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-bookmarksButton");
      break;
  }
};

// Function to change Lists Button
const changeListsButton = (listsButton) => {
  switch (listsButton) {
    case "off":
      removeElement("mt-listsButtonNode");
      addStyles(
        "mt-listsButton",
        `
        a[href*="/lists"][role="link"][aria-label] {
          display: none !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-listsButton");
      addListsButton();

      break;
  }
};

// Function to remove Navigation Button Labels on Hover
const removeHover = () => {
  addStyles(
    "mt-navigationButtonsLabelsHover",
    `
    header[role="banner"] nav[role="navigation"] {
      width: fit-content !important;
    }
    header[role="banner"] nav[role="navigation"] div[dir="auto"] {
      position: absolute !important;
    }
    header[role="banner"] nav[role="navigation"] * div[dir="auto"]:not([aria-label]) > span {
      display: none !important;
    }
  
    header[role="banner"] > div > div > div > div:last-child {
      width: fit-content !important;
    }
  
    [data-testid="SideNav_AccountSwitcher_Button"] {
      bottom: 12px !important;
      width: fit-content !important;
    }
  
    [data-testid="SideNav_AccountSwitcher_Button"] > div:not(:first-child) {
      display: none !important;
    }
    `
  );
};

// Function to change Navigation Button Labels on Hover
const changeNavigationButtonsLabelsHover = (navigationButtonsLabelsHover) => {
  switch (navigationButtonsLabelsHover) {
    case "off":
      chrome.storage.sync.get(["navigationButtonsLabels"], (result) => {
        if (result.navigationButtonsLabels !== "on") {
          removeHover();
        }
      });
      break;

    case "on":
      removeElement("mt-navigationButtonsLabelsHover");
      break;
  }
};

// Function to change Navigation Button Labels
const changeNavigationButtonsLabels = (navigationButtonsLabels) => {
  switch (navigationButtonsLabels) {
    case "on":
      removeElement("mt-navigationButtonsLabelsHover");
      addStyles(
        "mt-navigationButtonsLabels",
        `
        header[role="banner"] nav[role="navigation"] * div[dir="auto"]:not([aria-label]) > span,
        [data-testid="SideNav_AccountSwitcher_Button"] > div:not(:first-child) {
          opacity: 1 !important;
        }
        `
      );
      break;

    case "off":
      chrome.storage.sync.get(["navigationButtonsLabelsHover"], (result) => {
        if (result.navigationButtonsLabelsHover === "off") {
          removeHover();
        }
      });

      removeElement("mt-navigationButtonsLabels");
      break;
  }
};

// Function to change Navigation Vertical Centering
const changeNavigationCenter = (navigationCenter) => {
  switch (navigationCenter) {
    case "on":
      addStyles(
        "mt-navigationCenter",
        `
        header[role="banner"] > div > div > div {
          justify-content: center !important;
          padding-top: 0;
        }
        `
      );
      break;

    case "off":
      removeElement("mt-navigationCenter");
      break;
  }
};

// Function to change Zen Mode
const changeZenMode = (zenMode) => {
  switch (zenMode) {
    case "on":
      addStyles(
        "mt-zenMode",
        `
        header[role="banner"], 
        [data-testid="sidebarColumn"],
        [data-testid="primaryColumn"] > div > div:not(:nth-of-type(1)):not(:nth-of-type(2))  {
          display: none !important;
        }

        div[data-testid="primaryColumn"] {
          border-style: hidden !important;
        }
        `
      );
      break;

    case "off":
      removeElement("mt-zenMode");
      break;
  }
};

// Function to change Reply Count
const changeReplyCount = (replyCount) => {
  switch (replyCount) {
    case "hide":
      addStyles(
        "mt-replyCount",
        `
        article [data-testid="reply"] span { 
          visibility: hidden !important
        }
        `
      );
      break;

    case "show":
      removeElement("mt-replyCount");
      break;
  }
};

// Function to change Retweet Count
const changeRetweetCount = (retweetCount) => {
  switch (retweetCount) {
    case "hide":
      addStyles(
        "mt-retweetCount",
        `
        article [href$="/retweets"],
        article [href$="/retweets/with_comments"],
        article [data-testid="retweet"] span,
        article [data-testid="unretweet"] span {
          visibility: hidden !important
        }
        `
      );
      break;

    case "show":
      removeElement("mt-retweetCount");
      break;
  }
};

// Function to change Like Count
const changeLikeCount = (likeCount) => {
  switch (likeCount) {
    case "hide":
      addStyles(
        "mt-likeCount",
        `
        article [href$="/likes"][href*="/status/"],
        article [data-testid="like"] span,
        article [data-testid="unlike"] span {
           visibility: hidden !important
        }
        `
      );
      break;

    case "show":
      removeElement("mt-likeCount");
      break;
  }
};

// Function to change Follow Count
const changeFollowCount = (followCount) => {
  switch (followCount) {
    case "hide":
      addStyles(
        "mt-followCount",
        `
        [href$="/following"][dir="auto"][role="link"],
        [href$="/followers"][dir="auto"][role="link"] {
          display: none !important;
        }
        `
      );
      break;

    case "show":
      removeElement("mt-followCount");
      break;
  }
};

// Function to change Tweet Button
const changeTweetButton = (hideTweetButton) => {
  switch (hideTweetButton) {
    case "on":
      addStyles(
        "mt-hideTweetButton",
        `
        [data-testid="SideNav_NewTweet_Button"] {
          visibility: hidden;
        }
        `
      );
      break;

    case "off":
      removeElement("mt-hideTweetButton");
      break;
  }
};

// Function to change Search Bar 1
const changeSearchBar1 = (hideSearch) => {
  switch (hideSearch) {
    case "on":
      addStyles(
        "mt-hideSearch",
        `
        [data-testid="sidebarColumn"] form[role="search"] {
          display: none !important;
          visibility: hidden !important;
        }
        `
      );
      break;

    case "off":
      removeElement("mt-hideSearch");
      break;
  }
};

// Function to change Search Bar 2
const changeSearchBar2 = (transparentSearch) => {
  switch (transparentSearch) {
    case "on":
      addStyles(
        "mt-transparentSearch",
        `
        form[role="search"] > div:nth-child(1) > div {
          background-color: transparent !important;
        }
        [data-testid="sidebarColumn"] [placeholder="Search Twitter"] {
          padding-left: 34px !important;
          margin-left: -24px !important;
        }
        `
      );
      break;

    case "off":
      removeElement("mt-transparentSearch");
      break;
  }
};

// Function to replace favicon (to reduce red dots)
const changeFavicon = (minimalFavicon) => {
  const currentFavicons = document.querySelectorAll('[rel="shortcut icon"]');
  currentFavicons.forEach((item) => {
    item && item.remove();
  });

  const head = document.querySelector("head");
  const faviconLink = document.createElement("link");
  faviconLink.id = "replacedFavicon";
  faviconLink.rel = "shortcut icon";

  switch (minimalFavicon) {
    case "on":
      faviconLink.href = chrome.runtime.getURL("content/twitter-mt.ico");
      break;
    case "off":
      faviconLink.href = chrome.runtime.getURL("content/twitter.ico");
      break;
  }

  head.appendChild(faviconLink);
};

// Function to change Promoted Posts
const changePromotedPosts = (removePromotedPosts) => {
  switch (removePromotedPosts) {
    case "off":
      addStyles(
        "mt-removePromotedPosts",
        `
        [data-testid="placementTracking"] article {
          display: flex !important;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-removePromotedPosts");
      break;
  }
};

// Function to change Who to Follow
const changeWhoToFollow = (whoToFollow) => {
  switch (whoToFollow) {
    case "off":
      addStyles(
        "mt-whoToFollow",
        `
        div[data-testid="primaryColumn"] a[href*="/i/connect_people?user_id="],
        div[data-testid="primaryColumn"] div[data-testid="UserCell"] {
          display: none;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-whoToFollow");
      break;
  }

  checkUrlForFollow();
};

// Function to change Topics to Follow
const changeTopicsToFollow = (topicsToFollow) => {
  switch (topicsToFollow) {
    case "off":
      addStyles(
        "mt-topicsToFollow",
        `
        div[data-testid="primaryColumn"] section[aria-labelledby^="accessible-list-"] > div[aria-label$="Carousel"],
        div[data-testid="primaryColumn"] a[href*="/i/flow/topics_selector"],
        div[data-testid="primaryColumn"] a[href*="/i/topics/picker/home"] {
          display: none;
        }
        `
      );
      break;

    case "on":
      removeElement("mt-topicsToFollow");
      break;
  }
};

// Function to change Latest Tweets
const changeLatestTweets = (latestTweets) => {
  if (latestTweets === "on") {
    const showLatestTweets = () => {
      const run = () => {
        // Check if the "Latest Tweets" options is already selected to avoid unnecessary clicks
        const latestSelected = !!document.querySelector(
          "div[data-testid='ScrollSnap-List'] > div:last-child > a[aria-selected='true']"
        );

        if (latestSelected) return;

        // Check if the nav bar with "Home" and "Latest Tweets" exists
        const optionBarExists = !!document.querySelector(
          "div[data-testid='ScrollSnap-List']"
        );

        if (!optionBarExists) {
          /*
            If it doesn't, we have to get it to display
            1. Click the Timeline Options button
            2. Click the first option in the popup
          */
          const timelineOptions = document.querySelector(
            "div[aria-label='Timeline options']"
          );
          const topTweetsOn = document.querySelector(
            "div[aria-label='Top Tweets on']"
          );

          const clickMenuButton = (isTimelineOptions) => {
            return setTimeout(() => {
              const menuitem = document.querySelector(
                "div[role='menuitem'][tabindex='0']"
              );
              menuitem && menuitem.click();

              if (isTimelineOptions) {
                // Click the "Latest Tweets" nav bar option
                const latestTweetsNavBarOption = document.querySelector(
                  "div[data-testid='ScrollSnap-List'] > div:last-child > a"
                );
                latestTweetsNavBarOption && latestTweetsNavBarOption.click();
              }
            }, 100);
          };

          if (timelineOptions) {
            timelineOptions.click();
            clickMenuButton(true);
          } else if (topTweetsOn) {
            topTweetsOn.click();
            clickMenuButton(false);
          }
        }
      };
      setTimeout(run, 500);
    };
    if (document.readyState === "loading") {
      console.log("loading...");
      document.addEventListener("DOMContentLoaded", showLatestTweets);
    } else {
      console.log("running latest tweets...");
      showLatestTweets();
    }
  }
};

// Utility function to create data for `injectAllChanges()`
const constructNewData = (changes) => {
  // Creates an array of objects from changes
  // The value of each object is the new value
  const newValuesArray = Object.entries(changes).map((item) => {
    const itemKey = item[0];
    const itemValue = item[1]?.newValue;
    return { [itemKey]: itemValue };
  });

  // Recreate a hash map to pass to `injectAllChanges()`
  const newChangesData = Object.fromEntries(
    newValuesArray.map((item) => {
      const itemKey = Object.keys(item)[0];
      const itemValue = Object.values(item)[0];
      return [itemKey, itemValue];
    })
  );

  return newChangesData;
};

/*-- 
- Function to inject all changes:
  - 1. Feed Width
  - 2. Feed Borders
  - 3. Explore Button
  - 4. Notification Button
  - 5. Messages Button
  - 6. Bookmarks Button
  - 7. Lists Button
  - 8. Navigation Buttons Labels on Hover
  - 9. Navigation Buttons Labels
  - 10. Center Navigation
  - 11. Zen Mode
  - 12. Hide Reply Count
  - 13. Hide Retweet Count
  - 14. Hide Like Count
  - 15. Hide Follow
  - 16. Hide Tweet Button
  - 17. Hide Search Bar
  - 18. Transparent Search Bar
  - 19. Minimal Favicon
  - 20. Remove Promoted Posts
  - 21. Who to Follow
  - 22. Topics to Follow
  - 23. Always Show Latest Tweets
--*/
const injectAllChanges = (data) => {
  const {
    feedWidth,
    feedBorders,
    exploreButton,
    notificationsButton,
    messagesButton,
    bookmarksButton,
    listsButton,
    navigationButtonsLabelsHover,
    navigationButtonsLabels,
    navigationCenter,
    zenMode,
    replyCount,
    retweetCount,
    likeCount,
    followCount,
    hideTweetButton,
    hideSearch,
    transparentSearch,
    minimalFavicon,
    removePromotedPosts,
    whoToFollow,
    topicsToFollow,
    latestTweets,
  } = data;
  changeFeedWidth(feedWidth);
  changefeedBorders(feedBorders);
  changeExploreButton(exploreButton);
  changeNotificationsButton(notificationsButton);
  changeMessagesButton(messagesButton);
  changeBookmarksButton(bookmarksButton);
  changeListsButton(listsButton);
  changeNavigationButtonsLabelsHover(navigationButtonsLabelsHover);
  changeNavigationButtonsLabels(navigationButtonsLabels);
  changeNavigationCenter(navigationCenter);
  changeZenMode(zenMode);
  changeReplyCount(replyCount);
  changeRetweetCount(retweetCount);
  changeLikeCount(likeCount);
  changeFollowCount(followCount);
  changeTweetButton(hideTweetButton);
  changeSearchBar1(hideSearch);
  changeSearchBar2(transparentSearch);
  changeFavicon(minimalFavicon);
  changePromotedPosts(removePromotedPosts);
  changeWhoToFollow(whoToFollow);
  changeTopicsToFollow(topicsToFollow);
  changeLatestTweets(latestTweets);
};

/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#synchronous-response-to-storage-updates
- Listen to Chrome Storage changes
- Inject styles in respond to changes
--*/
chrome.storage.onChanged.addListener((changes) => {
  const newChangesData = constructNewData(changes);
  injectAllChanges(newChangesData);
});

/*--
- Initializing function, runs once at start
- Get Chrome Storage and inject respective styles
--*/
const init = () => {
  addStylesheets();

  // Start MutationObserver
  observe();

  // Inject user preferences
  chrome.storage.sync.get(
    [
      "feedWidth",
      "feedBorders",
      "exploreButton",
      "notificationsButton",
      "messagesButton",
      "bookmarksButton",
      "listsButton",
      "navigationButtonsLabelsHover",
      "navigationButtonsLabels",
      "navigationCenter",
      "zenMode",
      "replyCount",
      "retweetCount",
      "likeCount",
      "followCount",
      "hideTweetButton",
      "hideSearch",
      "transparentSearch",
      "minimalFavicon",
      "removePromotedPosts",
      "whoToFollow",
      "topicsToFollow",
      "latestTweets",
    ],
    (data) => {
      injectAllChanges(data);
    }
  );
};

init();
