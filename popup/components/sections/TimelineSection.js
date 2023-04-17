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
          <SwitchControl label="Zen Writer Mode" storageKey="writerMode" />
          <SwitchControl
            label="Timeline Borders"
            storageKey="timelineBorders"
            defaultState={true}
          />
          <SwitchControl
            label="Tweet Borders"
            storageKey="tweetBorders"
            defaultState={true}
          />
          <SwitchControl
            label="Sticky Header"
            storageKey="stickyHeader"
            defaultState={true}
          />
          <SwitchControl
            label="Trends on Home Timeline"
            storageKey="trendsHomeTimeline"
          />
          <SwitchControl
            label="Recent Media on Profiles"
            storageKey="recentMedia"
          />
          <Separator />
          <VanityCheckboxes />
          <LocalStorageCheckboxControl
            label="Remove View Count from Tweets"
            storageKey="hideViewCount"
            defaultState={true}
          />
          <LocalStorageCheckboxControl
            label="Remove Promoted Posts"
            storageKey="removePromotedPosts"
            defaultState={true}
          />
          <LocalStorageCheckboxControl
            label="Remove Who to Follow"
            storageKey="removeWhoToFollow"
          />
          <LocalStorageCheckboxControl
            label="Remove Topics to Follow"
            storageKey="removeTopicsToFollow"
          />
          <LocalStorageCheckboxControl
            label={`Remove "For you / Following" Tabs`}
            storageKey="removeTimelineTabs"
          />
          <LocalStorageCheckboxControl
            label={`Always use "Following" Tab`}
            storageKey="followingTimeline"
          />
          <LocalStorageCheckboxControl
            label="Always Latest Tweets (if available)"
            storageKey="latestTweets"
          />
          <LocalStorageCheckboxControl
            label="Remove Tweet Formatting"
            storageKey="removeTweetFormatting"
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
