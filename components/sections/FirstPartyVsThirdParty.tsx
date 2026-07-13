"use client";

import { motion } from "framer-motion";
import { FingerprintPattern, Globe, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { INTENT_TYPES, INTENT_COMPARISON_ROWS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Fingerprint: FingerprintPattern,
  Globe,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function column(direction: "left" | "right") {
  return {
    hidden: { opacity: 0, x: direction === "left" ? -24 : 24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  };
}

export default function FirstPartyVsThirdParty() {
  const [first, second] = INTENT_TYPES;
  const FirstIcon = ICONS[first.icon];
  const SecondIcon = ICONS[second.icon];

  return (
    <section style={{ background: C.forest900, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}
      >
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400 }}>
          First-Party vs. Third-Party Intent Data
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: "rgba(254,253,251,0.65)", marginTop: 16, lineHeight: 1.7 }}>
          Both matter. Together, they cover the full arc of a buyer&apos;s journey, not just the fraction that
          happens on your own site.
        </p>
      </motion.div>

      <motion.div
        className="id-fpvs-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        style={{ maxWidth: 880, margin: "0 auto 64px" }}
      >
        <motion.div variants={column("left")} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "rgba(200,151,62,0.08)",
              border: "1px solid rgba(200,151,62,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <FirstIcon size={28} color={C.gold400} aria-hidden="true" />
          </div>
          <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 22, color: C.cream50, fontWeight: 400 }}>{first.title}</h3>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: "rgba(254,253,251,0.65)", lineHeight: 1.7, marginTop: 12 }}>
            {first.desc}
          </p>
        </motion.div>

        <div className="id-fpvs-divider" aria-hidden="true" />

        <motion.div variants={column("right")} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "rgba(200,151,62,0.08)",
              border: "1px solid rgba(200,151,62,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <SecondIcon size={28} color={C.gold400} aria-hidden="true" />
          </div>
          <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 22, color: C.cream50, fontWeight: 400 }}>{second.title}</h3>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: "rgba(254,253,251,0.65)", lineHeight: 1.7, marginTop: 12 }}>
            {second.desc}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        style={{ maxWidth: 880, margin: "0 auto", overflowX: "auto" }}
      >
        <table className="id-compare-table">
          <thead>
            <tr style={{ background: "rgba(200,151,62,0.06)" }}>
              <th
                scope="col"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                  color: C.gold300,
                }}
              >
                {""}
              </th>
              <th
                scope="col"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                  color: C.gold300,
                }}
              >
                First-Party
              </th>
              <th
                scope="col"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                  color: C.gold300,
                }}
              >
                Third-Party
              </th>
            </tr>
          </thead>
          <tbody>
            {INTENT_COMPARISON_ROWS.map((row, i) => (
              <tr key={row.label} style={{ borderTop: i === 0 ? "none" : "1px solid rgba(200,151,62,0.1)" }}>
                <td
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(254,253,251,0.5)",
                    background: "rgba(255,255,255,0.02)",
                    width: 160,
                  }}
                >
                  {row.label}
                </td>
                <td
                  data-label="First-Party"
                  style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.85)", lineHeight: 1.6 }}
                >
                  {row.firstParty}
                </td>
                <td
                  data-label="Third-Party"
                  style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.85)", lineHeight: 1.6 }}
                >
                  {row.thirdParty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          fontFamily: "var(--font-playfair)",
          fontStyle: "italic",
          fontSize: 20,
          color: C.gold300,
          textAlign: "center",
          maxWidth: 700,
          margin: "48px auto 0",
        }}
      >
        Used together, first-party and third-party intent data give you the complete arc of a buyer&apos;s journey.
      </motion.p>
    </section>
  );
}
