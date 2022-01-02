import { TwitterLogoIcon } from "@radix-ui/react-icons";

import Container from "../components/layout/Container";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import MinimalSlider from "../components/controls/Slider";
import MinimalNavigation from "../components/controls/Navigation";
import MinimalToggle from "../components/controls/Toggle";

const IndexPage = () => {
  return (
    <Container>
      <Header />
      <main className="flex flex-col p-2 space-y-4 max-h-[600px] overflow-y-scroll">
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
            Navigation Buttons
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
      <Footer />
    </Container>
  );
};

export default IndexPage;
