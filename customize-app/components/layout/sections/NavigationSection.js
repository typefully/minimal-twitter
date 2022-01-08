import NavigationButtons from "../../controls/NavigationButtons"

const NavigationSection = () => (
  <section className="flex flex-col space-y-2">
    <label
      htmlFor="user-control-navigation"
      className="text-sm font-bold dark:text-twitterAccentOneDark text-twitterAccentOne"
    >
      Navigation
    </label>
    <div id="user-control-navigation">
      <NavigationButtons />
    </div>
  </section>
)

export default NavigationSection
