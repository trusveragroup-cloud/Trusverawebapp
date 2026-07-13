"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import SignalPulse from "@/components/svgs/SignalPulse";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WhatIsIntentData() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ background: C.cream50, padding: "120px 24px" }}
    >
      <div className="id-what-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: 36,
              color: C.textDark,
              marginBottom: 24,
              fontWeight: 400,
            }}
          >
            What Is B2B Intent Data?
          </h2>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, lineHeight: 1.7, marginBottom: 16 }}>
            Intent data is the digital footprint a buyer leaves behind while researching a purchase. Every
            whitepaper download, product comparison, competitor search, and repeat visit to a category of content
            is a signal. On its own, one signal means little. Patterns across dozens of signals, tracked
            consistently over time, are what reveal genuine purchase intent.
          </p>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, lineHeight: 1.7, marginBottom: 16 }}>
            At TrusVera Group, we treat intent data as the earliest, most reliable indicator in the B2B buying
            journey. Instead of waiting for a prospect to raise their hand, our intent engine identifies the
            accounts already raising it quietly, through their online behavior, weeks before they ever reach out
            to a vendor.
          </p>
        </div>
        <div>
          <SignalPulse />
        </div>
      </div>
    </motion.section>
  );
}
