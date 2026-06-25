"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorToggle() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("cursor-opt-out") !== "true";
  });

  // Snapshot the initial enabled value so the mount-only effect can read it
  // without re-running on every state change (react-doctor/no-event-handler).
  const enabledRef = useRef(enabled);

  useEffect(() => {
    // Mount-only: set initial attribute based on the value at first render.
    // Subsequent toggles are handled by the `toggle` event handler below.
    if (enabledRef.current) {
      document.documentElement.setAttribute("data-cursor", "custom");
    }
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("cursor-opt-out", next ? "false" : "true");

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
