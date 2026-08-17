import assert from "node:assert/strict";
import test from "node:test";

import {
  createDevelopmentManifest,
  MANIFEST_CHROME,
} from "../extension-manifests.js";

test("createDevelopmentManifest adds development-only behavior", () => {
  const productionManifest = structuredClone(MANIFEST_CHROME);

  const developmentManifest = createDevelopmentManifest(MANIFEST_CHROME);

  assert.equal(
    developmentManifest.name,
    `${MANIFEST_CHROME.name} (Development)`,
  );
  assert.deepEqual(developmentManifest.content_scripts[0].js, [
    "dist/main.js",
    "dev-reload.js",
  ]);
  assert.deepEqual(developmentManifest.permissions, ["storage", "tabs"]);
  assert.deepEqual(developmentManifest.host_permissions, [
    "http://127.0.0.1/*",
  ]);
  assert.equal(
    developmentManifest.background.service_worker,
    "dev-background.js",
  );
  assert.deepEqual(MANIFEST_CHROME, productionManifest);
});
