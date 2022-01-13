import * as SwitchPrimitive from "@radix-ui/react-switch"
import { styled } from "@stitches/react"

import { useZenMode } from "../../utilities/chromeStorage"

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

export const SwitchZenMode = () => {
  const [userZen, setUserZen] = useZenMode()

  return (
    <div className="flex items-center justify-between w-full py-4">
      <label htmlFor="zenMode" className="text-[15px] font-bold">
        Zen Mode
      </label>
      <StyledSwitch
        onCheckedChange={async (checked) => {
          setUserZen(checked)
        }}
        checked={userZen}
        id="zenMode"
      >
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}
