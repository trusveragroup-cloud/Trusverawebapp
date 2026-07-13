"use client";

import { useMemo } from "react";
import { C } from "@/lib/colors";

const SEED = [0.12, 0.35, 0.58, 0.82, 0.25, 0.68, 0.44, 0.91, 0.15, 0.72, 0.38, 0.55, 0.88, 0.05, 0.62];

export default function NetworkBG() {
  const nodes = useMemo(
    () =>
      SEED.map((s, i) => ({
        x: s * 280 + 10,
        y: SEED[(i + 7) % 15] * 180 + 10,
        r: 2 + SEED[(i + 3) % 15] * 3,
      })),
    []
  );

  const lines = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          result.push({
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            opacity: Math.max(0, 1 - d / 120) * 0.4,
          });
        }
      }
    }
    return result;
  }, [nodes]);

  return (
    <svg
      viewBox="0 0 300 200"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id="ng1" cx="30%" cy="40%">
          <stop offset="0%" stopColor="#15503A" />
          <stop offset="100%" stopColor="#081C13" />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={300} height={200} fill="url(#ng1)" />
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={C.gold500} strokeWidth={0.5} opacity={l.opacity} />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r * 2.5} fill={C.gold500} opacity={0.08} />
          <circle cx={n.x} cy={n.y} r={n.r} fill={C.gold500} opacity={0.6} />
          <circle cx={n.x} cy={n.y} r={n.r * 0.4} fill={C.gold300} opacity={0.9} />
        </g>
      ))}
    </svg>
  );
}
