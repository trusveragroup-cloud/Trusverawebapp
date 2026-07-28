"use client";

import { motion } from "framer-motion";
import { Globe, Mail, BarChart2, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { WHITEPAPER_CHANNELS } from "@/lib/data";

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

const LUCIDE_ICONS: Record<string, LucideIcon> = { Globe, Mail, BarChart2 };

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

export default function DistributionChannels() {
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
          DISTRIBUTION CHANNELS
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: "20px 0 0" }}>
          Four Channels. One Coordinated Distribution Program.
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: "rgba(254,253,251,0.65)", marginTop: 16, lineHeight: 1.7 }}>
          TrusVera Group does not choose one channel and hope. Every whitepaper promotion program uses all four
          channels simultaneously, managed as a single coordinated campaign with unified reporting.
        </p>
      </motion.div>

      <motion.div
        className="wp-channels-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        {WHITEPAPER_CHANNELS.map((ch) => (
          <motion.div
            key={ch.channel}
            variants={card}
            className="wp-channel-card"
            style={{
              background: C.forest850,
              border: ch.tagColor === "gold" ? "1px solid rgba(200,151,62,0.2)" : "1px solid rgba(15,61,46,0.5)",
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
                    color: ch.tagColor === "gold" ? C.gold500 : C.cream50,
                    background: ch.tagColor === "gold" ? "rgba(200,151,62,0.08)" : "rgba(15,61,46,0.4)",
                    border: ch.tagColor === "gold" ? "1px solid rgba(200,151,62,0.2)" : "1px solid rgba(200,151,62,0.15)",
                  }}
                >
                  {ch.tag}
                </span>
              </div>

              <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 22, color: C.cream50, marginTop: 16, marginBottom: 8, fontWeight: 400 }}>
                {ch.channel}
              </h3>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.6)", lineHeight: 1.65, marginBottom: 0 }}>
                {ch.desc}
              </p>
            </div>

            <div style={{ height: 1, background: "rgba(200,151,62,0.08)", width: "100%", display: "block", margin: 0 }} />

            <div style={{ padding: "16px 28px 24px" }}>
              <div
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: C.gold400,
                  marginBottom: 8,
                }}
              >
                HOW WE RUN IT
              </div>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.65)", lineHeight: 1.6, marginBottom: 12 }}>
                {ch.tvgApproach}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(254,253,251,0.6)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "4px 10px",
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
