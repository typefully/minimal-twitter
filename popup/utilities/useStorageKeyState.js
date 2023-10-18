import { useEffect, useRef, useState } from "react"
import { getStorage, setStorage } from "./chromeStorage"

export default function useStorageKeyState(storageKey, defaultState) {
  const [state, setState] = useState(defaultState)

  console.log("init", storageKey, defaultState)

  useEffect(() => {
    const getInitialState = async () => {
      try {
        console.log(`Getting ${storageKey} from storage...`)
        const savedSetting = await getStorage(storageKey)
        if (savedSetting !== undefined) {
          console.log(
            `✅ Value found, setting ${storageKey} to value: ${savedSetting}`
          )
          setState(savedSetting === "on" ? true : false)
        } else {
          console.log(
            `❌ Value not found, setting ${storageKey} to default: ${defaultState}`
          )
          setState(defaultState)
          await setStorage({ [storageKey]: defaultState ? "on" : "off" })
        }
      } catch (error) {
        console.warn(error)
      }
    }

    getInitialState()
  }, [storageKey, defaultState])

  const prevState = useRef(state)

  useEffect(() => {
    const updateStorage = async () => {
      try {
        console.log(`✍️ Updating ${storageKey} to value: ${state}`)
        await setStorage({ [storageKey]: state ? "on" : "off" })
      } catch (error) {
        console.warn(error)
      }
    }

    if (prevState.current !== state) {
      updateStorage()
    }

    prevState.current = state
  }, [storageKey, state])

  return [state, setState]
}
