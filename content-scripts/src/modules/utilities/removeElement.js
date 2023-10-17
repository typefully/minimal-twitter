// Utility function to remove DOM element
export function removeElementById(id) {
  const element = document.getElementById(id);
  element && element.remove();
}

export function removeElement(selector) {
  const element = document.querySelector(selector);
  element && element.remove();
}
