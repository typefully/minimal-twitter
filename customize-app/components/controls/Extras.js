import { LightningBoltIcon } from "@radix-ui/react-icons"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { useEffect, useState } from "react"

import {
  CheckboxPromotedPosts,
  CheckboxAlwaysShowLatest,
  CheckboxTransparentSearch,
  CheckboxHideFollowCount,
  CheckboxHideLikeCount,
  CheckboxHideReplyCount,
  CheckboxHideRetweetCount,
  CheckboxHideVanityCount
} from "./ExtrasCheckboxes"
import { SwitchZenMode } from "./ExtrasSwitches"
import Separator from "./Separator"

import { getStorage, setStorage } from "../../utilities/chromeStorage"

const Extras = () => {
  const [showCheckboxes, setShowCheckboxes] = useState(false)
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
        userDefaultAll && setHideAll(userDefaultAll === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }
    const getUserDefaultReply = async () => {
      try {
        const userDefaultReply = await getStorage("replyCount")
        userDefaultReply &&
          setHideReply(userDefaultReply === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }
    const getUserDefaultLike = async () => {
      try {
        const userDefaultLike = await getStorage("likeCount")
        userDefaultLike &&
          setHideRetweet(userDefaultLike === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }
    const getUserDefaultRetweet = async () => {
      try {
        const userDefaultRetweet = await getStorage("retweetCount")
        userDefaultRetweet &&
          setHideLike(userDefaultRetweet === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }
    const getUserDefaultFollow = async () => {
      try {
        const userDefaultFollow = await getStorage("followCount")
        userDefaultFollow &&
          setHideFollow(userDefaultFollow === "on" ? true : false)
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
            replyCount: checked ? "on" : "off",
            retweetCount: checked ? "on" : "off",
            likeCount: checked ? "on" : "off",
            followCount: checked ? "on" : "off"
          })
        } catch (error) {
          console.warn(error)
        }
        break

      case "reply":
        setHideReply(checked)
        try {
          await setStorage({
            replyCount: checked ? "on" : "off"
          })
        } catch (error) {
          console.warn(error)
        }
        break

      case "retweet":
        setHideRetweet(checked)
        try {
          await setStorage({
            retweetCount: checked ? "on" : "off"
          })
        } catch (error) {
          console.warn(error)
        }
        break

      case "like":
        setHideLike(checked)
        try {
          await setStorage({
            likeCount: checked ? "on" : "off"
          })
        } catch (error) {
          console.warn(error)
        }
        break

      case "follow":
        setHideFollow(checked)
        try {
          await setStorage({
            followCount: checked ? "on" : "off"
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
      {showCheckboxes ? (
        <div className="w-full py-3">
          <CheckboxPromotedPosts />
          <CheckboxAlwaysShowLatest />
          <CheckboxTransparentSearch />
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
          <div className="flex items-center w-full pt-4 pb-2 space-x-1 text-sm">
            <LightningBoltIcon />{" "}
            <span>
              Power user?{" "}
              <a
                href="https://t.wang.sh/twitter-tools"
                target="_blank"
                rel="noreferrer"
                className="text-twitterBlue"
              >
                t.wang.sh/twitter-tools
              </a>
            </span>
          </div>
        </div>
      ) : (
        <TogglePrimitive.Root
          defaultPressed={false}
          onPressedChange={() => {
            setShowCheckboxes(true)
          }}
          className="grid w-full px-2 py-4 place-items-center hover:bg-twitterAccentFour"
        >
          <div className="text-[15px] text-twitterAccentThree font-medium">
            Show More
          </div>
        </TogglePrimitive.Root>
      )}
    </form>
  )
}

export default Extras
