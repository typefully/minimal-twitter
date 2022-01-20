<img width="80px" alt="Minimal Theme for Twitter App Icon" src="./assets/MinimalTwitterIcon.png" />

## Install Extension

- **Add to Chrome**: **[Available in the Chrome Web Store](https://chrome.google.com/webstore/detail/pobhoodpcipjmedfenaigbeloiidbflp)**
- **Add to Firefox**: **[Available as a Firefox Browser Add-on](https://addons.mozilla.org/en-US/firefox/addon/minimaltwitter/)**
- **Add to Microsoft Edge**: **[Available as a Microsoft Edge Add-on](https://microsoftedge.microsoft.com/addons/detail/mghjldihobnccoppgcgfelpdpffmebjn)**

![Screenshots](./assets/screenshots.png)

Alternatively, you can use the [base styles](extension/content/main.css) as userstyles (e.g. with [Firefox's built-in Style Editor](https://developer.mozilla.org/en-US/docs/Tools/Style_Editor) or using extensions like [Stylish for Chrome](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe) and [Cascadea for Safari](https://apps.apple.com/app/cascadea/id1432182561)).

## Customize

Customizations, preferences, options! Access them by clicking the extension's icon as a popup or in full screen in Options (Chrome & Edge) or Preferences (Firefox).

— _You can_ —

- Control Feed / Timeline Width
- Control Navigation UI: Buttons, Centering, Labels
- Activate **Zen Mode**
- ...and more!

## Development

### Building the Extension

First, you must have [classic yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed. Then, go to [customize-app](./customize-app) and run the build command to build the static [Next.js](https://nextjs.org/) app, which is used for the extension's customization popup and options.

```sh
cd customize-app
```

```sh
yarn # must run yarn once first before you can build
yarn run build
```

You can then go to [extension](./extension) and begin testing.

Make sure to rename either `manifest.v3.json`, `manifest.v2.json`, or `manifest.firefox.json` to `manifest.json`. Firefox currently does not support [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/).

<table>
	<tr>
		<th>Chrome or Edge</th>
		<th>Firefox</th>
	</tr>
	<tr>
		<td width="50%">
			<ol>
				<li>Open <code>chrome://extensions</code> or <code>edge://extensions</code>
        <li>Turn on the <strong>Developer mode</strong> toggle
				<li>Click on the <strong>Load unpacked</strong> button
				<li>Select the folder <code>minimal-twitter/extension</code>
			</ol>
		</td>
		<td width="50%">
			<ol>
				<li>Open <code>about:debugging#/runtime/this-firefox</code>
				<li>Click on the <strong>Load Temporary Add-on...</strong> button
				<li>Select the file <code>minimal-twitter/extension/manifest.json</code>
			</ol>
		</td>
	</tr>
</table>
