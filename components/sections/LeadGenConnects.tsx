"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/colors";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "Explore Intent Data", href: "/services/intent-data" },
  { label: "Explore Account Profiling", href: "/services/account-profiling" },
  { label: "Explore BANT Leads", href: "/services/bant-qualified-leads" },
];

function ConnectLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="lg-connects-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: 15,
        fontWeight: 600,
        color: hovered ? C.gold500 : C.forest700,
      }}
    >
      {label}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}

export default function LeadGenConnects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ background: C.cream100, padding: "100px 24px" }}
    >
      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 32, color: C.textDark, fontWeight: 400 }}>
          Lead Generation Works Best When It Is Connected
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, lineHeight: 1.75, marginTop: 16 }}>
          Generating leads is only one part of a working pipeline. The contacts TrusVera Group delivers through
          lead generation are enriched with Account Profiling data before they reach your sales team. When
          combined with our Intent Data service, every outreach goes to accounts already showing active buying
          signals, not just accounts that match your ICP on paper. And once a lead replies, our BANT
          qualification process confirms they are ready to buy before the meeting is booked.
        </p>
        <div className="lg-connects-row" style={{ marginTop: 32 }}>
          {LINKS.map((link) => (
            <ConnectLink key={link.href} label={link.label} href={link.href} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
