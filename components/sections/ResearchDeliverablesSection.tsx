"use client";

import { motion } from "framer-motion";
import { FileText, Compass, Map, Users, Activity, TrendingUp, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { RESEARCH_DELIVERABLES } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  FileText,
  Compass,
  Map,
  Users,
  Activity,
  TrendingUp,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function ResearchDeliverablesSection() {
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
          WHAT YOU RECEIVE
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: "20px 0 0" }}>
          Six Deliverables. Each One Built to Be Acted On.
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: "rgba(254,253,251,0.65)", marginTop: 16, lineHeight: 1.7 }}>
          TrusVera Group research does not end with a slide deck. Every deliverable is a structured, actionable
          intelligence asset that feeds directly into your sales and marketing execution.
        </p>
      </motion.div>

      <motion.div
        className="mr-deliverables-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {RESEARCH_DELIVERABLES.map((d) => {
          const Icon = ICONS[d.icon];
          return (
            <motion.div
              key={d.name}
              variants={card}
              className="mr-deliverable-card"
              style={{
                background: C.forest850,
                border: "1px solid rgba(200,151,62,0.12)",
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ height: 3, background: C.gold500, width: "100%" }} />
              <div style={{ padding: "24px 24px 16px", flex: 1 }}>
                <Icon size={24} color={C.gold400} aria-hidden="true" style={{ marginBottom: 14 }} />
                <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.cream50, marginBottom: 10, fontWeight: 400 }}>
                  {d.name}
                </h3>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.6)", lineHeight: 1.65 }}>
                  {d.desc}
                </p>
              </div>
              <div
                style={{
                  padding: "12px 24px",
                  borderTop: "1px solid rgba(200,151,62,0.08)",
                  background: "rgba(200,151,62,0.04)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: "rgba(200,151,62,0.5)",
                    marginBottom: 4,
                  }}
                >
                  ENABLES
                </div>
                <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, color: "rgba(254,253,251,0.55)", lineHeight: 1.4 }}>
                  {d.enables}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
