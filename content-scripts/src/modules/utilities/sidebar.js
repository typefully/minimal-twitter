import selectors from "../../selectors";

export const addSidebarButton = ({ name, href, userHref, onClick, svgAsset }) => {
  // Let's find all sidebar buttons with the same name
  const existingElements = [
    ...document.querySelectorAll(`${selectors.leftSidebarLinks} > [aria-label="${name}"]`),
    ...document.querySelectorAll(`${selectors.leftSidebarLinks} > [aria-label="${name.toLowerCase()}"]`),
  ];

  // We base new sidebar buttons on the existing "Profile" one, so let's get it:
  const profileNode = document.querySelector(selectors.sidebarLinks.profile);
  if (!profileNode) {
    return;
  }

  // It might happen when resizing the page that a sidebar button is added by X
  // again dynamically while we also added it — so when we find more than one,
  // we remove all but the first one to fix this:
  if (existingElements.length > 1) {
    existingElements.slice(1).forEach((element) => element.remove());
  }

  if (existingElements.length) return;

  const newNode = createNewElement({ name, href, userHref, onClick, svgAsset, profileNode });
  if (newNode) profileNode.insertAdjacentElement("beforebegin", newNode);
};

const createNewElement = ({ profileNode, name, href, userHref, onClick, svgAsset }) => {
  const newNode = profileNode.cloneNode(true);

  try {
    if (href) {
      newNode.setAttribute("href", href);
    } else if (userHref) {
      newNode.setAttribute("href", profileNode.getAttribute("href") + userHref);
    } else if (onClick) {
      newNode.removeAttribute("href");
      newNode.setAttribute("role", "button");
      newNode.style.cursor = "pointer";
      newNode.onclick = () => onClick(newNode);
    }

    newNode.setAttribute("aria-label", name);
    newNode.removeAttribute("id");
    newNode.removeAttribute("data-status");
    newNode.classList.remove("active");
    newNode.classList.add("mt-sidebar-button");

    const [icon, selectedIcon] = newNode.querySelectorAll("svg");
    icon.removeAttribute("data-icon");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.innerHTML = svgAsset;
    icon.closest("span")?.classList.remove("opacity-0");
    selectedIcon?.closest("span")?.remove();

    newNode.firstElementChild.lastElementChild.firstElementChild.innerText = name;
  } catch (error) {
    console.log(`❌ Error creating ${name} sidebar button`);
    console.warn(error);
    return null;
  }

  return newNode;
};
