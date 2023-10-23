import { css } from "@codemirror/lang-css";
import CodeMirror from "@uiw/react-codemirror";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { KeyCustomCss } from "../../../storage-keys";
import { getStorage, setStorage } from "../../utilities/chromeStorage";
import SectionLabel from "../ui/SectionLabel";

const AdvancedSection = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [cssText, setCssText] = useState("");

  const syncCss = debounce(async (css) => {
    try {
      await setStorage({ [KeyCustomCss]: css });
    } catch (error) {
      console.warn(error);
    }
  }, 1000);

  const onChange = useCallback((value) => {
    const newCss = (value || "").trim();
    syncCss(newCss);
  }, []);

  useEffect(() => {
    const setInitialSavedCss = async () => {
      try {
        const customCss = await getStorage(KeyCustomCss);
        customCss && setCssText(customCss);
      } catch (error) {
        console.warn(error);
      }
    };

    setInitialSavedCss();
  }, []);

  return (
    <section className="flex flex-col gap-y-2">
      <SectionLabel htmlFor="user-control-advanced">
        <span>Advanced</span>
        {!showEditor ? (
          <>
            <span> · </span>
            <button onClick={() => setShowEditor(true)} className="text-x-premium">
              Show CSS Editor
            </button>
          </>
        ) : (
          <>
            <span> · </span>
            <button onClick={() => setShowEditor(false)} className="text-x-premium">
              Hide CSS Editor
            </button>
          </>
        )}
      </SectionLabel>
      {showEditor && (
        <div className="flex flex-col items-center justify-between dark:bg-x-bgTwoDark bg-x-bgTwo rounded-2xl relative overflow-hidden" id="user-control-advanced">
          <CodeMirror className="w-full text-sm" theme="dark" value={cssText} placeholder="// Write custom CSS here..." height="300px" extensions={[css()]} onChange={onChange} />
        </div>
      )}
    </section>
  );
};

export default AdvancedSection;
