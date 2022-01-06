import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@radix-ui/react-icons"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { styled } from "@stitches/react"

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
    border: "2px solid #8899a6"
  }
})

export const CheckboxRemovePromotedPosts = () => {
  /* Remove promoted posts */
  /* [data-testid="placementTracking"] article {
    display: none !important;
  } */

  return (
    <div className="flex items-center justify-between w-full py-1">
      <label
        htmlFor="removePromotedPosts"
        className="text-base tracking-normal"
      >
        Remove promoted posts
      </label>
      <div className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#1d9bf01a] cursor-pointer">
        <StyledCheckbox
          defaultChecked
          id="removePromotedPosts"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#1d9bf0]"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideVanityCount = ({
  showVanityCheckboxes,
  setShowVanityCheckboxes
}) => {
  return (
    <div className="flex items-center justify-between w-full py-1">
      <span className="flex items-center space-x-2 text-base tracking-normal text-white">
        <label htmlFor="hideVanityCount">Hide vanity counts</label>
        <TogglePrimitive.Root
          defaultPressed={false}
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
      <div className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#1d9bf01a] cursor-pointer">
        <StyledCheckbox
          defaultChecked
          id="hideVanityCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#1d9bf0]"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideReplyCount = () => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideReplyCount" className="text-base">
        Hide reply count
      </label>
      <div className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#1d9bf01a] cursor-pointer">
        <StyledCheckbox
          defaultChecked
          id="hideReplyCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#1d9bf0]"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideRetweetCount = () => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideRetweetCount" className="text-base">
        Hide retweet count
      </label>
      <div className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#1d9bf01a] cursor-pointer">
        <StyledCheckbox
          defaultChecked
          id="hideRetweetCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#1d9bf0]"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideLikeCount = () => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideLikeCount" className="text-base">
        Hide like count
      </label>
      <div className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#1d9bf01a] cursor-pointer">
        <StyledCheckbox
          defaultChecked
          id="hideLikeCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#1d9bf0]"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideFollowingCount = () => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideFollowingCount" className="text-base">
        Hide following count
      </label>
      <div className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#1d9bf01a] cursor-pointer">
        <StyledCheckbox
          defaultChecked
          id="hideFollowingCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#1d9bf0]"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}

export const CheckboxHideFollowerCount = () => {
  return (
    <div className="flex items-center justify-between w-full py-1 pl-4">
      <label htmlFor="hideFollowerCount" className="text-base">
        Hide follower count
      </label>
      <div className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#1d9bf01a] cursor-pointer">
        <StyledCheckbox
          defaultChecked
          id="hideFollowerCount"
          className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#1d9bf0]"
        >
          <CheckboxPrimitive.Indicator className="text-white">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
  )
}
