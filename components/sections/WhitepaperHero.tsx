"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { C } from "@/lib/colors";
import WhitepaperMockup from "@/components/svgs/WhitepaperMockup";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const TRUST_LINES = [
  "Every lead verified before delivery",
  "Intent-matched distribution to in-market buyers",
  "Campaign live within 72 hours of content submission",
];

export default function WhitepaperHero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
    <section
      className="wp-hero"
      style={{
        background: C.cream50,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1553484771-371a605b060b?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      <div
        className="wp-hero-grid"
        style={{ maxWidth: 1180, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}
      >
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.span
            variants={item}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 13,
              letterSpacing: "2px",
              color: C.forest700,
              background: "rgba(15,61,46,0.06)",
              border: "1px solid rgba(15,61,46,0.15)",
              borderRadius: 20,
              padding: "6px 16px",
              marginBottom: 24,
            }}
          >
            WHITEPAPER PROMOTION
          </motion.span>

          <motion.h1
            variants={item}
            className="wp-hero-h1"
            style={{
              fontFamily: "var(--font-dm-serif)",
              color: C.forest900,
              lineHeight: 1.1,
              marginBottom: 20,
              fontWeight: 400,
            }}
          >
            Your Whitepaper Exists. Now Make It Work.
          </motion.h1>

          <motion.p
            variants={item}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 17,
              color: C.textMuted,
              lineHeight: 1.75,
              maxWidth: 500,
            }}
          >
            TrusVera Group distributes your whitepapers and research reports to verified, intent-matched
            technology buyers across four channels, captures a verified lead from every download, and delivers
            a qualified contact list directly to your sales team.
          </motion.p>

          <motion.div
            variants={item}
            style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8 }}
          >
            {TRUST_LINES.map((line) => (
              <div key={line} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={15} color={C.forest700} aria-hidden="true" />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted }}>
                  {line}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}
          >
            <Link
              href="/contact"
              style={{
                background: C.forest900,
                color: C.cream50,
                borderRadius: 8,
                padding: "14px 32px",
                fontWeight: 600,
                border: "none",
                fontSize: 15,
                fontFamily: "var(--font-inter), sans-serif",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textDecoration: "none",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = C.forest700;
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = C.forest900;
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Promote Your Whitepaper
            </Link>
            <button
              onClick={() => setVideoOpen(true)}
              style={{
                background: "transparent",
                color: C.forest700,
                border: "1px solid rgba(15,61,46,0.25)",
                borderRadius: 8,
                padding: "14px 32px",
                fontSize: 15,
                fontFamily: "var(--font-inter), sans-serif",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(15,61,46,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              See How It Works
            </button>
          </motion.div>
        </motion.div>

        <div className="wp-hero-visual">
          <WhitepaperMockup />
        </div>
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
