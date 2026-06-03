import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";

import useStorageKeyState from "../../utilities/useStorageKeyState";

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  position: "relative",
  backgroundColor: "var(--twitter-accent-three)",
  "&::after": {
    content: "",
    position: "absolute",
    inset: `min(
      0px,
      calc((100% - 2.25rem) / 2)
    )`,
  },
  '&[data-state="unchecked"]': {
    backgroundColor: "transparent",
    border: "2px solid var(--twitter-accent-one)",
  },
});

export const CheckboxControl = ({ id, label, description, labelExtras, onCheckedChange, checked, crossedIcon }) => (
  <div className="w-full">
    <div className="flex items-center justify-between w-full gap-x-3">
      <div className="flex items-center content-start gap-2">
        <label htmlFor={id} className="text-[15px] font-medium">
          {label}
        </label>
        {labelExtras}
      </div>
      <div className="grid rounded-full cursor-pointer w-5 shrink-0 place-items-center hover:bg-x-accent4">
        <StyledCheckbox onCheckedChange={onCheckedChange} checked={checked} id={id} className="flex items-center justify-center w-5 h-5 rounded-[4px]">
          <CheckboxPrimitive.Indicator className="text-white">{crossedIcon ? <Cross2Icon /> : <CheckIcon />}</CheckboxPrimitive.Indicator>
        </StyledCheckbox>
      </div>
    </div>
    {description && <p className="mt-0.5 text-xs leading-4 dark:text-gray-400 text-gray-500">{description}</p>}
  </div>
);

export const LocalStorageCheckboxControl = ({ label, description, storageKey, crossedIcon }) => {
  const [checked, setChecked] = useStorageKeyState(storageKey);

  return <CheckboxControl id={storageKey} label={label} description={description} onCheckedChange={setChecked} checked={checked} crossedIcon={crossedIcon} />;
};
