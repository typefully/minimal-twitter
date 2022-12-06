import { addStyles, removeElement } from "../utilities";

// Function to change Zen Mode
export const changeZenMode = (zenMode) => {
  switch (zenMode) {
    case "on":
      addStyles(
        "mt-zenMode",
        `
        header[role="banner"], 
        [data-testid="sidebarColumn"],
        [data-testid="primaryColumn"] > div > div:not(:nth-of-type(2)):not(:nth-of-type(3)) {
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
