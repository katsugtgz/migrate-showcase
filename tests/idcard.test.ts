import { describe, it, expect, beforeEach, vi } from "vitest";
import { getViewportSnapshot } from "@/hooks/useViewportState";

// jsdom doesn't ship matchMedia — minimal polyfill.
beforeEach(() => {
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }
});

describe("getViewportSnapshot", () => {
  it("returns the same reference across calls when viewport state is unchanged (useSyncExternalStore Object.is contract)", () => {
    // React #185 root cause: useSyncExternalStore re-renders whenever
    // getSnapshot returns a value that fails Object.is against the previous
    // return. A fresh object literal every call → infinite loop. The snapshot
    // MUST be referentially stable when inputs (matchMedia + innerWidth) don't
    // change.
    const first = getViewportSnapshot();
    const second = getViewportSnapshot();
    expect(Object.is(first, second)).toBe(true);
  });

  it("returns a new reference when an input actually changes", () => {
    const first = getViewportSnapshot();
    // Simulate a real viewport change — drop below SMALL_VIEWPORT_PX (640).
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      get: () => 500,
    });
    const afterShrink = getViewportSnapshot();
    expect(Object.is(first, afterShrink)).toBe(false);
    expect(afterShrink.isSmallViewport).toBe(true);
  });
});
