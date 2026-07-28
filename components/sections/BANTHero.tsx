"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import { BANT_CRITERIA } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const leftFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const cardSlide = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay: 0.2 } },
};

const rowContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
};

const rowItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export default function BANTHero() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <>
    <section
      className="bant-hero"
      style={{ background: C.forest900, padding: "140px 24px 100px", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      <div
        className="bant-hero-grid"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div initial="hidden" animate="visible" variants={leftFade}>
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
            BANT QUALIFIED LEADS
          </span>

          <h1
            className="bant-hero-h1"
            style={{ fontFamily: "var(--font-dm-serif)", color: C.cream50, lineHeight: 1.15, fontWeight: 400 }}
          >
            Every Lead We Deliver Is Already Qualified to Close
          </h1>

          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 17,
              color: "rgba(254,253,251,0.75)",
              marginTop: 20,
              lineHeight: 1.7,
            }}
          >
            TrusVera Group verifies Budget, Authority, Need, and Timeline on every lead before it reaches your
            sales team. No cold lists. No guesswork. Only decision-makers with confirmed purchase intent and
            active budget discussions.
          </p>

          <div style={{ marginTop: 36, display: "flex", gap: 16, flexWrap: "wrap" }}>
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
              See How BANT Works
            </button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardSlide}
          style={{
            background: C.forest850,
            border: `1px solid rgba(200,151,62,0.2)`,
            borderRadius: 12,
            overflow: "hidden",
            maxWidth: "100%",
            display: isDesktop ? undefined : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px",
              borderBottom: "1px solid rgba(200,151,62,0.15)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 12,
                color: "rgba(254,253,251,0.5)",
                letterSpacing: "0.4px",
              }}
            >
              Lead Intelligence Score
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: C.forest900,
                background: C.gold500,
                borderRadius: 6,
                padding: "3px 8px",
              }}
            >
              BANT
            </span>
          </div>

          <motion.div initial="hidden" animate="visible" variants={rowContainer}>
            {BANT_CRITERIA.map((c, i) => (
              <motion.div
                key={c.letter}
                variants={rowItem}
                className="bant-score-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  borderBottom: i === BANT_CRITERIA.length - 1 ? "none" : "1px solid rgba(200,151,62,0.08)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    textAlign: "center",
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: 24,
                    color: C.gold400,
                    flexShrink: 0,
                  }}
                >
                  {c.letter}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, fontWeight: 600, color: C.cream50 }}>
                    {c.criterion}
                  </div>
                  <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, color: "rgba(254,253,251,0.5)", marginTop: 2 }}>
                    {c.question}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    color: C.green400,
                    background: "rgba(22,107,74,0.2)",
                    border: "1px solid rgba(22,107,74,0.3)",
                    borderRadius: 10,
                    padding: "3px 8px",
                    flexShrink: 0,
                  }}
                >
                  Verified
                </span>
              </motion.div>
            ))}
          </motion.div>
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
