"use client";

import { motion } from "framer-motion";
import { Mail, Phone, FileText, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { LEADGEN_CHANNELS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

function LinkedinIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" fill={color} />
      <path d="M5.25 7C6.35 7 7.25 6.1 7.25 5C7.25 3.9 6.35 3 5.25 3C4.15 3 3.25 3.9 3.25 5C3.25 6.1 4.15 7 5.25 7Z" fill={color} />
      <path d="M13.5 8.5H10.25V20.5H13.5V14.3C13.5 12.6 14.15 11.4 15.65 11.4C17.15 11.4 17.5 12.6 17.5 14.3V20.5H20.75V13.5C20.75 10 19.15 8.2 16.35 8.2C14.5 8.2 13.7 9.2 13.5 9.8V8.5Z" fill={color} />
    </svg>
  );
}

const LUCIDE_ICONS: Record<string, LucideIcon> = { Mail, Phone, FileText };

function ChannelIcon({ name, size, color }: { name: string; size: number; color: string }) {
  if (name === "Linkedin") return <LinkedinIcon size={size} color={color} />;
  const Icon = LUCIDE_ICONS[name];
  return <Icon size={size} color={color} aria-hidden="true" />;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function LeadGenChannels() {
  return (
    <section style={{ background: C.cream100, padding: "120px 24px" }}>
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
            color: C.forest700,
            background: "rgba(15,61,46,0.06)",
            border: `1px solid ${C.forest700}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          OUR CHANNELS
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, margin: "20px 0 0" }}>
          Four Channels. One Coordinated Campaign.
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, marginTop: 16, lineHeight: 1.7 }}>
          We do not pick one channel and hope for the best. Every TrusVera Group lead generation program
          combines the channels that reach your buyers most effectively, managed and optimised as a single
          coordinated campaign.
        </p>
      </motion.div>

      <motion.div
        className="lg-channels-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        {LEADGEN_CHANNELS.map((ch) => (
          <motion.div
            key={ch.channel}
            variants={card}
            className="lg-channel-card"
            style={{
              background: C.white,
              border: `1px solid ${C.borderLight}`,
              borderRadius: 14,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "28px 28px 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "rgba(200,151,62,0.08)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChannelIcon name={ch.icon} size={20} color={C.gold500} />
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
                    color: ch.tagColor === "gold" ? C.gold500 : C.forest700,
                    background: ch.tagColor === "gold" ? "rgba(200,151,62,0.08)" : "rgba(15,61,46,0.06)",
                    border: ch.tagColor === "gold" ? "1px solid rgba(200,151,62,0.2)" : "1px solid rgba(15,61,46,0.15)",
                  }}
                >
                  {ch.tag}
                </span>
              </div>

              <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 22, color: C.textDark, marginTop: 16, marginBottom: 8, fontWeight: 400 }}>
                {ch.channel}
              </h3>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: C.textMuted, lineHeight: 1.65, marginBottom: 0 }}>
                {ch.desc}
              </p>
            </div>

            <div style={{ height: 1, background: C.borderLight, width: "100%", display: "block", margin: 0 }} />

            <div style={{ padding: "18px 28px 28px" }}>
              <div
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  color: C.gold500,
                  marginBottom: 10,
                }}
              >
                HOW WE RUN IT
              </div>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 12 }}>
                {ch.tvgApproach}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.forest700,
                  background: "rgba(15,61,46,0.05)",
                  borderRadius: 8,
                  padding: "5px 12px",
                  display: "inline-block",
                }}
              >
                {ch.metric}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
