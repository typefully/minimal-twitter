import selectors from "../../selectors";
import addStyles, { removeStyles } from "../utilities/addStyles";

export const changeReplyCount = (replyCount) => {
  switch (replyCount) {
    case "hide":
      addStyles(
        "replyCount",
        `${selectors.engagementAction("reply")} svg + span {
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
        ${selectors.engagementAction("retweet")} svg + span {
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
        ${selectors.engagementAction("like")} svg + span {
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
        `a[href$="/following"],
        a[href$="/followers"],
        a[href$="/verified_followers"] {
          display: none;
        }`
      );
      break;

    case "show":
      removeStyles("followCount");
      break;
  }
};
