import { checkUrlForFollow } from "../check";
import svgAssets from "../svgAssets";
import {
  createTypefullyLinkElement,
  createTypefullyLogo,
  getCurrentTextAndSendToTypefully,
} from "../typefully";
import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";
import { getStorage, setStorage } from "../utilities/storage";

// Function to change Writer Mode
export const changeWriterMode = (writerMode) => {
  switch (writerMode) {
    case "on":
      addStyles(
        "mt-writerMode",
        `
        body {
          padding-left: 0 !important;
        }
        header[role="banner"], 
        [data-testid="sidebarColumn"],
        [data-testid="primaryColumn"] > div > div:not(:nth-of-type(2)):not(:nth-of-type(3)) {
          display: none !important;
        }
        div[data-testid="primaryColumn"] {
          border-style: hidden !important;
          padding-top: 10vh !important;
        }
        div[aria-labelledby="modal-header"][role="dialog"] {
          width: 100vw !important;
          max-width: 100vw !important;
          top: 0 !important;
          border-radius: 0 !important;
        }
        div[role="group"] > div:empty {
          background-color: var(--body-bg-color) !important;
        }
        div[aria-labelledby="modal-header"][role="dialog"] > div {
          border-radius: 0 !important;
        }
        div[aria-labelledby="modal-header"][role="dialog"] > div > div > div {
          padding-bottom: 10vh !important;
        }
        `
      );
      setTimeout(() => {
        addTypefullyPlugToWriterMode();
      }, 1000);
      break;

    case "off":
      removeElement("mt-writerMode");
      removeTypefullyPlugFromWriterMode();
      break;
  }
};

// Function to change Reply Count
export const changeReplyCount = (replyCount) => {
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
export const changeRetweetCount = (retweetCount) => {
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
export const changeLikeCount = (likeCount) => {
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
export const changeFollowCount = (followCount) => {
  switch (followCount) {
    case "hide":
      addStyles(
        "mt-followCount",
        `
        [href$="/following"][dir][role="link"],
        [href$="/followers"][dir][role="link"] {
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
export const changeTweetButton = (hideTweetButton) => {
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
export const changeSearchBar1 = (hideSearch) => {
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
export const changeSearchBar2 = (transparentSearch) => {
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

// Function to change Promoted Posts
export const changePromotedPosts = (removePromotedPosts) => {
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
export const changeWhoToFollow = (whoToFollow) => {
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
export const changeTopicsToFollow = (topicsToFollow) => {
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
export const changeLatestTweets = (latestTweets) => {
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

const addTypefullyPlugToWriterMode = async () => {
  const main = document.querySelector('main[role="main"]');

  if (!main) return;
  if (document.getElementById("typefully-writermode-link")) return;

  /* ---------------------------- Typefully Button ---------------------------- */

  const typefullyLinkElement = createTypefullyLinkElement(
    "typefully-writermode-link",
    "typefully-writermode-button"
  );
  typefullyLinkElement.addEventListener("click", () => {
    getCurrentTextAndSendToTypefully();
  });

  const typefullyLogo = createTypefullyLogo();
  const typefullyText = document.createElement("span");
  typefullyText.innerText = "Save draft to Typefully";

  typefullyLinkElement.appendChild(typefullyLogo);
  typefullyLinkElement.appendChild(typefullyText);

  /* ----------------- Typefully box callout with explanation ---------------- */

  const typefullyBoxSeen = await getStorage("typefullyBoxSeen");

  if (typefullyBoxSeen !== "true") {
    const typefullyBox = document.createElement("div");
    typefullyBox.id = "typefully-writermode-box";
    typefullyBox.className = "typefully-box";

    typefullyBox.innerHTML = `
    <h3>Save and share your drafts</h3>
    <p><a href="https://typefully.com/?ref=minimal-twitter">Typefully</a> — the maker of this Chrome extension — is a free tool built for Twitter creators.</p>
    <ul>
      <li>✅ Never lose your work by syncing your drafts</li>
      <li>💬 Share your drafts with anyone for feedback</li>
      <li>🤖 Improve your tweets with AI</li>
      <li>📈 Grow faster with insights and metrics</li>
    </ul>
    <p>Click the button below to get started:</p>
    `;

    // Create svg element for the close button
    const closeButton = document.createElement("div");
    closeButton.id = "box-close-button";
    closeButton.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 12" stroke="black" stroke-width="2"/>
    <path d="M12 12L2 2" stroke="black" stroke-width="2"/>
    </svg>`;

    closeButton.addEventListener("click", () => {
      setStorage({ typefullyBoxSeen: "true" }).then(() => {
        typefullyBox.remove();
      });
    });

    typefullyBox.appendChild(closeButton);

    main.appendChild(typefullyBox);
  }

  main.appendChild(typefullyLinkElement);
};

const removeTypefullyPlugFromWriterMode = () => {
  const typefullyLinkElement = document.getElementById(
    "typefully-writermode-link"
  );
  typefullyLinkElement && typefullyLinkElement.remove();
  const typefullyBox = document.getElementById("typefully-writermode-box");
  typefullyBox && typefullyBox.remove();
};

// Function to add an expand icon to the buttons in the tweet composer
export const addWriterModeButton = () => {
  if (document.querySelector("#mt-writer-mode-composer-button")) return;

  const geoButton = document.querySelector('div[data-testid="geoButton"]');

  if (!geoButton) return;

  const writerModeButton = geoButton.cloneNode(true);

  writerModeButton.id = "mt-writer-mode-composer-button";
  writerModeButton.ariaLabel = "Writer Mode";
  writerModeButton.removeAttribute("data-testid");

  writerModeButton.firstChild.firstChild.firstChild.innerHTML =
    svgAssets.composerWriterMode.normal;
  geoButton.insertAdjacentElement("afterend", writerModeButton);

  writerModeButton.onclick = toggleWriterMode;

  addStyles(
    "mt-writer-mode-composer-button-style",
    `
  #mt-writer-mode-composer-button:hover {
    background-color: rgba(var(--accent-color-rgb), 0.1);
  }
      `
  );
};

const toggleWriterMode = async () => {
  const userSetting = await getStorage("writerMode");

  const writerModeButton = document.querySelector(
    "#mt-writer-mode-composer-button"
  );

  try {
    await setStorage({ writerMode: userSetting === "off" ? "on" : "off" });
  } catch (error) {
    console.error(error);
  }

  if (!writerModeButton) return;

  if (userSetting === "off") {
    writerModeButton.firstChild.firstChild.firstChild.innerHTML =
      svgAssets.composerWriterMode.selected;
  } else {
    writerModeButton.firstChild.firstChild.firstChild.innerHTML =
      svgAssets.composerWriterMode.normal;
  }
};
