"use client";

import { useMemo, type CSSProperties } from "react";
import { C } from "@/lib/colors";

type WaveConfig = {
  yBase: number;
  amp: number;
  freq: number;
  dots: number;
  opacity: number;
  phase: number;
  size: number;
};

const WAVES: WaveConfig[] = [
  { yBase: 20, amp: 40, freq: 2.2, dots: 55, opacity: 0.6, phase: 0, size: 1.8 },
  { yBase: 50, amp: 50, freq: 1.8, dots: 50, opacity: 0.4, phase: 1.2, size: 1.5 },
  { yBase: 85, amp: 35, freq: 2.5, dots: 60, opacity: 0.5, phase: 2.5, size: 1.3 },
  { yBase: 120, amp: 45, freq: 2.0, dots: 48, opacity: 0.3, phase: 0.7, size: 1.6 },
  { yBase: 155, amp: 30, freq: 2.8, dots: 52, opacity: 0.25, phase: 3.8, size: 1.2 },
  { yBase: 40, amp: 55, freq: 1.5, dots: 45, opacity: 0.2, phase: 5.0, size: 1.4 },
  { yBase: 100, amp: 25, freq: 3.0, dots: 58, opacity: 0.35, phase: 1.8, size: 1.1 },
];

export default function GoldParticleWaves({ side }: { side: "left" | "right" }) {
  const waveDots = useMemo(
    () =>
      WAVES.map((cfg) => {
        const dots: { x: number; y: number; opacity: number; size: number }[] = [];
        for (let i = 0; i < cfg.dots; i++) {
          const t = i / cfg.dots;
          const x = t * 350 - 25;
          const y = cfg.yBase + Math.sin(t * Math.PI * cfg.freq + cfg.phase) * cfg.amp;
          const fadeEdge = Math.min(t * 4, (1 - t) * 4, 1);
          const opacity = cfg.opacity * fadeEdge * (0.5 + Math.sin(i * 0.8) * 0.5);
          dots.push({ x, y, opacity, size: cfg.size });
        }
        return dots;
      }),
    []
  );

  const style: CSSProperties = {
    position: "absolute",
    [side]: 0,
    top: 0,
    bottom: 0,
    width: "40%",
    height: "100%",
    transform: side === "right" ? "scaleX(-1)" : "none",
    pointerEvents: "none",
  };

  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="none" style={style}>
      {waveDots.map((dots, wi) =>
        dots.map((dot, di) => (
          <circle key={`${wi}-${di}`} cx={dot.x} cy={dot.y} r={dot.size} fill={C.gold500} opacity={dot.opacity} />
        ))
      )}
    </svg>
  );
}
