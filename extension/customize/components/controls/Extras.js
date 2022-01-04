import { LightningBoltIcon } from "@radix-ui/react-icons"
import { useState } from "react"

import {
  CheckboxHideFollowerCount,
  CheckboxHideFollowingCount,
  CheckboxHideLikeCount,
  CheckboxHideReplyCount,
  CheckboxHideRetweetCount,
  CheckboxHideVanityCount,
  CheckboxRemovePromotedPosts
} from "./ExtrasCheckboxes"
import { SwitchZenMode } from "./ExtrasSwitches"
import Separator from "./Separator"

const Extras = () => {
  const [showVanityCheckboxes, setShowVanityCheckboxes] = useState(false)

  return (
    <form className="bg-[#192734] rounded-2xl px-4 flex flex-col items-center justify-between">
      <SwitchZenMode />
      <Separator />
      <div className="w-full py-3">
        <CheckboxRemovePromotedPosts />
        <CheckboxHideVanityCount
          showVanityCheckboxes={showVanityCheckboxes}
          setShowVanityCheckboxes={setShowVanityCheckboxes}
        />
        {showVanityCheckboxes && (
          <>
            <CheckboxHideReplyCount />
            <CheckboxHideRetweetCount />
            <CheckboxHideLikeCount />
            <CheckboxHideFollowingCount />
            <CheckboxHideFollowerCount />
          </>
        )}
        <div className="flex items-center w-full pt-4 pb-2 space-x-1 text-sm">
          <LightningBoltIcon />{" "}
          <span>
            Power user? Try Baby Blue:{" "}
            <a href="#" className="text-twitterBlue">
              t.wang.sh/baby-blue
            </a>
          </span>
        </div>
      </div>
    </form>
  )
}

export default Extras
