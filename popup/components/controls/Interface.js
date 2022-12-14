import { useEffect, useState } from "react"

import { getStorage, setStorage } from "../../utilities/chromeStorage"
import {
  CheckboxHideFollowCount,
  CheckboxHideLikeCount,
  CheckboxHideReplyCount,
  CheckboxHideRetweetCount,
  CheckboxHideSearch,
  CheckboxHideTweetButton,
  CheckboxHideVanityCount
} from "./Checkboxes"
import Separator from "./Separator"
import SwitchControl from "./SwitchControl"

const Interface = () => {
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
      <div className="w-full pt-4 pb-2">
        <SwitchControl
          label="Transparent Search Bar"
          storageKey="transparentSearch"
        />
        <Separator className="mb-2 mt-4" />
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
      </div>
    </form>
  )
}

export default Interface
