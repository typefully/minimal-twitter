import Navigation from "../../controls/Navigation"

const NavigationSection = () => (
  <section className="flex flex-col space-y-2">
    <label
      htmlFor="user-control-navigation-buttons"
      className="text-sm font-bold text-[#8899a6]"
    >
      Navigation Buttons
    </label>
    <Navigation id="user-control-navigation-buttons" />
  </section>
)

export default NavigationSection
