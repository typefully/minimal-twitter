import SectionLabel from "../ui/SectionLabel"
import SwitchControl from "../ui/SwitchControl"

const InterfaceSection = () => (
  <section className="flex flex-col gap-y-2">
    <SectionLabel htmlFor="user-control-interface">Interface</SectionLabel>
    <div id="user-control-interface">
      <form className="flex flex-col items-center justify-between px-4 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl">
        <div className="w-full py-4">
          <div className="flex flex-col gap-y-4">
            <SwitchControl label="Inter Font" storageKey="interFont" />
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
            <SwitchControl
              label="Notifications in Title"
              storageKey="titleNotifications"
            />
          </div>
        </div>
      </form>
    </div>
  </section>
)

export default InterfaceSection
