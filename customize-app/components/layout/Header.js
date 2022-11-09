import createTweetLink from "../../utilities/createTweetLink"

const tweet = {
  text: "Love this Minimal Theme for Twitter by the @typefully team.",
  url: "https://typefully.com/minimal-twitter"
}

const Header = () => (
  <header className="text-center">
    <div className="flex items-center justify-center">
      <a
        href={createTweetLink(tweet)}
        target="_blank"
        rel="noreferrer"
        className="absolute text-md font-semibold text-twitterBlue right-4"
        aria-label="Share Tweet"
        title="Share Tweet"
      >
        Share
      </a>
      <h1 className="text-xl font-extrabold">
        <span>Customize</span>
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
