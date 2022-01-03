import { useState } from "react"
import { Switch } from "@headlessui/react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}
const Example = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <form className="bg-[#192734] rounded-2xl p-4 flex items-center space-x-3">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full cursor-pointer group focus:outline-none"
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className="absolute w-full h-full bg-white rounded-md pointer-events-none"
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "bg-indigo-600" : "bg-gray-200",
            "pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200"
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none absolute left-0 inline-block h-5 w-5 rounded-full bg-white transform transition-transform ease-in-out duration-200"
          )}
        />
      </Switch>
    </form>
  )
}

export default Example
