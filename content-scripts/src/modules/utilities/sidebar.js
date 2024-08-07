// The html structure of buttons (i.e. if it has a label or not) changes based on viewport size,
// so when adding sidebar buttons on subsequent renders after page load, we used the `forced`
// parameter to re-add the element so that it's displayed correctly.

export const addSidebarButton = ({ name, href, userHref, onClick, svgAsset, forced }) => {
  const existingElement = document.querySelector(`nav[role="navigation"] > [aria-label="${name}"]`);

  if (existingElement && !forced) return;

  const profileNode = document.querySelector('nav[role="navigation"] > a[role="link"][data-testid="AppTabBar_Profile_Link"]');
  if (!profileNode) return;

  const newNode = createNewElement({ name, href, userHref, onClick, svgAsset, profileNode });

  if (existingElement) {
    if (forced) {
      existingElement.replaceWith(newNode);
    } else {
      newNode.remove();
    }
  } else {
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
