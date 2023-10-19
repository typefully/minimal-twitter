import { css } from "@codemirror/lang-css"
import CodeMirror from "@uiw/react-codemirror"
import debounce from "lodash.debounce"
import { useCallback, useEffect, useState } from "react"

import { removeElementById } from "../../../content-scripts/src/modules/utilities/removeElement"
import { KeyCssTextEdited } from "../../../storage-keys"
import { getStorage, setStorage } from "../../utilities/chromeStorage"
import SectionLabel from "../ui/SectionLabel"

const AdvancedSection = () => {
  const [showEditor, setShowEditor] = useState(false)
  const [cssTextEdited, setCSSTextEdited] = useState("")

  const saveCSSTextEdited = debounce(async (value) => {
    const newCss = (value || "").trim()
    try {
      await setStorage({ [KeyCssTextEdited]: newCss })
    } catch (error) {
      console.warn(error)
    }
    if (newCss.length === 0) {
      removeElementById("cssTextEdited")
    }
  }, 1000)

  const onChange = useCallback((value) => {
    saveCSSTextEdited(value)
  }, [])

  useEffect(() => {
    const getCSSTextEdited = async () => {
      try {
        const userDefault = await getStorage(KeyCssTextEdited)
        userDefault && setCSSTextEdited(userDefault)
      } catch (error) {
        console.warn(error)
      }
    }

    getCSSTextEdited()
  }, [])

  return (
    <section className="flex flex-col gap-y-2">
      <SectionLabel htmlFor="user-control-advanced">
        <span>Advanced</span>
        {!showEditor ? (
          <>
            <span> · </span>
            <button
              onClick={() => setShowEditor(true)}
              className="text-twitterBlue"
            >
              Show CSS Editor
            </button>
          </>
        ) : (
          <>
            <span> · </span>
            <button
              onClick={() => setShowEditor(false)}
              className="text-twitterBlue"
            >
              Hide CSS Editor
            </button>
          </>
        )}
      </SectionLabel>
      {showEditor && (
        <div
          className="flex flex-col items-center justify-between dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl relative overflow-hidden"
          id="user-control-advanced"
        >
          <CodeMirror
            className="w-full text-sm"
            theme="dark"
            value={cssTextEdited}
            placeholder="// Write custom CSS here..."
            height="300px"
            extensions={[css()]}
            onChange={onChange}
          />
        </div>
      )}
    </section>
  )
}

export default AdvancedSection
