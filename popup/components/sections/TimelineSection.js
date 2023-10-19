import {
  KeyFollowingTimeline,
  KeyHideViewCount,
  KeyLatestTweets,
  KeyRecentMedia,
  KeyRemovePromotedPosts,
  KeyRemoveTimelineTabs,
  KeyRemoveTopicsToFollow,
  KeyRemoveTweetFormatting,
  KeyRemoveWhoToFollow,
  KeyStickyHeader,
  KeyTimelineBorders,
  KeyTrendsHomeTimeline,
  KeyTweetBorders,
  KeyWriterMode
} from "../../../storage-keys"
import useMounted from "../../utilities/hooks/useMounted"
import TimelineWidthSlider from "../controls/TimelineWidthSlider"
import VanityCheckboxes from "../controls/VanityCheckboxes"
import ControlsWrapper from "../ui/ControlsWrapper"
import SectionLabel from "../ui/SectionLabel"
import Separator from "../ui/Separator"
import SwitchControl from "../ui/SwitchControl"
import { LocalStorageCheckboxControl } from "../ui/checkboxes"

const TimelineSection = () => {
  const mounted = useMounted()

  return (
    <section className="flex flex-col gap-y-2">
      <SectionLabel htmlFor="user-control-timeline">Timeline</SectionLabel>
      {mounted ? (
        <ControlsWrapper id="user-control-timeline">
          <TimelineWidthSlider />
          <Separator />
          <SwitchControl label="Zen Writer Mode" storageKey={KeyWriterMode} />
          <SwitchControl
            label="Timeline Borders"
            storageKey={KeyTimelineBorders}
          />
          <SwitchControl label="Tweet Borders" storageKey={KeyTweetBorders} />
          <SwitchControl label="Sticky Header" storageKey={KeyStickyHeader} />
          <SwitchControl
            label="Trends on Home Timeline"
            storageKey={KeyTrendsHomeTimeline}
          />
          <SwitchControl
            label="Recent Media on Profiles"
            storageKey={KeyRecentMedia}
          />
          <Separator />
          <VanityCheckboxes />
          <LocalStorageCheckboxControl
            label="Remove View Count from Tweets"
            storageKey={KeyHideViewCount}
          />
          <LocalStorageCheckboxControl
            label="Remove Promoted Posts"
            storageKey={KeyRemovePromotedPosts}
          />
          <LocalStorageCheckboxControl
            label="Remove Who to Follow"
            storageKey={KeyRemoveWhoToFollow}
          />
          <LocalStorageCheckboxControl
            label="Remove Topics to Follow"
            storageKey={KeyRemoveTopicsToFollow}
          />
          <LocalStorageCheckboxControl
            label={`Remove "For you / Following" Tabs`}
            storageKey={KeyRemoveTimelineTabs}
          />
          <LocalStorageCheckboxControl
            label={`Always use "Following" Tab`}
            storageKey={KeyFollowingTimeline}
          />
          <LocalStorageCheckboxControl
            label="Always Latest Tweets (if available)"
            storageKey={KeyLatestTweets}
          />
          <LocalStorageCheckboxControl
            label="Remove Tweet Formatting"
            storageKey={KeyRemoveTweetFormatting}
          />
        </ControlsWrapper>
      ) : (
        <ControlsWrapper className="animate-pulse h-[115.5px]" />
      )}
      <p className="pt-1 pb-2 text-xs text-center font-medium leading-5 dark:text-twitterAccentDark text-twitterAccentOne">
        View more Twitter display settings{" "}
        <a
          href="https://twitter.com/i/display"
          target="_blank"
          rel="noreferrer"
          className="text-twitterBlue hover:underline"
        >
          here
        </a>
        .
      </p>
    </section>
  )
}

export default TimelineSection
