import { KeyRecentMedia } from "../../../../storage-keys";
import selectors from "../../selectors";
import { checkUrlForFollow } from "../check";
import addStyles, { removeStyles, stylesExist } from "../utilities/addStyles";
import { getStorage } from "../utilities/storage";

// Function to change Timeline Width
export const changeTimelineWidth = (timelineWidth) => {
  switch (timelineWidth) {
    case 600:
      addStyles(
        "timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 600px;
            max-width: 600px;
          }
        }
        `
      );
      break;

    case 650:
      addStyles(
        "timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 650px;
            max-width: 650px;
          }
        }
        `
      );
      break;

    case 700:
      addStyles(
        "timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 700px;
            max-width: 700px;
          }
        }
        `
      );
      break;

    case 750:
      addStyles(
        "timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 750px;
            max-width: 750px;
          }
        }
        `
      );
      break;

    case 800:
      addStyles(
        "timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 800px;
            max-width: 800px;
          }
        }
        `
      );
      break;
  }
};

// Function to change Timeline Borders
export const changeTimelineBorders = (timelineBorders) => {
  switch (timelineBorders) {
    case "on":
      removeStyles("timelineBorders");
      break;

    case "off":
      addStyles(
        "timelineBorders",
        `
        @media only screen and (min-width: 988px) {
          div${selectors.mainColumn} {
            border-style: hidden;
          }
        }
        `.trim()
      );
      break;
  }
};

// Function to change Tweet Borders
export const changeTweetBorders = (tweetBorders) => {
  switch (tweetBorders) {
    case "on":
      removeStyles("tweetBorders");
      break;

    case "off":
      addStyles(
        "tweetBorders",
        `
        ${selectors.mainWrapper} section > div > div > div > div {
          border-style: hidden;
        }
        ${selectors.mainColumn} > div > div:empty {
          background: transparent;
        }
        `.trim()
      );
      break;
  }
};

// Function to change Sticky Header
export const changeStickyHeader = (stickyHeader) => {
  switch (stickyHeader) {
    case "on":
      removeStyles("stickyHeader");
      break;

    case "off":
      addStyles(
        "stickyHeader",
        `
        ${selectors.mainColumn} > div > div {
          position: unset;
        }
        `
      );
      break;
  }
};

// Function to change Promoted Posts
export const changePromotedPosts = (removePromotedPosts) => {
  switch (removePromotedPosts) {
    case "off":
      addStyles(
        "removePromotedPosts",
        `
        [data-testid="placementTracking"] article {
          display: flex;
        }
        `
      );
      break;

    case "on":
      removeStyles("removePromotedPosts");
      break;
  }
};

// Function to change Who to Follow
export const changeWhoToFollow = (removeWhoToFollow) => {
  switch (removeWhoToFollow) {
    case "off":
      removeStyles("removeWhoToFollow");
      break;

    case "on":
      addStyles(
        "removeWhoToFollow",
        `
        ${selectors.mainColumn} a[href*="/i/connect_people?user_id="],
        ${selectors.mainColumn} div[data-testid="UserCell"] {
          display: none;
        }
        `
      );
      break;
  }

  checkUrlForFollow();
};

// Function to change Topics to Follow
export const changeTopicsToFollow = (removeTopicsToFollow) => {
  switch (removeTopicsToFollow) {
    case "off":
      removeStyles("removeTopicsToFollow");
      break;

    case "on":
      addStyles(
        "removeTopicsToFollow",
        `
        ${selectors.mainColumn} section[aria-labelledby^="accessible-list-"] > div[aria-label$="Carousel"],
        ${selectors.mainColumn} a[href*="/i/flow/topics_selector"],
        ${selectors.mainColumn} a[href*="/i/topics/picker/home"] {
          display: none;
        }
        [aria-label="Lists timeline"] section[aria-labelledby^="accessible-list-"] > div[aria-label$="Carousel"] {
          display: flex;
        }
        `
      );
      break;
  }
};

export const changeTimelineTabs = (removeTimelineTabs, writerMode) => {
  if (writerMode === "on" || window.location.pathname.includes("compose/tweet") || !window.location.pathname.includes("/home") || !window.location.pathname === "/") {
    removeStyles("removeTimelineTabs");
    return;
  }

  switch (removeTimelineTabs) {
    case "off":
      removeStyles("removeTimelineTabs");
      break;

    case "on":
      if (stylesExist("removeTimelineTabs")) return;

      addStyles(
        "removeTimelineTabs",
        `
        ${selectors.timelineTabs} {
          display: none;
        }
        `
      );
      break;
  }
};

// Function to change Recent Media on Profiles
export const changeRecentMedia = async (recentMedia) => {
  const userProfile = document.querySelector('meta[content*="twitter://user?screen_name="]');

  if (!userProfile) {
    removeStyles("recentMedia");
    return;
  }

  const sidebarPhotoGrid = document
    .querySelector(selectors.rightSidebar)
    ?.querySelector('[aria-label][tabindex="0"]')
    ?.querySelector('[style="padding-bottom: 56.25%;"]')?.parentElement;

  if (!sidebarPhotoGrid) return;

  const run = (rm) => {
    switch (rm) {
      case "off":
        removeStyles("recentMedia");
        sidebarPhotoGrid.classList.remove("mt-recentMedia-photoGrid");
        break;

      case "on":
        addStyles(
          "recentMedia",
          `
            @media only screen and (min-width: 1265px) {
              .mt-recentMedia-photoGrid {
                visibility: visible;
                position: fixed;
                right: 16px;
                top: 70px;
                width: 300px;
              }
              
              [data-testid="primaryColumn"] {
                transform: translateX(-64px);
              }
            }
            `
        );
        sidebarPhotoGrid.classList.add("mt-recentMedia-photoGrid");

        break;
    }
  };

  if (recentMedia) {
    run(recentMedia);
  } else {
    const setting = await getStorage(KeyRecentMedia);
    run(setting);
  }
};

// Function to change Show Trends on Home Timeline
export const changeTrendsHomeTimeline = (trendsHomeTimeline, writerMode) => {
  if (writerMode === "on" || window.location.pathname.includes("compose/tweet") || !window.location.pathname.includes("/home") || !window.location.pathname === "/") {
    removeStyles("trendsHomeTimeline");
    return;
  }

  switch (trendsHomeTimeline) {
    case "off":
      removeStyles("trendsHomeTimeline");
      break;

    case "on":
      if (stylesExist("trendsHomeTimeline")) return;

      addStyles(
        "trendsHomeTimeline",
        `
          @keyframes render {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
              transform: none;
            }
          }
          @media only screen and (min-width: 1265px) {
            ${selectors.rightSidebar} section[aria-labelledby^="accessible-list-"] {
              visibility: visible;
              position: fixed;
              right: 16px;
              top: 0px;
              max-height: 78vh;
              overflow: auto;
              width: 300px;
              border-radius: 16px;
              border-color: var(--border-color);
              border-width: 1px;
              background-color: var(--body-bg-color);
              opacity: 0;
              will-change: opacity;
              animation-name: render;
              animation-duration: 0s;
              animation-fill-mode: forwards;
              animation-delay: 500ms;
              margin-top: 4px;
            }

            [data-testid="primaryColumn"] {
              transform: translateX(-64px);
            }
          }
          `
      );
      break;
  }
};

// Function to change Following Timeline
export const changeFollowingTimeline = (followingTimeline) => {
  if (followingTimeline !== "on") return;

  const tablist = document.querySelector("div[data-testid='ScrollSnap-List'][role='tablist']");
  const selectedTab = document.querySelector("div[data-testid='ScrollSnap-List'][role='tablist'] a[href='/home'][aria-selected='true']");

  // Check if there's a selected tab
  if (!tablist || !selectedTab) return;

  const selectedTabText = selectedTab.querySelector("div[dir='ltr'] > span").textContent.toLowerCase();

  if (selectedTabText === "following") return;

  const secondTab = tablist.querySelector("div[role='presentation']:nth-child(2) a");

  secondTab.click(); // Following tab is second tab
};

// Function to change Latest Tweets
let lt1; // Latest Tweets timeout 1
let lt2; // Latest Tweets timeout 2
export const changeLatestTweets = (latestTweets) => {
  if (latestTweets !== "on") return;

  const showLatestTweets = () => {
    // Check if the "Latest Tweets" options is already selected to avoid unnecessary clicks
    const latestSelected = !!document.querySelector("div[data-testid='ScrollSnap-List'] > div:last-child > a[aria-selected='true']");
    // Check if there's a menu button
    const menuitem = document.querySelector("div[role='menuitem'][tabindex='0']");

    if (latestSelected || !menuitem) return;

    const run = () => {
      // Check if the nav bar with "Home" and "Latest Tweets" exists
      const optionBarExists = !!document.querySelector("div[data-testid='ScrollSnap-List']");

      if (!optionBarExists) {
        /*
            If it doesn't, we have to get it to display
            1. Click the Timeline Options button
            2. Click the first option in the popup
          */
        const timelineOptions = document.querySelector("div[aria-label='Timeline options']");
        const topTweetsOn = document.querySelector("div[aria-label='Top Tweets on']");

        const clickMenuButton = (isTimelineOptions) => {
          clearTimeout(lt1);
          lt1 = setTimeout(() => {
            menuitem && menuitem.click();

            if (isTimelineOptions) {
              // Click the "Latest Tweets" nav bar option
              const latestTweetsNavBarOption = document.querySelector("div[data-testid='ScrollSnap-List'] > div:last-child > a");
              latestTweetsNavBarOption && latestTweetsNavBarOption.click();
            }
          }, 100);
          return lt1;
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

    clearTimeout(lt2);
    lt2 = setTimeout(run, 500);
    return lt2;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showLatestTweets);
  } else {
    showLatestTweets();
  }
};

export const removeTweetFormatting = (removeTweetFormatting) => {
  switch (removeTweetFormatting) {
    case "on":
      addStyles(
        "removeTweetFormatting",
        `
        ${selectors.tweetSpan} {
           font-weight: 400;
           font-style: normal;
        }
        `
      );
      break;

    case "off":
      removeStyles("removeTweetFormatting");
      break;
  }
};
