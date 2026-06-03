import {
  KeyAiSlopButton,
  KeyFollowingTimeline,
  KeyHideViewCount,
  KeyRecentMedia,
  KeyRemovePromotedPosts,
  KeyRemoveTimelineBorders,
  KeyRemoveTimelineTabs,
  KeyRemoveTopicsToFollow,
  KeyRemoveTweetBorders,
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
          <SwitchControl
            label="Zen Writer Mode"
            description="Turns the post composer into a quieter writing surface by reducing nearby timeline chrome while you are composing."
            storageKey={KeyWriterMode}
          />
          <SwitchControl
            label="Sticky Header"
            description="Keeps X's timeline header fixed at the top while you scroll, so tabs and page context stay visible instead of moving away with the feed."
            storageKey={KeyStickyHeader}
          />
          <SwitchControl
            label="Trends on Home Timeline"
            description="Shows the trends panel beside the home feed on wider desktop layouts, even when the rest of the right sidebar is minimized."
            storageKey={KeyTrendsHomeTimeline}
          />
          <SwitchControl
            label="Recent Media on Profiles"
            description="Adds a compact recent-media panel next to profile timelines on desktop, making a profile's images easier to scan without opening the Media tab."
            storageKey={KeyRecentMedia}
          />
          <Separator />
          <SectionLabel>Remove Distracting Elements</SectionLabel>
          <VanityCheckboxes />
          <LocalStorageCheckboxControl
            label="View Count from Tweets"
            description="Hides public view totals from posts, reducing analytics noise without hiding replies, reposts, likes, or the post itself."
            storageKey={KeyHideViewCount}
            crossedIcon
          />
          <LocalStorageCheckboxControl
            label="Promoted Posts"
            description="Removes promoted posts and ad placements from timelines as they are inserted into the feed. Organic posts are left alone."
            storageKey={KeyRemovePromotedPosts}
            crossedIcon
          />
          <LocalStorageCheckboxControl
            label="Topics to Follow Suggestions"
            description="Hides recommendation modules that ask you to follow topics or accounts while browsing timelines and profile pages."
            storageKey={KeyRemoveTopicsToFollow}
            crossedIcon
          />
          <LocalStorageCheckboxControl
            label="AI Slop Button"
            description='Adds a tiny "ai slop" action to posts. Clicking it asks X to report the post as spam and then block the author.'
            storageKey={KeyAiSlopButton}
          />
          <LocalStorageCheckboxControl
            label={`Timeline Tabs (For you, Following, lists...)`}
            description="Hides the top timeline tab strip when you want fewer entry points competing for attention. Pair with Always use Following if you still want that tab selected automatically."
            storageKey={KeyRemoveTimelineTabs}
            crossedIcon
          />
          <LocalStorageCheckboxControl
            label="Timeline Borders"
            description="Removes the outer frame around the main timeline column, giving the center column a flatter and less boxed-in layout."
            storageKey={KeyRemoveTimelineBorders}
            crossedIcon
          />
          <LocalStorageCheckboxControl
            label="Tweet Borders"
            description="Removes divider lines between individual posts so the feed reads as a continuous stream instead of separated cards."
            storageKey={KeyRemoveTweetBorders}
            crossedIcon
          />
          <Separator />
          <LocalStorageCheckboxControl
            label={`Always use "Following" Tab`}
            description="When X opens Home on For You, automatically switches back to Following whenever that tab is available, so the feed defaults to accounts you follow."
            storageKey={KeyFollowingTimeline}
          />
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
