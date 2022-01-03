const Container = ({ children }) => (
  <div className="flex justify-center w-full">
    <div className="flex flex-col p-1 font-sans text-white w-[420px]">
      {children}
    </div>
  </div>
)

export default Container
