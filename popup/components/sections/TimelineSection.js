import {
  KeyFollowingTimeline,
  KeyHideViewCount,
  KeyRecentMedia,
  KeyRemovePromotedPosts,
  KeyRemoveTimelineBorders,
  KeyRemoveTimelineTabs,
  KeyRemoveTopicsToFollow,
  KeyRemoveTweetBorders,
  KeyRemoveWhoToFollow,
  KeyStickyHeader,
  KeyTrendsHomeTimeline,
  KeyWriterMode,
} from "../../../storage-keys";
import useMounted from "../../utilities/hooks/useMounted";
import TimelineWidthSlider from "../controls/TimelineWidthSlider";
import VanityCheckboxes from "../controls/VanityCheckboxes";
import ControlsWrapper from "../ui/ControlsWrapper";
import SectionLabel from "../ui/SectionLabel";
import Separator from "../ui/Separator";
import SwitchControl from "../ui/SwitchControl";
import { LocalStorageCheckboxControl } from "../ui/checkboxes";

const TimelineSection = () => {
  const mounted = useMounted();

  return (
    <section className="flex flex-col gap-y-2">
      <SectionLabel htmlFor="user-control-timeline">Timeline</SectionLabel>
      {mounted ? (
        <ControlsWrapper id="user-control-timeline">
          <TimelineWidthSlider />
          <Separator />
          <SwitchControl label="Zen Writer Mode" storageKey={KeyWriterMode} />
          <SwitchControl label="Sticky Header" storageKey={KeyStickyHeader} />
          <SwitchControl label="Trends on Home Timeline" storageKey={KeyTrendsHomeTimeline} />
          <SwitchControl label="Recent Media on Profiles" storageKey={KeyRecentMedia} />
          <Separator />
          <SectionLabel>Remove Distracting Elements</SectionLabel>
          <VanityCheckboxes />
          <LocalStorageCheckboxControl label="View Count from Tweets" storageKey={KeyHideViewCount} crossedIcon />
          <LocalStorageCheckboxControl label="Promoted Posts" storageKey={KeyRemovePromotedPosts} crossedIcon />
          <LocalStorageCheckboxControl label="Who to Follow Suggestions" storageKey={KeyRemoveWhoToFollow} crossedIcon />
          <LocalStorageCheckboxControl label="Topics to Follow Suggestions" storageKey={KeyRemoveTopicsToFollow} crossedIcon />
          <LocalStorageCheckboxControl label={`Timeline Tabs (For you, Following, lists...)`} storageKey={KeyRemoveTimelineTabs} crossedIcon />
          <LocalStorageCheckboxControl label="Timeline Borders" storageKey={KeyRemoveTimelineBorders} crossedIcon />
          <LocalStorageCheckboxControl label="Tweet Borders" storageKey={KeyRemoveTweetBorders} crossedIcon />
          <Separator />
          <LocalStorageCheckboxControl label={`Always use "Following" Tab`} storageKey={KeyFollowingTimeline} />
        </ControlsWrapper>
      ) : (
        <ControlsWrapper className="animate-pulse h-[115.5px]" />
      )}
      <p className="pt-1 pb-2 text-xs text-center font-medium leading-5 dark:text-x-accentDark text-x-accent1">
        View more 𝕏 display settings{" "}
        <a href="https://twitter.com/i/display" target="_blank" rel="noreferrer" className="text-x-premium hover:underline">
          here
        </a>
        .
      </p>
    </section>
  );
};

export default TimelineSection;
