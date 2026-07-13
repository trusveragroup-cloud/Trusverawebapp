"use client";

import { useMemo } from "react";
import { C } from "@/lib/colors";

const PARTICLE_SEED = [0.15, 0.42, 0.68, 0.28, 0.85, 0.55];

export default function WorkspaceBG() {
  const particles = useMemo(
    () =>
      PARTICLE_SEED.map((s, i) => ({
        x: s * 280 + 10,
        y: (PARTICLE_SEED[(i + 3) % 6] * 150 + 20) % 190,
        r: 1.2 + s,
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
        <linearGradient id="wb1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D3325" />
          <stop offset="100%" stopColor="#061510" />
        </linearGradient>
        <radialGradient id="wb2" cx="60%" cy="35%">
          <stop offset="0%" stopColor={C.gold500} stopOpacity={0.12} />
          <stop offset="100%" stopColor={C.gold500} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={300} height={200} fill="url(#wb1)" />
      <rect x={0} y={0} width={300} height={200} fill="url(#wb2)" />

      <circle cx={190} cy={70} r={60} fill={C.gold500} opacity={0.03} />

      <ellipse cx={120} cy={55} rx={18} ry={20} fill="#0A2219" stroke="#1A7A56" strokeWidth={1} />
      <ellipse cx={120} cy={50} rx={12} ry={13} fill="#0A2219" stroke="#1A7A56" strokeWidth={1} />
      <rect x={98} y={72} width={44} height={60} rx={10} fill="#0A2219" stroke="#1A7A56" strokeWidth={1} />

      <rect x={80} y={115} width={170} height={3} fill="#1A7A56" opacity={0.5} />
      <rect x={130} y={108} width={40} height={6} rx={1} fill="#0A2219" stroke="#1A7A56" strokeWidth={0.5} />

      <rect x={155} y={45} width={70} height={50} rx={3} fill="#0A2219" stroke="#1A7A56" strokeWidth={1} />
      <rect x={160} y={50} width={60} height={38} fill="#061510" />
      <rect x={165} y={56} width={44} height={3} rx={1} fill={C.gold500} opacity={0.8} />
      <rect x={165} y={62} width={38} height={3} rx={1} fill="#1A7A56" opacity={0.6} />
      <rect x={165} y={68} width={48} height={3} rx={1} fill="#1A7A56" opacity={0.6} />
      <rect x={165} y={74} width={34} height={3} rx={1} fill="#1A7A56" opacity={0.6} />
      <rect x={165} y={80} width={42} height={3} rx={1} fill="#1A7A56" opacity={0.6} />

      {particles.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#1A7A56" opacity={0.5} />
      ))}
    </svg>
  );
}
