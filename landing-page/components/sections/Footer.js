import { GitHubLogoIcon } from "@radix-ui/react-icons"

const Footer = () => (
  <div className="flex justify-center w-full px-4 text-white bg-black">
    <footer className="flex flex-col w-full max-w-5xl pt-8 pb-10 space-y-4 lg:space-y-0 lg:justify-between lg:flex-row">
      <p className="flex flex-col leading-relaxed text-left text-twitterAccentOneDark">
        <span className="flex items-center space-x-2 text-white">
          <svg
            width={14}
            height={14}
            viewBox="0 0 110 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M89.738 26.737c9.1-11.37 17.689-23.293 16.008-25.927-2.035-3.188-20.986 3.657-35.846 9.654-6.477-3.14-13.777-4.905-21.499-4.905C21.67 5.56 0 26.713 0 52.808c0 26.095 21.67 47.248 48.401 47.248s48.401-21.153 48.401-47.248c0-3.623-.418-7.15-1.209-10.54 8.479-6.165 15.65-12.312 14.226-14.607-1.318-2.123-10.113-1.916-20.081-.924z"
              fill="#fff"
            />
          </svg>
          <span>Minimal Theme for Twitter®</span>
        </span>
        <span>
          <a
            href="https://about.twitter.com/en/who-we-are/brand-toolkit"
            className="underline hover:text-white"
          >
            Twitter®
          </a>{" "}
          is a trademark of Twitter Inc.
        </span>
        <span>
          Open Source — Licensed under the{" "}
          <a
            href="https://github.com/thomaswang/minimal-twitter/blob/main/LICENSE"
            className="underline hover:text-white"
          >
            MIT License
          </a>
          .
        </span>
        <span>
          Copyright © {new Date().getFullYear()} Thomas Wang. All rights
          reserved.
        </span>
      </p>
      <div className="flex flex-col items-end space-y-2">
        <a
          href="https://github.com/thomaswang/minimal-twitter"
          className="flex items-center space-x-2 py-2 px-4 bg-[#24292f] hover:bg-[#323941] rounded-full"
        >
          <GitHubLogoIcon /> <span>View on GitHub</span>
        </a>
        <span className="pr-4 font-mono text-sm">v4.0.21</span>
        <a
          href="https://news.ycombinator.com/submitlink?u=https://www.wang.sh/minimal-twitter/"
          className="flex items-center px-4 py-2 space-x-2 text-[white] underline hover:text-[#f60]"
        >
          <svg
            width={16}
            height={16}
            className="mt-0.5 bg-white"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <path
              d="M31 31v450h450V31H31zm239.1 256.6v94.9H242v-94.9l-77-144.1h31.9L256 254.3l59.1-110.8H347l-76.9 144.1z"
              fill="#f60"
            />
          </svg>{" "}
          <span>Submit on Hacker News</span>
        </a>
      </div>
    </footer>
  </div>
)

export default Footer
