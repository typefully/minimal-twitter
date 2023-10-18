/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/
- Use storage.local to allow user to store customizations
--*/

/*
- Get storage with storage.local
- k => "[key]" (String)
- Don't need to throttle
*/
export const getStorage = async (k) => {
  const promise = new Promise((resolve, _reject) => {
    const storageKeys = Array.isArray(k) ? k : [k];
    chrome?.storage?.local.get(storageKeys, (data) => {
      return resolve(Array.isArray(k) ? data : data[k]);
    });
  });
  return promise;
};

/*--
- Set storage with storage.local
- kv => {key: value} (Single key value pair)
- Throttle function to prevent hitting API limits
- The maximum number of set, remove, or clear operations = 120
  - 1 min = 60000 ms
  - 60000 ms / 120 operations = 500 ms/operation
--*/
export const setStorage = async (kv) => {
  const promise = new Promise((resolve, _reject) => {
    chrome?.storage?.local.set(kv, () => {
      return resolve(kv);
    });
  });
  return promise;
};
