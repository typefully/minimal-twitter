import FeedSlider from "../../controls/FeedSlider"

const FeedWidthSection = () => (
  <section className="flex flex-col space-y-2">
    <label
      htmlFor="user-control-feed-width"
      className="text-sm font-bold text-[#8899a6]"
    >
      Feed Width
    </label>
    <div id="user-control-feed-width">
      <FeedSlider />
    </div>
  </section>
)

export default FeedWidthSection
