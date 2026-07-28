"use client";

import { motion } from "framer-motion";
import { Send, TrendingUp, RefreshCw, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { EMAIL_SEQUENCE_TYPES } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = { Send, TrendingUp, RefreshCw };

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function EmailSequenceTypes() {
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
          SEQUENCE TYPES
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: "20px 0 0" }}>
          Three Sequences. Every Stage of the Buyer Journey.
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: "rgba(254,253,251,0.65)", marginTop: 16, lineHeight: 1.7 }}>
          TrusVera Group builds and manages three types of email sequences, each designed for a different stage
          of the relationship between your brand and your buyer.
        </p>
      </motion.div>

      <motion.div
        className="em-sequence-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        {EMAIL_SEQUENCE_TYPES.map((seq) => {
          const Icon = ICONS[seq.icon];
          const tagIsGold = seq.tagColor === "gold";
          return (
            <motion.div
              key={seq.type}
              variants={card}
              className="em-sequence-card"
              style={{
                background: C.forest850,
                border: "1px solid rgba(200,151,62,0.12)",
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ padding: "24px 24px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <Icon size={22} color={C.gold400} aria-hidden="true" style={{ display: "block", marginBottom: 10 }} />
                    <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.cream50, marginBottom: 6, fontWeight: 400 }}>
                      {seq.type}
                    </h3>
                    <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.55)", lineHeight: 1.6, marginBottom: 0 }}>
                      {seq.purpose}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.4px",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: 10,
                      whiteSpace: "nowrap",
                      color: tagIsGold ? C.gold400 : C.green400,
                      background: tagIsGold ? "rgba(200,151,62,0.08)" : "rgba(15,61,46,0.15)",
                      border: tagIsGold ? "1px solid rgba(200,151,62,0.2)" : "1px solid rgba(15,61,46,0.3)",
                    }}
                  >
                    {seq.tag}
                  </span>
                </div>
              </div>

              <div style={{ height: 1, background: "rgba(200,151,62,0.08)" }} />

              <div style={{ padding: "16px 24px", background: "rgba(0,0,0,0.15)" }}>
                <div
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    color: "rgba(254,253,251,0.3)",
                    marginBottom: 12,
                  }}
                >
                  SEQUENCE STEPS
                </div>
                {seq.steps.map((step, i) => (
                  <div
                    key={step.day}
                    style={{ display: "flex", gap: 10, marginBottom: i === seq.steps.length - 1 ? 0 : 8 }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 10,
                        fontWeight: 600,
                        color: C.gold400,
                        background: "rgba(200,151,62,0.08)",
                        borderRadius: 4,
                        padding: "2px 6px",
                        flexShrink: 0,
                        alignSelf: "flex-start",
                        marginTop: 1,
                      }}
                    >
                      {step.day}
                    </span>
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, color: "rgba(254,253,251,0.6)", lineHeight: 1.5 }}>
                      {step.action}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ padding: "14px 24px 20px", borderTop: "1px solid rgba(200,151,62,0.08)" }}>
                <div
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    color: C.gold400,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  TYPICAL RESULT
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 13,
                    color: "rgba(254,253,251,0.7)",
                    lineHeight: 1.5,
                    fontStyle: "italic",
                    marginBottom: 0,
                  }}
                >
                  {seq.result}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
