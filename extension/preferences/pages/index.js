import { TwitterLogoIcon } from "@radix-ui/react-icons";
import MinimalSlider from "../components/Slider";
import MinimalNavigation from "../components/Navigation";

const IndexPage = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col p-3 space-y-4 font-sans text-white w-[420px]">
        <h1 className="text-xl font-extrabold text-center">
          <span>Customize Minimal Twitter</span>
        </h1>
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
      </div>
    </div>
  );
};

export default IndexPage;
