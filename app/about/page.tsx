"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Zap,
  ChevronDown,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  Database,
  Target,
  Filter,
  BarChart3,
  Play,
  Clock,
  MapPin,
  Phone,
  Lock,
  Shield,
  Activity,
} from "lucide-react";
import NavBar from "@/components/sections/NavBar";
import FooterSection from "@/components/sections/FooterSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { useReveal } from "@/lib/hooks/useReveal";
import { AnimatedNum } from "@/lib/hooks/useAnimatedNum";
import { C } from "@/lib/colors";

const EASE = [0.16, 1, 0.3, 1] as const;

function GoldBadge({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: dark ? C.gold400 : C.forest700,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.08em",
        background: dark ? "rgba(200,151,62,0.10)" : "rgba(15,61,46,0.08)",
        border: dark ? "1px solid rgba(200,151,62,0.20)" : "1px solid rgba(15,61,46,0.15)",
        borderRadius: 20,
        padding: "6px 16px",
      }}
    >
      {children}
    </span>
  );
}

function HexOutline({ size, opacity, duration }: { size: number; opacity: number; duration: number }) {
  const r = size * 0.45;
  const cx = size / 2;
  const cy = size / 2;
  const pts = [0, 60, 120, 180, 240, 300]
    .map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return `${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`;
    })
    .join(" ");

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", opacity, pointerEvents: "none" }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <polygon points={pts} fill="none" stroke={C.gold500} strokeWidth={1} />
    </motion.svg>
  );
}

function DotGrid({ size = 40, opacity = 0.025 }: { size?: number; opacity?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
        backgroundSize: `${size}px ${size}px`,
        pointerEvents: "none",
      }}
    />
  );
}

/* ============================== HERO ============================== */

function AboutHero() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #061510 0%, #081C13 40%, #0D2E20 100%)",
        paddingTop: 130,
        paddingBottom: 100,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.12,
          zIndex: 0,
        }}
      />
      <DotGrid />
      <div style={{ position: "absolute", top: -60, right: -60 }}>
        <HexOutline size={400} opacity={0.04} duration={60} />
      </div>
      <div style={{ position: "absolute", bottom: -40, left: -40 }}>
        <HexOutline size={200} opacity={0.03} duration={90} />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2, padding: "0 24px" }}
      >
        <motion.div variants={item} style={{ marginBottom: 24 }}>
          <GoldBadge>
            <Zap size={12} />
            OUR STORY
          </GoldBadge>
        </motion.div>

        <motion.h1
          variants={item}
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontWeight: 400,
            fontSize: 58,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            marginBottom: 24,
          }}
        >
          We Build Pipeline.
          <br />
          <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: C.gold500 }}>
            Not Just Leads.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}
        >
          TrusVera Group is a B2B technology marketing intelligence company. We help enterprise sales and marketing
          teams reach verified in-market buyers through intent data, BANT-qualified leads, account profiling, and
          content-led demand generation.
        </motion.p>

        <motion.div variants={item} style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
          {[
            { top: "150M+", bottom: "Technology Buyers in Database", gold: true },
            { top: "97%", bottom: "Client Retention Rate", gold: true },
          ].map((pill) => (
            <div
              key={pill.bottom}
              style={{
                background: C.forest800,
                borderRadius: 100,
                padding: "10px 24px",
                border: "1px solid rgba(255,255,255,0.08)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: pill.gold ? 700 : 600, color: pill.gold ? C.gold400 : "#fff" }}>
                {pill.top}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{pill.bottom}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Scroll to explore
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={18} color="rgba(255,255,255,0.4)" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================== OUR STORY ============================== */

const TIMELINE: { year: string; side: "left" | "right"; title: string; desc: string }[] = [
  {
    year: "2019",
    side: "left",
    title: "TrusVera Founded",
    desc: "Established in Pune, India with a mission to transform how B2B technology companies find and engage in-market enterprise buyers.",
  },
  {
    year: "2020",
    side: "right",
    title: "Intent Data Practice Launched",
    desc: "Launched our proprietary intent data tracking capability, monitoring buyer signals across 27 technology categories for enterprise clients.",
  },
  {
    year: "2022",
    side: "right",
    title: "BANT Qualification at Scale",
    desc: "Delivered our 100,000th BANT-qualified lead, establishing our reputation for verified, high-intent B2B lead delivery at enterprise scale.",
  },
  {
    year: "2024",
    side: "left",
    title: "150M+ Buyer Database",
    desc: "Reached 150 million verified technology buyer profiles, making TrusVera one of the most comprehensive B2B intent databases available to enterprise sales teams.",
  },
  {
    year: "2026",
    side: "right",
    title: "Industry Recognition",
    desc: "Recognised as one of the fastest-growing B2B demand generation companies, with a 97% client retention rate and $1.2B+ in pipeline influenced for technology clients.",
  },
];

function TimelineCard({ ev, index }: { ev: (typeof TIMELINE)[number]; index: number }) {
  return (
    <motion.div
      className="timeline-box card-hover"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: EASE }}
      style={{ background: "#fff", borderRadius: 14, padding: 28, border: `1px solid ${C.borderLight}` }}
    >
      <h4 style={{ fontSize: 18, fontWeight: 700, color: C.textDark, marginBottom: 10 }}>{ev.title}</h4>
      <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>{ev.desc}</p>
    </motion.div>
  );
}

function OurStory() {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section style={{ background: C.cream50, padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div ref={headerRef} className={`reveal-up${headerVisible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
          <GoldBadge dark={false}>OUR STORY</GoldBadge>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 38, color: C.forest800, margin: "20px 0 0" }}>
            From Startup to
            <br />
            <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: C.gold500 }}>Industry Leader</span>
          </h2>
          <p style={{ fontSize: 16, color: C.textMuted, maxWidth: 600, margin: "16px auto 0", lineHeight: 1.7 }}>
            How TrusVera Group became one of the fastest-growing B2B intent data and demand generation companies
            serving enterprise technology companies globally.
          </p>
        </div>

        <div style={{ position: "relative", marginTop: 64 }}>
          <div className="timeline-line" />
          {TIMELINE.map((ev, i) => (
            <div key={ev.year} className="timeline-event">
              <div
                className="timeline-dot"
                style={{ top: 8, width: 20, height: 20, borderRadius: "50%", background: C.gold500, border: "3px solid #fff", boxShadow: "0 0 0 1px rgba(200,151,62,0.3)" }}
              />
              <div className="timeline-half tl-left">{ev.side === "left" && <TimelineCard ev={ev} index={i} />}</div>
              <div className="timeline-half tl-right">{ev.side === "right" && <TimelineCard ev={ev} index={i} />}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== MISSION + TRUST METER ============================== */

const PILLARS = [
  "Surface in-market enterprise buyers before competitors do, using first-party and third-party intent data across 27 technology categories.",
  "Deliver only BANT-qualified leads with confirmed budget, authority, need, and timeline. No cold contacts. No wasted sales cycles.",
  "Build sustainable B2B sales pipeline through verified account intelligence, multi-channel engagement, and full revenue attribution reporting.",
];

function MissionTrustMeter() {
  const [leftRef, leftVisible] = useReveal(0.15);
  const [ringRef, ringVisible] = useReveal(0.3);
  const circumference = 2 * Math.PI * 120;

  return (
    <section style={{ background: "linear-gradient(160deg, #081C13 0%, #0D2E20 100%)", padding: "100px 24px" }}>
      <div className="mission-flex" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, alignItems: "center" }}>
        <div ref={leftRef} className={`reveal-up${leftVisible ? " vis" : ""}`} style={{ flex: 1 }}>
          <GoldBadge>OUR MISSION</GoldBadge>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 38, color: "#fff", margin: "20px 0 0" }}>
            Precision Intelligence.
            <br />
            <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: C.gold300 }}>Verified Results.</span>
          </h2>

          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
            {PILLARS.map((p) => (
              <div key={p} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, borderRadius: 2, background: C.gold500, marginTop: 8, flexShrink: 0 }} />
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: "0 0 320px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div ref={ringRef} style={{ position: "relative", width: 280, height: 280 }}>
            <svg width={280} height={280} viewBox="0 0 280 280">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={C.gold500} />
                  <stop offset="100%" stopColor={C.gold300} />
                </linearGradient>
              </defs>
              <circle cx={140} cy={140} r={120} stroke="rgba(255,255,255,0.06)" strokeWidth={8} fill="none" />
              <circle
                className="trust-ring"
                cx={140}
                cy={140}
                r={120}
                stroke="url(#goldGrad)"
                strokeWidth={8}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{
                  strokeDashoffset: ringVisible ? 0 : circumference * (1 - 0.97),
                  transform: "rotate(-90deg)",
                  transformOrigin: "140px 140px",
                }}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 52, fontWeight: 700, color: "#fff" }}>
                <AnimatedNum value={97} suffix="%" />
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Client Retention</div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>2,000+ Campaigns Delivered</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Across 40+ Enterprise Technology Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== WHAT DRIVES US ============================== */

const VALUES = [
  { title: "Be relentless about client pipeline impact.", desc: "We measure success by the qualified revenue opportunities we create for our clients, not vanity metrics or activity volumes." },
  { title: "Treat every buyer signal with precision.", desc: "Data integrity is non-negotiable. We verify, validate, and continuously refresh every contact, account, and intent signal we deliver." },
  { title: "Build trust through radical transparency.", desc: "We share what works and what does not. Monthly performance reports, clear attribution, and honest communication are part of every engagement." },
  { title: "Think globally. Act with local expertise.", desc: "With our team in Pune, we combine global data coverage with the cultural and market intelligence that enterprise buyers expect." },
];

const COMMITMENTS = [
  { title: "Being Data-Driven in Every Decision", percent: 98 },
  { title: "Being Responsive to Client Needs", percent: 96 },
  { title: "Always Communicating Results", percent: 94 },
  { title: "Demonstrating Pipeline Impact", percent: 92 },
  { title: "Upholding the Highest Data Standards", percent: 90 },
];

function WhatDrivesUs() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [barsRef, barsVisible] = useReveal(0.15);

  return (
    <section style={{ background: C.cream50, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={headerRef} className={`reveal-up${headerVisible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 42, color: C.forest800 }}>
            What Drives Us
            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: C.gold500, marginLeft: 8 }} />
          </h2>
          <p style={{ fontSize: 16, color: C.textMuted, maxWidth: 600, margin: "16px auto 0", lineHeight: 1.7 }}>
            The values and commitments that shape every campaign, every lead, and every client relationship at
            TrusVera Group.
          </p>
        </div>

        <div className="drives-flex" style={{ display: "flex", gap: 80 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.forest700, marginBottom: 12 }}>
              THE TVG SPIRIT
            </div>
            <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 32, lineHeight: 1.7 }}>
              These principles define who we are and how we operate. They guide every decision, every delivery, and
              every client relationship.
            </p>

            {VALUES.map((v, i) => (
              <div key={v.title} style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 32 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    flexShrink: 0,
                    border: "1.5px solid #C8973E",
                    background: "rgba(200,151,62,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: 18,
                    color: "#C8973E",
                    fontWeight: 400,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#1A2332", marginBottom: 6 }}>{v.title}</p>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div ref={barsRef} style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.forest700, marginBottom: 12 }}>
              FIVE COMMITMENTS
            </div>
            <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 32, lineHeight: 1.7 }}>
              When our behaviors consistently reflect these commitments, our clients build better pipeline, faster.
            </p>

            {COMMITMENTS.map((c, i) => (
              <div key={c.title} style={{ padding: "18px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#1A2332" }}>{c.title}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#C8973E" }}>{c.percent}%</span>
                </div>
                <div style={{ height: 3, borderRadius: 2, background: "rgba(200,151,62,0.12)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 2,
                      background: "linear-gradient(90deg, #C8973E, #E5BF63)",
                      width: barsVisible ? `${c.percent}%` : "0%",
                      transition: `width 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== BY THE NUMBERS ============================== */

const STATS = [
  { icon: Users, value: 150, suffix: "M+", decimals: 0, label: "Technology Buyer Profiles" },
  { icon: Zap, value: 111, suffix: "k+", decimals: 0, label: "Intent Signals Monthly" },
  { icon: Award, value: 22.7, suffix: "k+", decimals: 1, label: "BANT Leads Per Month" },
  { icon: TrendingUp, value: 1.2, suffix: "B+", decimals: 1, prefix: "$", label: "Pipeline Influenced" },
  { icon: CheckCircle2, value: 97, suffix: "%", decimals: 0, label: "Client Retention Rate" },
  { icon: Database, value: 200, suffix: "+", decimals: 0, label: "Data Sources Verified" },
];

function ByTheNumbers() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [ref, visible] = useReveal(0.1);

  return (
    <section style={{ background: "linear-gradient(135deg, #0F3D2E, #081C13)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={headerRef} className={`reveal-up${headerVisible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: "#fff" }}>TrusVera by the Numbers</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>
            Verified scale across data, delivery, and client outcomes.
          </p>
        </div>

        <div ref={ref} className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`reveal-up d${i + 1}${visible ? " vis" : ""}`} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: `2px solid ${C.gold500}`,
                    color: C.gold500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Icon size={22} />
                </div>
                <div style={{ fontSize: 36, fontWeight: 700, color: C.gold300, lineHeight: 1, marginBottom: 8 }}>
                  <AnimatedNum value={s.value} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals} />
                </div>
                <div style={{ fontSize: 14, color: "#fff" }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================== OUR APPROACH ============================== */

const APPROACH = [
  {
    icon: Target,
    title: "Intelligence First",
    desc: "We begin every engagement by mapping your ICP against our 150M+ buyer database, applying firmographic, technographic, and behavioral filters to surface accounts that match your ideal customer profile with precision.",
  },
  {
    icon: Filter,
    title: "Intent-Verified Pipeline",
    desc: "Every account we target is scored against real-time intent signals. We only engage buyers who are actively researching solutions in your market, eliminating wasted outreach and compressing sales cycles.",
  },
  {
    icon: BarChart3,
    title: "Measurable Revenue Impact",
    desc: "We attribute every campaign to pipeline and revenue. Monthly reports show influenced pipeline, opportunities created, and ROI, so you always know exactly what TrusVera is delivering to your business.",
  },
];

function OurApproach() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [ref, visible] = useReveal(0.1);

  return (
    <section style={{ background: C.cream100, padding: "80px 24px", borderTop: `1px solid ${C.borderLight}` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div ref={headerRef} className={`reveal-up${headerVisible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: C.forest800 }}>The TrusVera Approach</h2>
        </div>

        <div ref={ref} className="approach-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
          {APPROACH.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className={`card-hover reveal-up d${i + 1}${visible ? " vis" : ""}`}
                style={{ background: "#fff", borderRadius: 16, padding: 36, border: `1px solid ${C.borderLight}` }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "rgba(15,61,46,0.10)",
                    color: C.gold500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.textDark, marginBottom: 12 }}>{a.title}</h3>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================== VIDEO SECTION ============================== */

function VideoSection() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section style={{ background: "linear-gradient(160deg, #081C13 0%, #0F3D2E 100%)", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div ref={headerRef} className={`reveal-up${headerVisible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 56 }}>
          <GoldBadge>MEET TRUSVERA</GoldBadge>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 38, color: "#fff", margin: "20px 0 0" }}>
            See How We Build
            <br />
            <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: C.gold500 }}>Enterprise Pipeline</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "16px auto 0", lineHeight: 1.7 }}>
            Watch how TrusVera Group's B2B intelligence platform transforms intent data into qualified sales
            pipeline for enterprise technology companies.
          </p>
        </div>

        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            position: "relative",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            {videoPlaying ? (
              <video
                autoPlay
                controls
                playsInline
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 20,
                }}
              >
                <source src="/video/Whatwedo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #0D2E20, #081C13)" }}>
                <DotGrid opacity={0.03} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 48, color: C.gold500 }}>TVG</div>
                  <div style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: 20, color: C.gold400, marginTop: 8 }}>
                    Precision. Intelligence. Pipeline.
                  </div>
                </div>
                <div className="video-overlay" onClick={() => setVideoPlaying(true)}>
                  <div className="play-btn">
                    <Play size={28} color="#fff" fill="#fff" />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 24px",
                    background: "linear-gradient(0deg, rgba(6,21,16,0.8), transparent)",
                  }}
                >
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>TrusVera Group, Company Overview</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.4)", padding: "3px 10px", borderRadius: 4 }}>
                    8:16
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
          {[
            { Icon: Play, label: "Company Overview" },
            { Icon: Clock, label: "8 min watch" },
            { Icon: Users, label: "For Sales Leaders" },
          ].map((p) => (
            <div
              key={p.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: C.forest800,
                borderRadius: 100,
                padding: "8px 20px",
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p.Icon size={14} />
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== LEADERSHIP TEAM ============================== */

const FOUNDERS = [
  {
    name: "Arbaz Thange",
    role: "Founder & Director",
    bio: "Co-founder of TrusVera Group, driving the vision for precision B2B intelligence and demand generation across global enterprise markets.",
    image: "/Founder Image/Arbaz Thange_photo.png",
    alt: "Arbaz Thange - Founder & Director",
  },
  {
    name: "Dinesh Lilani",
    role: "Founder & Director",
    bio: "Co-founder of TrusVera Group, bringing deep expertise in B2B sales strategy and enterprise account development to revenue teams worldwide.",
    image: "/Founder Image/Dinesh Lilani.jpg",
    alt: "Dinesh Lilani - Founder & Director",
  },
  {
    name: "Pooja Rasal",
    role: "Founder",
    bio: "Co-founder of TrusVera Group, contributing strategic leadership and operational excellence to drive TrusVera's growth in the B2B intelligence space.",
    image: "/Founder Image/Poojadi.jpeg",
    alt: "Pooja Rasal - Founder",
  },
];

function LeadershipTeam() {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section style={{ background: C.cream50, padding: "80px 24px" }}>
      <style>{`
        @media (max-width: 768px) {
          .founders-grid { flex-direction: column !important; align-items: center !important; }
          .founder-card { width: 100% !important; max-width: 400px !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div ref={headerRef} className={`reveal-up${headerVisible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: C.forest800 }}>Meet the Founders</h2>
          <p style={{ fontSize: 15, color: C.textMuted, maxWidth: 560, margin: "12px auto 0", lineHeight: 1.7 }}>
            Experienced B2B marketing and technology professionals dedicated to building enterprise pipeline for our
            clients.
          </p>
        </div>

        <div className="founders-grid" style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", maxWidth: 1300, margin: "0 auto" }}>
          {FOUNDERS.map((founder) => (
            <div
              key={founder.name}
              className="founder-card"
              style={{
                background: C.cream100,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                width: 380,
                flexShrink: 0,
              }}
            >
              <div style={{ position: "relative", height: 420 }}>
                <Image
                  src={founder.image}
                  alt={founder.alt}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div style={{ padding: "24px 28px", background: C.cream100 }}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 24, color: C.forest800, margin: "0 0 4px" }}>
                  {founder.name}
                </div>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.forest600, fontWeight: 600, margin: "0 0 12px" }}>
                  {founder.role}
                </div>
                <div style={{ width: 40, height: 2, background: C.gold400, marginBottom: 12 }} />
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate600, lineHeight: 1.65 }}>
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== GLOBAL PRESENCE ============================== */

const OFFICES = [
  {
    flag: "\u{1F1EE}\u{1F1F3}",
    country: "INDIA",
    title: "Pune Headquarters",
    address: "Kasarwadi, PCMC, Pune - 411034",
    availability: "Availability: IST Business Hours",
    note: "Primary Operations Hub",
  },
];

function GlobalPresence() {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section style={{ background: C.forest900, padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div ref={headerRef} className={`reveal-up${headerVisible ? " vis" : ""}`} style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 32, color: "#fff" }}>Global Reach. Local Expertise.</h2>
        </div>

        <div className="office-grid" style={{ display: "grid", gridTemplateColumns: "1fr", maxWidth: 460, margin: "0 auto", gap: 32 }}>
          {OFFICES.map((o, i) => (
            <motion.div
              key={o.country}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 36, border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold400, marginBottom: 12 }}>
                <span style={{ fontSize: 16 }}>{o.flag}</span>
                {o.country}
              </div>
              <h3 style={{ fontSize: 18, color: "#fff", marginBottom: 16 }}>{o.title}</h3>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                <MapPin size={16} color={C.gold500} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{o.address}</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
                <Phone size={16} color={C.gold500} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{o.availability}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{o.note}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== COMPLIANCE STRIP ============================== */

const BADGES = [
  { icon: Lock, label: "Privacy First" },
  { icon: CheckCircle2, label: "GDPR Compliant" },
  { icon: Shield, label: "ISO 27001 Aligned" },
  { icon: Activity, label: "Real-Time Validated" },
];

function ComplianceStrip() {
  return (
    <section style={{ background: C.cream50, padding: "48px 24px", borderTop: `1px solid ${C.borderLight}`, borderBottom: `1px solid ${C.borderLight}` }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 32 }}>
          Trusted, verified, and compliant, across every campaign.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(15,61,46,0.11)",
                    color: C.forest700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textDark }}>{b.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================== PAGE ============================== */

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", color: C.textDark, background: C.cream100, overflowX: "hidden" }}>
      <NavBar />
      <AboutHero />
      <OurStory />
      <MissionTrustMeter />
      <WhatDrivesUs />
      <ByTheNumbers />
      <OurApproach />
      <VideoSection />
      <LeadershipTeam />
      <GlobalPresence />
      <ComplianceStrip />
      <ContactFormSection />
      <FooterSection />
    </div>
  );
}
