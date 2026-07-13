"use client";

import { useState } from "react";
import Image from "next/image";
import { C } from "@/lib/colors";

const columns = [
  { title: "B2B Services", links: ["Intent Data", "Account Profiling", "BANT Qualified Leads", "Lead Generation", "Email Marketing"] },
  { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Case Study", href: "#casestudy" }, { label: "Careers", href: "#careers" }, { label: "Contact", href: "#contact" }] },
  { title: "Resources", links: ["Case Studies", "Whitepapers", "Ebooks", "Webinars"] },
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR Compliance"];

type IconProps = { size: number; color: string };

function LinkedinIcon({ size, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" fill={color} />
      <path d="M5.25 7C6.35 7 7.25 6.1 7.25 5C7.25 3.9 6.35 3 5.25 3C4.15 3 3.25 3.9 3.25 5C3.25 6.1 4.15 7 5.25 7Z" fill={color} />
      <path d="M13.5 8.5H10.25V20.5H13.5V14.3C13.5 12.6 14.15 11.4 15.65 11.4C17.15 11.4 17.5 12.6 17.5 14.3V20.5H20.75V13.5C20.75 10 19.15 8.2 16.35 8.2C14.5 8.2 13.7 9.2 13.5 9.8V8.5Z" fill={color} />
    </svg>
  );
}

function InstagramIcon({ size, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <rect x={3} y={3} width={18} height={18} rx={5} />
      <circle cx={12} cy={12} r={4} />
      <circle cx={17.5} cy={6.5} r={1} fill={color} stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 8.5H17V5.5H15C12.79 5.5 11 7.29 11 9.5V11.5H9V14.5H11V20.5H14V14.5H16.5L17 11.5H14V9.5C14 8.95 14.45 8.5 15 8.5Z"
        fill={color}
      />
    </svg>
  );
}

function TwitterIcon({ size, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M20.5 6.4C19.9 6.7 19.2 6.9 18.5 7C19.3 6.5 19.8 5.8 20.1 4.9C19.4 5.4 18.6 5.7 17.7 5.9C17 5.2 16.1 4.8 15 4.8C13 4.8 11.4 6.4 11.4 8.4C11.4 8.7 11.4 8.9 11.5 9.2C8.5 9 5.8 7.6 4 5.3C3.7 5.9 3.5 6.5 3.5 7.2C3.5 8.5 4.1 9.6 5.1 10.3C4.5 10.3 3.9 10.1 3.4 9.8V9.9C3.4 11.6 4.6 13.1 6.3 13.4C6 13.5 5.6 13.5 5.3 13.5C5.1 13.5 4.9 13.5 4.7 13.5C5.1 15 6.5 16 8.1 16.1C6.8 17.1 5.2 17.7 3.5 17.7C3.2 17.7 2.9 17.7 2.6 17.6C4.3 18.7 6.3 19.3 8.4 19.3C15 19.3 18.6 13.8 18.6 9C18.6 8.8 18.6 8.7 18.6 8.5C19.3 8 20 7.3 20.5 6.4Z"
        fill={color}
      />
    </svg>
  );
}

const socials = [
  { Icon: LinkedinIcon, hoverBg: "rgba(10,102,194,0.2)", hoverColor: "#0A66C2" },
  { Icon: InstagramIcon, hoverBg: "rgba(225,48,108,0.2)", hoverColor: "#E1306C" },
  { Icon: FacebookIcon, hoverBg: "rgba(24,119,242,0.2)", hoverColor: "#1877F2" },
  { Icon: TwitterIcon, hoverBg: "rgba(255,255,255,0.1)", hoverColor: "#FFFFFF" },
];

function SocialIcon({ Icon, hoverBg, hoverColor }: { Icon: (props: IconProps) => React.JSX.Element; hoverBg: string; hoverColor: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: hovered ? hoverBg : "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
      }}
    >
      <Icon size={16} color={hovered ? hoverColor : "rgba(255,255,255,0.5)"} />
    </a>
  );
}

function FooterLink({ label, href = "#" }: { label: string; href?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        fontSize: 13,
        color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
        marginBottom: 10,
        textDecoration: "none",
        transition: "color 0.2s",
      }}
    >
      {label}
    </a>
  );
}

function LegalLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 12,
        color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
        cursor: "pointer",
        transition: "color 0.2s",
      }}
    >
      {label}
    </span>
  );
}

function FooterLogo() {
  return (
    <Image
      src="/logo.png"
      alt="TrusVera Group"
      width={150}
      height={44}
      style={{ objectFit: "contain", objectPosition: "left center" }}
      priority
    />
  );
}

export default function FooterSection() {
  return (
    <footer style={{ background: C.forest950, padding: "52px 24px 32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 40 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ marginBottom: 16 }}>
              <FooterLogo />
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 16 }}>
              B2B intent data, account profiling, and BANT-qualified lead generation for enterprise technology
              companies.
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>
              Precision targeting. Verified leads. Pipeline impact.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {socials.map((s, i) => (
                <SocialIcon key={i} Icon={s.Icon} hoverBg={s.hoverBg} hoverColor={s.hoverColor} />
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: "0.02em" }}>{col.title}</div>
              {col.links.map((link) =>
                typeof link === "string" ? (
                  <FooterLink key={link} label={link} />
                ) : (
                  <FooterLink key={link.label} label={link.label} href={link.href} />
                )
              )}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>2026 TrusVera Group. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {legalLinks.map((link) => (
              <LegalLink key={link} label={link} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
