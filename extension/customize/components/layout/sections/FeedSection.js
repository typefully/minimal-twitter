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
        className="text-sm font-bold text-[#8899a6]"
      >
        Feed
      </label>
      {mounted ? (
        <div
          id="user-control-feed-width"
          className="bg-[#192734] rounded-2xl p-4 pb-0"
        >
          <FeedSlider />
          <Separator />
          <SwitchFeedBorders />
        </div>
      ) : (
        <div className="bg-[#192734] rounded-2xl animate-pulse h-[115.5px]" />
      )}
    </section>
  )
}
export default FeedSection
