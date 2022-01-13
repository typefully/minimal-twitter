const Container = ({ children }) => (
  <div className="relative flex justify-center">
    <div className="relative overflow-scroll">
      <div className="relative hidden lg:flex lg:flex-col font-sans dark:text-white text-black font-normal min-w-[420px] w-full rounded-2xl border dark:border-twitterAccentTwoDark dark:bg-twitterBgOneDark bg-white p-4">
        {children}
      </div>
    </div>
  </div>
)

export default Container
