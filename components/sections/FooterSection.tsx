"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { C } from "@/lib/colors";

const columns = [
  { title: "B2B Services", links: ["Intent Data", "Account Profiling", "BANT Qualified Leads", "Lead Generation", "Email Marketing"] },
  { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "/contact" }] },
  { title: "Resources", links: [{ label: "HR Software", href: "/publishing/hr-software" }] },
];

const legalLinks: (string | { label: string; href: string })[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  "Cookie Policy",
];

type IconProps = { size: number; color: string };

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

function LinkedInIcon({ size, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"
      />
      <rect x="2" y="9" width="4" height="12" stroke={color} strokeWidth={1.75}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="4" cy="4" r="2" stroke={color} strokeWidth={1.75}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

const socials = [
  {
    Icon: InstagramIcon,
    href: "https://www.instagram.com/trusveragroup/",
    hoverBg: "rgba(225,48,108,0.2)",
    hoverColor: "#E1306C",
    label: "Instagram"
  },
  {
    Icon: FacebookIcon,
    href: "https://www.facebook.com/profile.php?id=61588770370532",
    hoverBg: "rgba(24,119,242,0.2)",
    hoverColor: "#1877F2",
    label: "Facebook"
  },
  {
    Icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/trusvera-group-942854425/",
    hoverBg: "rgba(10,102,194,0.2)",
    hoverColor: "#0A66C2",
    label: "LinkedIn"
  },
];

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

function LegalLink({ label, href }: { label: string; href?: string }) {
  const [hovered, setHovered] = useState(false);
  const style = {
    fontSize: 12,
    color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
    cursor: "pointer",
    transition: "color 0.2s",
  };

  if (href) {
    return (
      <Link
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ ...style, textDecoration: "none" }}
      >
        {label}
      </Link>
    );
  }

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={style}
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
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = s.hoverBg;
                      const svg = e.currentTarget.querySelector("svg");
                      if (svg) svg.querySelectorAll("path,rect,circle").forEach((el) => el.setAttribute("stroke", s.hoverColor));
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      const svg = e.currentTarget.querySelector("svg");
                      if (svg) svg.querySelectorAll("path,rect,circle").forEach((el) => el.setAttribute("stroke", "rgba(254,253,251,0.55)"));
                    }}
                  >
                    <s.Icon size={18} color="rgba(254,253,251,0.55)" />
                  </div>
                </a>
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
            {legalLinks.map((link) =>
              typeof link === "string" ? (
                <LegalLink key={link} label={link} />
              ) : (
                <LegalLink key={link.label} label={link.label} href={link.href} />
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
