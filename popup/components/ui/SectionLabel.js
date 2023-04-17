const SectionLabel = ({ htmlFor, className = "", children }) => {
  return (
    <label
      htmlFor={htmlFor || "user-control-interface"}
      className={
        "text-sm font-bold dark:text-twitterAccentOneDark text-twitterAccentOne " +
        className
      }
    >
      {children || "Interface"}
    </label>
  )
}

export default SectionLabel
