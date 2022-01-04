import debounce from "lodash.debounce"

/*--
- Use storage.sync to allow user to store customizations
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#usage
*/

/*--
- Debounce function to prevent hitting API limits
- The maximum number of set, remove, or clear operations = 120
- 1 min = 60000 ms
- 60000 ms / 120 operations = 500 ms/operation
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#property-sync
--*/
export const setStorage = debounce((keyVal) => {
  chrome?.storage?.sync.set(keyVal, () => {
    return value
  })
}, 500)

export const getStorage = debounce((key) => {
  chrome?.storage?.sync.get([key], (result) => {
    return result.key
  })
}, 500)
