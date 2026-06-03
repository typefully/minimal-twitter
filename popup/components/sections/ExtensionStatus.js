import { KeyExtensionStatus } from "../../../storage-keys";
import ControlsWrapper from "../ui/ControlsWrapper";
import SwitchControl from "../ui/SwitchControl";

export default function ExtensionStatus() {
  return (
    <ControlsWrapper>
      <SwitchControl
        label="Extension Enabled"
        description="Turns Minimal Twitter's site changes on or off without uninstalling the extension. Leave this on for the settings below to affect X."
        storageKey={KeyExtensionStatus}
      />
    </ControlsWrapper>
  );
}
