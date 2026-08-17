const sharedManifest = {
  name: "Minimal Theme for Twitter / X",
  short_name: "Minimal Twitter",
  description: "Refine and declutter the 𝕏/Twitter web experience.",
  version: "6.4.1",
  icons: {
    16: "images/MinimalTwitterIcon16.png",
    32: "images/MinimalTwitterIcon32.png",
    48: "images/MinimalTwitterIcon48.png",
    128: "images/MinimalTwitterIcon128.png",
  },
  permissions: ["storage"],
  options_ui: {
    page: "index.html",
    open_in_tab: true,
  },
};

const contentScriptMatches = [
  "https://twitter.com/*",
  "https://mobile.twitter.com/*",
  "https://x.com/*",
];

export const MANIFEST_CHROME = {
  ...sharedManifest,
  manifest_version: 3,
  background: {
    service_worker: "background.js",
    type: "module",
  },
  content_scripts: [
    {
      run_at: "document_end",
      matches: contentScriptMatches,
      js: ["dist/main.js"],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "css/main.css",
        "css/typefully.css",
        "fonts/inter-subset.woff2",
        "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5.1/css/main.css",
        "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5.1/css/typefully.css",
      ],
      matches: contentScriptMatches,
    },
  ],
  action: {
    default_icon: {
      16: "images/MinimalTwitterIcon16.png",
      32: "images/MinimalTwitterIcon32.png",
      48: "images/MinimalTwitterIcon48.png",
    },
    default_title: "Minimal Twitter",
    default_popup: "index.html",
  },
};

export const MANIFEST_FIREFOX = {
  ...sharedManifest,
  manifest_version: 2,
  browser_specific_settings: {
    gecko: {
      id: "{e7476172-097c-4b77-b56e-f56a894adca9}",
    },
  },
  background: {
    scripts: ["background.js"],
    persistent: false,
  },
  content_scripts: [
    {
      run_at: "document_idle",
      matches: contentScriptMatches,
      js: ["dist/main.js"],
    },
  ],
  web_accessible_resources: [
    "css/main.css",
    "css/typefully.css",
    "fonts/inter-subset.woff2",
    "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5.1/css/main.css",
    "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5.1/css/typefully.css",
  ],
  browser_action: {
    default_icon: {
      16: "images/MinimalTwitterIcon16.png",
      32: "images/MinimalTwitterIcon32.png",
      48: "images/MinimalTwitterIcon48.png",
    },
    default_title: "Minimal Twitter",
    default_popup: "index.html",
  },
};

export const createDevelopmentManifest = (productionManifest) => {
  const manifest = structuredClone(productionManifest);

  manifest.name = `${manifest.name} (Development)`;
  manifest.permissions.push("tabs");
  manifest.host_permissions = ["http://127.0.0.1/*"];
  manifest.background.service_worker = "dev-background.js";
  manifest.content_scripts[0].js.push("dev-reload.js");

  return manifest;
};
