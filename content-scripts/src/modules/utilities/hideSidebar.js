import selectors from "../../selectors";

export default async function hideSidebar() {
  const sidebar = document.querySelector(selectors.rightSidebar);

  const isSearchPage = window.location.pathname === "/search";

  console.log({ isSearchPage, sidebar });

  if (!sidebar) return;

  if (isSearchPage) {
    console.log("add left margin to sidebar");
    sidebar.style.marginLeft = "12px";
    removeOtherSections();
    setTimeout(() => {
      removeOtherSections();
    }, 500); // Sometimes the trends appear with a delay
  } else {
    console.log("hide sidebar");
    sidebar.style.visibility = "hidden";
    sidebar.style.width = "0";
    sidebar.style.margin = "0";
    sidebar.style.padding = "0";
    sidebar.style.zIndex = "1";
  }
}

function removeOtherSections() {
  const sidebar = document.querySelector(selectors.rightSidebar);
  if (!sidebar) return;
  console.log("removeOtherSections");
  sidebar.querySelector(`aside[role="complementary"]`)?.parentElement?.remove();
  sidebar.querySelector(`section[role="region"]`)?.parentElement?.parentElement?.remove();
}
