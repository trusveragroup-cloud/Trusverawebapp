"use client";

import { Search, Crosshair, MessageSquare, TrendingUp } from "lucide-react";
import { useReveal } from "@/lib/hooks/useReveal";
import { STEPS } from "@/lib/data";
import { C } from "@/lib/colors";

const icons = [Search, Crosshair, MessageSquare, TrendingUp];

export default function ProcessSection() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [ref, visible] = useReveal(0.1);

  return (
    <section style={{ background: "linear-gradient(160deg, #081C13 0%, #0D2E20 100%)", padding: "90px 24px" }}>
      <div
        ref={headerRef}
        className={`reveal-up${headerVisible ? " vis" : ""}`}
        style={{ textAlign: "center", marginBottom: 60 }}
      >
        <span
          style={{
            display: "inline-block",
            color: C.gold400,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            background: "rgba(200,151,62,0.10)",
            border: "1px solid rgba(200,151,62,0.20)",
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          HOW WE WORK
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 38, color: "#fff", margin: "16px 0" }}>
          Our 4-Step Process
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          A proven methodology for building enterprise B2B sales pipeline from audience intelligence to
          BANT-qualified revenue.
        </p>
      </div>

      <div
        ref={ref}
        className="proc-grid"
        style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}
      >
        {STEPS.map((step, i) => {
          const Icon = icons[i];
          return (
            <div
              key={step.num}
              className={`proc-card reveal-up d${i + 1}${visible ? " vis" : ""}`}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: C.forest700,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(200,151,62,0.10)",
                    color: C.gold500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={22} />
                </div>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginTop: 16, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{step.desc}</p>
              <div
                className={`proc-bar${visible ? " vis" : ""}`}
                style={{
                  height: 3,
                  borderRadius: 2,
                  marginTop: 20,
                  background: `linear-gradient(90deg, ${C.gold500} 0%, ${C.gold300} 100%)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
