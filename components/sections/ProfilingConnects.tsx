"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/colors";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "Explore Intent Data", href: "/services/intent-data" },
  { label: "Explore BANT Qualified Leads", href: "/services/bant-qualified-leads" },
];

function ConnectLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="ap-link"
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

export default function ProfilingConnects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ background: C.cream50, padding: "100px 24px" }}
    >
      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 32, color: C.textDark, fontWeight: 400 }}>
          A Profile Is the Starting Point, Not the Destination
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, lineHeight: 1.75, marginTop: 16 }}>
          Account intelligence does not sit in a spreadsheet. Every profile TrusVera Group delivers flows
          directly into our BANT qualification process and our Intent Data scoring, so your team receives
          accounts that are not only well understood but actively in-market and budget confirmed.
        </p>
        <div className="ap-link-row" style={{ marginTop: 32 }}>
          {LINKS.map((link) => (
            <ConnectLink key={link.href} label={link.label} href={link.href} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
