# Install Manually

Open the `zip` folder. Here you'll find all the packages zipped up:

```
📂 zip
└ 📄 chrome.zip
└ 📄 firefox.zip
└ 📄 safari.zip
```

Open them and follow the instructions below based on which browser you'd like to install the extension on:

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
				<li><a href="https://developer.apple.com/documentation/safariservices/safari_web_extensions/running_your_safari_web_extension">Configure Safari in macOS to run unsigned extensions</a></li>
			</ol>
		</td>
	</tr>
</table>
