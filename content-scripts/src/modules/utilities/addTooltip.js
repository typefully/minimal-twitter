export default function addTooltip(element, options) {
  const { id, title, description } = options ?? {};

  if (!element) return;
  let tooltip = document.getElementById(id);

  if (!tooltip) {
    // Create tooltip if if doesn't exist
    tooltip = document.createElement("div");
    tooltip.id = id;
    tooltip.classList.add("mt-tooltip", "hidden");
    tooltip.innerHTML = `${title ? `<span class="title">${title}</span>` : ""}
${description ? `<span class="description">${description}</span>` : ""}`;
    document.body.appendChild(tooltip);
  } else {
    // Update tooltip content if it already exists
    const newInnerHtml = `${title ? `<span class="title">${title}</span>` : ""}
${description ? `<span class="description">${description}</span>` : ""}`;

    tooltip.innerHTML = newInnerHtml;

    // Hide the tooltip by default if the content changed
    if (tooltip.innerHTML !== newInnerHtml) {
      tooltip.classList.add("hidden");
    }
  }

  function showTooltip() {
    tooltip.classList.remove("hidden");
    const rect = element.getBoundingClientRect();

    tooltip.style.top = `${rect.bottom + 10}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.right = "auto";

    // If the tooltip is outside the viewport, move it inside with 10px margin
    if (tooltip.offsetLeft < 10) {
      tooltip.style.left = "10px";
      tooltip.style.right = "auto";
    } else if (tooltip.offsetLeft + tooltip.offsetWidth > window.innerWidth - 10) {
      tooltip.style.right = "10px";
      tooltip.style.left = "auto";
    }
  }

  element.onmouseenter = showTooltip;
  element.onmouseover = showTooltip;

  element.onmouseleave = () => {
    tooltip.classList.add("hidden");
  };
}

export const hideAllTooltips = () => {
  const tooltips = document.querySelectorAll(".mt-tooltip");

  tooltips.forEach((tooltip) => {
    tooltip.classList.add("hidden");
  });
};
