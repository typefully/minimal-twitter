import Interface from "../../controls/Interface"

const InterfaceSection = () => (
  <section className="flex flex-col gap-y-2">
    <label
      htmlFor="user-control-interface"
      className="text-sm font-bold dark:text-twitterAccentOneDark text-twitterAccentOne"
    >
      Interface
    </label>
    <div id="user-control-interface">
      <Interface />
    </div>
  </section>
)

export default InterfaceSection
