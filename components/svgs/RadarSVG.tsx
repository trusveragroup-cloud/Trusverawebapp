"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";

const RINGS = [60, 110, 160, 200];

const DOTS = [
  { cx: 260, cy: 140, label: "TAM" },
  { cx: 310, cy: 220, label: "ICP" },
  { cx: 180, cy: 300, label: "Competitor" },
  { cx: 120, cy: 170 },
  { cx: 240, cy: 340 },
  { cx: 90, cy: 240 },
];

export default function RadarSVG() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <radialGradient id="radar-sweep-gradient" cx="0" cy="0" r="1">
          <stop offset="0%" stopColor="rgba(200,151,62,0.15)" />
          <stop offset="100%" stopColor="rgba(200,151,62,0)" />
        </radialGradient>
      </defs>

      {RINGS.map((r) => (
        <circle key={r} cx={200} cy={200} r={r} stroke="rgba(200,151,62,0.15)" strokeWidth={1} fill="none" />
      ))}

      <line x1={0} x2={400} y1={200} y2={200} stroke="rgba(200,151,62,0.1)" strokeWidth={1} />
      <line x1={200} x2={200} y1={0} y2={400} stroke="rgba(200,151,62,0.1)" strokeWidth={1} />

      <motion.g
        style={{ transformOrigin: "200px 200px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <path d="M200,200 L200,0 A200,200 0 0,1 373,100 Z" fill="url(#radar-sweep-gradient)" />
      </motion.g>

      {DOTS.map((dot, i) => (
        <g key={i}>
          <motion.circle
            cx={dot.cx}
            cy={dot.cy}
            r={4}
            fill={C.gold500}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1, 1], opacity: [1, 1, 0.4, 1] }}
            transition={{
              scale: { duration: 0.4, delay: i * 0.2 },
              opacity: { duration: 2, repeat: Infinity, delay: i * 0.2 + 0.4 },
            }}
            style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
          />
          {dot.label && (
            <text
              x={dot.cx + 10}
              y={dot.cy + 4}
              fontSize={10}
              fill="rgba(254,253,251,0.5)"
              fontFamily="var(--font-inter), sans-serif"
            >
              {dot.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
