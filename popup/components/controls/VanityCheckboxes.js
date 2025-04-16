import { useEffect, useState } from "react";
import { KeyAllVanity, KeyFollowCount, KeyLikeCount, KeyReplyCount, KeyRetweetCount, KeyBookmarkCount } from "../../../storage-keys";
import { getStorage, setStorage } from "../../utilities/chromeStorage";
import ToggleChevron from "../ui/ToggleChevron";
import { CheckboxControl } from "../ui/checkboxes";

const VanityCheckboxes = () => {
  const [showVanityCheckboxes, setShowVanityCheckboxes] = useState(false);
  const [hideAll, setHideAll] = useState(false);
  const [hideReply, setHideReply] = useState(false);
  const [hideRetweet, setHideRetweet] = useState(false);
  const [hideLike, setHideLike] = useState(false);
  const [hideFollow, setHideFollow] = useState(false);
  const [hideBookmark, setHideBookmark] = useState(false);

  useEffect(() => {
    const getUserDefaultAll = async () => {
      try {
        const userDefaultAll = await getStorage(KeyAllVanity);
        if (userDefaultAll) {
          setHideAll(userDefaultAll === "hide" ? true : false);
        }
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultReply = async () => {
      try {
        const userDefaultReply = await getStorage(KeyReplyCount);
        userDefaultReply && setHideReply(userDefaultReply === "hide" ? true : false);
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultLike = async () => {
      try {
        const userDefaultLike = await getStorage(KeyLikeCount);
        userDefaultLike && setHideLike(userDefaultLike === "hide" ? true : false);
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultRetweet = async () => {
      try {
        const userDefaultRetweet = await getStorage(KeyRetweetCount);
        userDefaultRetweet && setHideRetweet(userDefaultRetweet === "hide" ? true : false);
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultFollow = async () => {
      try {
        const userDefaultFollow = await getStorage(KeyFollowCount);
        userDefaultFollow && setHideFollow(userDefaultFollow === "hide" ? true : false);
      } catch (error) {
        console.warn(error);
      }
    };
    const getUserDefaultBookmark = async () => {
      try {
        const userDefaultBookmark = await getStorage(KeyBookmarkCount);
        userDefaultBookmark && setHideBookmark(userDefaultBookmark === "hide" ? true : false);
      } catch (error) {
        console.warn(error);
      }
    };

    getUserDefaultAll();
    getUserDefaultReply();
    getUserDefaultLike();
    getUserDefaultRetweet();
    getUserDefaultFollow();
    getUserDefaultBookmark();
  }, []);

  const onCheckedChange = async (type, checked) => {
    switch (type) {
      case "all":
        setHideAll(checked);
        setHideReply(checked);
        setHideRetweet(checked);
        setHideLike(checked);
        setHideFollow(checked);
        setHideBookmark(checked);
        try {
          await setStorage({
            [KeyAllVanity]: checked ? "hide" : "show",
            [KeyReplyCount]: checked ? "hide" : "show",
            [KeyRetweetCount]: checked ? "hide" : "show",
            [KeyLikeCount]: checked ? "hide" : "show",
            [KeyFollowCount]: checked ? "hide" : "show",
            [KeyBookmarkCount]: checked ? "hide": "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "reply":
        setHideReply(checked);
        try {
          await setStorage({
            [KeyReplyCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "retweet":
        setHideRetweet(checked);
        try {
          await setStorage({
            [KeyRetweetCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "like":
        setHideLike(checked);
        try {
          await setStorage({
            [KeyLikeCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;

      case "follow":
        setHideFollow(checked);
        try {
          await setStorage({
            [KeyFollowCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;
      
      case "bookmark":
        setHideBookmark(checked);
        try {
          await setStorage({
            [KeyBookmarkCount]: checked ? "hide" : "show",
          });
        } catch (error) {
          console.warn(error);
        }
        break;
    }
  };

  return (
    <>
      <CheckboxControl
        id="all"
        label="Engagements Under Posts"
        labelExtras={<ToggleChevron pressed={showVanityCheckboxes} onClick={setShowVanityCheckboxes} />}
        checked={hideAll}
        onCheckedChange={(checked) => onCheckedChange("all", checked)}
        crossedIcon
      />
      {showVanityCheckboxes && (
        <div className="pl-3 flex flex-col gap-4 mb-2">
          <CheckboxControl crossedIcon id="reply" label="Reply Count from Tweets" onCheckedChange={(checked) => onCheckedChange("reply", checked)} checked={hideReply} />
          <CheckboxControl crossedIcon id="retweet" label="Retweet Count from Tweets" onCheckedChange={(checked) => onCheckedChange("retweet", checked)} checked={hideRetweet} />
          <CheckboxControl crossedIcon id="like" label="Like Count from Tweets" onCheckedChange={(checked) => onCheckedChange("like", checked)} checked={hideLike} />
          <CheckboxControl crossedIcon id="follow" label="Follower/Following Count" onCheckedChange={(checked) => onCheckedChange("follow", checked)} checked={hideFollow} />
          <CheckboxControl crossedIcon id="bookmark" label="Bookmark Count from Tweets" onCheckedChange={(checked) => onCheckedChange("bookmark", checked)} checked={hideBookmark} />
        </div>
      )}
    </>
  );
};

export default VanityCheckboxes;
