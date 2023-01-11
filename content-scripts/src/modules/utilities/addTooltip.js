export default function addTooltip(element, options) {
  const { id, title, description } = options ?? {};

  if (!element) return;
  let tooltip = document.getElementById(id);

  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = id;
    tooltip.classList.add("mt-tooltip", "hidden");
    tooltip.innerHTML = `
      ${title ? `<span class="title">${title}</span>` : ""}
      ${description ? `<span class="description">${description}</span>` : ""}
    `;
    document.body.appendChild(tooltip);
  } else {
    tooltip.classList.add("hidden");
    tooltip.innerHTML = `
      ${title ? `<span class="title">${title}</span>` : ""}
      ${description ? `<span class="description">${description}</span>` : ""}
    `;
  }

  function showTooltip() {
    tooltip.classList.remove("hidden");
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + 10}px`;
    tooltip.style.left = `${
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2
    }px`;
  }

  element.onmouseenter = showTooltip;
  element.onmouseover = showTooltip;

  element.onmouseleave = () => {
    tooltip.classList.add("hidden");
  };
}
