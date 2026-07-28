"use client";

import { motion } from "framer-motion";
import { Users, BarChart2, Building2, Target, FileCheck, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { WHITEPAPER_DELIVERABLES } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = { Users, BarChart2, Building2, Target };

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function WhitepaperDeliverables() {
  return (
    <section style={{ background: C.white, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 13,
            letterSpacing: "2px",
            color: C.forest700,
            background: "rgba(15,61,46,0.06)",
            border: "1px solid rgba(15,61,46,0.15)",
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          WHAT YOU RECEIVE
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, margin: "20px 0 0" }}>
          Four Deliverables. Every Campaign.
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, marginTop: 16, lineHeight: 1.7 }}>
          Every TrusVera Group whitepaper promotion program delivers the same four outputs. No surprises. No
          vague reporting. Just a clear, actionable set of assets your sales and marketing teams can use
          immediately.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        className="wp-deliverables-strip"
        style={{ maxWidth: 1100, margin: "0 auto", border: `1px solid ${C.borderLight}`, borderRadius: 16, overflow: "hidden" }}
      >
        {WHITEPAPER_DELIVERABLES.map((d) => {
          const Icon = ICONS[d.icon];
          return (
            <motion.div
              key={d.name}
              variants={card}
              className="wp-deliverable-card"
              style={{
                background: C.white,
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(200,151,62,0.08)",
                  border: "1px solid rgba(200,151,62,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={22} color={C.gold500} aria-hidden="true" />
              </div>

              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.textDark, fontWeight: 400 }}>
                {d.name}
              </div>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.65, flex: 1, margin: 0 }}>
                {d.desc}
              </p>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  marginTop: "auto",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.forest700,
                  background: "rgba(15,61,46,0.05)",
                  border: "1px solid rgba(15,61,46,0.12)",
                  borderRadius: 6,
                  padding: "4px 10px",
                  width: "fit-content",
                }}
              >
                <FileCheck size={12} color={C.forest700} aria-hidden="true" />
                {d.format}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
