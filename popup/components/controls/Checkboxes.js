import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@radix-ui/react-icons"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { styled } from "@stitches/react"
import { useEffect, useState } from "react"

import { getStorage, setStorage } from "../../utilities/chromeStorage"

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  position: "relative",
  "&::after": {
    content: "",
    position: "absolute",
    inset: `min(
      0px,
      calc((100% - 2.25rem) / 2)
    )`
  },
  '&[data-state="unchecked"]': {
    backgroundColor: "transparent",
    border: "2px solid var(--twitter-accent-one)"
  }
})

export const CheckboxHideVanityCount = ({
  showVanityCheckboxes,
  setShowVanityCheckboxes,
  onCheckedChange,
  hideAll
}) => {
  return (
    <div className="flex items-center justify-between w-full py-1">
      <span className="flex items-center gap-x-2 text-base tracking-normal text-black dark:text-white">
        <label htmlFor="hideVanityCount">Hide Vanity Counts</label>
        <TogglePrimitive.Root
          pressed={showVanityCheckboxes}
          onPressedChange={(pressed) => {
            setShowVanityCheckboxes(pressed)
          }}
          className="flex items-center"
        >
          {showVanityCheckboxes ? (
            <ChevronUpIcon className="mt-1" />
          ) : (
            <ChevronDownIcon />
          )}
        </TogglePrimitive.Root>
      </span>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={(checked) => onCheckedChange("all", checked)}
          checked={hideAll}
          id="hideVanityCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideReplyCount = ({ onCheckedChange, hideReply }) => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideReplyCount" className="text-base">
        Hide reply count
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={(checked) => onCheckedChange("reply", checked)}
          checked={hideReply}
          id="hideReplyCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideRetweetCount = ({ onCheckedChange, hideRetweet }) => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideRetweetCount" className="text-base">
        Hide retweet count
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={(checked) => onCheckedChange("retweet", checked)}
          checked={hideRetweet}
          id="hideRetweetCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideLikeCount = ({ onCheckedChange, hideLike }) => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideLikeCount" className="text-base">
        Hide like count
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={(checked) => onCheckedChange("like", checked)}
          checked={hideLike}
          id="hideLikeCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideFollowCount = ({ onCheckedChange, hideFollow }) => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideFollowingCount" className="text-base">
        Hide follower/following count
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={(checked) => onCheckedChange("follow", checked)}
          checked={hideFollow}
          id="hideFollowCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxPromotedPosts = () => {
  const [userPromoted, setPromoted] = useState(true)

  useEffect(() => {
    const getUserDefaultPromoted = async () => {
      try {
        const userDefaultPromoted = await getStorage("removePromotedPosts")
        userDefaultPromoted &&
          setPromoted(userDefaultPromoted === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultPromoted()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-1">
      <label htmlFor="promotedPosts" className="text-base tracking-normal">
        Remove Promoted Posts
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={async (checked) => {
            setPromoted(checked)
            try {
              await setStorage({
                removePromotedPosts: checked ? "on" : "off"
              })
            } catch (error) {
              console.warn(error)
            }
          }}
          checked={userPromoted}
          id="removePromotedPosts"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxWhoToFollow = () => {
  const [userWho, setUserWho] = useState(false)

  useEffect(() => {
    const getUserDefaultWho = async () => {
      try {
        const userDefaultWho = await getStorage("whoToFollow")
        userDefaultWho && setUserWho(userDefaultWho === "off" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultWho()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-1">
      <label htmlFor="whoToFollow" className="text-base tracking-normal">
        Remove Who to Follow
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={async (checked) => {
            setUserWho(checked)
            try {
              await setStorage({
                whoToFollow: checked ? "off" : "on"
              })
            } catch (error) {
              console.warn(error)
            }
          }}
          checked={userWho}
          id="whoToFollow"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxTopicsToFollow = () => {
  const [userTopics, setUserTopics] = useState(false)

  useEffect(() => {
    const getUserDefaultTopics = async () => {
      try {
        const userDefaultTopics = await getStorage("topicsToFollow")
        userDefaultTopics &&
          setUserTopics(userDefaultTopics === "off" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultTopics()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-1">
      <label htmlFor="topicsToFollow" className="text-base tracking-normal">
        Remove Topics to Follow
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={async (checked) => {
            setUserTopics(checked)
            try {
              await setStorage({
                topicsToFollow: checked ? "off" : "on"
              })
            } catch (error) {
              console.warn(error)
            }
          }}
          checked={userTopics}
          id="topicsToFollow"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxAlwaysShowLatest = () => {
  const [userLatest, setUserLatest] = useState(false)

  useEffect(() => {
    const getUserDefaultLatest = async () => {
      try {
        const userDefaultLatest = await getStorage("latestTweets")
        userDefaultLatest &&
          setUserLatest(userDefaultLatest === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultLatest()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-1">
      <label htmlFor="latestTweets" className="text-base tracking-normal">
        Always Show Latest Tweets
      </label>
      <div className="grid rounded-full cursor-pointer w-9 h-9 place-items-center hover:bg-twitterAccentFour">
        <StyledCheckbox
          onCheckedChange={async (checked) => {
            setUserLatest(checked)
            try {
              await setStorage({
                latestTweets: checked ? "on" : "off"
              })
            } catch (error) {
              console.warn(error)
            }
          }}
          checked={userLatest}
          id="latestTweets"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-twitterAccentThree"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}
