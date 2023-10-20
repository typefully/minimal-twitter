import * as SwitchPrimitive from "@radix-ui/react-switch";
import { styled } from "@stitches/react";

import useStorageKeyState from "../../utilities/useStorageKeyState";

export default function SwitchControl({ label, disabled, storageKey, onChange }) {
  const [checked, setChecked, loaded] = useStorageKeyState(storageKey);

  return (
    <div className={"flex items-center justify-between w-full" + (disabled ? " opacity-50 pointer-events-none" : "")}>
      <label htmlFor={storageKey} className="text-[15px] font-medium">
        {label}
      </label>
      {loaded && (
        <StyledSwitch
          onCheckedChange={(checked) => {
            setChecked(checked);
            onChange && onChange(checked);
          }}
          checked={checked}
          id={storageKey}
        >
          <StyledThumb />
        </StyledSwitch>
      )}
    </div>
  );
}

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: "unset",
  width: 40,
  height: 14,
  backgroundColor: "#939393",
  borderRadius: "9999px",
  position: "relative",
  WebkitTapHighlightColor: "#1DA1F2",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  '&[data-state="checked"]': { backgroundColor: "#6bc9fb" },
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: "block",
  width: 20,
  height: 20,
  backgroundColor: "#fafafa",
  boxShadow: "rgb(0 0 0 / 50%) 0px 1px 3px",
  borderRadius: "9999px",
  transition: "transform 100ms",
  transform: "translateX(0px)",
  willChange: "transform",
  '&[data-state="checked"]': {
    backgroundColor: "#1d9bf0",
    transform: "translateX(20px)",
  },
});
