// Utility function to remove DOM element
export const removeElement = (id) => {
  const element = document.getElementById(id);
  element && element.remove();
};

// Utility function to inject CSS into page
export const addStyles = (id, css) => {
  // First remove before adding
  removeElement(id);

  const head = document.querySelector("head");
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `${css}`;
  head.appendChild(style);
};

// Utility function to create data for `injectAllChanges()`
export const constructNewData = (changes) => {
  // Creates an array of objects from changes
  // The value of each object is the new value
  const newValuesArray = Object.entries(changes).map((item) => {
    const itemKey = item[0];
    const itemValue = item[1]?.newValue;
    return { [itemKey]: itemValue };
  });

  // Recreate a hash map to pass to `injectAllChanges()`
  const newChangesData = Object.fromEntries(
    newValuesArray.map((item) => {
      const itemKey = Object.keys(item)[0];
      const itemValue = Object.values(item)[0];
      return [itemKey, itemValue];
    })
  );

  return newChangesData;
};

/*-- 
- Simple utility throttle function with no return value
- Example usage:
  const throttledFunc = throttle(function() {
      // This function will only be called at most once every 1000 milliseconds
  }, 1000)
--*/
export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export const getCurrentTheme = () => {
  const body = document.querySelector("body");
  const bodyBackgroundColor = window.getComputedStyle(body).backgroundColor;

  if (bodyBackgroundColor === "rgb(255, 255, 255)") {
    return "white";
  } else if (bodyBackgroundColor === "rgb(21, 32, 43)") {
    return "dim";
  } else if (bodyBackgroundColor === "rgb(0, 0, 0)") {
    return "black";
  }
};

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
      return resolve(data[k]);
    });
  });
  return promise;
};
