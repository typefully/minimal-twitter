import selectors from "../../selectors";
import addStyles, { removeStyles, stylesExist } from "../utilities/addStyles";

export const changeTimelineWidth = (timelineWidth) => {
  if (![600, 650, 700, 750, 800].includes(timelineWidth)) return;

  addStyles(
    "timelineWidth",
    `
    @media only screen and (min-width: 988px) {
      ${selectors.mainWrapper} {
        --x-main-column-width: ${timelineWidth}px;
        --x-timeline-max-width: ${timelineWidth}px;
      }
    }
    `
  );
};

export const changeTimelineBorders = (timelineBorders) => {
  switch (timelineBorders) {
    case "off":
      removeStyles("timelineBorders");
      break;

    case "on":
      addStyles(
        "timelineBorders",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            border-style: hidden !important;
          }
        }
        `.trim()
      );
      break;
  }
};

export const changeTweetBorders = (tweetBorders) => {
  switch (tweetBorders) {
    case "off":
      removeStyles("tweetBorders");
      break;

    case "on":
      addStyles(
        "tweetBorders",
        `
        ${selectors.mainColumn} li > div[role="link"] {
          border-bottom-color: transparent;
        }
        `.trim()
      );
      break;
  }
};

export const changeStickyHeader = (stickyHeader) => {
  switch (stickyHeader) {
    case "on":
      removeStyles("stickyHeader");
      break;

    case "off":
      addStyles(
        "stickyHeader",
        `
        ${selectors.topHeader} {
          position: unset;
        }
        `
      );
      break;
  }
};

export const changePromotedPosts = (removePromotedPosts) => {
  switch (removePromotedPosts) {
    case "off":
      addStyles(
        "removePromotedPosts",
        `
        ${selectors.promotedPost} {
          display: list-item;
        }
        `
      );
      break;

    case "on":
      removeStyles("removePromotedPosts");
      break;
  }
};

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
            ${selectors.trendsSection} {
              visibility: visible;
              position: fixed;
              right: 16px;
              top: 66px;
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

            ${selectors.mainColumn} {
              transform: translateX(-64px);
            }
          }
          `
      );
      break;
  }
};

let lt1; // Latest Tweets timeout 1
let lt2; // Latest Tweets timeout 2
export const changeLatestTweets = (latestTweets) => {
  if (latestTweets !== "on") return;

  const showLatestTweets = () => {
    // Check if the "Latest Tweets" options is already selected to avoid unnecessary clicks
    const latestSelected = !!document.querySelector(`${selectors.timelineTablist} > div:last-child > a[aria-selected='true']`);
    // Check if there's a menu button
    const menuitem = document.querySelector(selectors.menuItem);

    if (latestSelected || !menuitem) return;

    const run = () => {
      // Check if the nav bar with "Home" and "Latest Tweets" exists
      const optionBarExists = !!document.querySelector(selectors.timelineTablist);

      if (!optionBarExists) {
        /*
            If it doesn't, we have to get it to display
            1. Click the Timeline Options button
            2. Click the first option in the popup
          */
        const timelineOptions = document.querySelector(selectors.timelineOptions);
        const topTweetsOn = document.querySelector(selectors.topTweetsOn);

        const clickMenuButton = (isTimelineOptions) => {
          clearTimeout(lt1);
          lt1 = setTimeout(() => {
            menuitem && menuitem.click();

            if (isTimelineOptions) {
              // Click the "Latest Tweets" nav bar option
              const latestTweetsNavBarOption = document.querySelector(`${selectors.timelineTablist} > div:last-child > a`);
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
