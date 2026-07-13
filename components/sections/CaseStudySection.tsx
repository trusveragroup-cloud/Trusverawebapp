"use client";

import { DollarSign, Users, TrendingUp, Award } from "lucide-react";
import { useReveal } from "@/lib/hooks/useReveal";
import { C } from "@/lib/colors";

const metrics = [
  { icon: DollarSign, value: "$8.7M", label: "Pipeline Influenced" },
  { icon: Users, value: "62", label: "Opportunities Created" },
  { icon: TrendingUp, value: "215%", label: "Increase in Pipeline YoY" },
  { icon: Award, value: "4.3x", label: "Return on Investment" },
];

export default function CaseStudySection() {
  const [ref, visible] = useReveal(0.15);

  return (
    <section id="casestudy" style={{ background: "linear-gradient(135deg, #081C13 0%, #0D2E20 100%)", padding: "80px 24px" }}>
      <div
        ref={ref}
        className={`reveal-scale${visible ? " vis" : ""}`}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          background: "rgba(255,255,255,0.04)",
          borderRadius: 20,
          padding: 48,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: C.gold500,
            background: "rgba(200,151,62,0.10)",
            padding: "6px 14px",
            borderRadius: 4,
            marginBottom: 24,
          }}
        >
          Case Study
        </span>

        <div className="case-flex" style={{ display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: "#fff", lineHeight: 1.3, marginBottom: 24 }}>
              How TrusVera Helped a Leading Cloud Security Company Accelerate Pipeline with Intent Data and BANT
              Leads
            </h3>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: C.gold400, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                The Challenge
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7 }}>
                The client needed to break through a crowded cybersecurity market, reach net-new enterprise
                accounts in-market, and build a sustainable and repeatable sales pipeline with verified buyers.
              </p>
            </div>

            <div>
              <div style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: C.gold400, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                Our Approach
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7 }}>
                TrusVera deployed intent data tracking across 27 technology buyer signals, built a BANT-qualified
                account list, and executed a multi-channel campaign targeting CISOs and IT decision-makers across
                400 enterprise accounts.
              </p>
            </div>
          </div>

          <div style={{ flex: "0 0 auto", minWidth: 260 }}>
            <div style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: C.gold400, fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
              The Outcome
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {metrics.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className={`reveal-up d${i + 1}${visible ? " vis" : ""}`}
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: "rgba(200,151,62,0.10)",
                        color: C.gold400,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{metric.value}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{metric.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
