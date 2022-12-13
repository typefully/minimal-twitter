import * as SwitchPrimitive from "@radix-ui/react-switch"
import { styled } from "@stitches/react"
import { useEffect, useState } from "react"
import { getStorage, setStorage } from "../../utilities/chromeStorage"

export default function SwitchControl({
  label,
  storageKey,
  defaultState = false
}) {
  const [localState, setLocalState] = useState(defaultState)

  useEffect(() => {
    const getDefaultState = async () => {
      try {
        const userDefault = await getStorage(storageKey)
        userDefault && setLocalState(userDefault === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getDefaultState()
  }, [storageKey])

  return (
    <div className="flex items-center justify-between w-full">
      <label htmlFor={storageKey} className="text-[15px] font-bold">
        {label}
      </label>
      <StyledSwitch
        onCheckedChange={async (checked) => {
          setLocalState(checked)
          try {
            await setStorage({ [storageKey]: checked ? "on" : "off" })
          } catch (error) {
            console.warn(error)
          }
        }}
        checked={localState}
        id={storageKey}
      >
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}

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
