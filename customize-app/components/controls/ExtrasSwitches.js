import * as SwitchPrimitive from "@radix-ui/react-switch"
import { styled } from "@stitches/react"
import { useEffect, useState } from "react"

import { getStorage, setStorage } from "../../utilities/chromeStorage"

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
  const [userFeedBorders, setUserFeedBorders] = useState(true)

  useEffect(() => {
    const getUserDefaultFeedBorders = async () => {
      try {
        const userDefaultFeedBorders = await getStorage("feedBorders")
        userDefaultFeedBorders &&
          setUserFeedBorders(userDefaultFeedBorders === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultFeedBorders()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-4">
      <label htmlFor="feedBorders" className="text-[15px] font-bold">
        Feed Borders
      </label>
      <StyledSwitch
        onCheckedChange={async (checked) => {
          setUserFeedBorders(checked)
          try {
            await setStorage({ feedBorders: checked ? "on" : "off" })
          } catch (error) {
            console.warn(error)
          }
        }}
        checked={userFeedBorders}
        id="feedBorders"
      >
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}

export const SwitchNavigationCenter = () => {
  const [userCenter, setUserCenter] = useState(false)

  useEffect(() => {
    const getUserDefaultButtonLabels = async () => {
      try {
        const userDefaultCenter = await getStorage("navigationCenter")
        userDefaultCenter &&
          setUserCenter(userDefaultCenter === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultButtonLabels()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-4">
      <label htmlFor="navigationCenter" className="text-[15px] font-bold">
        Center Vertically
      </label>
      <StyledSwitch
        onCheckedChange={async (checked) => {
          setUserCenter(checked)
          try {
            await setStorage({
              navigationCenter: checked ? "on" : "off"
            })
          } catch (error) {
            console.warn(error)
          }
        }}
        checked={userCenter}
        id="navigationCenter"
      >
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}

export const SwitchNavigationButtonLabels = () => {
  const [userButtonLabels, setUserButtonLabels] = useState(false)

  useEffect(() => {
    const getUserDefaultButtonLabels = async () => {
      try {
        const userDefaultButtonLabels = await getStorage(
          "navigationButtonsLabels"
        )
        userDefaultButtonLabels &&
          setUserButtonLabels(userDefaultButtonLabels === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultButtonLabels()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-0">
      <label htmlFor="showNavigationLabels" className="text-[15px] font-bold">
        Show Labels
      </label>
      <StyledSwitch
        onCheckedChange={async (checked) => {
          setUserButtonLabels(checked)
          try {
            await setStorage({
              navigationButtonsLabels: checked ? "on" : "off"
            })
          } catch (error) {
            console.warn(error)
          }
        }}
        checked={userButtonLabels}
        id="showNavigationLabels"
      >
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}

export const SwitchNavigationButtonLabelsHover = () => {
  const [userButtonLabelsHover, setUserButtonLabelsHover] = useState(true)

  useEffect(() => {
    const getUserDefaultButtonLabelsHover = async () => {
      try {
        const userDefaultButtonLabelsHover = await getStorage(
          "navigationButtonsLabelsHover"
        )
        userDefaultButtonLabelsHover &&
          setUserButtonLabelsHover(
            userDefaultButtonLabelsHover === "off" ? false : true
          )
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultButtonLabelsHover()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-4">
      <label
        htmlFor="showNavigationLabelsHover"
        className="text-[15px] font-bold"
      >
        Show Labels on Hover
      </label>
      <StyledSwitch
        onCheckedChange={async (checked) => {
          setUserButtonLabelsHover(checked)
          try {
            await setStorage({
              navigationButtonsLabelsHover: checked ? "on" : "off"
            })
          } catch (error) {
            console.warn(error)
          }
        }}
        checked={userButtonLabelsHover}
        id="showNavigationLabelsHover"
      >
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}

export const SwitchZenMode = () => {
  const [userZen, setUserZen] = useState(false)

  useEffect(() => {
    const getUserDefaultZen = async () => {
      try {
        const userDefaultZen = await getStorage("zenMode")
        userDefaultZen && setUserZen(userDefaultZen === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultZen()
  }, [])

  return (
    <div className="flex items-center justify-between w-full py-4">
      <label htmlFor="zenMode" className="text-[15px] font-bold">
        Zen Mode
      </label>
      <StyledSwitch
        onCheckedChange={async (checked) => {
          setUserZen(checked)
          try {
            await setStorage({
              zenMode: checked ? "on" : "off"
            })
          } catch (error) {
            console.warn(error)
          }
        }}
        checked={userZen}
        id="zenMode"
      >
        <StyledThumb />
      </StyledSwitch>
    </div>
  )
}
