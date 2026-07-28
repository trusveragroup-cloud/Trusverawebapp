"use client";

import { motion } from "framer-motion";
import { ClipboardList, Search, Send, CircleCheckBig, Calendar, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { RESEARCH_PROCESS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  ClipboardList,
  Search,
  Send,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const column = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function ResearchProcess() {
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
          THE PROCESS
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: "20px 0 0" }}>
          Five Weeks From Brief to Activation
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: "rgba(254,253,251,0.65)", marginTop: 16, lineHeight: 1.7 }}>
          A structured engagement with a clear scope, a fixed timeline, and deliverables your team can act on
          from day one of receipt.
        </p>
      </motion.div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="mr-process-connector" aria-hidden="true" />
        <motion.div
          className="mr-process-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
        >
          {RESEARCH_PROCESS.map((phase) => {
            const Icon = ICONS[phase.icon];
            return (
              <motion.div key={phase.phase} variants={column} className="mr-process-column">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: C.forest850,
                    border: `2px solid ${C.gold500}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color={C.gold400} aria-hidden="true" />
                </div>

                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.gold400,
                    background: "rgba(200,151,62,0.08)",
                    border: "1px solid rgba(200,151,62,0.2)",
                    borderRadius: 8,
                    padding: "4px 10px",
                    marginBottom: 16,
                  }}
                >
                  {phase.duration}
                </span>

                <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.cream50, marginBottom: 16, fontWeight: 400 }}>
                  {phase.title}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {phase.steps.map((step) => (
                    <div key={step} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CircleCheckBig size={15} color={C.gold500} aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.7)", lineHeight: 1.5 }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

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
          maxWidth: 640,
          margin: "56px auto 0",
        }}
      >
        <Calendar size={20} color={C.gold400} aria-hidden="true" style={{ flexShrink: 0 }} />
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.75)", lineHeight: 1.6 }}>
          Engagements begin within five business days of brief confirmation. Most clients receive their first
          deliverable preview at the end of Week 2.
        </p>
      </motion.div>
    </section>
  );
}
