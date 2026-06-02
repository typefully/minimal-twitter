import { useRef, useState } from "react";
import { allSettingsKeys, defaultPreferences } from "../../../storage-keys";

const SETTINGS_EXPORT_VERSION = 1;

const Footer = () => {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState("");

  const getSettings = () => {
    return new Promise((resolve) => {
      chrome.storage.local.get(allSettingsKeys, (data) => {
        const settings = allSettingsKeys.reduce((acc, key) => {
          acc[key] = data[key] ?? defaultPreferences[key];
          return acc;
        }, {});

        resolve(settings);
      });
    });
  };

  const exportSettings = async () => {
    const settings = await getSettings();
    const payload = {
      version: SETTINGS_EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      settings,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "minimal-twitter-settings.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setStatus("Settings exported.");
  };

  const importSettings = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const sourceSettings = parsed.settings ?? parsed;

      if (!sourceSettings || typeof sourceSettings !== "object") {
        setStatus("No settings found.");
        return;
      }

      const settings = allSettingsKeys.reduce((acc, key) => {
        if (Object.prototype.hasOwnProperty.call(sourceSettings, key)) {
          acc[key] = sourceSettings[key];
        }

        return acc;
      }, {});

      if (!Object.keys(settings).length) {
        setStatus("No settings found.");
        return;
      }

      chrome.storage.local.set(settings, () => {
        if (chrome.runtime.lastError) {
          setStatus("Import failed.");
          return;
        }

        setStatus("Settings imported.");
      });
    } catch (error) {
      console.error(error);
      setStatus("Import failed.");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <footer className="flex flex-col items-center w-full gap-3 px-2 pt-2 pb-8">
      <div className="flex w-full gap-2">
        <button
          onClick={exportSettings}
          type="button"
          className="flex-1 rounded-full border border-x-accent2 px-3 py-2 text-[13px] font-bold dark:text-white text-black hover:bg-x-accent4"
        >
          Export Settings
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="flex-1 rounded-full border border-x-accent2 px-3 py-2 text-[13px] font-bold dark:text-white text-black hover:bg-x-accent4"
        >
          Import Settings
        </button>
      </div>
      <input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={importSettings} />
      {status && <p className="text-xs font-medium dark:text-x-accentDark text-x-accent1">{status}</p>}
    </footer>
  );
};

export default Footer;
