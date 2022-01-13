import useMounted from "../../../utilities/hooks/useMounted"
import FeedSlider from "../../customize-controls/FeedSlider"

const FeedSection = () => {
  const mounted = useMounted()

  return (
    <section className="flex flex-col space-y-2">
      <label
        htmlFor="user-control-feed-width"
        className="text-sm font-bold dark:text-twitterAccentOneDark text-twitterAccentOne"
      >
        Feed
      </label>
      {mounted ? (
        <div
          id="user-control-feed-width"
          className="p-4 pb-0 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl"
        >
          <FeedSlider />
        </div>
      ) : (
        <div className="dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl animate-pulse h-[115.5px]" />
      )}
    </section>
  )
}
export default FeedSection
