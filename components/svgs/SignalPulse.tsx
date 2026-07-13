"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";

const RINGS = [
  { r: 40, delay: 0 },
  { r: 70, delay: 0.6 },
  { r: 100, delay: 1.2 },
];

export default function SignalPulse() {
  return (
    <svg
      viewBox="0 0 240 240"
      aria-hidden="true"
      style={{ width: "100%", maxWidth: 320, height: "auto", display: "block", margin: "0 auto" }}
    >
      {RINGS.map((ring, i) => (
        <motion.circle
          key={i}
          cx={120}
          cy={120}
          r={ring.r}
          fill="none"
          stroke={C.gold500}
          strokeWidth={1.5}
          initial={{ scale: 0.7, opacity: 0.7 }}
          animate={{ scale: [0.7, 1.15, 0.7], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, delay: ring.delay, ease: "easeInOut" }}
          style={{ transformOrigin: "120px 120px" }}
        />
      ))}
      <circle cx={120} cy={120} r={10} fill={C.gold500} />
      <circle cx={120} cy={120} r={5} fill={C.gold300} />
    </svg>
  );
}
