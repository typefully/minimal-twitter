import { KeyRecentMedia } from "../../../../storage-keys";
import selectors from "../../selectors";
import addStyles, { removeStyles, stylesExist } from "../utilities/addStyles";
import { getStorage } from "../utilities/storage";
import { createTypefullyLogo } from "../typefullyPlugs";
import { createTypefullyMediaDownloadUrl } from "../utilities/createTypefullyUrl";

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
          div${selectors.mainColumn} {
            border-style: hidden;
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
        ${selectors.mainWrapper} section > div > div > div > div[role="separator"] {
          display: none;
        }
        ${selectors.mainColumn} > div > div:empty {
          background: transparent;
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
        ${selectors.mainColumn} > div > div {
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

            [data-testid="primaryColumn"] {
              transform: translateX(-64px);
            }
          }
          `
      );
      break;
  }
};

export const changeFollowingTimeline = (followingTimeline) => {
  if (followingTimeline !== "on") return;

  const tablist = document.querySelector("div[data-testid='ScrollSnap-List'][role='tablist']");
  const selectedTab = document.querySelector("div[data-testid='ScrollSnap-List'][role='tablist'] a[href='/home'][aria-selected='true']");

  // Check if there's a selected tab
  if (!tablist || !selectedTab) return;

  // Get localized "Following" text (it's the second tab)
  const followingTabText = tablist.querySelector("div[role='presentation']:nth-of-type(2) span").textContent.toLowerCase();
  const selectedTabText = selectedTab.querySelector("div[dir='ltr'] > span").textContent.toLowerCase();

  if (selectedTabText === followingTabText) return; // Already on the "Following" tab

  const secondTab = tablist.querySelector("div[role='presentation']:nth-child(2) a");

  secondTab.click(); // Following tab is second tab
};

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

export const addMediaDownloadButtons = () => {
  const sharePostButtons = document.querySelectorAll("button[aria-label='Share post']");

  sharePostButtons.forEach((sharePostButton) => {
    // ensure we don't add the event listener twice
    if (!sharePostButton.classList.contains("typefully-enhanced-share")) {
      sharePostButton.classList.add("typefully-enhanced-share");

      sharePostButton.addEventListener("click", () => {
        const tweet = sharePostButton.closest("article[data-testid='tweet']");
        if (!tweet) return;

        const tweetLinkElements = tweet.querySelectorAll("a[href*='/status/']");
        if (tweetLinkElements.length === 0) return;

        let tweetHref;
        let tweetUrl;

        for (const tweetLinkElement of tweetLinkElements) {
          // Pattern: /{username}/status/{postId}
          if (tweetLinkElement.getAttribute("href").match(/\/([^\/]+)\/status\/(\d+)$/)) {
            tweetHref = tweetLinkElement.getAttribute("href");
            tweetUrl = tweetLinkElement.href;
            break;
          }
        }

        if (!tweetHref) return;

        let videoTweetElement = tweet.querySelector("div[data-testid='previewInterstitial']");
        let gifTweetElement = tweet.querySelector("button[aria-label='Play this GIF']");
        let photoTweetElement = tweet.querySelector(`a[href*='${tweetHref}/photo']`);

        let hasPhoto = false;
        let hasVideo = false;
        let hasGif = false;

        if (tweetHref.includes('photo') || photoTweetElement) {
          hasPhoto = true;
        }

        if (videoTweetElement) {
          hasVideo = true;
        }

        if (gifTweetElement) {
          hasGif = true;
        }

        // if the video tweet contains the gif tweet, make hasVideo as false.
        if (videoTweetElement && videoTweetElement.contains(gifTweetElement)) {
          hasVideo = false;
        }

        if (!hasVideo && !hasPhoto && !hasGif) return;
        
        const links = tweet.querySelectorAll("div[role='link']");
        let quoteTweetLink;

        const userName = tweet.querySelector("div[data-testid='User-Name']");

        for (const link of links) {
          if (!userName.contains(link) && link.hasAttribute("data-testid") !== "tweet-text-show-more-link") {
            quoteTweetLink = link;
            break;
          }
        }

        // check if video/photo/gif is in a quote tweet.
        // if it is, don't show the download button.
        if (quoteTweetLink && ((quoteTweetLink.contains(videoTweetElement) || quoteTweetLink.contains(photoTweetElement)
          || quoteTweetLink.contains(gifTweetElement)) && quoteTweetLink.hasAttribute("data-testid") !== "tweet-text-show-more-link")) return;

        setTimeout(() => {
          const dropdown = document.querySelector("div[data-testid='Dropdown']");
          if (!dropdown) return;

          const options = dropdown.querySelectorAll("div[role='menuitem']");
          if (!options) return;

          const optionToClone = options[options.length - 1];

          if (hasPhoto) {
            addDropdownOption(dropdown, "image", tweetUrl, optionToClone);
          }

          if (hasGif) {
            addDropdownOption(dropdown, "gif", tweetUrl, optionToClone);
          } else if (hasVideo) {
            addDropdownOption(dropdown, "video", tweetUrl, optionToClone);
          }
        }, 500);
      });
    }
  });
};

const addDropdownOption = (dropdown, downloadType, tweetUrl, optionToClone) => {
  const downloadWithTypefullyOption = optionToClone.cloneNode(true);
  downloadWithTypefullyOption.id = `typefully-${downloadType}-download-button`;

  downloadWithTypefullyOption.innerHTML = "";

  const typefullyLogo = createTypefullyLogo();
  const typefullyText = document.createElement("div");

  downloadWithTypefullyOption.addEventListener("click", () => {
    let url;

    if (downloadType === "gif" || downloadType === "video" || downloadType === "image") {
      url = createTypefullyMediaDownloadUrl({
        utm_content: `download-${downloadType}-button`,
        tweet_url: tweetUrl,
      }, downloadType);
    }

    window.open(url.toString());
  });

  if (downloadType === "gif") {
    typefullyText.innerText = "Download GIF with Typefully";
  } else {
    typefullyText.innerText = `Download ${downloadType} with Typefully`;
  }

  downloadWithTypefullyOption.appendChild(typefullyLogo);
  downloadWithTypefullyOption.appendChild(typefullyText);

  dropdown.appendChild(downloadWithTypefullyOption);
}
