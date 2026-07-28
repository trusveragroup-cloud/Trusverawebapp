"use client";

import { motion } from "framer-motion";
import { Zap, User, Clock, MousePointerClick, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { EMAIL_ANATOMY_LAYERS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = { Zap, User, Clock, MousePointerClick };

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const row = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function EmailCampaignAnatomy() {
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
            background: "rgba(15,61,46,0.06)",
            border: `1px solid ${C.forest700}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          CAMPAIGN ANATOMY
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, margin: "20px 0 0" }}>
          What Goes Into Every Email We Send
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, marginTop: 16, lineHeight: 1.7 }}>
          Most email campaigns fail at one of four layers. TrusVera Group manages all four as a single,
          coordinated system.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 840, margin: "0 auto" }}
      >
        {EMAIL_ANATOMY_LAYERS.map((layer, i) => {
          const Icon = ICONS[layer.icon];
          const isLast = i === EMAIL_ANATOMY_LAYERS.length - 1;
          return (
            <motion.div
              key={layer.layer}
              variants={row}
              className="em-anatomy-row"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 32,
                padding: "32px 0",
                borderBottom: isLast ? "none" : `1px solid ${C.borderLight}`,
              }}
            >
              <div
                className="em-anatomy-number-col"
                style={{
                  width: 64,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: 4,
                }}
              >
                <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: C.gold400, lineHeight: 1 }}>
                  {layer.number}
                </span>
                {!isLast && (
                  <div
                    className="em-anatomy-connector"
                    style={{ width: 1, flex: 1, minHeight: 32, background: "rgba(200,151,62,0.2)", marginTop: 8 }}
                  />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <Icon size={18} color={C.gold500} aria-hidden="true" />
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.textDark,
                      letterSpacing: "0.3px",
                      textTransform: "uppercase",
                    }}
                  >
                    {layer.layer}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.7, marginBottom: 0 }}>
                  {layer.desc}
                </p>
              </div>

              <div
                className="em-anatomy-metric-col"
                style={{ width: 200, flexShrink: 0, display: "flex", alignItems: "flex-start", paddingTop: 4 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.forest700,
                    background: "rgba(15,61,46,0.06)",
                    border: "1px solid rgba(15,61,46,0.15)",
                    borderRadius: 8,
                    padding: "6px 12px",
                    lineHeight: 1.4,
                    textAlign: "center",
                  }}
                >
                  {layer.metric}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
