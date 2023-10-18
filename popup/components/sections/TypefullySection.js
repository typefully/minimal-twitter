import { KeyTypefullyGrowTab } from "../../../storage-keys"
import ControlsWrapper from "../ui/ControlsWrapper"
import SectionLabel from "../ui/SectionLabel"
import SwitchControl from "../ui/SwitchControl"

const TypefullySection = () => (
  <section className="flex flex-col gap-y-2">
    <SectionLabel htmlFor="user-control-typefully">Typefully</SectionLabel>
    <ControlsWrapper id="user-control-typefully">
      <SwitchControl
        label="Composer Buttons"
        storageKey="typefullyComposerButtons"
        defaultState={true}
      />
      <SwitchControl
        label="Grow Tab"
        storageKey={KeyTypefullyGrowTab}
        defaultState={true}
      />
    </ControlsWrapper>
  </section>
)

export default TypefullySection
