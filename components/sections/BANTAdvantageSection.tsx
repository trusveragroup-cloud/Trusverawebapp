"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Clock, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { BANT_ADVANTAGES } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  ShieldCheck,
  Clock,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function BANTAdvantageSection() {
  return (
    <section style={{ background: C.cream50, padding: "120px 24px" }}>
      <div className="bant-advantage-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          className="bant-advantage-sticky"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 13,
              letterSpacing: "2px",
              color: C.forest700,
              background: "rgba(15,61,46,0.08)",
              border: `1px solid ${C.forest700}`,
              borderRadius: 20,
              padding: "6px 16px",
              marginBottom: 20,
            }}
          >
            THE BANT ADVANTAGE
          </span>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 32, color: C.textDark, lineHeight: 1.25, marginBottom: 24, fontWeight: 400 }}>
            What Changes When Every Lead Is Pre-Qualified
          </h2>
          <div style={{ borderLeft: `3px solid ${C.gold500}`, paddingLeft: 24, marginTop: 32 }}>
            <p style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: 22, color: C.forest700, lineHeight: 1.6 }}>
              Your sales team did not sign up to be researchers. They signed up to sell. Give them leads that
              let them do exactly that.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          {BANT_ADVANTAGES.map((adv) => {
            const Icon = ICONS[adv.icon];
            return (
              <motion.div
                key={adv.title}
                variants={card}
                className="bant-advantage-card"
                style={{
                  background: C.cream100,
                  borderRadius: 12,
                  padding: "28px 28px",
                  border: `1px solid ${C.borderLight}`,
                  borderLeft: `3px solid ${C.gold500}`,
                }}
              >
                <Icon size={22} color={C.gold500} aria-hidden="true" style={{ marginBottom: 12 }} />
                <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, fontWeight: 600, color: C.textDark, marginBottom: 8 }}>
                  {adv.title}
                </h3>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.65 }}>
                  {adv.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
