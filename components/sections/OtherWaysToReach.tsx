"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { CONTACT_REACH } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

function LinkedinIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" fill={color} />
      <path d="M5.25 7C6.35 7 7.25 6.1 7.25 5C7.25 3.9 6.35 3 5.25 3C4.15 3 3.25 3.9 3.25 5C3.25 6.1 4.15 7 5.25 7Z" fill={color} />
      <path d="M13.5 8.5H10.25V20.5H13.5V14.3C13.5 12.6 14.15 11.4 15.65 11.4C17.15 11.4 17.5 12.6 17.5 14.3V20.5H20.75V13.5C20.75 10 19.15 8.2 16.35 8.2C14.5 8.2 13.7 9.2 13.5 9.8V8.5Z" fill={color} />
    </svg>
  );
}

const ICONS: Record<string, LucideIcon | ((props: { size: number; color: string }) => React.JSX.Element)> = {
  Mail,
  Phone,
  Linkedin: LinkedinIcon,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function OtherWaysToReach() {
  return (
    <section style={{ background: C.cream50, padding: "80px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 480, margin: "0 auto 48px" }}
      >
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 30, color: C.textDark, fontWeight: 400, textAlign: "center" }}>
          Prefer a More Direct Route?
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.textMuted, textAlign: "center", marginTop: 10 }}>
          Use any of the channels below to reach our team directly.
        </p>
      </motion.div>

      <motion.div
        className="ct-reach-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 860, margin: "0 auto" }}
      >
        {CONTACT_REACH.map((r) => {
          const Icon = ICONS[r.icon];
          const external = r.href.startsWith("http");
          return (
            <motion.div key={r.label} variants={card}>
              <Link
                href={r.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="ct-reach-card"
                style={{
                  background: C.white,
                  border: `1px solid ${C.borderLight}`,
                  borderRadius: 12,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <Icon size={22} color={C.gold500} />
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.4px",
                    textTransform: "uppercase",
                    color: C.textLight,
                  }}
                >
                  {r.label}
                </span>
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, fontWeight: 600, color: C.textDark }}>
                  {r.value}
                </span>
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>
                  {r.desc}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
