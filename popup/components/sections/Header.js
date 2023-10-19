import createTweetLink from "../../utilities/createTweetLink";

const tweet = {
  text: "Love this Minimal Theme for Twitter by @typefully.",
  url: "https://typefully.com/minimal-twitter",
};

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
        <svg className="fill-twitterBlue" viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
          <path d="M18 6.59V1.2L8.71 7H5.5A2.5 2.5 0 003 9.5v5A2.5 2.5 0 005.5 17h2.09l-2.3 2.29 1.42 1.42 15.5-15.5-1.42-1.42L18 6.59zm-8 8V8.55l6-3.75v3.79l-6 6zM5 9.5c0-.28.22-.5.5-.5H8v6H5.5c-.28 0-.5-.22-.5-.5v-5zm6.5 9.24l1.45-1.45L16 19.2V14l2 .02v8.78l-6.5-4.06z" />
        </svg>
      </a>
      <a
        href={createTweetLink(tweet)}
        target="_blank"
        rel="noreferrer"
        className="absolute text-sm font-semibold text-twitterBlue right-4"
        aria-label="Share Tweet"
        title="Share Tweet"
      >
        Share
      </a>
      <h1 className="text-xl font-extrabold">
        <span>Minimal Twitter</span>
      </h1>
    </div>
    <p className="pt-3 pb-3 text-sm font-medium leading-5 dark:text-twitterAccentOneDark text-twitterAccentOne">
      Grow on Twitter with{" "}
      <a href="https://typefully.com/?ref=minimal-twitter" target="_blank" rel="noreferrer" className="text-twitterBlue hover:underline font-bold cursor-pointer ml-1">
        <TypefullyGlyph />
        Typefully
      </a>
    </p>
  </header>
);

const TypefullyGlyph = () => (
  <svg
    width="12"
    height="15"
    viewBox="0 0 60 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: "inline-block",
      position: "relative",
      bottom: 1,
      marginRight: 2,
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M40.9144 42.5043C41.2343 41.6144 40.9743 41.3345 40.0645 41.6244V41.6144C36.8749 42.6343 31.3456 44.0341 24.9865 42.7843C23.6567 42.5143 23.7367 41.4945 25.0865 41.4245C30.1258 41.1745 38.0047 40.0347 42.2542 35.6652C45.3503 32.4812 47.0048 27.6113 48.8466 22.1899C50.9841 15.8984 53.3739 8.86405 58.562 2.85962C58.6862 2.71513 58.8336 2.56132 58.9853 2.40288C60.031 1.3114 61.2873 0 56.6423 0C33.1845 0 24.678 18.9364 10.3822 50.7606C7.85393 56.3887 5.14463 62.42 2.13953 68.8208C1.88318 69.3646 1.62616 69.8836 1.38357 70.3734C0.689452 71.7749 0.113548 72.9377 0.00981892 73.7602C-0.0701704 74.4401 0.339775 75 1.14967 75C3.95021 74.9725 6.77916 70.0202 9.40189 65.4289C10.5902 63.3486 11.7363 61.3424 12.8181 59.902C14.2079 58.0522 15.5677 57.1924 17.2875 56.7424C18.6405 56.3819 20.1448 56.2122 21.7419 56.0319C23.5556 55.8272 25.4889 55.609 27.4562 55.0826C35.2251 53.0029 39.2446 47.2237 40.9144 42.5043ZM55.7925 67.9509C55.7925 71.8304 52.6429 74.98 48.7635 74.98C44.884 74.98 41.7344 71.8304 41.7344 67.9509C41.7344 64.0714 44.884 60.9219 48.7635 60.9219C52.6429 60.9219 55.7925 64.0714 55.7925 67.9509Z"
      fill="#189AF5"
    />
  </svg>
);

export default Header;
