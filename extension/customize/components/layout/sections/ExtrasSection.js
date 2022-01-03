import ExtraSwitches from "../../controls/ExtraSwitches"

const ExtrasSection = () => (
  <section className="flex flex-col space-y-2">
    <label
      htmlFor="user-control-extras"
      className="text-sm font-bold text-[#8899a6]"
    >
      Extras &#183; <a className="font-normal text-twitterBlue">Show</a>
    </label>
    <div id="user-control-extras">
      <ExtraSwitches />
    </div>
  </section>
)

export default ExtrasSection
