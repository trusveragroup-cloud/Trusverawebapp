"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WhatIsEmailMarketing() {
  return (
    <section className="em-what" style={{ background: C.cream50, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ maxWidth: 860, margin: "0 auto" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: 38,
            color: C.textDark,
            fontWeight: 400,
            marginBottom: 32,
            lineHeight: 1.2,
          }}
        >
          B2B Email Marketing Is Not About Sending More Emails
        </h2>

        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 17, color: C.textMuted, lineHeight: 1.8, marginBottom: 20 }}>
          The inbox is the most personal digital space a business contact owns. It is also the most abused. The
          average B2B decision-maker receives over 120 emails per day, and most of them are ignored not because
          email does not work, but because most email marketing programs treat every contact the same way, with
          the same message, on the same schedule, regardless of what the recipient actually cares about.
        </p>

        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 17, color: C.textMuted, lineHeight: 1.8, marginBottom: 20 }}>
          Effective B2B email marketing is built on three things that most programs skip entirely: verified
          contact data, genuine personalisation, and technical deliverability. Without verified data, you are
          sending to ghost inboxes. Without personalisation, you are adding to the noise. Without
          deliverability, you are not landing in the inbox at all.
        </p>

        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 17, color: C.textMuted, lineHeight: 1.8, marginBottom: 0 }}>
          TrusVera Group manages all three. Every campaign we run starts with a verified, role-matched contact
          list drawn from our 150M+ buyer profile database. Every sequence is written with messaging specific to
          the recipient's role, industry, and buying context. And every send is monitored for inbox placement,
          open rates, and reply rates in real time so we can optimise before performance drops.
        </p>

        <motion.blockquote
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          style={{
            marginTop: 48,
            paddingLeft: 32,
            borderLeft: `3px solid ${C.gold500}`,
            fontFamily: "var(--font-playfair), serif",
            fontStyle: "italic",
            fontSize: 21,
            color: C.forest800,
            lineHeight: 1.55,
          }}
        >
          The difference between an email that gets a reply and one that gets deleted is rarely the product. It
          is almost always the message, the timing, and the list.
        </motion.blockquote>
      </motion.div>
    </section>
  );
}
