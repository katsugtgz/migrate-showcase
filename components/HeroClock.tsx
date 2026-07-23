"use client";

import { useState, useEffect, useCallback } from "react";
import { HERO_CLOCK, IDENTITY } from "@/lib/constants";

type ClockState = { siteTime: string; viewerTime: string };

function formatTime(date: Date, tz?: string): string {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    ...(tz ? { timeZone: tz } : {}),
  });
}

export default function HeroClock() {
  const [times, setTimes] = useState<ClockState | null>(null);

  const tick = useCallback(() => {
    setTimes({
      siteTime: formatTime(new Date(), "Asia/Jakarta"),
      viewerTime: formatTime(new Date()),
    });
  }, []);

  useEffect(() => {
    const initialTick = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(initialTick);
      clearInterval(id);
    };
  }, [tick]);

  const alias = IDENTITY.alias.toUpperCase();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-20">
      <div
        className="flex flex-col items-center leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span
          className="text-white"
          style={{
            fontSize: "clamp(100px, 22vw, 280px)",
            lineHeight: 0.82,
            textShadow: "0 4px 60px rgba(0,0,0,0.4)",
            letterSpacing: "0.02em",
          }}
        >
          {alias.slice(0, 2)}
        </span>
        <span
          className="text-white"
          style={{
            fontSize: "clamp(100px, 22vw, 280px)",
            lineHeight: 0.82,
            textShadow: "0 4px 60px rgba(0,0,0,0.4)",
            letterSpacing: "0.02em",
          }}
        >
          {alias.slice(2)}
        </span>
      </div>

      <p
        className="text-white/85 text-xs tracking-[0.4em] uppercase mt-4 font-body"
        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
      >
        {IDENTITY.role}, {IDENTITY.location}
      </p>

      <div className="flex items-center gap-8 mt-10">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-white/85 text-[10px] font-body tracking-[0.3em] uppercase">
            {HERO_CLOCK.siteTimezone}
          </span>
          <span
            data-testid="site-clock"
            className="text-white/80 font-body text-sm tracking-widest min-w-[7ch] text-center"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {times?.siteTime ?? "\u00A0\u00A0:\u00A0\u00A0:\u00A0\u00A0"}
          </span>
        </div>

        <span className="w-px h-8 bg-white/15" />

        <div className="flex flex-col items-center gap-1.5">
          <span className="text-white/85 text-[10px] font-body tracking-[0.3em] uppercase">
            {HERO_CLOCK.localTimeLabel}
          </span>
          <span
            data-testid="viewer-clock"
            className="text-white/80 font-body text-sm tracking-widest min-w-[7ch] text-center"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {times?.viewerTime ?? "\u00A0\u00A0:\u00A0\u00A0:\u00A0\u00A0"}
          </span>
        </div>
      </div>
    </div>
  );
}
