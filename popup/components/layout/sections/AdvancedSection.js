import { css } from "@codemirror/lang-css"
import CodeMirror from "@uiw/react-codemirror"
import debounce from "lodash.debounce"
import { useCallback, useEffect, useState } from "react"

import { getStorage, setStorage } from "../../../utilities/chromeStorage"

const AdvancedSection = () => {
  const [showEditor, setShowEditor] = useState(false)
  const [cssTextMain, setCSSTextMain] = useState("")
  const [cssTextEdited, setCSSTextEdited] = useState("")

  const onChange = useCallback((value) => {
    const saveCSSTextEdited = debounce(async () => {
      try {
        await setStorage({ cssTextEdited: value })
      } catch (error) {
        console.warn(error)
      }
    }, 1000)

    saveCSSTextEdited()
  }, [])

  useEffect(() => {
    const getCSSTextEdited = async () => {
      try {
        const userDefault = await getStorage("cssTextEdited")
        userDefault && setCSSTextEdited(userDefault)
      } catch (error) {
        console.warn(error)
      }
    }

    getCSSTextEdited()
  }, [])

  useEffect(() => {
    const fetchCSS = async () => {
      const mainStylesheet = await fetch(
        `https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5.1/css/main.css?t=${Date.now()}`
      )

      const mainCSS = (await mainStylesheet.text()).trim()

      setCSSTextMain(mainCSS)
    }

    fetchCSS()
  }, [])

  return (
    <section className="flex flex-col gap-y-2">
      <label
        htmlFor="user-control-advanced"
        className="text-sm font-bold dark:text-twitterAccentOneDark text-twitterAccentOne"
      >
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
            <span> (CSS Editor)</span>
            <span> · </span>
            <button
              onClick={() => setCSSTextEdited(cssTextMain)}
              className="text-twitterBlue"
            >
              Reset to Default
            </button>
          </>
        )}
      </label>
      {showEditor && (
        <div
          className="flex flex-col items-center justify-between dark:bg-twitterBgTwoDark bg-twitterBgTwo rounded-2xl relative overflow-hidden"
          id="user-control-advanced"
        >
          <CodeMirror
            className="w-full text-sm"
            theme="dark"
            value={cssTextEdited || cssTextMain}
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
