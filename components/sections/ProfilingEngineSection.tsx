"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { C } from "@/lib/colors";
import { PROFILING_STATS } from "@/lib/data";
import { AnimatedNum } from "@/lib/hooks/useAnimatedNum";

const ProfilingEngineChart = dynamic(() => import("@/components/charts/ProfilingEngineChart"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;
const SEGMENT_COLORS = [C.gold500, C.gold400, C.forest600, C.gold300];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function ProfilingEngineSection() {
  return (
    <section style={{ background: C.forest800, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 56px" }}
      >
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
          THE TRUSVERA PROFILING ENGINE
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: "20px 0 0" }}>
          Four Intelligence Sources. One Complete Account Profile.
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: "rgba(254,253,251,0.65)", marginTop: 16, lineHeight: 1.7 }}>
          Every profile we deliver is assembled from four independent data sources, cross-validated for
          accuracy, and scored against your ICP criteria before it reaches your sales team.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="ap-engine-panel"
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          background: C.forest850,
          border: "1px solid rgba(200,151,62,0.15)",
          borderRadius: 16,
          padding: "48px 40px",
          boxShadow: "0 24px 60px rgba(6,21,16,0.3)",
        }}
      >
        <div className="ap-engine-chart-col">
          <ProfilingEngineChart />
        </div>

        <motion.div
          className="ap-engine-stats-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
        >
          <div className="ap-engine-stats-grid">
            {PROFILING_STATS.map((stat, i) => (
              <motion.div key={stat.label} variants={item}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: SEGMENT_COLORS[i % SEGMENT_COLORS.length], flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 600, color: C.cream50 }}>
                    {stat.label}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 30, color: C.gold400, marginTop: 4 }}>
                  <AnimatedNum value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                </div>
                <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, color: "rgba(254,253,251,0.55)", lineHeight: 1.5, marginTop: 4 }}>
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
