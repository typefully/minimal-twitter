// Utility function to remove DOM element
export default function removeElement(id) {
  const element = document.getElementById(id);
  element && element.remove();
}
