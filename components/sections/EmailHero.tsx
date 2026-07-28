"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import NetworkBG from "@/components/svgs/NetworkBG";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function EmailHero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
    <section
      className="em-hero"
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
          backgroundImage: "url('https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      <div style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" }} aria-hidden="true">
        <NetworkBG />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}
      >
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
          EMAIL MARKETING
        </motion.span>

        <motion.h1
          variants={item}
          className="em-hero-h1"
          style={{
            fontFamily: "var(--font-dm-serif)",
            color: C.cream50,
            lineHeight: 1.08,
            fontWeight: 400,
          }}
        >
          The Right Email. The Right Person. The Right Moment.
        </motion.h1>

        <motion.p
          variants={item}
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 17,
            color: "rgba(254,253,251,0.72)",
            maxWidth: 640,
            margin: "24px auto 0",
            lineHeight: 1.75,
          }}
        >
          TrusVera Group designs, writes, and manages B2B email marketing programs that reach verified
          decision-makers, maintain inbox placement, and convert contacts at every stage of the buyer journey.
        </motion.p>

        <motion.div
          variants={item}
          style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}
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
            See Our Approach
          </button>
        </motion.div>

        <motion.div
          variants={item}
          style={{
            width: 60,
            height: 1,
            background: C.gold500,
            opacity: 0.4,
            margin: "56px auto 0",
          }}
        />

        <motion.p
          variants={item}
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontStyle: "italic",
            fontSize: 15,
            color: "rgba(254,253,251,0.45)",
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Managed campaigns. Verified contacts. Measurable results.
        </motion.p>
      </motion.div>
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
