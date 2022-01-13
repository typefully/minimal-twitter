import { createLocalStorageStateHook } from "use-local-storage-state"

export const useWidth = createLocalStorageStateHook("width", 700)
export const useZenMode = createLocalStorageStateHook("zenMode", false)
export const useButtons = createLocalStorageStateHook("buttons", {
  explore: "on",
  notifications: "on",
  messages: "on",
  bookmarks: "on",
  lists: "on"
})
