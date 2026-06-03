import useStorageKeyState from "../../utilities/useStorageKeyState";
import { CheckboxControl } from "./checkboxes";

export default function SwitchControl({ label, description, disabled, storageKey, onChange }) {
  const [checked, setChecked, loaded] = useStorageKeyState(storageKey);

  return (
    <div className={"w-full" + (disabled ? " opacity-40 pointer-events-none" : "")}>
      {loaded ? (
        <CheckboxControl
          id={storageKey}
          label={label}
          description={description}
          onCheckedChange={(checked) => {
            setChecked(checked);
            onChange && onChange(checked);
          }}
          checked={checked}
        />
      ) : (
        <>
          <div className="flex items-center justify-between w-full gap-x-3">
            <label htmlFor={storageKey} className="text-[15px] font-medium">
              {label}
            </label>
          </div>
          {description && <p className="mt-0.5 text-xs leading-4 dark:text-gray-400 text-gray-500">{description}</p>}
        </>
      )}
    </div>
  );
}
