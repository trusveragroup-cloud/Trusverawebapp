"use client";

import { useMemo } from "react";
import { C } from "@/lib/colors";

const SEED = [0.7, 0.3, 0.9, 0.5, 0.6, 0.8, 0.4, 0.2, 0.75, 0.55, 0.85, 0.45, 0.65, 0.35, 0.95, 0.15, 0.72, 0.28, 0.88, 0.48];

export default function DataStreamBG() {
  const cols = useMemo(
    () =>
      SEED.map((s, i) => ({
        x: i * 15 + 5,
        h: s * 140 + 30,
        o: 0.15 + SEED[(i + 5) % 20] * 0.35,
      })),
    []
  );

  return (
    <svg
      viewBox="0 0 300 200"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="ds1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0A2E1F" />
          <stop offset="100%" stopColor="#061510" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={300} height={200} fill="url(#ds1)" />
      {[40, 90, 140].map((y) => (
        <line key={y} x1={0} y1={y} x2={300} y2={y} stroke="#1A7A56" strokeWidth={0.5} opacity={0.15} />
      ))}
      {cols.map((col, i) => (
        <rect
          key={i}
          x={col.x}
          y={200 - col.h}
          width={8}
          height={col.h}
          rx={1}
          fill={i % 3 === 0 ? C.gold500 : "#1A7A56"}
          opacity={col.o}
        />
      ))}
    </svg>
  );
}
