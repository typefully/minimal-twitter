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

const CheckboxHideVanityCount = ({
  showVanityCheckboxes,
  setShowVanityCheckboxes,
  onCheckedChange,
  hideAll
}) => (
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

const CheckboxHideReplyCount = ({ onCheckedChange, hideReply }) => (
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

const CheckboxHideRetweetCount = ({ onCheckedChange, hideRetweet }) => (
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

const CheckboxHideLikeCount = ({ onCheckedChange, hideLike }) => (
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

const CheckboxHideFollowCount = ({ onCheckedChange, hideFollow }) => (
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

const VanityCheckboxes = () => {
  const [showVanityCheckboxes, setShowVanityCheckboxes] = useState(false)
  const [hideAll, setHideAll] = useState(false)
  const [hideReply, setHideReply] = useState(false)
  const [hideRetweet, setHideRetweet] = useState(false)
  const [hideLike, setHideLike] = useState(false)
  const [hideFollow, setHideFollow] = useState(false)

  useEffect(() => {
    const getUserDefaultAll = async () => {
      try {
        const userDefaultAll = await getStorage("allVanity")
        if (userDefaultAll) {
          setHideAll(userDefaultAll === "hide" ? true : false)
        }
      } catch (error) {
        console.warn(error)
      }
    }
    const getUserDefaultReply = async () => {
      try {
        const userDefaultReply = await getStorage("replyCount")
        userDefaultReply &&
          setHideReply(userDefaultReply === "hide" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }
    const getUserDefaultLike = async () => {
      try {
        const userDefaultLike = await getStorage("likeCount")
        userDefaultLike &&
          setHideLike(userDefaultLike === "hide" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }
    const getUserDefaultRetweet = async () => {
      try {
        const userDefaultRetweet = await getStorage("retweetCount")
        userDefaultRetweet &&
          setHideRetweet(userDefaultRetweet === "hide" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }
    const getUserDefaultFollow = async () => {
      try {
        const userDefaultFollow = await getStorage("followCount")
        userDefaultFollow &&
          setHideFollow(userDefaultFollow === "hide" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultAll()
    getUserDefaultReply()
    getUserDefaultLike()
    getUserDefaultRetweet()
    getUserDefaultFollow()
  }, [])

  const onCheckedChange = async (type, checked) => {
    switch (type) {
      case "all":
        setHideAll(checked)
        setHideReply(checked)
        setHideRetweet(checked)
        setHideLike(checked)
        setHideFollow(checked)
        try {
          await setStorage({
            allVanity: checked ? "hide" : "show",
            replyCount: checked ? "hide" : "show",
            retweetCount: checked ? "hide" : "show",
            likeCount: checked ? "hide" : "show",
            followCount: checked ? "hide" : "show"
          })
        } catch (error) {
          console.warn(error)
        }
        break

      case "reply":
        setHideReply(checked)
        try {
          await setStorage({
            replyCount: checked ? "hide" : "show"
          })
        } catch (error) {
          console.warn(error)
        }
        break

      case "retweet":
        setHideRetweet(checked)
        try {
          await setStorage({
            retweetCount: checked ? "hide" : "show"
          })
        } catch (error) {
          console.warn(error)
        }
        break

      case "like":
        setHideLike(checked)
        try {
          await setStorage({
            likeCount: checked ? "hide" : "show"
          })
        } catch (error) {
          console.warn(error)
        }
        break

      case "follow":
        setHideFollow(checked)
        try {
          await setStorage({
            followCount: checked ? "hide" : "show"
          })
        } catch (error) {
          console.warn(error)
        }
        break
    }
  }

  return (
    <>
      <CheckboxHideVanityCount
        showVanityCheckboxes={showVanityCheckboxes}
        setShowVanityCheckboxes={setShowVanityCheckboxes}
        onCheckedChange={onCheckedChange}
        hideAll={hideAll}
      />
      {showVanityCheckboxes && (
        <>
          <CheckboxHideReplyCount
            onCheckedChange={onCheckedChange}
            hideReply={hideReply}
          />
          <CheckboxHideRetweetCount
            onCheckedChange={onCheckedChange}
            hideRetweet={hideRetweet}
          />
          <CheckboxHideLikeCount
            onCheckedChange={onCheckedChange}
            hideLike={hideLike}
          />
          <CheckboxHideFollowCount
            onCheckedChange={onCheckedChange}
            hideFollow={hideFollow}
          />
        </>
      )}
    </>
  )
}

export default VanityCheckboxes
