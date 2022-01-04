// import { LightningBoltIcon } from "@radix-ui/react-icons"
import * as TogglePrimitive from "@radix-ui/react-toggle"
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
  const [showCheckboxes, setShowCheckboxes] = useState(false)
  const [showVanityCheckboxes, setShowVanityCheckboxes] = useState(false)

  return (
    <form className="bg-[#192734] rounded-2xl px-4 flex flex-col items-center justify-between">
      <SwitchZenMode />
      <Separator />
      {showCheckboxes ? (
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
          {/* <div className="flex items-center w-full pt-4 pb-2 space-x-1 text-sm">
            <LightningBoltIcon />{" "}
            <span>
              Power user? Try Baby Blue:{" "}
              <a href="#" className="text-twitterBlue">
                t.wang.sh/baby-blue
              </a>
            </span>
          </div> */}
        </div>
      ) : (
        <TogglePrimitive.Root
          defaultPressed={false}
          onPressedChange={() => {
            setShowCheckboxes(true)
          }}
          className="grid w-full px-2 py-4 place-items-center hover:bg-[#1d9bf01a]"
        >
          <div className="text-[15px] text-[#1d9bf0]">Show More</div>
        </TogglePrimitive.Root>
      )}
    </form>
  )
}

export default Extras
