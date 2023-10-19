import addStyles, { removeStyles } from "../utilities/addStyles";

// Function to change Reply Count
export const changeReplyCount = (replyCount) => {
  switch (replyCount) {
    case "hide":
      addStyles(
        "replyCount",
        `[data-testid="reply"] span { 
          visibility: hidden;
        }`
      );
      break;

    case "show":
      removeStyles("replyCount");
      break;
  }
};

// Function to change Retweet Count
export const changeRetweetCount = (retweetCount) => {
  switch (retweetCount) {
    case "hide":
      addStyles(
        "retweetCount",
        `[href$="/retweets"],
        [href$="/retweets/with_comments"],
        [data-testid="retweet"] span,
        [data-testid="unretweet"] span {
          visibility: hidden; 
        }`
      );
      break;

    case "show":
      removeStyles("retweetCount");
      break;
  }
};

// Function to change Like Count
export const changeLikeCount = (likeCount) => {
  switch (likeCount) {
    case "hide":
      addStyles(
        "likeCount",
        `[href$="/likes"][href*="/status/"],
        [data-testid="like"] span,
        [data-testid="unlike"] span {
           visibility: hidden; 
        }`
      );
      break;

    case "show":
      removeStyles("likeCount");
      break;
  }
};

// Function to change Follow Count
export const changeFollowCount = (followCount) => {
  switch (followCount) {
    case "hide":
      addStyles(
        "followCount",
        `[href$="/following"][dir][role="link"],
        [href$="/followers"][dir][role="link"] {
          display: none;
        }`
      );
      break;

    case "show":
      removeStyles("followCount");
      break;
  }
};
