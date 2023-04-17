import { useEffect, useState } from "react"
import { getStorage, setStorage } from "../../utilities/chromeStorage"
import ToggleChevron from "../ui/ToggleChevron"
import { CheckboxControl } from "../ui/checkboxes"

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
      <CheckboxControl
        id="all"
        label="Hide Vanity Counts"
        labelExtras={
          <ToggleChevron
            pressed={showVanityCheckboxes}
            onClick={setShowVanityCheckboxes}
          />
        }
        checked={hideAll}
        onCheckedChange={onCheckedChange}
      />
      {showVanityCheckboxes && (
        <div className="pl-3 flex flex-col gap-4 mb-2">
          <CheckboxControl
            id="reply"
            label="Hide Reply Count from Tweets"
            onCheckedChange={onCheckedChange}
            checked={hideReply}
          />
          <CheckboxControl
            id="retweet"
            label="Hide Retweet Count from Tweets"
            onCheckedChange={onCheckedChange}
            checked={hideRetweet}
          />
          <CheckboxControl
            id="like"
            label="Hide Like Count from Tweets"
            onCheckedChange={onCheckedChange}
            checked={hideLike}
          />
          <CheckboxControl
            id="follow"
            label="Hide Follower/Following Count"
            onCheckedChange={onCheckedChange}
            checked={hideFollow}
          />
        </div>
      )}
    </>
  )
}

export default VanityCheckboxes
