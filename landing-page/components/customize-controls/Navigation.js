import * as TogglePrimitive from "@radix-ui/react-toggle"
import { styled } from "@stitches/react"
import { useState, useEffect } from "react"
import startCase from "lodash.startcase"

import { useButtons } from "../../utilities/chromeStorage"

const StyledToggle = styled(TogglePrimitive.Root, {
  "&[data-state=off]": { borderColor: "transparent", opacity: "50%" },
  "&[data-state=off]:hover": { borderColor: "rgba(255, 255, 255, 0.5)" }
})

const UserButton = ({ type, children }) => {
  const [userButton, setUserButton] = useState(true)
  const [buttons, setButtons] = useButtons()

  useEffect(() => {
    const buttonType = type.replace("Button", "")
    if (buttons[buttonType] === "off") {
      setUserButton(false)
    } else if (buttons[buttonType] === "on") {
      setUserButton(true)
    }
  }, [buttons, type])

  return (
    <StyledToggle
      onPressedChange={async (pressed) => {
        setUserButton(pressed)
        const buttonsCopy = buttons
        if (!pressed) {
          switch (type) {
            case "exploreButton":
              buttonsCopy.explore = "off"
              setButtons(buttonsCopy)
              break
            case "notificationsButton":
              buttonsCopy.notifications = "off"
              setButtons(buttonsCopy)
              break
            case "messagesButton":
              buttonsCopy.messages = "off"
              setButtons(buttonsCopy)
              break
            case "bookmarksButton":
              buttonsCopy.bookmarks = "off"
              setButtons(buttonsCopy)
              break
            case "listsButton":
              buttonsCopy.lists = "off"
              setButtons(buttonsCopy)
              break
          }
        } else {
          switch (type) {
            case "exploreButton":
              buttonsCopy.explore = "on"
              setButtons(buttonsCopy)
              break
            case "notificationsButton":
              buttonsCopy.notifications = "on"
              setButtons(buttonsCopy)
              break
            case "messagesButton":
              buttonsCopy.messages = "on"
              setButtons(buttonsCopy)
              break
            case "bookmarksButton":
              buttonsCopy.bookmarks = "on"
              setButtons(buttonsCopy)
              break
            case "listsButton":
              buttonsCopy.lists = "on"
              setButtons(buttonsCopy)
              break
          }
        }
      }}
      pressed={userButton}
      title={`Toggle ${startCase(type)}`}
      aria-label={`Toggle ${startCase(type)}`}
      className="dark:bg-twitterBgTwoDark bg-twitterBgTwo p-3 w-fit rounded-full border-[3px] border-twitterBlue dark:text-white text-black"
    >
      <svg width={25} height={25} aria-hidden="true" viewBox="0 0 24 24">
        {children}
      </svg>
    </StyledToggle>
  )
}

const Explore = () => (
  <UserButton type="exploreButton">
    <path
      className="fill-current"
      d="M21 7.337h-3.93l.372-4.272a.751.751 0 00-.682-.812.752.752 0 00-.812.683l-.383 4.4h-6.32l.37-4.27a.75.75 0 00-.68-.813.751.751 0 00-.813.683l-.382 4.4H3.782a.75.75 0 000 1.5H7.61l-.55 6.327H3a.75.75 0 000 1.5h3.93l-.372 4.272a.751.751 0 00.682.812l.066.003a.75.75 0 00.746-.686l.383-4.4h6.32l-.37 4.27a.751.751 0 00.682.813l.066.003a.75.75 0 00.746-.686l.382-4.4h3.957c.413 0 .75-.337.75-.75s-.337-.75-.75-.75H16.39l.55-6.327H21a.75.75 0 000-1.5zm-6.115 7.826h-6.32l.55-6.326h6.32l-.55 6.326z"
    ></path>
  </UserButton>
)

const Notifications = () => (
  <UserButton type="notificationsButton">
    <path
      className="fill-current"
      d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03a.75.75 0 00.447 1.353h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514a.747.747 0 00-.263-.838zM12 20.478a2.84 2.84 0 01-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z"
    ></path>
  </UserButton>
)

const Messages = () => (
  <UserButton type="messagesButton">
    <path
      className="fill-current"
      d="M19.25 3.018H4.75A2.753 2.753 0 002 5.77v12.495a2.754 2.754 0 002.75 2.753h14.5A2.754 2.754 0 0022 18.265V5.77a2.753 2.753 0 00-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367a.81.81 0 01-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83a2.265 2.265 0 002.52.001l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z"
    ></path>
  </UserButton>
)

const Bookmarks = () => (
  <UserButton type="bookmarksButton">
    <path
      className="fill-current"
      d="M19.9 23.5a.755.755 0 01-.442-.144L12 17.928l-7.458 5.43a.75.75 0 01-1.192-.607V5.6c0-1.24 1.01-2.25 2.25-2.25h12.798c1.24 0 2.25 1.01 2.25 2.25v17.15a.749.749 0 01-.75.75zM12 16.25a.74.74 0 01.44.144l6.71 4.883V5.6a.752.752 0 00-.75-.75H5.6a.752.752 0 00-.75.75v15.677l6.71-4.883a.74.74 0 01.44-.144z"
    ></path>
  </UserButton>
)

const Lists = () => (
  <UserButton type="listsButton">
    <g className="fill-current">
      <path d="M19.75 22H4.25C3.01 22 2 20.99 2 19.75V4.25C2 3.01 3.01 2 4.25 2h15.5C20.99 2 22 3.01 22 4.25v15.5c0 1.24-1.01 2.25-2.25 2.25zM4.25 3.5c-.414 0-.75.337-.75.75v15.5c0 .413.336.75.75.75h15.5c.414 0 .75-.337.75-.75V4.25c0-.413-.336-.75-.75-.75H4.25z"></path>
      <path d="M17 8.64H7c-.414 0-.75-.337-.75-.75s.336-.75.75-.75h10c.414 0 .75.335.75.75s-.336.75-.75.75zm0 4.11H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75zm-5 4.11H7c-.414 0-.75-.335-.75-.75s.336-.75.75-.75h5c.414 0 .75.337.75.75s-.336.75-.75.75z"></path>
    </g>
  </UserButton>
)

const Navigation = () => {
  return (
    <form className="p-3 pb-0 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl">
      <div className="flex items-center justify-between pb-4">
        <Explore />
        <Notifications />
        <Messages />
        <Bookmarks />
        <Lists />
      </div>
    </form>
  )
}

export default Navigation
