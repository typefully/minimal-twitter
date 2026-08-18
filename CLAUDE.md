# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Open-source browser extension for Chrome, Firefox, and Safari that customizes the Twitter/X.com interface. Built by Typefully to provide a minimal, focused Twitter experience with customizable UI elements.

Repository: https://github.com/typefully/minimal-twitter

## Build and Development Commands

### Building the Extension

Requires Node.js 20 or newer and [pnpm](https://pnpm.io/installation). The repository declares the supported versions in `package.json`.

- `pnpm build` or `pnpm bundle` - Builds and bundles the extension for all browsers (prompts for browser choice)
- Builds both popup (Next.js) and content-scripts (Rollup) automatically
- Creates bundled packages in `/bundle/` directory for Chrome, Firefox, and Safari

### Content Scripts (content-scripts/)

- `cd content-scripts && pnpm watch` - Watch mode for content script development
- `cd content-scripts && pnpm build` - Build content scripts only

### Popup UI (popup/)

- `cd popup && pnpm dev` - Development server for popup UI (Next.js)
- `cd popup && pnpm build` - Build popup for production
- `cd popup && pnpm lint` - Run ESLint
- `cd popup && pnpm check:prettier` - Check code formatting
- `cd popup && pnpm write:prettier` - Format code with Prettier

### Development Workflow

1. Run `./workspace-setup.sh init`, then `pnpm dev` at the repository root. Codex-managed worktrees run the setup step automatically.
2. Load `bundle/chrome-dev` once from `chrome://extensions` using **Load unpacked**.
3. Keep the command running. Content-script, CSS, asset, and popup changes rebuild automatically; the development extension reloads itself and refreshes open X/Twitter tabs.

Use `pnpm dev:fresh` to launch Chrome automatically with the dedicated
`.chrome-dev-profile` instead.

### Loading Extension for Testing

- Chrome/Edge development: Load `bundle/chrome-dev` at `chrome://extensions` (enable Developer mode)
- Chrome/Edge release bundle: Load `bundle/chrome`
- Firefox: Load `bundle/firefox/manifest.json` at `about:debugging#/runtime/this-firefox`

## Architecture

### Core Structure

**Three main parts:**

1. **content-scripts/**: Content scripts that run on x.com and apply customizations
2. **popup/**: Next.js app for the extension settings popup UI
3. **Root files**: Build scripts, manifests, shared utilities

### Settings and Storage

- **storage-keys.js** (root): Central registry of all feature keys and default preferences
  - All settings keys must be added to both `allSettingsKeys` array and `defaultPreferences` object
  - Keys use format `Key[FeatureName]` (e.g., `KeySidebarLogo`)

### Content Script Flow

**Initialization** (content-scripts/src/modules/initialize.js):

1. Loads stylesheets (local + CDN in production)
2. Applies static features once
3. Runs dynamic features
4. Sets up MutationObserver for DOM changes
5. Extracts Twitter theme colors

**Features are categorized as static or dynamic:**

- **Static features** (content-scripts/src/modules/features/static.js):

  - Applied once on load or when settings change
  - Examples: timeline width, font changes, hide navigation buttons
  - Organized by category: timeline, navigation, interface, sidebar, advanced

- **Dynamic features** (content-scripts/src/modules/features/dynamic.js):
  - Reapplied on DOM mutations via MutationObserver
  - Examples: writer mode, view counts, Typefully integration buttons
  - Throttled to run max every 50ms

**Feature implementation files** (content-scripts/src/modules/options/):

- Each category has its own file (timeline.js, navigation.js, interface.js, etc.)
- Functions typically add/remove CSS classes or inject styles to enable/disable features

**Selectors** (content-scripts/src/selectors.js): **Critical file** containing all CSS selectors for Twitter UI elements. When Twitter changes their DOM structure, selectors break and need updating here. Selectors primarily use `data-testid` attributes (most stable), ARIA attributes, and structural CSS selectors. When fixing broken features, check this file first.

### Popup UI Structure

**Next.js app** (popup/):

- `components/sections/`: Settings sections (TimelineSection, NavigationSection, etc.)
- `components/ui/`: Reusable UI components (switches, checkboxes, sliders)
- Uses Radix UI primitives and Stitches for styling
- Settings are saved to chrome.storage and synced to content scripts

## Adding a New Feature

To add a new feature toggle:

1. **Define the key** in `storage-keys.js`:

   - Add `export const KeyFeatureName = "featureName"`
   - Add to `allSettingsKeys` array
   - Add default value to `defaultPreferences` object

2. **Implement the feature logic** in appropriate file in `content-scripts/src/modules/options/`:

   - Create a function that applies the feature (usually adds/removes CSS classes)
   - Import and use utilities from `content-scripts/src/modules/utilities/`

3. **Register the feature**:

   - If static: Add to `staticFeatures` in `content-scripts/src/modules/features/static.js`
   - If dynamic: Add to `dynamicFeatures` in `content-scripts/src/modules/features/dynamic.js`
   - Import the key from storage-keys.js

4. **Add UI control** in appropriate section in `popup/components/sections/`:

   - Import the key from storage-keys.js
   - Add a toggle/switch/checkbox component that reads/writes to storage

5. **SVG assets**: If new icons are needed, add to `content-scripts/src/modules/svgAssets.js`

## CSS and Styling

- Main styles: `/css/main.css` and `/css/typefully.css`
- In production, extension loads cached versions from GitHub CDN
- In development mode, only loads local CSS files
- Content scripts inject styles dynamically via `addStyleSheet()` and `addStyles()` utilities

## Browser Compatibility

- Chrome: Manifest V3 with service worker background
- Firefox: Manifest V2 with background scripts
- Safari: Converted from Firefox build using xcrun safari-web-extension-converter
- Manifests defined in `extension-manifests.js`

## Releasing Updates

### Version Bump

1. Run `pnpm bump-version` (prompts for patch/minor/major). This automatically updates:
   - `extension-manifests.js` - main version number
   - Xcode project (`project.pbxproj`) - MARKETING_VERSION and CURRENT_PROJECT_VERSION (build number incremented by 1)

2. Run `pnpm build` to create bundles for all browsers

3. Commit and tag:
   ```bash
   git add . && git commit -m "Bump version to X.Y.Z"
   git tag vX.Y.Z
   git push && git push --tags
   ```

4. Submit bundles to browser stores (Chrome Web Store, Firefox Add-ons, App Store via Xcode)

### Update Screen Behavior

Controlled in `background.js`. By default, the welcome page only opens on fresh installs.

To show an update screen for major releases, modify `background.js`:

```js
// Show welcome page on both install AND update
if (object.reason !== "install" && object.reason !== "update") {
  return;
}

const targetUrl = `https://typefully.com/minimal-twitter/welcome${
  object.reason === "update" ? "?updated=true" : ""
}`;
```

To disable update screen (default):

```js
// Only show welcome page on fresh install
if (object.reason !== "install") {
  return;
}

const targetUrl = `https://typefully.com/minimal-twitter/welcome`;
```
