import { TwitterLogoIcon } from "@radix-ui/react-icons";
import MinimalSlider from "../components/controls/Slider";
import MinimalNavigation from "../components/controls/Navigation";
import MinimalToggle from "../components/controls/Toggle";

const IndexPage = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col p-1 font-sans text-white w-[420px]">
        <header className="text-center">
          <h1 className="text-xl font-extrabold">
            <span>Customize more</span>
          </h1>
          <p className="text-[#8899a6] leading-5 text-[15px] pb-5 pt-3">
            Manage feed width, navigation, and extras. <br />
            Or go to display settings at{" "}
            <a
              href="https://twitter.com/i/display"
              className="text-twitterBlue hover:underline"
            >
              twitter.com/i/display
            </a>
            .
          </p>
        </header>
        <main className="flex flex-col p-2 space-y-4">
          <section className="flex flex-col space-y-2">
            <label
              htmlFor="user-control-feed-width"
              className="text-sm font-bold text-[#8899a6]"
            >
              Feed Width
            </label>
            <MinimalSlider id="user-control-feed-width" />
          </section>
          <section className="flex flex-col space-y-2">
            <label
              htmlFor="user-control-navigation-buttons"
              className="text-sm font-bold text-[#8899a6]"
            >
              Navigation
            </label>
            <MinimalNavigation id="user-control-navigation-buttons" />
          </section>
          <section className="flex flex-col space-y-2">
            <label
              htmlFor="user-control-extras"
              className="text-sm font-bold text-[#8899a6]"
            >
              Extras &#183; <a className="font-normal text-twitterBlue">Show</a>
            </label>
            {/* <div id="user-control-extras">
              <MinimalToggle />
            </div> */}
          </section>
        </main>
        <footer className="flex justify-center w-full pt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-[15px] font-bold text-white border border-transparent rounded-full shadow-sm bg-[#1d9bf0] hover:bg-[#1a8cd8] focus:outline-none w-fit"
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
};

export default IndexPage;
