"use client";

import { motion } from "framer-motion";
import { Rocket, Users, Target, Crosshair, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { INTENT_BENEFITS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Rocket,
  Users,
  Target,
  Crosshair,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function WhyItMattersForB2B() {
  return (
    <section style={{ background: C.cream100, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}
      >
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400 }}>
          Why Intent Data Matters for B2B Pipeline
        </h2>
      </motion.div>

      <motion.div
        className="id-benefits-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        {INTENT_BENEFITS.map((benefit) => {
          const Icon = ICONS[benefit.icon];
          return (
            <motion.div
              key={benefit.title}
              variants={item}
              whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(0,0,0,0.07)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ background: C.cream50, border: `1px solid ${C.borderLight}`, borderRadius: 14, padding: "40px 36px" }}
            >
              <Icon size={24} color={C.gold500} aria-hidden="true" style={{ marginBottom: 16 }} />
              <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 28, color: C.forest800, lineHeight: 1.25, fontWeight: 400 }}>
                {benefit.outcome}
              </h3>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.65, marginTop: 16 }}>
                {benefit.desc}
              </p>
              <div
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  color: C.gold500,
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: `1px solid ${C.borderLight}`,
                }}
              >
                {benefit.title}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
