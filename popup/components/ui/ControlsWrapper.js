const ControlsWrapper = ({ id, className = "", children }) => {
  return (
    <div id={id || "user-control-timeline"} className={"p-4 dark:bg-x-bgTwoDark bg-x-bgTwo rounded-2xl flex flex-col gap-y-4 " + className}>
      {children}
    </div>
  );
};

export default ControlsWrapper;
