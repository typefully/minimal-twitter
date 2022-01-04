import Extras from "../../controls/Extras"

const ExtrasSection = () => (
  <section className="flex flex-col space-y-2">
    <label
      htmlFor="user-control-extras"
      className="text-sm font-bold text-[#8899a6]"
    >
      Extras
    </label>
    <div id="user-control-extras">
      <Extras />
    </div>
  </section>
)

export default ExtrasSection
