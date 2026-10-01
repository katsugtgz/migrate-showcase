"use client";

import { useSyncExternalStore } from "react";

const CURSOR_PREFERENCE_EVENT = "cursor-preference-change";

function subscribeToCursorPreference(onChange: () => void) {
  window.addEventListener(CURSOR_PREFERENCE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CURSOR_PREFERENCE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getCursorEnabled() {
  try {
    return localStorage.getItem("cursor-opt-out") !== "true";
  } catch {
    return false;
  }
}

export default function CursorToggle() {
  const enabled = useSyncExternalStore(
    subscribeToCursorPreference,
    getCursorEnabled,
    () => true,
  );

  const toggle = () => {
    const next = !enabled;
    try {
      localStorage.setItem("cursor-opt-out", next ? "false" : "true");
    } catch {
      // Storage blocked: preference won't persist, still apply for this session.
    }
    window.dispatchEvent(new Event(CURSOR_PREFERENCE_EVENT));

    if (next) {
      document.documentElement.setAttribute("data-cursor", "custom");
    } else {
      document.documentElement.removeAttribute("data-cursor");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Disable custom cursor" : "Enable custom cursor"}
      className="fixed bottom-4 right-4 z-[9998] rounded-full bg-[var(--fg)] text-[var(--bg)] p-2 opacity-30 hover:opacity-100 transition-opacity"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
      </svg>
    </button>
  );
}
