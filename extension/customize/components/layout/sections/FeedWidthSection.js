import MinimalSlider from "../../controls/Slider"

const FeedWidthSection = () => (
  <section className="flex flex-col space-y-2">
    <label
      htmlFor="user-control-feed-width"
      className="text-sm font-bold text-[#8899a6]"
    >
      Feed Width
    </label>
    <MinimalSlider id="user-control-feed-width" />
  </section>
)

export default FeedWidthSection
