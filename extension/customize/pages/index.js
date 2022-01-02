import { TwitterLogoIcon } from "@radix-ui/react-icons";
import MinimalSlider from "../components/Slider";
import MinimalNavigation from "../components/Navigation";
import MinimalToggle from "../components/Toggle";

const IndexPage = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col p-1 font-sans text-white w-[420px]">
        <header className="text-center">
          <h1 className="text-xl font-extrabold">
            <span>Customize more</span>
          </h1>
          <p className="text-[#8899a6] leading-5 text-[15px] pb-5 pt-3">
            Manage feed width, navigation, and extras. Access Twitter's main
            display settings at{" "}
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
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="user-control-feed-width"
              className="text-xs font-bold text-[#8899a6]"
            >
              Feed Width
            </label>
            <MinimalSlider id="user-control-feed-width" />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="user-control-navigation-buttons"
              className="text-xs font-bold text-[#8899a6]"
            >
              Navigation
            </label>
            <MinimalNavigation id="user-control-navigation-buttons" />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="user-control-extras"
              className="text-xs font-bold text-[#8899a6]"
            >
              Extras
            </label>
            <div id="user-control-extras">
              <MinimalToggle />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IndexPage;
