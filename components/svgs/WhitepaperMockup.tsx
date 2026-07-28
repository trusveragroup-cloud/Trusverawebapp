"use client";

import { motion } from "framer-motion";
import { Download, User, Mail, Building2, CheckCircle2 } from "lucide-react";
import { C } from "@/lib/colors";
import { useAnimatedNum } from "@/lib/hooks/useAnimatedNum";

const EASE = [0.16, 1, 0.3, 1] as const;

const bodyContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const bodyGroup = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function TextLine({ width, height = 5 }: { width: string | number; height?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{ width, height, background: C.cream200, borderRadius: 3 }}
    />
  );
}

const BODY_GROUPS: string[][] = [
  ["100%", "85%", "92%"],
  ["100%", "78%", "88%", "60%"],
  ["100%", "90%", "70%"],
];

export default function WhitepaperMockup() {
  const [counterRef, count] = useAnimatedNum(2847);

  return (
    <div className="wp-mockup-wrap" aria-hidden="true">
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          position: "relative",
          background: C.white,
          border: `1px solid ${C.borderLight}`,
          borderRadius: 16,
          padding: "32px 28px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ background: C.forest900, borderRadius: 8, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ width: 60, height: 6, background: C.gold500, borderRadius: 3, marginBottom: 8 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ width: 120, height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 3 }} />
            <div style={{ width: 90, height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 3 }} />
            <div style={{ width: 105, height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 3 }} />
          </div>
        </div>

        <motion.div initial="hidden" animate="visible" variants={bodyContainer}>
          {BODY_GROUPS.map((widths, gi) => (
            <motion.div
              key={gi}
              variants={bodyGroup}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginBottom: gi === BODY_GROUPS.length - 1 ? 0 : 20,
              }}
            >
              {widths.map((w, wi) => (
                <TextLine key={wi} width={w} />
              ))}
            </motion.div>
          ))}
        </motion.div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
            paddingTop: 16,
            borderTop: `1px solid ${C.borderLight}`,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: C.textLight,
              letterSpacing: "0.3px",
            }}
          >
            TrusVera Group
          </span>

          <div
            ref={counterRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(200,151,62,0.08)",
              border: "1px solid rgba(200,151,62,0.2)",
              borderRadius: 8,
              padding: "4px 10px",
            }}
          >
            <Download size={12} color={C.gold500} aria-hidden="true" />
            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, fontWeight: 600, color: C.gold500 }}>
              {count.toLocaleString()} downloads
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="wp-lead-capture"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
        style={{
          background: C.white,
          border: `1px solid ${C.borderLight}`,
          borderRadius: 12,
          padding: "16px 18px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: C.green400 }}
          />
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, fontWeight: 600, color: C.textDark }}>
            New lead captured
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <User size={12} color={C.textLight} aria-hidden="true" />
            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, color: C.textMuted }}>
              VP of Technology, Acme Corp
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Mail size={12} color={C.textLight} aria-hidden="true" />
            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, color: C.textMuted }}>
              j.smith@acmecorp.com
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Building2 size={12} color={C.textLight} aria-hidden="true" />
            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, color: C.textMuted }}>
              Enterprise, 500-1000 employees
            </span>
          </div>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginTop: 10,
            background: "rgba(15,61,46,0.06)",
            border: "1px solid rgba(15,61,46,0.15)",
            borderRadius: 6,
            padding: "3px 8px",
          }}
        >
          <CheckCircle2 size={11} color={C.forest700} aria-hidden="true" />
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 10, fontWeight: 600, color: C.forest700 }}>
            ICP Match: High
          </span>
        </div>
      </motion.div>
    </div>
  );
}
