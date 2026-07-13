"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import NetworkBG from "@/components/svgs/NetworkBG";

const EASE = [0.16, 1, 0.3, 1] as const;

const STAT_PILLS = [
  { value: "150M+", label: "Buyer Profiles Tracked" },
  { value: "111K+", label: "Intent Signals Monthly" },
  { value: "97%", label: "Client Retention" },
];

const headline = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const pillContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const pillItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function IntentDataHero() {
  return (
    <section
      className="id-hero"
      style={{
        background: C.forest900,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "140px 24px 100px",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }} aria-hidden="true">
        <NetworkBG />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <motion.div initial="hidden" animate="visible" variants={headline}>
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
            INTENT DATA
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={headline}
          className="id-hero-h1"
          style={{
            fontFamily: "var(--font-dm-serif)",
            color: C.cream50,
            lineHeight: 1.15,
            fontWeight: 400,
          }}
        >
          Know Who&apos;s Ready to Buy, Before They Fill Out a Form
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={headline}
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 18,
            color: "rgba(254,253,251,0.75)",
            maxWidth: 620,
            margin: "20px auto 0",
            lineHeight: 1.6,
          }}
        >
          TrusVera Group&apos;s Intent Data service surfaces active, in-market technology buyers by tracking real
          digital signals, so your sales and marketing teams spend time on accounts that are already looking for
          what you sell.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={headline}
          style={{ marginTop: 36, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}
        >
          <button
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
            }}
          >
            Book a Discovery Call
          </button>
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
            See How It Works
          </button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={pillContainer}
          style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}
        >
          {STAT_PILLS.map((pill) => (
            <motion.div key={pill.label} variants={pillItem} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 22, color: C.gold400 }}>{pill.value}</div>
              <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.6)" }}>
                {pill.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
