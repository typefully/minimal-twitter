import throttle from "lodash.throttle"

/*--
- Use storage.sync to allow user to store customizations
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#usage
*/

/*--
- Throttle function to prevent hitting API limits
- The maximum number of set, remove, or clear operations = 120
- 1 min = 60000 ms
- 60000 ms / 120 operations = 500 ms/operation
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#property-sync
--*/
export const setStorage = throttle(async (kv) => {
  const promise = new Promise((resolve, reject) => {
    if (typeof chrome?.storage !== "undefined") {
      chrome?.storage?.sync.set(kv, () => {
        if (kv.value) {
          return resolve(kv.value)
        } else {
          return reject("Chrome storage error: can't set.")
        }
      })
    } else {
      return reject("Chrome storage is undefined")
    }
  })
  return promise
}, 500)

export const getStorage = throttle(async (k) => {
  const promise = new Promise((resolve, reject) => {
    if (typeof chrome?.storage !== "undefined") {
      chrome?.storage?.sync.get([k], (result) => {
        if (result[k]) {
          return resolve(result[k])
        } else {
          return reject("Chrome storage error: can't get.")
        }
      })
    } else {
      return reject("Chrome storage is undefined")
    }
  })
  return promise
}, 500)
