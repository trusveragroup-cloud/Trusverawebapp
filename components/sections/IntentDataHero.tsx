"use client";

import { useState } from "react";
import Link from "next/link";
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
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          zIndex: 0,
        }}
      />

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
            Book a Discovery Call
          </Link>
          <button
            onClick={() => setVideoOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: C.cream100,
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: C.gold500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M0 0L10 6L0 12V0Z" fill="#0F3D25" />
              </svg>
            </div>
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

    {videoOpen && (
      <div
        onClick={() => setVideoOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 900,
            borderRadius: 12,
            overflow: "hidden",
            background: "#000",
          }}
        >
          <button
            onClick={() => setVideoOpen(false)}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 10,
              background: "rgba(0,0,0,0.6)",
              border: "none",
              color: "white",
              width: 36,
              height: 36,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
          <video
            autoPlay
            controls
            playsInline
            style={{ width: "100%", display: "block", maxHeight: "80vh" }}
          >
            <source src="/video/Whatwedo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    )}
    </>
  );
}
