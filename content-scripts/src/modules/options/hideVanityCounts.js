import addStyles from "../utilities/addStyles";
import removeElement from "../utilities/removeElement";

// Function to change Reply Count
export const changeReplyCount = (replyCount) => {
  switch (replyCount) {
    case "hide":
      addStyles(
        "mt-replyCount",
        `
        [data-testid="reply"] span { 
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
        [href$="/retweets"],
        [href$="/retweets/with_comments"],
        [data-testid="retweet"] span,
        [data-testid="unretweet"] span {
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
        [href$="/likes"][href*="/status/"],
        [data-testid="like"] span,
        [data-testid="unlike"] span {
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
