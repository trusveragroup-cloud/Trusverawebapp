"use client";

import { motion } from "framer-motion";
import { TrendingDown, TriangleAlert, UserX, DollarSign, ArrowRight, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { BAD_LEADGEN_COSTS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  TrendingDown,
  AlertTriangle: TriangleAlert,
  UserX,
  DollarSign,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function CostOfBadLeadGen() {
  return (
    <section style={{ background: C.forest900, padding: "120px 24px" }}>
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
            color: C.gold400,
            background: "rgba(200,151,62,0.1)",
            border: `1px solid ${C.gold500}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          THE REAL COST
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: "20px 0 0" }}>
          What Bad Lead Generation Is Actually Costing You
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: "rgba(254,253,251,0.6)", marginTop: 16, lineHeight: 1.7 }}>
          Before we talk about what good lead generation delivers, it is worth being honest about what the
          alternative costs.
        </p>
      </motion.div>

      <motion.div
        className="lg-costs-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 900, margin: "0 auto" }}
      >
        {BAD_LEADGEN_COSTS.map((item, i) => {
          const Icon = ICONS[item.icon];
          const num = String(i + 1).padStart(2, "0");
          return (
            <motion.div
              key={item.problem}
              variants={card}
              className="lg-cost-card"
              style={{
                border: "1px solid rgba(226,75,74,0.15)",
                borderRadius: 12,
                padding: "28px 24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: -8,
                  right: 12,
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: 80,
                  color: "rgba(226,75,74,0.06)",
                  pointerEvents: "none",
                  userSelect: "none",
                  lineHeight: 1,
                }}
              >
                {num}
              </span>

              <Icon size={24} color="#E24B4A" aria-hidden="true" style={{ marginBottom: 14, position: "relative" }} />

              <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.cream50, marginBottom: 10, fontWeight: 400, position: "relative" }}>
                {item.problem}
              </h3>

              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.6)", lineHeight: 1.65, position: "relative" }}>
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          background: "rgba(200,151,62,0.06)",
          border: "1px solid rgba(200,151,62,0.15)",
          borderRadius: 10,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          maxWidth: 880,
          margin: "32px auto 0",
        }}
      >
        <ArrowRight size={20} color={C.gold400} aria-hidden="true" style={{ flexShrink: 0 }} />
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.75)", lineHeight: 1.6 }}>
          TrusVera Group&apos;s lead generation programs are built specifically to avoid all four of these
          failure modes. Here is how.
        </p>
      </motion.div>
    </section>
  );
}
