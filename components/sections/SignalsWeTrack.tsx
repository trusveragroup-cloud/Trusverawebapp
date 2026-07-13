"use client";

import { motion } from "framer-motion";
import { FileText, Repeat2, Clock, Search, MousePointerClick, Building2, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { INTENT_SIGNALS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  FileText,
  Repeat2,
  Clock,
  Search,
  MousePointerClick,
  Building2,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const row = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function SignalsWeTrack() {
  const categoryCount = new Set(INTENT_SIGNALS.map((s) => s.category)).size;

  return (
    <section style={{ background: C.cream100, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
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
            background: "rgba(15,61,46,0.08)",
            border: `1px solid ${C.forest700}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          SIGNALS WE TRACK
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, margin: "20px 0 0" }}>
          The Signals That Reveal Real Buying Intent
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, marginTop: 16, lineHeight: 1.7 }}>
          Not every website visit means something. Our engine isolates the patterns that actually predict a
          purchase decision.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          background: C.forest900,
          borderRadius: 16,
          padding: "8px 0",
          maxWidth: 880,
          margin: "0 auto",
          boxShadow: "0 24px 60px rgba(6,21,16,0.25)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 56,
            padding: "0 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(200,151,62,0.15)",
          }}
        >
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.5px", color: C.cream50 }}>
            Signal Categories
          </span>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, color: "rgba(254,253,251,0.5)" }}>
            {INTENT_SIGNALS.length} signal types across {categoryCount} categories
          </span>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={container}>
          {INTENT_SIGNALS.map((signal) => {
            const Icon = ICONS[signal.icon];
            return (
              <motion.div key={signal.title} variants={row} className="id-signal-row">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: "rgba(200,151,62,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color={C.gold400} aria-hidden="true" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, fontWeight: 600, color: C.cream50 }}>
                    {signal.title}
                  </div>
                  <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.55)", lineHeight: 1.5, marginTop: 3 }}>
                    {signal.desc}
                  </div>
                </div>
                <span
                  className="id-signal-tag"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.4px",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: 12,
                    color: C.gold300,
                    background: "rgba(200,151,62,0.08)",
                    border: "1px solid rgba(200,151,62,0.2)",
                  }}
                >
                  {signal.category}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
