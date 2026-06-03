import { KeyInterFont, KeySearchBar, KeyTitleNotifications, KeyTransparentSearch, KeyTweetButton } from "../../../storage-keys";
import SectionLabel from "../ui/SectionLabel";
import SwitchControl from "../ui/SwitchControl";

const InterfaceSection = () => (
  <section className="flex flex-col gap-y-2">
    <SectionLabel htmlFor="user-control-interface">Interface</SectionLabel>
    <div id="user-control-interface">
      <form className="flex flex-col items-center justify-between px-4 dark:bg-x-bgTwoDark bg-x-bgTwo rounded-2xl">
        <div className="w-full py-4">
          <div className="flex flex-col gap-y-4">
            <SwitchControl
              label="Inter Font"
              description="Replaces X's default Chirp typeface with Inter across the site for a more neutral, app-like reading experience."
              storageKey={KeyInterFont}
            />
            <SwitchControl
              label="Search Bar"
              description="Shows or hides the search field in the right sidebar. This does not control the left-nav Search shortcut; that lives under Left Navigation."
              storageKey={KeySearchBar}
            />
            <SwitchControl
              label="Transparent Search Bar"
              description="Keeps the right-sidebar search field available but removes its filled background, making that column look less visually heavy."
              storageKey={KeyTransparentSearch}
            />
            <SwitchControl
              label="Tweet Button"
              description="Shows or hides X's prominent compose/post button in the sidebar, reducing the visual push to write when you mainly want to read."
              storageKey={KeyTweetButton}
            />
            <SwitchControl
              label="Notifications in Title"
              description='Turn off to remove browser-tab counts like "(1) Home / X" and keep X from swapping the favicon to the red notification-dot icon.'
              storageKey={KeyTitleNotifications}
            />
          </div>
        </div>
      </form>
    </div>
  </section>
);

export default InterfaceSection;
