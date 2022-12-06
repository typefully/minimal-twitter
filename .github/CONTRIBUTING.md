# Contributing

If you have a good idea, [start a discussion](https://github.com/typefully/minimal-twitter/discussions/new?category=ideas). For bug reports and usability issues, [submit an issue](https://github.com/typefully/minimal-twitter/issues/new). I do accept PRs but note that it is more likely to be accepted with an associated discussion or issue.

## Development / Building the Extension

First, you must have [classic yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed. Then, go to [customize-app](./customize-app) and run the build command to build the static [Next.js](https://nextjs.org/) app, which is used for the extension's customization popup and options.

```sh
cd customize-app
```

```sh
yarn # must run yarn once first before you can build
yarn build
```

We also use [parcel](https://parceljs.org) to build the `content_scripts` for the extension.

```sh
cd extension/content/scripts
```

```sh
yarn # must run yarn once first before you can build
yarn build # to build the content_scripts
yarn watch # watch for changes and build automatically
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
