"use client";

import { Moon, Sun } from "lucide-react";
import { memo, useEffect, useState } from "react";

declare global {
  var updateDOM: () => void;
}

type ColorSchemePreference = "dark" | "light";

const STORAGE_KEY = "nextjs-markdown-content-cms";
const modes: ColorSchemePreference[] = ["dark", "light"];

/** to reuse updateDOM function defined inside injected script */

/** function to be injected in script tag for avoiding FOUC (Flash of Unstyled Content) */
export const NoFOUCScript = (storageKey: string) => {
  /* can not use outside constants or function as this script will be injected in a different context */
  const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"];

  /** Modify transition globally to avoid patched transitions */
  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);

    return () => {
      /* Force restyle */
      getComputedStyle(document.body);
      /* Wait for next tick before removing */
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

  /** function to add remove dark class */
  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    const systemMode = media.matches ? DARK : LIGHT;
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    const classList = document.documentElement.classList;
    if (resolvedMode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    document.documentElement.setAttribute("data-mode", mode);
    restoreTransitions();
  };
  window.updateDOM();
  media.addEventListener("change", window.updateDOM);
};

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference | null>(null);

  useEffect(() => {
    const storedMode = localStorage.getItem(
      STORAGE_KEY
    ) as ColorSchemePreference | null;
    if (storedMode === "dark" || storedMode === "light") {
      setMode(storedMode);
    } else {
      setMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, []);

  useEffect(() => {
    if (mode) {
      localStorage.setItem(STORAGE_KEY, mode);
      if (typeof window.updateDOM === "function") {
        window.updateDOM();
      }
    }
  }, [mode]);

  const handleModeSwitch = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  if (mode === null) {
    return null; // or a loading placeholder
  }

  return (
    <button
      onClick={handleModeSwitch}
      className="nav-link"
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      aria-pressed={mode === "dark"}
      role="switch"
    >
      {mode === "dark" ? <Moon /> : <Sun />}
    </button>
  );
};

const Script = memo(() => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`,
    }}
  />
));

/**
 * This component wich applies classes and transitions.
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};
