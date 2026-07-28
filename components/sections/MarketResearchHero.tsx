"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { C } from "@/lib/colors";
import RadarSVG from "@/components/svgs/RadarSVG";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const TRUST_LINES = [
  "Delivered in five weeks from brief to activation",
  "Built from 150M+ verified technology buyer profiles",
  "Every deliverable feeds directly into execution",
];

export default function MarketResearchHero() {
  return (
    <section
      className="mr-hero"
      style={{
        background: C.forest900,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "150px 24px 80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      <div
        className="mr-hero-grid"
        style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}
      >
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.span
            variants={item}
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
              marginBottom: 24,
            }}
          >
            MARKET RESEARCH
          </motion.span>

          <motion.h1
            variants={item}
            className="mr-hero-h1"
            style={{
              fontFamily: "var(--font-dm-serif)",
              color: C.cream50,
              lineHeight: 1.05,
              fontWeight: 400,
            }}
          >
            Intelligence Before Action.
          </motion.h1>

          <motion.p
            variants={item}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 17,
              color: "rgba(254,253,251,0.7)",
              lineHeight: 1.75,
              maxWidth: 520,
              marginTop: 20,
            }}
          >
            Most B2B technology companies go to market with an incomplete understanding of their opportunity,
            their buyer, and their competition. TrusVera Group&apos;s market research changes that. We deliver
            the intelligence that makes every sales conversation, every campaign, and every positioning
            decision more precise.
          </motion.p>

          <motion.div variants={item} style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                background: C.gold500,
                color: C.forest900,
                border: "none",
                borderRadius: 8,
                padding: "14px 32px",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Commission a Research Brief
            </Link>
            <button
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                color: C.cream50,
                borderRadius: 8,
                padding: "14px 32px",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              See What We Deliver
            </button>
          </motion.div>

          <motion.div variants={item} style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 32 }}>
            {TRUST_LINES.map((line) => (
              <div key={line} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Check size={14} color={C.gold400} aria-hidden="true" />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.5)" }}>
                  {line}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="mr-hero-radar-wrap">
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            style={{
              background: "rgba(15,61,46,0.3)",
              borderRadius: 16,
              border: "1px solid rgba(200,151,62,0.15)",
              padding: 32,
            }}
          >
            <RadarSVG />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
