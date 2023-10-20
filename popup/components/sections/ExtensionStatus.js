import { KeyExtensionStatus } from "../../../storage-keys";
import ControlsWrapper from "../ui/ControlsWrapper";
import SwitchControl from "../ui/SwitchControl";

export default function ExtensionStatus() {
  return (
    <ControlsWrapper>
      <SwitchControl label="Extension Enabled" storageKey={KeyExtensionStatus} />
    </ControlsWrapper>
  );
}
