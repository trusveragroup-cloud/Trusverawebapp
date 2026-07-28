"use client";

import Link from "next/link";
import { Database, UserCheck, Award, FileText, ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/hooks/useReveal";
import { DELIVER } from "@/lib/data";
import { C } from "@/lib/colors";

const icons = [Database, UserCheck, Award, FileText];

export default function WhatWeDeliver() {
  const [ref, visible] = useReveal(0.1);
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section
      style={{
        background: "linear-gradient(160deg, #081C13 0%, #0D2E20 100%)",
        padding: "90px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div
          ref={headerRef}
          className={`reveal-up${headerVisible ? " vis" : ""}`}
          style={{ textAlign: "center", marginBottom: 56 }}
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
            OUR CORE SERVICES
          </span>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 38, fontWeight: 400, color: "#fff", margin: "16px 0" }}>
            What We Deliver
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Four high-impact B2B demand generation services built to accelerate enterprise sales pipelines with
            verified, intent-driven buyer intelligence.
          </p>
        </div>

        <div ref={ref} className="deliver-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {DELIVER.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={item.title} className={`deliver-card reveal-up d${i + 1}${visible ? " vis" : ""}`}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: "rgba(200,151,62,0.12)",
                    border: "1px solid rgba(200,151,62,0.20)",
                    color: C.gold500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon size={26} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.gold400, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                  {item.stat}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 18 }}>{item.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: 20,
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.gold400,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      textDecoration: "none",
                    }}
                  >
                    Learn More
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
