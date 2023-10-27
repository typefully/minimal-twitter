const Header = () => (
  <header className="text-center">
    <div className="flex items-center justify-center">
      <a
        href="https://twitter.com/settings/mute_and_block"
        target="_blank"
        rel="noreferrer"
        className="absolute text-sm font-semibold left-4"
        aria-label="Mute and Block Settings"
        title="Mute and Block Settings"
      >
        <svg
          className="fill-twitterBlue"
          viewBox="0 0 24 24"
          width={20}
          height={20}
          aria-hidden="true"
        >
          <path d="M18 6.59V1.2L8.71 7H5.5A2.5 2.5 0 003 9.5v5A2.5 2.5 0 005.5 17h2.09l-2.3 2.29 1.42 1.42 15.5-15.5-1.42-1.42L18 6.59zm-8 8V8.55l6-3.75v3.79l-6 6zM5 9.5c0-.28.22-.5.5-.5H8v6H5.5c-.28 0-.5-.22-.5-.5v-5zm6.5 9.24l1.45-1.45L16 19.2V14l2 .02v8.78l-6.5-4.06z" />
        </svg>
      </a>
      <h1 className="text-xl font-extrabold">
        <span>Minimal Twitter</span>
      </h1>
    </div>
  </header>
)

export default Header
