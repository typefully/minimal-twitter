import { defaultPreferences } from "../../../../storage-keys";

/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/
- Use storage.local to allow user to store customizations
--*/

export const getStorage = (storageKeyOrKeys) => {
  if (Array.isArray(storageKeyOrKeys)) {
    return getMultipleStorageKeys(storageKeyOrKeys);
  } else {
    return getSingleStorageKey(storageKeyOrKeys);
  }
};

const getSingleStorageKey = (key) => {
  return new Promise((resolve, _reject) => {
    chrome?.storage?.local.get([key], (data) => {
      resolve(data[key] ?? defaultPreferences[key]); // Fallback to the default preference
    });
  });
};

const getMultipleStorageKeys = (keysArray) => {
  return new Promise((resolve, _reject) => {
    chrome?.storage?.local.get(keysArray, (data) => {
      const res = keysArray.reduce((acc, cur) => {
        acc[cur] = data[cur] ?? defaultPreferences[cur]; // For each key, fallback to the default preference
        return acc;
      }, {});
      resolve(res);
    });
  });
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
