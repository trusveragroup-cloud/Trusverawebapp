"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WhatIsBANT() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ background: C.cream50, padding: "120px 24px" }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "left" }}>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: C.textDark, marginBottom: 28, fontWeight: 400 }}>
          What Does BANT Qualified Actually Mean?
        </h2>

        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 17, color: C.textMuted, lineHeight: 1.8, marginBottom: 20 }}>
          BANT stands for Budget, Authority, Need, and Timeline. It is the qualification framework that
          separates leads worth a sales conversation from contacts worth a nurture sequence. A BANT qualified
          lead is one where all four criteria have been confirmed through research, direct outreach, or intent
          signal analysis, not assumed from a job title and a company size.
        </p>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 17, color: C.textMuted, lineHeight: 1.8, marginBottom: 20 }}>
          Most lead generation programs stop at the list. They find a contact who matches a demographic profile
          and hand them to sales as a lead. TrusVera Group goes further. Before any lead reaches your CRM, our
          research team has confirmed that the account has allocated or available budget, that the contact has
          purchasing authority, that there is a genuine and active need for your category of solution, and that
          the account is operating within a buying timeline your team can realistically work.
        </p>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 17, color: C.textMuted, lineHeight: 1.8, marginBottom: 20 }}>
          The result is a pipeline that looks smaller on paper but performs significantly better in practice.
          Fewer leads, higher conversion, shorter cycles, and a sales team that trusts the data coming in.
        </p>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ borderLeft: `3px solid ${C.gold500}`, paddingLeft: 28, marginTop: 48 }}
        >
          <p style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: 22, color: C.forest800, lineHeight: 1.5 }}>
            A smaller pipeline of qualified opportunities outperforms a large pipeline of unverified contacts
            every single time.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
