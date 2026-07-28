"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import { BANT_SCOREBOARD } from "@/lib/data";
import { AnimatedNum } from "@/lib/hooks/useAnimatedNum";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const row = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function BANTScoreboardSection() {
  return (
    <section style={{ background: C.forest800, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 13,
            letterSpacing: "2px",
            color: C.gold400,
            background: "rgba(200,151,62,0.1)",
            border: `1px solid ${C.gold500}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          THE NUMBERS
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: "20px 0 0" }}>
          Pipeline That Actually Performs
        </h2>
      </motion.div>

      <motion.div
        className="bant-scoreboard"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0 }}
      >
        {BANT_SCOREBOARD.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={row}
            className="bant-scoreboard-row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              padding: "32px 0",
              borderBottom: i === BANT_SCOREBOARD.length - 1 ? "none" : "1px solid rgba(200,151,62,0.1)",
              position: "relative",
            }}
          >
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: 0, top: "20%", height: "60%", width: 3, background: C.gold500, borderRadius: 2 }}
            />
            <div className="bant-scoreboard-number" style={{ width: 200, paddingLeft: 20 }}>
              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 52, color: C.gold400, lineHeight: 1 }}>
                <AnimatedNum value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, fontWeight: 600, color: C.cream50, marginBottom: 6 }}>
                {stat.label}
              </div>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.55)", lineHeight: 1.6 }}>
                {stat.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
