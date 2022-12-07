import * as TogglePrimitive from "@radix-ui/react-toggle"
import { useEffect, useState } from "react"

import {
  CheckboxAlwaysShowLatest,
  CheckboxHideFollowCount,
  CheckboxHideLikeCount,
  CheckboxHideReplyCount,
  CheckboxHideRetweetCount,
  CheckboxHideSearch,
  CheckboxHideTweetButton,
  CheckboxHideVanityCount,
  CheckboxPromotedPosts,
  CheckboxTopicsToFollow,
  CheckboxTransparentSearch,
  CheckboxWhoToFollow
} from "./ExtrasCheckboxes"
import { SwitchZenMode } from "./ExtrasSwitches"
import Separator from "./Separator"

import { getStorage, setStorage } from "../../utilities/chromeStorage"

const Extras = () => {
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
    <form className="flex flex-col items-center justify-between px-4 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl">
      <SwitchZenMode />
      <Separator />
      <div className="w-full py-3">
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
        <CheckboxHideTweetButton />
        <CheckboxHideSearch />
        <CheckboxTransparentSearch />
        <CheckboxPromotedPosts />
        <CheckboxWhoToFollow />
        <CheckboxTopicsToFollow />
        <CheckboxAlwaysShowLatest />
        <div className="pb-3" />
        <Separator />
        <div className="flex items-center w-full pt-4 space-x-1 text-sm">
          * Experimental — may not always work
        </div>
      </div>
    </form>
  )
}

export default Extras
