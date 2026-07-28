"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import NetworkBG from "@/components/svgs/NetworkBG";

const EASE = [0.16, 1, 0.3, 1] as const;

const CHANNEL_PILLS = ["Email", "LinkedIn", "Phone and SDR", "Content Syndication"];

const headline = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const pillContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};

const pillItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function LeadGenHero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
    <section
      className="lg-hero"
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
          backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      <div style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }} aria-hidden="true">
        <NetworkBG />
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
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
            LEAD GENERATION
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={headline}
          className="lg-hero-h1"
          style={{
            fontFamily: "var(--font-dm-serif)",
            color: C.cream50,
            lineHeight: 1.1,
            fontWeight: 400,
          }}
        >
          Stop Building Lists. Start Building Pipeline.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={headline}
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 18,
            color: "rgba(254,253,251,0.72)",
            maxWidth: 660,
            margin: "20px auto 0",
            lineHeight: 1.7,
          }}
        >
          TrusVera Group designs and runs multi-channel B2B lead generation programs that reach your ideal
          buyers across email, LinkedIn, phone, and content syndication. We deliver verified, sales-ready
          contacts. Your team closes them.
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
            See Our Channels
          </button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={pillContainer}
          style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}
        >
          {CHANNEL_PILLS.map((pill) => (
            <motion.span
              key={pill}
              variants={pillItem}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(254,253,251,0.6)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "5px 14px",
              }}
            >
              {pill}
            </motion.span>
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
