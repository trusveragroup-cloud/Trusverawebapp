"use client";

import { motion } from "framer-motion";
import { CircleCheckBig, CalendarCheck } from "lucide-react";
import { C } from "@/lib/colors";
import { CAMPAIGN_TIMELINE } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const column = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function CampaignTimeline() {
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
          HOW A CAMPAIGN RUNS
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: "20px 0 0" }}>
          What Happens Between Day One and Your First Meeting
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: "rgba(254,253,251,0.65)", marginTop: 16, lineHeight: 1.7 }}>
          Every TrusVera Group lead generation campaign follows a structured launch sequence. Here is exactly
          what gets done and when.
        </p>
      </motion.div>

      <div className="lg-timeline-wrap" style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="lg-timeline-line" aria-hidden="true" />
        <motion.div
          className="lg-timeline-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
        >
          {CAMPAIGN_TIMELINE.map((phase) => (
            <motion.div key={phase.phase} variants={column} className="lg-timeline-phase">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
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
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      color: C.gold400,
                      textAlign: "center",
                      lineHeight: 1.2,
                    }}
                  >
                    {phase.phase}
                  </span>
                </div>
              </div>

              <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.cream50, marginBottom: 16, fontWeight: 400 }}>
                {phase.title}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {phase.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CircleCheckBig size={15} color={C.gold500} aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.7)", lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
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
          maxWidth: 680,
          margin: "56px auto 0",
        }}
      >
        <CalendarCheck size={20} color={C.gold400} aria-hidden="true" style={{ flexShrink: 0 }} />
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.75)", lineHeight: 1.6 }}>
          Most campaigns deliver the first qualified lead within 72 hours of launch. Your weekly pipeline
          report lands every Friday.
        </p>
      </motion.div>
    </section>
  );
}
