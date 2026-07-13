"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Zap, ArrowRight, Play } from "lucide-react";
import { C } from "@/lib/colors";

const DashboardMockup = dynamic(() => import("@/components/charts/DashboardMockup"), { ssr: false });

function fadeStyle(visible: boolean, delay: number) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  };
}

export default function HeroSection() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #061510 0%, #081C13 40%, #0D2E20 100%)",
        paddingTop: 120,
        paddingBottom: 80,
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
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="hero-flex"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 40,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="hero-left" style={{ flex: "0 0 45%", maxWidth: "45%" }}>
          <div style={fadeStyle(heroVisible, 0)}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
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
              <Zap size={13} />
              AI-DRIVEN B2B AUDIENCE INTELLIGENCE
            </span>
          </div>

          <div style={fadeStyle(heroVisible, 0)}>
            <h1
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontWeight: 400,
                fontSize: 52,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "#fff",
                marginBottom: 24,
              }}
            >
              Reach Qualified <br />
              Technology Buyers <br />
              <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: C.gold500 }}>
                Before Your <br />
              </span>
              Competitors Do
            </h1>
          </div>

          <div style={fadeStyle(heroVisible, 0.2)}>
            <p style={{ fontSize: 15, fontWeight: 500, color: C.gold400, marginBottom: 8 }}>
              Intent Data. Account Profiling. BANT Leads. Pipeline Impact.
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 420, marginBottom: 32 }}>
              TrusVera Group helps B2B technology companies engage verified in-market buyers at the exact moment
              they are researching solutions. We deliver intent data, BANT-qualified leads, and account profiling
              to build enterprise sales pipeline faster.
            </p>
          </div>

          <div style={fadeStyle(heroVisible, 0.4)}>
            <div className="hero-btns" style={{ display: "flex", gap: 16 }}>
              <button className="btn-gold">
                Schedule a Consultation
                <ArrowRight size={16} />
              </button>
              <button className="btn-outline">
                <Play size={16} fill="white" />
                See How It Works
              </button>
            </div>
          </div>
        </div>

        <div
          className="dash-wrap"
          style={{
            flex: 1,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "scale(1)" : "scale(0.97)",
            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}
        >
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
