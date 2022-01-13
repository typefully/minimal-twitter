const Header = () => (
  <header className="text-center">
    <div className="flex items-center justify-center">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noreferrer"
        className="absolute right-4 text-twitterBlue"
        aria-label="Go to Twitter"
        title="Go to Twitter"
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M98.7377 40.737C107.839 29.3678 116.427 17.4444 114.746 14.8104C112.711 11.622 93.7602 18.4671 78.9 24.4645C72.423 21.3246 65.1232 19.5592 57.401 19.5592C30.6699 19.5592 9 40.7132 9 66.8078C9 92.9025 30.6699 114.056 57.401 114.056C84.1321 114.056 105.802 92.9025 105.802 66.8078C105.802 63.1851 105.384 59.6576 104.593 56.2688C113.072 50.1034 120.243 43.9562 118.819 41.6609C117.501 39.5377 108.706 39.7447 98.7377 40.737Z"
            fill="#1DA1F2"
          />
        </svg>
      </a>
      <h1 className="text-xl font-extrabold">
        <span>Customize more</span>
      </h1>
    </div>
    <p className="pt-3 pb-5 text-sm font-medium leading-5 dark:text-twitterAccentOneDark text-twitterAccentOne">
      Manage feed width, navigation, and extras. <br />
      Or go to display settings at{" "}
      <a
        href="https://twitter.com/i/display"
        target="_blank"
        rel="noreferrer"
        className="text-twitterBlue hover:underline"
      >
        twitter.com/i/display
      </a>
    </p>
  </header>
)

export default Header
