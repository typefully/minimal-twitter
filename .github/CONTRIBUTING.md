# Contributing

If you have a good idea, [start a discussion](https://github.com/typefully/minimal-twitter/discussions/new?category=ideas). For bug reports and usability issues, [submit an issue](https://github.com/typefully/minimal-twitter/issues/new). We do accept PRs but note that it is more likely to be accepted with an associated discussion or issue.

## Development / Building / Bundling the Extension

First, you must have [classic yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed. Then, go to [popup](./popup) and run the build command to build the static [Next.js](https://nextjs.org/) app, which is used for the extension's customization popup and options.

```sh
cd popup
```

```sh
yarn # must run yarn once first before you can build
yarn build
```

We also use [parcel](https://parceljs.org) to build the `content_scripts` for the extension.

```sh
cd content-scripts
```

```sh
yarn # must run yarn once first before you can build
yarn build # to build the content_scripts
yarn watch # watch for changes and build automatically
```

After you have built both `popup` and `content-scripts` you can bundle the extension for `Chrome` and `Firefox`:

```sh
cd .. # go back to the root directory
```

```sh
yarn # must run yarn once first before you can bundle
yarn bundle # Runs the `bundle-extension.js` script
```

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
