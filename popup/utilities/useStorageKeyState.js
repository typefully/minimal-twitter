import { useEffect, useRef, useState } from "react";
import { getStorage, setStorage } from "./chromeStorage";

export default function useStorageKeyState(storageKey) {
  const [state, setState] = useState(false);

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const savedSetting = await getStorage(storageKey);
        if (savedSetting !== undefined) {
          setState(savedSetting === "on" ? true : false);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    getInitialState();
  }, [storageKey]);

  const prevState = useRef(state);

  useEffect(() => {
    const updateStorage = async () => {
      try {
        await setStorage({ [storageKey]: state ? "on" : "off" });
      } catch (error) {
        console.warn(error);
      }
    };

    if (prevState.current !== state) {
      updateStorage();
    }

    prevState.current = state;
  }, [storageKey, state]);

  return [state, setState];
}

export function useStorageValue(storageKey) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const savedSetting = await getStorage(storageKey);
        if (savedSetting !== undefined) {
          setValue(savedSetting);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    getInitialState();
  }, [storageKey]);

  return value;
}
