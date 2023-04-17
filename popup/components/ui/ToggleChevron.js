import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import * as TogglePrimitive from "@radix-ui/react-toggle"

const ToggleChevron = ({ pressed, onClick }) => (
  <TogglePrimitive.Root
    pressed={pressed}
    onPressedChange={(pressed) => {
      onClick(pressed)
    }}
    className="flex items-center"
  >
    {pressed ? <ChevronUpIcon className="mt-1" /> : <ChevronDownIcon />}
  </TogglePrimitive.Root>
)

export default ToggleChevron
