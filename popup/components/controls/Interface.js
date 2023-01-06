import SwitchControl from "./SwitchControl"

const Interface = () => (
  <form className="flex flex-col items-center justify-between px-4 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl">
    <div className="w-full py-4">
      <div className="flex flex-col gap-y-4">
        <SwitchControl
          label="Search Bar"
          storageKey="searchBar"
          defaultState={true}
        />
        <SwitchControl
          label="Transparent Search Bar"
          storageKey="transparentSearch"
        />
        <SwitchControl
          label="Tweet Button"
          storageKey="tweetButton"
          defaultState={true}
        />
        <SwitchControl label="Inter Font" storageKey="interFont" />
      </div>
    </div>
  </form>
)

export default Interface
