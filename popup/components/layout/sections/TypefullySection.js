import SwitchControl from "../../controls/SwitchControl"

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
        <div className="w-full py-4">
          <div className="flex flex-col gap-y-4">
            <SwitchControl
              label="Composer Buttons"
              storageKey="typefullyComposerButtons"
              defaultState={true}
            />
            <SwitchControl label="Grow Tab" storageKey="typefullyGrowTab" />
          </div>
        </div>
      </form>
    </div>
  </section>
)

export default TypefullySection
