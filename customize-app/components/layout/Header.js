import createTweetLink from "../../utilities/createTweetLink"

const tweet = {
  text: "Love this Minimal Theme for Twitter by @typefully.",
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
        <span>Minimal Twitter</span>
      </h1>
    </div>
    <p className="pt-3 pb-3 text-sm font-medium leading-5 dark:text-twitterAccentOneDark text-twitterAccentOne">
      Made by{" "}
      <a
        href="https://typefully.com/?ref=minimal-twitter"
        target="_blank"
        rel="noreferrer"
        className="text-twitterBlue hover:underline font-bold cursor-pointer"
      >
        <TypefullyGlyph />
        Typefully
      </a>
    </p>
  </header>
)

const TypefullyGlyph = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 70 106"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: "inline-block",
      position: "relative",
      bottom: 1,
      marginRight: 2
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.7262 41.5585C28.0464 24.3643 47.588 2.92391 68.7507 0C68.8442 0.820694 68.9495 1.66344 69.0568 2.52238C69.8985 9.2574 70.8647 16.9889 67.2262 22.9015C62.2777 27.0815 55.1409 31.5514 51.2262 32.9015C46.419 34.3531 41.9176 37.5025 36.7262 43.5184C38.1158 43.8122 40.3022 43.9251 43.8723 43.5184C46.5499 43.2134 53.1421 41.5584 53.1421 41.5584C53.1421 41.5584 48.1652 53.4266 25.5188 60.9787C25.5188 60.9787 22.6702 63.9014 20.7262 66.9015C19.653 68.5575 33.2262 63.9014 33.2262 63.9014C33.2262 63.9014 23.7262 71.4015 15.7262 76.4015C13.1534 80.5178 9.359 88.1321 6.17009 94.5312C3.16148 100.569 0.691852 105.524 0.295718 105.441C-1.04307 105.593 1.72618 68.2155 17.7262 41.5585ZM51.7262 104.401C56.4206 104.401 60.2262 100.596 60.2262 95.9015C60.2262 91.207 56.4206 87.4015 51.7262 87.4015C47.0317 87.4015 43.2262 91.207 43.2262 95.9015C43.2262 100.596 47.0317 104.401 51.7262 104.401Z"
      fill="#1DA1F2"
    />
  </svg>
)

export default Header
