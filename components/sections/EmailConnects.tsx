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
  { label: "Explore Lead Generation", href: "/services/lead-generation" },
];

function ConnectLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="em-connects-link"
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

export default function EmailConnects() {
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
          Email Works Best When It Knows Who It Is Talking To
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, textAlign: "center", lineHeight: 1.75, marginTop: 16 }}>
          A well-written email sequence sent to the wrong list is still the wrong email. TrusVera Group combines
          email marketing with Intent Data to ensure every sequence reaches accounts actively researching your
          category, with Account Profiling data to personalise every message beyond just a first name, and with
          BANT qualification to confirm that contacts who reply are ready to move forward. Email is the channel.
          Intelligence is what makes it work.
        </p>
        <div className="em-connects-row" style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {LINKS.map((link) => (
            <ConnectLink key={link.href} label={link.label} href={link.href} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
