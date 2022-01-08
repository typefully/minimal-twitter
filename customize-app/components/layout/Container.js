const Container = ({ children }) => (
  <div className="relative flex justify-center w-full">
    <div className="relative overflow-scroll">
      <div className="relative flex flex-col p-1 font-sans dark:text-white text-black font-normal min-w-[420px] w-full">
        {children}
      </div>
    </div>
  </div>
)

export default Container
