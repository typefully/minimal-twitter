export const addSidebarButton = ({ name, href, userHref, onClick, svgAsset }) => {
  // Let's find all sidebar buttons with the same name
  const existingElements = [
    ...document.querySelectorAll(`nav[role="navigation"] > [aria-label="${name}"]`),
    ...document.querySelectorAll(`nav[role="navigation"] > [aria-label="${name.toLowerCase()}"]`),
  ];

  // We base new sidebar buttons on the existing "Profile" one, so let's get it:
  const profileNode = document.querySelector('nav[role="navigation"] > a[role="link"][data-testid="AppTabBar_Profile_Link"]');
  if (!profileNode) {
    return;
  }

  // It might happen when resizing the page that a sidebar button is added by X
  // again dynamically while we also added it — so when we find more than one,
  // we remove all but the first one to fix this:
  if (existingElements.length > 1) {
    existingElements.slice(1).forEach((element) => element.remove());
  }

  // We're left with a single existing element:
  const existingElement = existingElements[0];

  if (existingElement) {
    const hasChanged =
      (profileNode.querySelector("span") && !existingElement.querySelector("span")) || (!profileNode.querySelector("span") && existingElement.querySelector("span"));

    if (!hasChanged) {
      return;
    }

    const newNode = createNewElement({ name, href, userHref, onClick, svgAsset, profileNode });
    existingElement.replaceWith(newNode);
  } else {
    const newNode = createNewElement({ name, href, userHref, onClick, svgAsset, profileNode });
    profileNode.insertAdjacentElement("beforebegin", newNode);
  }
};

const createNewElement = ({ profileNode, name, href, userHref, onClick, svgAsset }) => {
  let newNode;

  try {
    if (href || userHref) {
      newNode = profileNode.cloneNode(true);
      if (href) newNode.href = href;
      if (userHref) newNode.href += userHref;
    } else if (onClick) {
      newNode = document.createElement("div");
      newNode.innerHTML = profileNode.innerHTML;
      newNode.style.cursor = "pointer";
      newNode.onclick = () => onClick(newNode);
    }

    newNode.setAttribute("aria-label", name);
    newNode.removeAttribute("data-testid");
    newNode.classList.add("mt-sidebar-button"); // To style it in main.css
    newNode.firstChild.firstChild.firstChild.innerHTML = svgAsset;
    newNode.firstChild.lastChild.firstChild.innerText = name;
  } catch (error) {
    console.log(`❌ Error creating ${name} sidebar button`);
    console.warn(error);
  }

  return newNode;
};
