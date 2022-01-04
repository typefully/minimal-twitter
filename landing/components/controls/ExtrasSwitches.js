import * as SwitchPrimitive from "@radix-ui/react-switch"
import { styled } from "@stitches/react"

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: "unset",
  width: 40,
  height: 14,
  backgroundColor: "#939393",
  borderRadius: "9999px",
  position: "relative",
  WebkitTapHighlightColor: "#1DA1F2",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  '&[data-state="checked"]': { backgroundColor: "#6bc9fb" }
})

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: "block",
  width: 20,
  height: 20,
  backgroundColor: "#fafafa",
  boxShadow: "rgb(0 0 0 / 50%) 0px 1px 3px",
  borderRadius: "9999px",
  transition: "transform 100ms",
  transform: "translateX(0px)",
  willChange: "transform",
  '&[data-state="checked"]': {
    backgroundColor: "#1d9bf0",
    transform: "translateX(20px)"
  }
})

export const SwitchFeedBorders = () => {
  /* Remove borders on feed */
  /* div[data-testid="primaryColumn"] {
    border-left-width: 0;
    border-right-width: 0;
  } */

  return (
    <div className="flex items-center justify-between w-full py-4">
      <label htmlFor="feedBorders" className="text-[15px] font-bold">
        Feed borders
      </label>
      <StyledSwitch defaultChecked id="feedBorders">
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}

export const SwitchNavigationButtonLabels = () => {
  /* Show navigation labels */
  /* nav[aria-label="Primary"] * div[dir="auto"]:not([aria-label]) > span {
    display: inline !important;
  } */

  /* Show account menu label */
  /* [data-testid="SideNav_AccountSwitcher_Button"] > div:not(:first-child) {
    display: block !important;
  } */

  return (
    <div className="flex items-center justify-between w-full py-4">
      <label htmlFor="showNavigationLabels" className="text-[15px] font-bold">
        Button Labels
      </label>
      <StyledSwitch defaultChecked id="showNavigationLabels">
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}

export const SwitchZenMode = () => {
  return (
    <div className="flex items-center justify-between w-full py-4">
      <label htmlFor="zenMode" className="text-[15px] font-bold">
        Zen Mode
      </label>
      <StyledSwitch defaultChecked id="zenMode">
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}
