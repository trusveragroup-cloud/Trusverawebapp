"use client";

import { useMemo } from "react";
import { C } from "@/lib/colors";

const WAVES = [
  { yBase: 60, amp: 25, phase: 0, color: C.gold500, opacity: 0.5 },
  { yBase: 90, amp: 30, phase: 1.5, color: C.gold500, opacity: 0.3 },
  { yBase: 120, amp: 20, phase: 3, color: "#1A7A56", opacity: 0.5 },
  { yBase: 150, amp: 35, phase: 0.8, color: C.gold500, opacity: 0.2 },
  { yBase: 45, amp: 18, phase: 4.2, color: "#1A7A56", opacity: 0.35 },
];

export default function WavePatternBG() {
  const waveDots = useMemo(
    () =>
      WAVES.map((wave) => {
        const dots: { x: number; y: number; opacity: number }[] = [];
        for (let i = 0; i < 40; i++) {
          const x = (i / 40) * 320 - 10;
          const y = wave.yBase + Math.sin((i / 40) * Math.PI * 2.5 + wave.phase) * wave.amp;
          const opacity = wave.opacity * (0.6 + Math.sin(i * 0.5) * 0.4);
          dots.push({ x, y, opacity });
        }
        return { ...wave, dots };
      }),
    []
  );

  return (
    <svg
      viewBox="0 0 300 200"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="wp1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#081C13" />
          <stop offset="100%" stopColor="#0D3325" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={300} height={200} fill="url(#wp1)" />
      <circle cx={250} cy={80} r={80} fill={C.gold500} opacity={0.04} />
      {waveDots.map((wave, wi) =>
        wave.dots.map((dot, di) => (
          <circle key={`${wi}-${di}`} cx={dot.x} cy={dot.y} r={1.2} fill={wave.color} opacity={dot.opacity} />
        ))
      )}
    </svg>
  );
}
