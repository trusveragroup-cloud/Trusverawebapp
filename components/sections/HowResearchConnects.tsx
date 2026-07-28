"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Compass, Map, Users, Radar, Send, Mail, ScanSearch, ArrowRight, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROWS: {
  outputIcon: LucideIcon;
  outputLabel: string;
  outputSub: string;
  serviceIcon: LucideIcon;
  serviceLabel: string;
  serviceSub: string;
  href: string;
}[] = [
  {
    outputIcon: FileText,
    outputLabel: "TAM Account List",
    outputSub: "Research Output",
    serviceIcon: Radar,
    serviceLabel: "Intent Data",
    serviceSub: "Execution Service",
    href: "/services/intent-data",
  },
  {
    outputIcon: Compass,
    outputLabel: "ICP Framework",
    outputSub: "Research Output",
    serviceIcon: Send,
    serviceLabel: "Lead Generation",
    serviceSub: "Execution Service",
    href: "/services/lead-generation",
  },
  {
    outputIcon: Map,
    outputLabel: "Competitive Map",
    outputSub: "Research Output",
    serviceIcon: Mail,
    serviceLabel: "Email Marketing Messaging",
    serviceSub: "Execution Service",
    href: "/services/email-marketing",
  },
  {
    outputIcon: Users,
    outputLabel: "Buyer Personas",
    outputSub: "Research Output",
    serviceIcon: ScanSearch,
    serviceLabel: "Account Profiling",
    serviceSub: "Execution Service",
    href: "/services/account-profiling",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const row = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function HowResearchConnects() {
  return (
    <section style={{ background: C.cream100, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 13,
            letterSpacing: "2px",
            color: C.cream50,
            background: C.forest900,
            border: `1px solid ${C.forest900}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          FROM RESEARCH TO REVENUE
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, margin: "20px 0 0" }}>
          Research That Does Not Sit in a Drawer
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, marginTop: 16, lineHeight: 1.7 }}>
          Every TrusVera Group research deliverable is designed to feed directly into a specific execution
          service. Intelligence without action is just an expensive report.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 960, margin: "0 auto" }}
      >
        {ROWS.map((r) => {
          const OutputIcon = r.outputIcon;
          const ServiceIcon = r.serviceIcon;
          return (
            <motion.div key={r.outputLabel} variants={row} className="mr-connects-row">
              <div
                className="mr-connects-box"
                style={{
                  background: C.white,
                  border: `1px solid ${C.borderLight}`,
                  borderRadius: 10,
                  padding: "16px 20px",
                }}
              >
                <OutputIcon size={16} color={C.gold500} aria-hidden="true" style={{ marginBottom: 6 }} />
                <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 600, color: C.textDark }}>
                  {r.outputLabel}
                </div>
                <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, color: C.textMuted, marginTop: 2 }}>
                  {r.outputSub}
                </div>
              </div>

              <div className="mr-connects-connector">
                <motion.div
                  animate={{ x: [-4, 4, -4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <div style={{ width: 40, height: 2, background: C.gold500 }} />
                  <ArrowRight size={16} color={C.gold500} aria-hidden="true" />
                </motion.div>
              </div>

              <Link
                href={r.href}
                className="mr-connects-box mr-connects-right-box"
                style={{
                  background: C.forest900,
                  borderRadius: 10,
                  padding: "16px 20px",
                  border: "1px solid transparent",
                  transition: "border 0.2s ease",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <ServiceIcon size={16} color={C.gold400} aria-hidden="true" style={{ marginBottom: 6 }} />
                <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 600, color: C.cream50 }}>
                  {r.serviceLabel}
                </div>
                <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, color: "rgba(254,253,251,0.5)", marginTop: 2 }}>
                  {r.serviceSub}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
