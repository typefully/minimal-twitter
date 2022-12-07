import useMounted from "../../../utilities/hooks/useMounted"
import { SwitchTimelineBorders } from "../../controls/ExtrasSwitches"
import TimelineSlider from "../../controls/TimelineSlider"
import Separator from "../../controls/Separator"

const TimelineSection = () => {
  const mounted = useMounted()

  return (
    <section className="flex flex-col space-y-2">
      <label
        htmlFor="user-control-timeline-width"
        className="text-sm font-bold dark:text-twitterAccentOneDark text-twitterAccentOne"
      >
        Customize Timeline
      </label>
      {mounted ? (
        <div
          id="user-control-timeline-width"
          className="p-4 pb-0 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl"
        >
          <TimelineSlider />
          <Separator />
          <SwitchTimelineBorders />
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
