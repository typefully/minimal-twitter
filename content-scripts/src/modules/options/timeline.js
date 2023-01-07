import selectors from "../../selectors";
import { checkUrlForFollow } from "../check";
import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";

// Function to change Timeline Width
export const changeTimelineWidth = (timelineWidth) => {
  switch (timelineWidth) {
    case 600:
      addStyles(
        "mt-timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 600px !important;
            max-width: 600px !important;
          }
        }
        `
      );
      break;

    case 650:
      addStyles(
        "mt-timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 650px !important;
            max-width: 650px !important;
          }
        }
        `
      );
      break;

    case 700:
      addStyles(
        "mt-timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 700px !important;
            max-width: 700px !important;
          }
        }
        `
      );
      break;

    case 750:
      addStyles(
        "mt-timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 750px !important;
            max-width: 750px !important;
          }
        }
        `
      );
      break;

    case 800:
      addStyles(
        "mt-timelineWidth",
        `
        @media only screen and (min-width: 988px) {
          ${selectors.mainColumn} {
            width: 800px !important;
            max-width: 800px !important;
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
      removeElement("mt-timelineBorders");
      break;

    case "off":
      addStyles(
        "mt-timelineBorders",
        `
        @media only screen and (min-width: 988px) {
          div${selectors.mainColumn} {
            border-style: hidden !important;
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
      removeElement("mt-tweetBorders");
      break;

    case "off":
      addStyles(
        "mt-tweetBorders",
        `
        ${selectors.mainWrapper} section > div > div > div > div {
          border-style: hidden !important;
        }
        ${selectors.mainColumn} > div > div:empty {
          background: transparent !important;
        }
        `.trim()
      );
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
export const changeWhoToFollow = (removeWhoToFollow) => {
  switch (removeWhoToFollow) {
    case "off":
      removeElement("mt-removeWhoToFollow");
      break;

    case "on":
      addStyles(
        "mt-removeWhoToFollow",
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
      removeElement("mt-removeTopicsToFollow");
      break;

    case "on":
      addStyles(
        "mt-removeTopicsToFollow",
        `
        ${selectors.mainColumn} section[aria-labelledby^="accessible-list-"] > div[aria-label$="Carousel"],
        ${selectors.mainColumn} a[href*="/i/flow/topics_selector"],
        ${selectors.mainColumn} a[href*="/i/topics/picker/home"] {
          display: none;
        }
        [aria-label="Lists timeline"] section[aria-labelledby^="accessible-list-"] > div[aria-label$="Carousel"] {
          display: flex !important;
        }
        `
      );
      break;
  }
};

// Function to change Show Trends on Home Timeline
export const changeTrendsHomeTimeline = (trendsHomeTimeline) => {
  if (
    window.location.pathname.includes("/home") ||
    window.location.pathname === "/"
  ) {
    switch (trendsHomeTimeline) {
      case "off":
        removeElement("mt-trendsHomeTimeline");
        break;

      case "on":
        addStyles(
          "mt-trendsHomeTimeline",
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
              border-radius: 16px;
              border-color: rgba(var(--secondary-text-color-rgb), 0.1);
              border-width: 1px;
              background-color: var(--body-bg-color);
              opacity: 0;
              will-change: opacity;
              animation-name: render;
              animation-duration: 0s;
              animation-fill-mode: forwards;
              animation-delay: 1s;
            }

            [data-testid="primaryColumn"] {
              transform: translateX(-64px);
            }
          }
          `
        );
        break;
    }
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
