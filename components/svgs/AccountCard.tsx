"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";

const ROWS = [
  { width: 88, y: 64 },
  { width: 62, y: 90 },
  { width: 100, y: 122 },
  { width: 74, y: 148 },
  { width: 92, y: 174 },
  { width: 56, y: 200 },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const row = {
  hidden: { opacity: 0, scaleX: 0.6 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function AccountCard() {
  return (
    <motion.svg
      viewBox="0 0 320 240"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      style={{ width: "100%", maxWidth: 360, height: "auto", display: "block", margin: "0 auto" }}
    >
      <rect x={8} y={8} width={304} height={224} rx={16} fill={C.forest900} />
      <rect x={8} y={8} width={304} height={224} rx={16} fill="none" stroke="rgba(200,151,62,0.18)" strokeWidth={1} />

      <circle cx={44} cy={40} r={14} fill="rgba(200,151,62,0.12)" />
      <circle cx={44} cy={40} r={14} fill="none" stroke={C.gold500} strokeWidth={1.2} />
      <circle cx={44} cy={36} r={4.5} fill={C.gold400} />
      <path d="M35 46c0-5 4-8 9-8s9 3 9 8" fill={C.gold400} />

      <rect x={244} y={26} width={56} height={22} rx={11} fill="rgba(200,151,62,0.12)" stroke={C.gold500} strokeWidth={1} />
      <text x={272} y={41} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.gold300} fontFamily="var(--font-inter), sans-serif">
        ICP 94
      </text>

      {ROWS.map((r, i) => (
        <motion.rect
          key={i}
          x={32}
          y={r.y}
          width={r.width * 2.2}
          height={i === 0 ? 10 : 7}
          rx={3.5}
          fill={i === 0 ? C.gold400 : "rgba(200,151,62,0.35)"}
          variants={row}
          style={{ transformOrigin: "32px center" }}
        />
      ))}
    </motion.svg>
  );
}
