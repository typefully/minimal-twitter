import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { styled } from "@stitches/react"

const StyledSeparator = styled(SeparatorPrimitive.Root, {
  margin: "2px 0",
  backgroundColor: "var(--twitter-accent-two)",
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 1 }
})

export default StyledSeparator
