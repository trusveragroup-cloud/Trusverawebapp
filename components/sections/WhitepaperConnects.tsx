"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/colors";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "Explore Intent Data", href: "/services/intent-data" },
  { label: "Explore Account Profiling", href: "/services/account-profiling" },
  { label: "Explore BANT Leads", href: "/services/bant-qualified-leads" },
];

export default function WhitepaperConnects() {
  return (
    <section style={{ background: C.forest900, padding: "100px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <h2
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: 32,
            color: C.cream50,
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto",
            fontWeight: 400,
          }}
        >
          Whitepaper Promotion Is the Top of the Funnel. TVG Covers Everything Below It.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 16,
            color: "rgba(254,253,251,0.65)",
            lineHeight: 1.75,
            textAlign: "center",
            maxWidth: 680,
            margin: "16px auto 0",
          }}
        >
          Every verified lead captured from a whitepaper download enters TrusVera Group&apos;s full pipeline
          intelligence system. Leads are enriched with Account Profiling data before reaching your team.
          High-value leads can be BANT-qualified before a sales call is made. And intent data signals help your
          team prioritise which leads to call first and which to nurture. Your whitepaper starts the
          conversation. We make sure it goes somewhere.
        </p>

        <div className="wp-connects-row" style={{ marginTop: 32 }}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="wp-connects-link"
              style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, fontWeight: 600, color: C.gold400 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.gold300;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.gold400;
              }}
            >
              {link.label}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
