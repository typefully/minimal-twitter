import { useEffect, useState } from "react";
import { KeyAllVanity, KeyFollowCount, KeyLikeCount, KeyReplyCount, KeyRetweetCount } from "../../../storage-keys";
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

    getUserDefaultAll();
    getUserDefaultReply();
    getUserDefaultLike();
    getUserDefaultRetweet();
    getUserDefaultFollow();
  }, []);

  const onCheckedChange = async (type, checked) => {
    switch (type) {
      case "all":
        setHideAll(checked);
        setHideReply(checked);
        setHideRetweet(checked);
        setHideLike(checked);
        setHideFollow(checked);
        try {
          await setStorage({
            [KeyAllVanity]: checked ? "hide" : "show",
            [KeyReplyCount]: checked ? "hide" : "show",
            [KeyRetweetCount]: checked ? "hide" : "show",
            [KeyLikeCount]: checked ? "hide" : "show",
            [KeyFollowCount]: checked ? "hide" : "show",
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
    }
  };

  return (
    <>
      <CheckboxControl
        id="all"
        label="Engagements Under Posts"
        description="Hides the visible numbers that make posts feel like scoreboards: reply totals, repost totals, like totals, and follower/following counts. The underlying buttons and profiles still work."
        labelExtras={<ToggleChevron pressed={showVanityCheckboxes} onClick={setShowVanityCheckboxes} />}
        checked={hideAll}
        onCheckedChange={(checked) => onCheckedChange("all", checked)}
        crossedIcon
      />
      {showVanityCheckboxes && (
        <div className="pl-3 flex flex-col gap-4 mb-2">
          <CheckboxControl
            crossedIcon
            id="reply"
            label="Reply Count from Tweets"
            description="Hides only the numeric reply total shown under posts. You can still open the replies or use the reply action."
            onCheckedChange={(checked) => onCheckedChange("reply", checked)}
            checked={hideReply}
          />
          <CheckboxControl
            crossedIcon
            id="retweet"
            label="Retweet Count from Tweets"
            description="Hides repost and quote-post totals under posts while keeping the repost menu and action available."
            onCheckedChange={(checked) => onCheckedChange("retweet", checked)}
            checked={hideRetweet}
          />
          <CheckboxControl
            crossedIcon
            id="like"
            label="Like Count from Tweets"
            description="Hides like totals in timelines and tweet detail pages while keeping the like button itself visible."
            onCheckedChange={(checked) => onCheckedChange("like", checked)}
            checked={hideLike}
          />
          <CheckboxControl
            crossedIcon
            id="follow"
            label="Follower/Following Count"
            description="Hides follower and following totals on profiles so accounts are not visually framed around audience size."
            onCheckedChange={(checked) => onCheckedChange("follow", checked)}
            checked={hideFollow}
          />
        </div>
      )}
    </>
  );
};

export default VanityCheckboxes;
