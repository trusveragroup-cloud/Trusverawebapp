"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Filter, BarChart2, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { WHITEPAPER_QUALITY_POINTS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = { ShieldCheck, UserCheck, Filter, BarChart2 };

const cardsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function LeadQualitySection() {
  return (
    <section style={{ background: C.cream100, padding: "120px 24px" }}>
      <div className="wp-quality-header" style={{ maxWidth: 1180, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="wp-quality-left"
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
            LEAD QUALITY
          </span>

          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, lineHeight: 1.25, fontWeight: 400 }}>
            Content Syndication Has a Lead Quality Problem. We Solved It.
          </h2>

          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, marginTop: 20 }}>
            Most content syndication programs generate leads that sales teams immediately ignore. A job title
            that does not match your ICP. An email address that bounces. A company that is the wrong size, the
            wrong vertical, or nowhere near a buying decision. The leads arrived, which technically fulfills the
            contract, but they never had any chance of converting.
          </p>

          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, marginTop: 16 }}>
            TrusVera Group treats lead quality as the primary deliverable, not a secondary consideration.
            Intent-matched distribution means we only promote your content to contacts actively researching your
            category. Verified contact data means every lead we deliver is confirmed accurate before it arrives.
            And BANT pre-screening is available for campaigns where sales readiness is the priority.
          </p>
        </motion.div>

        <motion.div
          className="wp-quality-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardsContainer}
        >
          {WHITEPAPER_QUALITY_POINTS.map((point) => {
            const Icon = ICONS[point.icon];
            return (
              <motion.div
                key={point.title}
                variants={cardItem}
                className="wp-quality-card"
                style={{
                  background: C.white,
                  border: `1px solid ${C.borderLight}`,
                  borderRadius: 12,
                  padding: "22px 20px",
                }}
              >
                <Icon size={20} color={C.gold500} aria-hidden="true" style={{ marginBottom: 10 }} />
                <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, fontWeight: 600, color: C.textDark, marginBottom: 6 }}>
                  {point.title}
                </div>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>
                  {point.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
