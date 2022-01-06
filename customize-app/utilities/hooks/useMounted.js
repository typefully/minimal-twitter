/*-- Example usage
  import useMounted from "hooks/useMounted"

  const mounted = useMounted()
--*/

import { useEffect, useState } from "react"

const useMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

export default useMounted
