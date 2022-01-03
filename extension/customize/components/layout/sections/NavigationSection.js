import NavigationButtons from "../../controls/NavigationButtons"

const NavigationSection = () => (
  <section className="flex flex-col space-y-2">
    <label
      htmlFor="user-control-navigation-buttons"
      className="text-sm font-bold text-[#8899a6]"
    >
      Navigation Buttons
    </label>
    <div id="user-control-navigation-buttons">
      <NavigationButtons />
    </div>
  </section>
)

export default NavigationSection
