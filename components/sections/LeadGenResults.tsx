"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import { LEADGEN_RESULTS } from "@/lib/data";
import { AnimatedNum } from "@/lib/hooks/useAnimatedNum";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function LeadGenResults() {
  return (
    <section style={{ background: C.cream50, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 13,
            letterSpacing: "2px",
            color: C.forest700,
            background: "rgba(15,61,46,0.06)",
            border: `1px solid ${C.forest700}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          THE RESULTS
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, margin: "20px 0 0" }}>
          What Our Programs Deliver
        </h2>
      </motion.div>

      <motion.div
        className="lg-results-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        style={{ maxWidth: 1100, margin: "0 auto", border: `1px solid ${C.borderLight}`, borderRadius: 14, overflow: "hidden" }}
      >
        {LEADGEN_RESULTS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="lg-results-card"
            style={{ background: C.white, padding: "36px 28px", textAlign: "left" }}
          >
            <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 42, color: C.forest800, lineHeight: 1 }}>
              <AnimatedNum value={stat.value} suffix={stat.suffix} />
            </div>
            <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, fontWeight: 600, color: C.textDark, marginTop: 8 }}>
              {stat.label}
            </div>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginTop: 6 }}>
              {stat.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
