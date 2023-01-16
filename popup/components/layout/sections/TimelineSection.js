import useMounted from "../../../utilities/hooks/useMounted"
import CheckboxControl from "../../controls/CheckboxControl"
import Separator from "../../controls/Separator"
import SwitchControl from "../../controls/SwitchControl"
import TimelineSlider from "../../controls/TimelineSlider"
import VanityCheckboxes from "../../controls/VanityCheckboxes"

const TimelineSection = () => {
  const mounted = useMounted()

  return (
    <section className="flex flex-col gap-y-2">
      <label
        htmlFor="user-control-timeline"
        className="text-sm font-bold dark:text-twitterAccentOneDark text-twitterAccentOne"
      >
        Timeline
      </label>
      {mounted ? (
        <div
          id="user-control-timeline"
          className="p-4 pb-2 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl"
        >
          <TimelineSlider />
          <Separator className="mb-4" />
          <div className="flex flex-col gap-y-4">
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
          </div>
          <Separator className="mt-4 mb-2" />
          <VanityCheckboxes />
          <CheckboxControl
            label="Remove View Count from Tweets"
            storageKey="hideViewCount"
            defaultState={true}
          />
          <CheckboxControl
            label="Remove Promoted Posts"
            storageKey="removePromotedPosts"
            defaultState={true}
          />
          <CheckboxControl
            label="Remove Who to Follow"
            storageKey="removeWhoToFollow"
          />
          <CheckboxControl
            label="Remove Topics to Follow"
            storageKey="removeTopicsToFollow"
          />
          <CheckboxControl
            label="Show Trends on Home Timeline"
            storageKey="trendsHomeTimeline"
          />
          <CheckboxControl
            label="Show Recent Media on Profiles"
            storageKey="recentMedia"
          />
          <CheckboxControl
            label="Show Latest Tweets Always (if available)"
            storageKey="latestTweets"
          />
        </div>
      ) : (
        <div className="dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl animate-pulse h-[115.5px]" />
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
