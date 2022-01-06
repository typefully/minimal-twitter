import * as TogglePrimitive from "@radix-ui/react-toggle"
import { styled } from "@stitches/react"
import { useEffect, useState } from "react"

import { getStorage, setStorage } from "../../utilities/chromeStorage"
import { SwitchNavigationButtonLabels } from "./ExtrasSwitches"
import Separator from "./Separator"

const StyledToggle = styled(TogglePrimitive.Root, {
  "&[data-state=off]": { borderColor: "transparent", opacity: "50%" },
  "&[data-state=off]:hover": { borderColor: "rgba(255, 255, 255, 0.5)" }
})

const UserButton = ({ type, children }) => {
  const [userButton, setUserButton] = useState(true)

  useEffect(() => {
    const getUserDefaultButton = async () => {
      try {
        const userDefaultButton = await getStorage(type)
        userDefaultButton &&
          setUserButton(userDefaultButton === "on" ? true : false)
      } catch (error) {
        console.warn(error)
      }
    }

    getUserDefaultButton()
  }, [type])

  return (
    <StyledToggle
      onPressedChange={async (pressed) => {
        setUserButton(pressed)
        try {
          await setStorage({ [type]: pressed ? "on" : "off" })
        } catch (error) {
          console.warn(error)
        }
      }}
      pressed={userButton}
      className="bg-[#192734] p-3 w-fit rounded-full border-[3px] border-twitterBlue text-white"
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

const TopArticles = () => (
  <UserButton type="topArticlesButton">
    <path
      className="fill-current"
      d="M14.057 12.559c.289 1.042.34 2.351-.395 3.712l-.059.106c-.094.169-.617 1.015-1.717 1.068l-.074.002c-.808 0-1.162-.709-1.272-.999-.12-.327.041-.989.165-1.202.246-.375.693-.661 1.258-1.023.624-.4 1.386-.888 2.094-1.664m.177-2.805a.27.27 0 00-.244.158c-1.24 2.85-3.49 2.91-4.54 4.51-.27.41-.66 1.61-.32 2.54.414 1.099 1.368 1.984 2.68 1.984.049 0 .099-.001.15-.004 2.08-.1 2.95-1.84 2.96-1.85 1.82-3.23.21-6.2-.48-7.23a.25.25 0 00-.206-.108z"
    ></path>
    <path
      className="fill-current"
      d="M12.023 22.748c-2.11 0-4.151-.74-5.755-2.115a8.607 8.607 0 01-3.018-6.532c0-.203.018-.404.039-.617a8.476 8.476 0 011.943-4.847c.036-.047.077-.093.113-.126.031-.057.1-.149.203-.242.266-.31 1.102-1.484 1.031-2.427-.038-.572.306-.866.61-.946.623-.166 1.278.447 1.938 1.82.187.383.315.794.385 1.232a7.638 7.638 0 00.915-1.75c.406-1.114.61-2.636.557-4.172a.75.75 0 011.102-.689c.072.039 7.347 4.069 8.478 10.984a8.44 8.44 0 01-.388 4.844 8.698 8.698 0 01-8.153 5.583zM6.422 9.551l-.026.034a6.979 6.979 0 00-1.611 4.007c-.019.199-.035.354-.035.51a7.11 7.11 0 002.494 5.393c1.618 1.389 3.78 1.994 5.929 1.666a7.196 7.196 0 005.602-4.533v-.001a7.01 7.01 0 00.314-4.028c-.77-4.701-4.684-7.919-6.621-9.25-.068 1.24-.288 2.421-.633 3.368-.974 2.623-2.649 3.729-2.721 3.775a.748.748 0 01-1.142-.777c.18-.905.119-1.686-.182-2.321a6.956 6.956 0 01-1.181 1.931l-.072.082a1.96 1.96 0 01-.115.144z"
    ></path>
  </UserButton>
)

const NavigationButtons = () => {
  return (
    <form className="bg-[#192734] rounded-2xl p-3 pb-0">
      <div className="flex items-center justify-between pb-4">
        <Explore />
        <Notifications />
        <Messages />
        <Bookmarks />
        <TopArticles />
      </div>
      <Separator />
      <SwitchNavigationButtonLabels />
    </form>
  )
}

export default NavigationButtons
