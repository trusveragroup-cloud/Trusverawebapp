"use client";

import { motion } from "framer-motion";
import { Globe, RefreshCw, Rocket, ChartBar, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { RESEARCH_WHO } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Globe,
  RefreshCw,
  Rocket,
  ChartBar,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function WhoThisIsFor() {
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
            color: C.cream50,
            background: C.forest900,
            border: `1px solid ${C.forest900}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          WHO THIS IS FOR
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, margin: "20px 0 0" }}>
          Built for Senior Revenue Leaders at B2B Technology Companies
        </h2>
      </motion.div>

      <motion.div
        className="mr-who-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 900, margin: "0 auto" }}
      >
        {RESEARCH_WHO.map((w) => {
          const Icon = ICONS[w.icon];
          return (
            <motion.div
              key={w.role}
              variants={card}
              className="mr-who-card"
              style={{
                background: C.white,
                border: `1px solid ${C.borderLight}`,
                borderLeft: `3px solid ${C.gold500}`,
                borderRadius: 12,
                padding: "32px 28px",
              }}
            >
              <Icon size={26} color={C.gold500} aria-hidden="true" style={{ marginBottom: 16 }} />
              <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 22, color: C.textDark, marginBottom: 12, fontWeight: 400 }}>
                {w.role}
              </h3>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
                {w.scenario}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
