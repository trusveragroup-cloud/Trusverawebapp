"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import { WHITEPAPER_STATS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function WhitepaperResults() {
  return (
    <section style={{ background: C.cream50, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}
      >
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, margin: 0 }}>
          Results That Justify Every Content Investment
        </h2>
      </motion.div>

      <motion.div
        className="wp-results-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 900, margin: "0 auto" }}
      >
        {WHITEPAPER_STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="wp-result-block"
            style={{ textAlign: "center", padding: "0 32px" }}
          >
            <span style={{ width: 32, height: 2, background: C.gold500, margin: "0 auto 16px", display: "block" }} />
            <div className="wp-result-value" style={{ fontFamily: "var(--font-dm-serif)", color: C.forest900, lineHeight: 1, fontWeight: 400 }}>
              {stat.value}
              {stat.suffix}
            </div>
            <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, fontWeight: 600, color: C.textDark, marginTop: 10 }}>
              {stat.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 12,
                color: C.textMuted,
                lineHeight: 1.5,
                marginTop: 6,
                maxWidth: 160,
                margin: "6px auto 0",
              }}
            >
              {stat.context}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
