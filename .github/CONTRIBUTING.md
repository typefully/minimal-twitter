# Contributing

If you have a good idea, [start a discussion](https://github.com/typefully/minimal-twitter/discussions/new?category=ideas). For bug reports and usability issues, [submit an issue](https://github.com/typefully/minimal-twitter/issues/new). We do accept PRs but note that it is more likely to be accepted with an associated discussion or issue.

## Development / Building / Bundling the Extension

First, you must have [classic yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed.

✨ **New**: `bundle-extension.js` now bundles and zips everything. `Run yarn && yarn bundle` at the root directory and you'll get a `bundle` directory that looks like this:

```
📂 bundle
└ 📁 chrome
└ 📁 firefox
└ 📁 safari
└ 📄 chrome.zip
└ 📄 firefox.zip
└ 📄 safari.zip
```

### Popup

```sh
cd popup
```

```sh
yarn # must run yarn once first before you can build
yarn build # to build and export Next.js app
```

### Content Scripts

We also use [parcel](https://parceljs.org) to build the `content_scripts` for the extension.

```sh
cd content-scripts
```

```sh
yarn # must run yarn once first before you can build
yarn build # to build the content_scripts
yarn watch # watch for changes and build automatically
```

After you have built both `popup` and `content-scripts` you can bundle the extension for `Chrome`, `Firefox`, and `Safari`:

### Bundle Script

```sh
cd .. # go back to the root directory
```

```sh
yarn # must run yarn once first before you can bundle
yarn bundle # Runs the `bundle-extension.js` script
```

## Load Extension

<table>
	<tr>
		<th>Chrome or Edge</th>
		<th>Firefox</th>
		<th>Safari</th>
	</tr>
	<tr>
		<td width="33.33%">
			<ol>
				<li>Open <code>chrome://extensions</code> or <code>edge://extensions</code></li>
        <li>Turn on the <strong>Developer mode</strong> toggle</li>
				<li>Click on the <strong>Load unpacked</strong> button</li>
				<li>Select the folder <code>minimal-twitter/extension</code></li>
			</ol>
		</td>
		<td width="33.33%">
			<ol>
				<li>Open <code>about:debugging#/runtime/this-firefox</code></li>
				<li>Click on the <strong>Load Temporary Add-on...</strong> button</li>
				<li>Select the file <code>minimal-twitter/extension/manifest.json</code></li>
			</ol>
		</td>
      <td width="33.33%">
			<ol>
				<li>Open <code>bundle/safari/Minimal Theme for Twitter/Minimal Theme for Twitter.xcodeproj</code>
        </li>
				<li>Click the Play button in Xcode ("start the active scheme")</li>
				<li><a href="https://developer.apple.com/documentation/safariservices/safari_web_extensions/running_your_safari_web_extension#3744467">Configure Safari in macOS to run unsigned extensions</a></li>
			</ol>
		</td>
	</tr>
</table>
