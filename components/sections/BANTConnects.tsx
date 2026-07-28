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
];

function ConnectLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="bant-link"
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

export default function BANTConnects() {
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
          BANT Qualification Is the Final Step in a Three-Part Process
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, lineHeight: 1.75, marginTop: 16 }}>
          A BANT qualified lead does not appear from nowhere. It begins with Intent Data identifying accounts
          that are actively in-market. It continues with Account Profiling building the intelligence file that
          makes qualification possible. BANT verification is the final gate, the moment we confirm that an
          account is not just a good fit but is ready to buy now. All three services work as a connected
          system, and TrusVera Group delivers all three.
        </p>
        <div className="bant-link-row" style={{ marginTop: 32 }}>
          {LINKS.map((link) => (
            <ConnectLink key={link.href} label={link.label} href={link.href} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
