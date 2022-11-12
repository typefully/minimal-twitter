import useMounted from "../../../utilities/hooks/useMounted"
import { SwitchFeedBorders } from "../../controls/ExtrasSwitches"
import FeedSlider from "../../controls/FeedSlider"
import Separator from "../../controls/Separator"

const FeedSection = () => {
  const mounted = useMounted()

  return (
    <section className="flex flex-col space-y-2">
      <label
        htmlFor="user-control-feed-width"
        className="text-sm font-bold dark:text-twitterAccentOneDark text-twitterAccentOne"
      >
        Customize Feed
      </label>
      {mounted ? (
        <div
          id="user-control-feed-width"
          className="p-4 pb-0 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl"
        >
          <FeedSlider />
          <Separator />
          <SwitchFeedBorders />
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
export default FeedSection
