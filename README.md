<p align="center">
  <img width="64px" alt="Minimal Twitter Icon" src="./assets/MinimalTwitterAppIcon.png"/>
</p>

<h1 align="center">
  Minimal Theme for Twitter
</h1>

## Install Extension

- **Chrome**: [Download in the Chrome Web Store](https://chrome.google.com/webstore/detail/pobhoodpcipjmedfenaigbeloiidbflp)
- **Firefox**: [Download in Firefox Browser Add-ons](https://addons.mozilla.org/en-US/firefox/addon/min-twitter/)

## Development

### Building the Extension

First, you must have [classic yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed. Then, go to [customize-app](./customize-app) and run the build command to build the static [Next.js](https://nextjs.org/) app which is used for the extension's customizaiton popup and options.

```sh
cd customize-app
```

```sh
yarn run build
```

You can then go to [extension](./extension) and begin testing in `chrome://extensions/` on Chrome and `about:debugging#/runtime/this-firefox` on Firefox.
