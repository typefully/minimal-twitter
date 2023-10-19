import * as TogglePrimitive from "@radix-ui/react-toggle"
import { styled } from "@stitches/react"
import startCase from "lodash.startcase"
import {
  KeyBookmarksButton,
  KeyCirclesButton,
  KeyCommunitiesButton,
  KeyExploreButton,
  KeyHomeButton,
  KeyListsButton,
  KeyMessagesButton,
  KeyNavigationButtonsLabels,
  KeyNavigationButtonsLabelsHover,
  KeyNavigationCenter,
  KeyNotificationsButton,
  KeyProfileButton,
  KeyTopArticlesButton,
  KeyTopicsButton,
  KeyTwitterBlueButton,
  KeyTypefullyGrowTab,
  KeyUnreadCountBadge,
  KeyVerifiedOrgsButton
} from "../../../storage-keys"
import SectionLabel from "../ui/SectionLabel"

import useStorageKeyState from "../../utilities/useStorageKeyState"
import Separator from "../ui/Separator"
import SwitchControl from "../ui/SwitchControl"

const StyledToggle = styled(TogglePrimitive.Root, {
  "&[data-state=off]": { borderColor: "transparent", opacity: "50%" },
  "&[data-state=off]:hover": { borderColor: "rgba(255, 255, 255, 0.5)" }
})

const UserButton = ({ storageKey, children }) => {
  const [pressed, setPressed] = useStorageKeyState(storageKey)

  return (
    <StyledToggle
      onPressedChange={setPressed}
      pressed={pressed}
      title={`Toggle ${startCase(storageKey)}`}
      aria-label={`Toggle ${startCase(storageKey)}`}
      className="dark:bg-twitterBgTwoDark bg-twitterBgTwo p-3 w-fit rounded-full border-[3px] border-twitterBlue dark:text-white text-black"
    >
      <svg width={25} height={25} aria-hidden="true" viewBox="0 0 24 24">
        {children}
      </svg>
    </StyledToggle>
  )
}

const Home = () => (
  <UserButton storageKey={KeyHomeButton}>
    <path
      className="fill-current"
      d="M12 9a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 11-.001-3.999A2 2 0 0112 15zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5A2.5 2.5 0 005.5 22h13a2.5 2.5 0 002.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5V8.429l7-4.375 7 4.375V19.5z"
    />
  </UserButton>
)

const Explore = () => (
  <UserButton storageKey={KeyExploreButton}>
    <path
      className="fill-current"
      d="M10.09 3.098L9.72 7h5.99l.39-4.089 1.99.187L17.72 7h3.78v2h-3.97l-.56 6h3.53v2h-3.72l-.38 4.089-1.99-.187.36-3.902H8.78l-.38 4.089-1.99-.187L6.77 17H2.5v-2h4.46l.56-6H3.5V7h4.21l.39-4.089 1.99.187zM14.96 15l.56-6H9.53l-.56 6h5.99z"
    />
  </UserButton>
)

const Notifications = () => (
  <UserButton storageKey={KeyNotificationsButton}>
    <path
      className="fill-current"
      d="M19.993 9.042a8.062 8.062 0 00-15.996.009L2.866 18H7.1a5.002 5.002 0 009.8 0h4.236l-1.143-8.958zM12 20a3.001 3.001 0 01-2.829-2h5.658A3.001 3.001 0 0112 20zm-6.866-4l.847-6.698a6.062 6.062 0 0112.028-.007L18.864 16H5.134z"
    />
  </UserButton>
)

const Messages = () => (
  <UserButton storageKey={KeyMessagesButton}>
    <path
      className="fill-current"
      d="M1.998 5.5a2.5 2.5 0 012.5-2.5h15a2.5 2.5 0 012.5 2.5v13a2.5 2.5 0 01-2.5 2.5h-15a2.5 2.5 0 01-2.5-2.5v-13zm2.5-.5a.5.5 0 00-.5.5v2.764l8 3.638 8-3.636V5.5a.5.5 0 00-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5a.5.5 0 00.5.5h15a.5.5 0 00.5-.5v-8.037z"
    />
  </UserButton>
)

const Bookmarks = () => (
  <UserButton storageKey={KeyBookmarksButton}>
    <path
      className="fill-current"
      d="M4 4.5A2.5 2.5 0 016.5 2h11A2.5 2.5 0 0120 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
    />
  </UserButton>
)

const TopArticles = () => (
  <UserButton storageKey={KeyTopArticlesButton}>
    <path
      className="fill-current"
      d="M11 1.28v.09c0 1.79 0 3.53-.829 5.18-.42-.78-1.061-1.36-1.707-1.94l-.268-.24c-.501 1-1.151 1.98-1.807 2.97C4.959 9.5 3.5 11.7 3.5 14.25c0 2.52.949 4.55 2.538 5.94 1.437 1.26 3.334 1.94 5.378 2.04.122.01.539.02.584.02 4.615 0 8.5-3.37 8.5-8C20.5 8.29 15.797 4 11 1.28zm2.534 18.08c-.521.56-1.144.87-1.681.89-.111 0-.221-.01-.331-.01-.454-.05-.684-.23-.82-.41-.192-.24-.313-.64-.313-1.14 0-.75.362-1.26 1.214-2.02.166-.14.35-.3.548-.46.47-.4 1.017-.86 1.56-1.41l.031.07c.35.83.647 1.78.647 2.54 0 .65-.317 1.38-.855 1.95zm2.572-.42c.18-.48.283-1 .283-1.53 0-1.17-.429-2.43-.804-3.32-.194-.46-.388-.85-.533-1.13-.073-.14-1.02-1.78-1.02-1.78l-.901 1.23c-.678.92-1.425 1.55-2.18 2.19-.224.19-.449.38-.673.58-.94.83-1.889 1.85-1.889 3.51 0 .22.014.44.047.67C6.673 18.38 5.5 16.6 5.5 14.25c0-2.01 1.133-3.61 2.246-5.18.284-.4.568-.8.831-1.21.419.89.419 2.18.173 3.08l.117-.11c1.971-1.7 3.514-3.03 3.969-6.06.632.47 1.415 1.12 2.195 1.93 1.79 1.84 3.469 4.42 3.469 7.55 0 1.92-.921 3.61-2.394 4.69z"
    />
  </UserButton>
)

const Communities = () => (
  <UserButton storageKey={KeyCommunitiesButton}>
    <path
      className="fill-current"
      d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672a9.115 9.115 0 00-1.212 1.656 4.388 4.388 0 00-1.658-.329c-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9a3.467 3.467 0 01-2.116-.73 3.483 3.483 0 01-1.384-2.77c0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77a3.467 3.467 0 01-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"
    />
  </UserButton>
)

const Lists = () => (
  <UserButton storageKey={KeyListsButton}>
    <path
      className="fill-current"
      d="M3 4.5A2.5 2.5 0 015.5 2h13A2.5 2.5 0 0121 4.5v15a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z"
    />
  </UserButton>
)

const Topics = () => (
  <UserButton storageKey={KeyTopicsButton}>
    <path
      className="fill-current"
      d="M12 3.75C7.99 3.75 4.75 7 4.75 11s3.24 7.25 7.25 7.25h1v2.44c1.13-.45 2.42-1.3 3.54-2.54 1.52-1.67 2.66-3.95 2.71-6.67.07-4.46-3.28-7.73-7.25-7.73zM2.75 11c0-5.11 4.14-9.25 9.25-9.25s9.34 4.23 9.25 9.77c-.06 3.28-1.44 6.01-3.23 7.97-1.76 1.94-3.99 3.21-5.87 3.5l-1.15.17V20.2c-4.64-.5-8.25-4.43-8.25-9.2zM15 10H9V8h6v2zm-2 4H9v-2h4v2z"
    ></path>
  </UserButton>
)

const Circles = () => (
  <UserButton storageKey={KeyCirclesButton}>
    <path
      className="fill-current"
      d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zm19.417-3.68c-.541.97-1.601 1.99-3.352 2.98l-.201.12-.202-.12c-1.751-.99-2.811-2.01-3.352-2.98-.545-.97-.564-1.88-.206-2.59.355-.69 1.059-1.13 1.84-1.17.661-.03 1.348.22 1.92.79.571-.57 1.258-.82 1.918-.79.781.04 1.485.48 1.84 1.17.358.71.339 1.62-.205 2.59z"
    />
  </UserButton>
)

const TwitterBlue = () => (
  <UserButton storageKey={KeyTwitterBlueButton}>
    <path
      className="fill-current"
      d="M15.704 8.99c.457-.05.891-.17 1.296-.35-.302.45-.685.84-1.125 1.15.004.1.006.19.006.29 0 2.94-2.269 6.32-6.421 6.32-1.274 0-2.46-.37-3.459-1 .177.02.357.03.539.03a4.55 4.55 0 002.803-.95 2.26 2.26 0 01-2.109-1.54c.138.03.28.04.425.04.206 0 .405-.03.595-.08a2.228 2.228 0 01-1.811-2.18v-.03c.305.17.652.27 1.023.28a2.215 2.215 0 01-1.004-1.85c0-.4.111-.78.305-1.11a6.48 6.48 0 004.652 2.32 2.266 2.266 0 01-.058-.51c0-1.23 1.01-2.22 2.256-2.22.649 0 1.235.27 1.647.7.514-.1.997-.28 1.433-.54-.168.52-.526.96-.992 1.23zM2 21h15a5.498 5.498 0 004.115-9.15.262.262 0 01-.023-.32A5.48 5.48 0 0022 8.5C22 5.46 19.538 3 16.5 3H2v18zM16.5 5a3.502 3.502 0 012.38 6.07.995.995 0 00.111 1.55A3.502 3.502 0 0117 19H4V5h12.5z"
    />
  </UserButton>
)

const VerifiedOrgs = () => (
  <UserButton storageKey={KeyVerifiedOrgsButton}>
    <path
      className="fill-current"
      d="M7.323 2h11.443l-3 5h6.648L6.586 22.83 7.847 14H2.523l4.8-12zm1.354 2l-3.2 8h4.676l-.739 5.17L17.586 9h-5.352l3-5H8.677z"
    ></path>
  </UserButton>
)

const Profile = () => (
  <UserButton storageKey={KeyProfileButton}>
    <path
      className="fill-current"
      d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"
    />
  </UserButton>
)

const TypefullyGrow = () => (
  <UserButton storageKey={KeyTypefullyGrowTab}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M5 5h14a1 1 0 011 1v.586l-8 8-3.293-3.293L8 10.586l-.707.707L4 14.586V6a1 1 0 011-1zM4 17.414V18a1 1 0 001 1h14a1 1 0 001-1V9.414l-7.293 7.293-.707.707-.707-.707L8 13.414l-4 4zM2 6a3 3 0 013-3h14a3 3 0 013 3v12a3 3 0 01-3 3H5a3 3 0 01-3-3V6z"
    />
  </UserButton>
)

const NavigationSection = () => (
  <section className="flex flex-col gap-y-2">
    <SectionLabel htmlFor="user-control-navigation">Navigation</SectionLabel>
    <div id="user-control-navigation">
      <form className="p-3 pb-4 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl">
        <div className="flex items-center pb-4 gap-y-3 gap-x-6 mx-auto flex-wrap">
          <Home />
          <Explore />
          <Notifications />
          <Messages />
          <Bookmarks />
          <TopArticles />
          <Lists />
          <Communities />
          <Topics />
          <Circles />
          <TwitterBlue />
          <VerifiedOrgs />
          <TypefullyGrow />
          <Profile />
        </div>
        <div className="flex flex-col gap-y-4">
          <Separator />
          <SwitchControl
            label="Labels"
            storageKey={KeyNavigationButtonsLabels}
          />
          <SwitchControl
            label="Labels on Hover"
            storageKey={KeyNavigationButtonsLabelsHover}
          />
          <SwitchControl
            label="Center Vertically"
            storageKey={KeyNavigationCenter}
          />
          <SwitchControl
            label="Unread Count Badge"
            storageKey={KeyUnreadCountBadge}
          />
        </div>
      </form>
    </div>
  </section>
)

export default NavigationSection
