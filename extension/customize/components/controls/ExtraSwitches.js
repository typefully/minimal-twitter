import { styled } from "@stitches/react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: "unset",
  width: 40,
  height: 14,
  backgroundColor: "#939393",
  borderRadius: "9999px",
  position: "relative",
  WebkitTapHighlightColor: "1DA1F2",
  display: "flex",
  alignItems: "center",
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

const NavigationLabels = () => {
  /* Show navigation labels */
  /* nav[aria-label="Primary"] * div[dir="auto"]:not([aria-label]) > span {
    display: inline !important;
  } */

  /* Show account menu label */
  /* [data-testid="SideNav_AccountSwitcher_Button"] > div:not(:first-child) {
    display: block !important;
  } */

  return (
    <div className="flex items-center justify-between w-full">
      <label htmlFor="showNavigationLabels" className="text-[15px] font-bold">
        Navigation Labels
      </label>
      <StyledSwitch defaultChecked id="showNavigationLabels">
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}

const ExtraSwitches = () => (
  <form className="bg-[#192734] rounded-2xl py-3 px-4 flex items-center justify-between">
    <NavigationLabels />
  </form>
)

export default ExtraSwitches
