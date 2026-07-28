"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ListFilter, ChartBar, Settings, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { EMAIL_DELIVERABILITY } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = { ShieldCheck, ListFilter, ChartBar, Settings };

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function EmailDeliverability() {
  return (
    <section style={{ background: C.cream50, padding: "120px 24px" }}>
      <div className="em-deliverability-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", alignItems: "center" }}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="em-deliverability-text"
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
            DELIVERABILITY
          </span>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, lineHeight: 1.25, margin: 0 }}>
            Getting to the Inbox Is Half the Battle
          </h2>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, marginTop: 20, marginBottom: 0 }}>
            Most email marketing programs focus entirely on what to say and completely ignore whether it is
            actually being delivered. If your emails are landing in the spam folder, your open rate is not a
            marketing problem. It is a technical one. TrusVera Group treats deliverability as a core part of
            campaign management, not an afterthought.
          </p>
        </motion.div>

        <motion.div
          className="em-deliverability-cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
        >
          {EMAIL_DELIVERABILITY.map((d) => {
            const Icon = ICONS[d.icon];
            return (
              <motion.div
                key={d.title}
                variants={card}
                className="em-deliverability-card"
                style={{
                  background: C.white,
                  border: `1px solid ${C.borderLight}`,
                  borderRadius: 12,
                  padding: "24px 22px",
                }}
              >
                <Icon size={22} color={C.gold500} aria-hidden="true" style={{ marginBottom: 12 }} />
                <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, fontWeight: 600, color: C.textDark, marginBottom: 8 }}>
                  {d.title}
                </h3>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 0 }}>
                  {d.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
