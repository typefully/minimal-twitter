import ControlsWrapper from "../ui/ControlsWrapper";
import SectionLabel from "../ui/SectionLabel";
import SwitchControl from "../ui/SwitchControl";

const TypefullySection = () => (
  <section className="flex flex-col gap-y-2">
    <SectionLabel htmlFor="user-control-typefully">Typefully</SectionLabel>
    <ControlsWrapper id="user-control-typefully">
      <SwitchControl label={`"Save to Typefully" in composers`} storageKey="typefullyComposerButtons" />
    </ControlsWrapper>
  </section>
);

export default TypefullySection;
