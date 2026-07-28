"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/colors";

const EASE = [0.16, 1, 0.3, 1] as const;

const BARS = [
  { label: "Email", barWidth: "85%" },
  { label: "LinkedIn", barWidth: "65%" },
  { label: "Phone", barWidth: "45%" },
];

function CampaignArchitectureCard() {
  return (
    <>
      <div
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: 11,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "rgba(254,253,251,0.4)",
        }}
      >
        Campaign Architecture
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
        {BARS.map((bar, index) => (
          <div key={bar.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 11,
                color: "rgba(254,253,251,0.5)",
                width: 80,
                flexShrink: 0,
                textAlign: "right",
              }}
            >
              {bar.label}
            </span>
            <div
              style={{
                flex: 1,
                height: 6,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: bar.barWidth }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: EASE, delay: index * 0.15 }}
                style={{ height: "100%", borderRadius: 3, background: C.gold500 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: "rgba(200,151,62,0.15)", marginTop: 24 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
        <ArrowRight size={16} color={C.gold400} aria-hidden="true" />
        <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, color: "rgba(254,253,251,0.5)" }}>
          Feeds into your pipeline
        </span>
      </div>
    </>
  );
}

export default function WhatIsLeadGen() {
  return (
    <section style={{ background: C.cream50, padding: "120px 24px" }}>
      <div className="lg-what-grid" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: C.textDark, marginBottom: 24, fontWeight: 400 }}>
            Lead Generation Is a System, Not a List
          </h2>

          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, lineHeight: 1.78, marginBottom: 18 }}>
            The word lead generation is overloaded. It has been used to describe everything from buying a
            contact list to running a six-month inbound content program. At TrusVera Group, we use it to mean
            one specific thing: a structured, repeatable outreach program that puts verified, in-market
            contacts into your sales team&apos;s hands through multiple coordinated channels, at a volume and
            velocity your team can work.
          </p>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, lineHeight: 1.78, marginBottom: 18 }}>
            The difference between lead generation that works and lead generation that wastes budget is almost
            entirely about what happens before the first message goes out. Who are you targeting, exactly. What
            channel are they most reachable on. What message speaks to the problem they are actually trying to
            solve right now. TrusVera Group answers all three questions before a single sequence is launched.
          </p>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, lineHeight: 1.78, marginBottom: 0 }}>
            The result is a campaign that reaches the right people, in the right place, with the right message,
            and delivers replies, meetings, and qualified contacts directly into your CRM, without your team
            having to build, manage, or optimise any of it.
          </p>
        </motion.div>

        <motion.div
          className="lg-what-illustration"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{ background: C.forest900, borderRadius: 12, padding: 32, border: "1px solid rgba(200,151,62,0.15)" }}
        >
          <CampaignArchitectureCard />
        </motion.div>
      </div>
    </section>
  );
}
