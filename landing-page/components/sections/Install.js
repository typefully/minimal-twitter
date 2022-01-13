const Install = () => (
  <section className="flex flex-col items-center px-4 pt-10 pb-12 space-y-8 bg-twitterBgTwo">
    <h3 className="text-2xl font-bold md:text-3xl font-display">
      Add the Extension.
    </h3>
    <div className="flex items-center space-x-6 md:space-x-8">
      <a
        title="Available in the Chrome Web Store"
        aria-label="Available in the Chrome Web Store"
        href="https://chrome.google.com/webstore/detail/pobhoodpcipjmedfenaigbeloiidbflp"
        className="grid w-16 h-16 p-2 border-2 border-transparent rounded-full md:w-20 md:h-20 bg-twitterAccentTwo hover:border-twitterBlue place-items-center"
      >
        <img src="/chrome.svg" width="95%" alt="Chrome" />
      </a>
      <a
        title="Available in Firefox Browser Addons"
        aria-label="Available in Firefox Browser Addons"
        href="https://addons.mozilla.org/en-US/firefox/addon/minimaltwitter/"
        className="grid w-16 h-16 p-2 border-2 border-transparent rounded-full md:w-20 md:h-20 bg-twitterAccentTwo hover:border-twitterBlue place-items-center"
      >
        <img
          src="/firefox.svg"
          width="98%"
          className="-translate-y-0.5"
          alt="Firefox"
        />
      </a>
      <a
        title="Safari Not Available Yet"
        aria-label="Safari Not Available Yet"
        className="grid w-16 h-16 p-2 rounded-full cursor-not-allowed md:w-20 md:h-20 place-items-center blur-sm"
      >
        <img src="/safari.svg" width="100%" alt="Safari" />
      </a>
      <a
        title="Edge Not Available Yet"
        aria-label="Edge Not Available Yet"
        className="grid w-16 h-16 p-2 rounded-full cursor-not-allowed md:w-20 md:h-20 place-items-center blur-sm"
      >
        <img src="/edge.svg" width="95%" alt="Microsoft Edge" />
      </a>
    </div>
  </section>
)

export default Install
