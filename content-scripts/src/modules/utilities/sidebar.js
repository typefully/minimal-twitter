import selectors from "../../selectors";

export const addSidebarButton = ({ name, href, userHref, onClick, svgAsset }) => {
  if (document.querySelector(selectors.newApp.nav)) {
    addNewAppSidebarButton({ name, href, userHref, onClick, svgAsset });
    return;
  }

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

// X's rewritten web app sizes navigation items and their labels through CSS variables, so a cloned item
// follows the navigation labels setting without the old app's re-cloning.
const addNewAppSidebarButton = ({ name, href, userHref, onClick, svgAsset }) => {
  const nav = document.querySelector(selectors.newApp.nav);

  if (nav.querySelector(`:scope > .mt-sidebar-button[data-mt-name="${name}"]`)) return;

  // X already links some of these, such as Premium as "Subscription"
  if (nav.querySelector(`:scope > a[href*="${name.toLowerCase()}"]:not(.mt-sidebar-button):not(:has(svg[data-icon="icon-person"]))`)) return;

  const profileLink = nav.querySelector(selectors.newApp.navProfileLink);
  const template = profileLink || nav.querySelector(":scope > a");
  const iconBox = template?.querySelector('span[aria-hidden="true"].relative > span');
  const label = template?.querySelector(".text-headline2");

  if (!template || !iconBox || !label || (userHref && !profileLink)) return;

  const button = template.cloneNode(true);
  button.removeAttribute("id");
  button.removeAttribute("aria-current");
  button.removeAttribute("data-status");
  button.setAttribute("aria-label", name);
  button.dataset.mtName = name;
  button.classList.add("mt-sidebar-button");

  if (href || userHref) {
    button.setAttribute("href", href ?? `${profileLink.getAttribute("href")}${userHref}`);
  } else {
    button.removeAttribute("href");
    button.setAttribute("role", "button");
    button.style.cursor = "pointer";
    button.addEventListener("click", () => onClick(button));
  }

  // The icon box stacks the regular and selected icons, and the label is bold on the current page
  const buttonLabel = button.querySelector(".text-headline2");
  button.querySelector('span[aria-hidden="true"].relative > span').innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${svgAsset}</svg>`;
  buttonLabel.textContent = name;
  buttonLabel.classList.remove("font-bold");

  (profileLink || nav.lastElementChild).insertAdjacentElement("beforebegin", button);
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
