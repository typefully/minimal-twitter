const SectionLabel = ({ htmlFor, className = "", children }) => {
  return (
    <label htmlFor={htmlFor || "user-control-interface"} className={"text-sm font-bold dark:text-x-accent1Dark text-x-accent1 " + className}>
      {children || "Interface"}
    </label>
  );
};

export default SectionLabel;
