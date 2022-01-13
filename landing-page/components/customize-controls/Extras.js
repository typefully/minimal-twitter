import { SwitchZenMode } from "./ExtrasSwitches"

const Extras = () => {
  return (
    <form className="flex flex-col items-center justify-between px-4 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl">
      <SwitchZenMode />
    </form>
  )
}

export default Extras
