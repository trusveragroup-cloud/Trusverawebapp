"use client";

import { motion } from "framer-motion";
import { Wallet, UserCog, CircleAlert, CalendarCheck, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { BANT_CRITERIA } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Wallet,
  UserCog,
  AlertCircle: CircleAlert,
  CalendarCheck,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function BANTCriteriaSection() {
  return (
    <section style={{ background: C.forest900, padding: "120px 24px" }}>
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
          THE FOUR CRITERIA
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: "20px 0 0" }}>
          What TrusVera Group Verifies on Every Lead
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: "rgba(254,253,251,0.65)", marginTop: 16, lineHeight: 1.7 }}>
          BANT is not a checklist. It is a qualification discipline. Here is exactly what we confirm before a
          lead is cleared for your sales team.
        </p>
      </motion.div>

      <motion.div
        className="bant-criteria-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        {BANT_CRITERIA.map((c) => {
          const Icon = ICONS[c.icon];
          return (
            <motion.div
              key={c.letter}
              variants={card}
              className={`bant-criteria-card bant-criteria-${c.color}`}
              style={{
                background: C.forest850,
                borderRadius: 14,
                padding: "40px 36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: -20,
                  right: 16,
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: 120,
                  color: "rgba(200,151,62,0.06)",
                  pointerEvents: "none",
                  userSelect: "none",
                  lineHeight: 1,
                }}
              >
                {c.letter}
              </span>

              <Icon size={28} color={C.gold400} aria-hidden="true" style={{ marginBottom: 16, position: "relative" }} />

              <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.cream50, marginBottom: 8, fontWeight: 400, position: "relative" }}>
                {c.criterion}
              </h3>

              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, fontStyle: "italic", color: "rgba(254,253,251,0.5)", marginBottom: 24, lineHeight: 1.5, position: "relative" }}>
                {c.question}
              </p>

              <div style={{ borderTop: "1px solid rgba(200,151,62,0.15)", marginBottom: 24, position: "relative" }} />

              <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: C.gold400, marginBottom: 10, position: "relative" }}>
                WHAT WE VERIFY
              </div>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.8)", lineHeight: 1.65, marginBottom: 24, position: "relative" }}>
                {c.whatTVGVerifies}
              </p>

              <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: "rgba(254,253,251,0.35)", marginBottom: 10, position: "relative" }}>
                WHY IT MATTERS
              </div>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.55)", lineHeight: 1.6, position: "relative" }}>
                {c.whyItMatters}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
