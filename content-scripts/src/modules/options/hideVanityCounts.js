import addStyles, { removeStyles } from "../utilities/addStyles";

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

export const changeFollowingAndFollowersCounts = (followCount) => {
  switch (followCount) {
    case "hide":
      addStyles(
        "followCount",
        `[href$="following"][dir][role="link"],
        [href$="followers"][dir][role="link"] {
          display: none;
        }`
      );
      break;

    case "show":
      removeStyles("followCount");
      break;
  }
};

export const changeBookmarkCount = (bookmarkCount) => {
  switch (bookmarkCount) {
    case "hide":
      addStyles(
        "bookmarkCount",
        `[data-testid="bookmark"] span,
        [data-testid="removeBookmark"] span {
           visibility: hidden; 
        }`
      );
      break;

    case "show":
      removeStyles("bookmarkCount");
      break;
  }
}