"use client";

import { useSyncExternalStore } from "react";

const SMALL_VIEWPORT_PX = 640;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export type ViewportState = {
  prefersReducedMotion: boolean;
  isSmallViewport: boolean;
};

const SERVER_VIEWPORT: ViewportState = {
  prefersReducedMotion: false,
  isSmallViewport: false,
};

// useSyncExternalStore requires Object.is stability between snapshots when
// nothing changed — a fresh object literal each call triggers React #185
// (infinite re-render). Cache the snapshot and only swap the reference when
// an input actually flips.
let cachedViewport: ViewportState | null = null;
let cachedReducedMotion = false;
let cachedSmallViewport = false;

function subscribeViewport(callback: () => void): () => void {
  const motionMq = window.matchMedia(REDUCED_MOTION_QUERY);
  motionMq.addEventListener("change", callback);
  window.addEventListener("resize", callback);
  return () => {
    motionMq.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
  };
}

export function getViewportSnapshot(): ViewportState {
  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const isSmallViewport = window.innerWidth < SMALL_VIEWPORT_PX;
  if (
    cachedViewport === null ||
    prefersReducedMotion !== cachedReducedMotion ||
    isSmallViewport !== cachedSmallViewport
  ) {
    cachedReducedMotion = prefersReducedMotion;
    cachedSmallViewport = isSmallViewport;
    cachedViewport = { prefersReducedMotion, isSmallViewport };
  }
  return cachedViewport;
}

function getServerViewportSnapshot(): ViewportState {
  return SERVER_VIEWPORT;
}

export function useViewportState(): ViewportState {
  return useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    getServerViewportSnapshot,
  );
}
