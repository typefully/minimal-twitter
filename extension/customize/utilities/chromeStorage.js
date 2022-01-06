import throttle from "lodash.throttle"

/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/
- Use storage.sync to allow user to store customizations
--*/

/*
- Get storage with storage.sync
- k => "[key]" (String)
- Don't need to throttle
*/
export const getStorage = async (k) => {
  const promise = new Promise((resolve, _reject) => {
    chrome?.storage?.sync.get([k], (data) => {
      return resolve(data[k])
    })
  })
  return promise
}

/*--
- Set storage with storage.sync
- kv => {key: value} (Single key value pair)
- Throttle function to prevent hitting API limits
- The maximum number of set, remove, or clear operations = 120
  - 1 min = 60000 ms
  - 60000 ms / 120 operations = 500 ms/operation
--*/
export const setStorage = throttle(async (kv) => {
  const promise = new Promise((resolve, _reject) => {
    chrome?.storage?.sync.set(kv, () => {
      return resolve(kv)
    })
  })
  return promise
}, 500)
