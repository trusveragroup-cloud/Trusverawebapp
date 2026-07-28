"use client";

import { motion } from "framer-motion";
import { Radar, ScanSearch, ClipboardCheck, Send, CircleCheckBig, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { TVG_DELIVERY_STEPS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Radar,
  ScanSearch,
  ClipboardCheck,
  Send,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const step = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function HowTVGDeliversSection() {
  return (
    <section style={{ background: C.cream100, padding: "120px 24px" }}>
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
            color: C.forest700,
            background: "rgba(15,61,46,0.08)",
            border: `1px solid ${C.forest700}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          HOW IT WORKS
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, margin: "20px 0 0" }}>
          From Signal to Closed Won: The TrusVera Delivery Process
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, marginTop: 16, lineHeight: 1.7 }}>
          Every BANT qualified lead we deliver has passed through four stages of intelligence gathering and
          verification. Here is exactly what happens before a lead lands in your CRM.
        </p>
      </motion.div>

      <motion.div
        className="bant-steps-strip"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        <div className="bant-steps-line" aria-hidden="true" />
        {TVG_DELIVERY_STEPS.map((s) => {
          const Icon = ICONS[s.icon];
          return (
            <motion.div key={s.step} variants={step} className="bant-step">
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: C.forest900,
                  border: `2px solid ${C.gold500}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: 20,
                  color: C.gold400,
                  marginBottom: 20,
                }}
              >
                {s.step}
              </div>
              <Icon size={22} color={C.gold400} aria-hidden="true" style={{ marginBottom: 12 }} />
              <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, fontWeight: 600, color: C.textDark, marginBottom: 8 }}>
                {s.title}
              </div>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.6, maxWidth: 200 }}>
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          background: C.forest900,
          borderRadius: 12,
          padding: "24px 32px",
          maxWidth: 680,
          margin: "56px auto 0",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <CircleCheckBig size={24} color={C.gold400} aria-hidden="true" style={{ flexShrink: 0 }} />
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.cream50, lineHeight: 1.6 }}>
          Every step is completed by TrusVera Group before the lead reaches you. Your team receives the
          outcome, not the work.
        </p>
      </motion.div>
    </section>
  );
}
