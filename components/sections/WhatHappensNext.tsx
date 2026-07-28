"use client";

import { motion } from "framer-motion";
import { FileSearch, Calendar, FileText, ChevronRight, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { CONTACT_NEXT_STEPS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  FileSearch,
  Calendar,
  FileText,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function WhatHappensNext() {
  return (
    <section style={{ background: C.cream100, padding: "100px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}
      >
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, textAlign: "center" }}>
          What Happens After You Submit
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.textMuted, textAlign: "center", marginTop: 12 }}>
          No black hole. No waiting. A clear process from submission to proposal.
        </p>
      </motion.div>

      <motion.div
        className="ct-next-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 900, margin: "0 auto" }}
      >
        <ChevronRight size={20} color={C.gold400} aria-hidden="true" className="ct-next-arrow ct-next-arrow-1" style={{ opacity: 0.4 }} />
        <ChevronRight size={20} color={C.gold400} aria-hidden="true" className="ct-next-arrow ct-next-arrow-2" style={{ opacity: 0.4 }} />

        {CONTACT_NEXT_STEPS.map((s) => {
          const Icon = ICONS[s.icon];
          return (
            <motion.div
              key={s.step}
              variants={card}
              className="ct-next-card"
              style={{
                background: C.white,
                border: `1px solid ${C.borderLight}`,
                borderRadius: 14,
                padding: "36px 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: -12,
                  right: 12,
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: 100,
                  color: "rgba(200,151,62,0.06)",
                  pointerEvents: "none",
                  userSelect: "none",
                  lineHeight: 1,
                }}
              >
                {s.step}
              </span>

              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(200,151,62,0.08)",
                  border: "1px solid rgba(200,151,62,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Icon size={22} color={C.gold500} aria-hidden="true" />
              </div>

              <div
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: C.gold400,
                  marginBottom: 8,
                }}
              >
                STEP {s.step}
              </div>

              <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.textDark, marginBottom: 10, fontWeight: 400 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
