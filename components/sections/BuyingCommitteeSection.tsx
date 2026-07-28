"use client";

import { motion } from "framer-motion";
import { Crown, ShieldCheck, Megaphone, UserCheck, Lightbulb, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { COMMITTEE_ROLES } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Crown,
  ShieldCheck,
  Megaphone,
  UserCheck,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function BuyingCommitteeSection() {
  return (
    <section style={{ background: C.forest900, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}
      >
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400 }}>
          Map the Entire Buying Committee
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: "rgba(254,253,251,0.65)", marginTop: 16, lineHeight: 1.7 }}>
          B2B technology purchases involve an average of six to ten stakeholders. TrusVera Group maps every
          role in the buying committee so your team knows who to reach, in what order, and with what message.
        </p>
      </motion.div>

      <motion.div
        className="ap-committee-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 900, margin: "0 auto" }}
      >
        {COMMITTEE_ROLES.map((role) => {
          const Icon = ICONS[role.icon];
          return (
            <motion.div
              key={role.title}
              variants={item}
              className="ap-committee-card"
              style={{
                background: C.forest850,
                border: "1px solid rgba(200,151,62,0.12)",
                borderRadius: 14,
                padding: "36px 32px",
              }}
            >
              <Icon size={28} color={C.gold400} aria-hidden="true" style={{ marginBottom: 20 }} />
              <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 22, color: C.cream50, marginBottom: 12, fontWeight: 400 }}>
                {role.title}
              </h3>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.65)", lineHeight: 1.7 }}>
                {role.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          background: "rgba(200,151,62,0.06)",
          border: "1px solid rgba(200,151,62,0.15)",
          borderRadius: 10,
          padding: "20px 28px",
          maxWidth: 900,
          margin: "40px auto 0",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Lightbulb size={20} color={C.gold400} aria-hidden="true" style={{ flexShrink: 0 }} />
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.75)", lineHeight: 1.6 }}>
          TrusVera Group profiles include direct contact details, LinkedIn profiles, and engagement history for
          every mapped stakeholder, not just job titles.
        </p>
      </motion.div>
    </section>
  );
}
