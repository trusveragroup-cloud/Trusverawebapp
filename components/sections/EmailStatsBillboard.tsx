"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import { EMAIL_STATS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cell = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function EmailStatsBillboard() {
  return (
    <section style={{ background: C.forest900, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }}
        >
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: 0 }}>
            Programs That Perform. Numbers That Prove It.
          </h2>
        </motion.div>

        <motion.div
          className="em-billboard-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
        >
          {EMAIL_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={cell}
              className="em-billboard-cell"
              style={{
                padding: "0 40px",
                textAlign: "center",
                borderRight: i === EMAIL_STATS.length - 1 ? "none" : "1px solid rgba(200,151,62,0.15)",
              }}
            >
              <div style={{ width: 40, height: 2, background: C.gold500, margin: "0 auto 20px" }} />
              <div
                className="em-billboard-value"
                style={{ fontFamily: "var(--font-dm-serif)", color: C.gold400, lineHeight: 1, fontWeight: 400 }}
              >
                {stat.value}
              </div>
              <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, fontWeight: 600, color: C.cream50, marginTop: 12 }}>
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 12,
                  color: "rgba(254,253,251,0.45)",
                  lineHeight: 1.5,
                  marginTop: 6,
                  maxWidth: 180,
                  margin: "6px auto 0",
                }}
              >
                {stat.context}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
