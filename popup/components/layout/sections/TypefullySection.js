import SwitchControl from "../../controls/SwitchControl"
import Separator from "../../controls/Separator"

const TypefullySection = () => (
  <section className="flex flex-col gap-y-2">
    <label
      htmlFor="user-control-typefully"
      className="text-sm font-bold dark:text-twitterAccentOneDark text-twitterAccentOne"
    >
      Typefully
    </label>
    <div id="user-control-typefully">
      <form className="flex flex-col items-center justify-between px-4 dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl">
        <div className="w-full pt-4 pb-2">
          <SwitchControl label="Grow Tab" storageKey="typefullyGrowTab" />
          <Separator className="mb-2 mt-4" />
        </div>
      </form>
    </div>
  </section>
)

export default TypefullySection
