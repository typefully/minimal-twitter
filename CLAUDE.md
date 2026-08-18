# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Open-source browser extension for Chrome, Firefox, and Safari that customizes the Twitter/X.com interface. Built by Typefully to provide a minimal, focused Twitter experience with customizable UI elements.

Repository: https://github.com/typefully/minimal-twitter

## Build and Development Commands

### Building the Extension

Requires Node.js 20 or newer and [pnpm](https://pnpm.io/installation). The repository declares the supported versions in `package.json`.

- `pnpm build` or `pnpm bundle` - Interactively builds the popup and content scripts, then creates the selected release bundle under `/bundle/`
- Run the release bundler in a PTY and enter the exact choice `Chrome`, `Firefox`, `Safari`, or `All`. Do not pipe the answer: closing stdin can terminate the async build early with a false successful exit.
- `All` builds Chrome and Firefox. For an existing Safari release, do not choose `Safari`: the converter regenerates the tracked Xcode project and resets its release version/build. The existing project reads `bundle/firefox` directly, so build `All`, then archive `bundle/safari/Minimal Twitter/Minimal Twitter.xcodeproj` in Xcode. Use the `Safari` choice only to create a project from scratch, before restoring its metadata and running `pnpm bump-version`.
- Wait for the final `Bundled` and `Zipped` messages for both Chrome and Firefox, then verify the ZIPs explicitly because the bundler currently catches build errors instead of returning a failing exit code.

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

Use `pnpm dev:fresh` for a self-contained run: it builds and automatically loads `bundle/chrome-dev`, opens the welcome page and `x.com`, and keeps cookies and extension storage in `.chrome-dev-profile`. If needed, the user signs into X once in that profile and chooses **Keep** if Chrome asks to review the unpacked extension. Closing that Chrome instance stops the watcher.

Authentication handoff: if the development browser reaches X's login flow, stop browser automation and ask the user to sign in. Never enter, request, copy, or store their credentials. Resume testing after the user confirms login is complete. `.chrome-dev-profile` persists across runs in the same checkout or worktree, but a fresh worktree gets a separate profile and may require another sign-in.

### Validation and Browser Testing

- Prefer the root `pnpm dev` workflow for iteration. It stages the complete development extension; standalone popup or content-script watchers do not provide the same reload behavior.
- Wait for `[dev] Changes ready (...)` and the X tab refresh to complete before judging a browser change. Manual rebuilding is normally unnecessary; reload manually if the browser remains stale or the watcher reports a failure.
- Run the checks that match the changed area: `pnpm test` for the Node test suite; `pnpm --dir content-scripts build` for content scripts; and `pnpm --dir popup lint`, `pnpm --dir popup check:prettier`, plus `pnpm --dir popup build` for popup changes.
- There is no automated browser suite. Test affected settings in the unpacked development extension on `x.com`; inspect the page console for content-script errors and `chrome://extensions` for manifest or service-worker errors.
- Test the popup from the installed extension action. `pnpm --dir popup dev` is not representative because the popup depends on extension-only APIs such as `chrome.storage`.
- When extension-aware Chrome DevTools tools are available, use them to install or reload `bundle/chrome-dev`, trigger the extension action, and inspect the popup, service worker, and affected X page. Otherwise use the manual loading workflow below.
- For Chrome API or manifest changes, use the Chrome team's `chrome-extensions` and `modern-web-guidance` skills when available; otherwise consult the current official Chrome extension documentation.
- When permissions, host permissions, data handling, or store-submission metadata changes, create or update `CHROMEWEBSTORE.md` with the matching Chrome Web Store justification.

For agent-driven browser inspection without extension-aware Chrome DevTools tools, run `pnpm dev`, then launch the browser separately from a second PTY using a free debugging port (replace `9224` if occupied):

```sh
pnpm exec web-ext run --target chromium --source-dir bundle/chrome-dev --start-url https://x.com --chromium-profile .chrome-dev-profile --profile-create-if-missing --keep-profile-changes --no-reload --args=--remote-debugging-port=9224
```

Attach browser automation to `http://127.0.0.1:9224`. This command replaces the browser-launching part of `pnpm dev:fresh`; do not run both at once.

### Loading Extension for Testing

- Chrome/Edge development: Load `bundle/chrome-dev` at `chrome://extensions` (enable Developer mode)
- Chrome/Edge release bundle: Load `bundle/chrome`
- Firefox: Load `bundle/firefox/manifest.json` at `about:debugging#/runtime/this-firefox`

When the user explicitly prefers testing in their existing signed-in Chrome instead of signing into a per-worktree profile, use Chrome DevTools MCP with `--autoConnect`. The user must enable **Allow remote debugging for this browser instance** at `chrome://inspect/#remote-debugging` for that browser session. This is not required for the explicit debugging-port workflow above.

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
- Safari: The tracked Xcode project packages the generated Firefox bundle; `xcrun safari-web-extension-converter` is only needed to create that project from scratch
- Manifests defined in `extension-manifests.js`

## Releasing Updates

### Version Bump

1. Run `pnpm bump-version` (prompts for patch/minor/major). This automatically updates:
   - `extension-manifests.js` - main version number
   - Xcode project (`project.pbxproj`) - MARKETING_VERSION and CURRENT_PROJECT_VERSION (build number incremented by 1)

2. Run `pnpm build` in a PTY and enter `All`. Wait for both ZIPs, run `unzip -t` on them, and confirm both embedded manifests contain the new version.

3. Open the existing `bundle/safari/Minimal Twitter/Minimal Twitter.xcodeproj` in Xcode. Test and archive the macOS scheme without regenerating the project.

4. Stage only the intended release files, then commit and tag:
   ```bash
   git add extension-manifests.js bundle/chrome.zip bundle/firefox.zip "bundle/safari/Minimal Twitter/Minimal Twitter.xcodeproj/project.pbxproj"
   git commit -m "chore: bump version to X.Y.Z"
   git tag vX.Y.Z
   git push && git push --tags
   ```

5. Submit `bundle/chrome.zip`, `bundle/firefox.zip`, and the Xcode archive to their respective stores.

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
