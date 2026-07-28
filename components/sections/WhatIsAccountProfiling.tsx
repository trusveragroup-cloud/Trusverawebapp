"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import AccountCard from "@/components/svgs/AccountCard";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WhatIsAccountProfiling() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ background: C.cream50, padding: "120px 24px" }}
    >
      <div className="ap-what-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            What Is B2B Account Profiling?
          </h2>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, lineHeight: 1.75, marginBottom: 16 }}>
            Account profiling is the process of building a structured, research-backed intelligence file on
            every target account before your sales team engages. Not just a company name and a LinkedIn URL.
            A real profile covers how the organization is structured, who controls the budget, what technology
            they already run, when their fiscal year ends, and what business events have recently changed their
            buying posture.
          </p>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, lineHeight: 1.75, marginBottom: 16 }}>
            At TrusVera Group, every account profile we deliver is built from six layers of data: firmographic,
            technographic, buying committee, growth signals, budget cycle, and ICP fit score. The result is a
            single, structured document your reps can act on immediately, without spending hours on manual
            research before every call.
          </p>
        </div>
        <div>
          <AccountCard />
        </div>
      </div>
    </motion.section>
  );
}
