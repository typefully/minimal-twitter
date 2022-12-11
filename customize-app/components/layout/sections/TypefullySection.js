const TypefullySection = () => (
  <section className="flex flex-col gap-y-2">
    <label
      htmlFor="user-control-navigation"
      className="text-sm font-bold dark:text-twitterAccentOneDark text-twitterAccentOne"
    >
      Typefully
    </label>
    <div id="user-control-navigation">
      <Navigation />
    </div>
  </section>
)

export default TypefullySection
