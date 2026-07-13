"use client";

import { Users, Crosshair, Layers, DollarSign, BarChart3 } from "lucide-react";
import { useReveal } from "@/lib/hooks/useReveal";
import { SOLUTIONS } from "@/lib/data";
import { C } from "@/lib/colors";

const icons = [Users, Crosshair, Layers, DollarSign, BarChart3];

export default function SolutionsSection() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [ref, visible] = useReveal(0.1);

  return (
    <section style={{ background: C.cream100, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          ref={headerRef}
          className={`reveal-up${headerVisible ? " vis" : ""}`}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: C.forest800, marginBottom: 16 }}>
            Our Solutions
          </h2>
          <p style={{ fontSize: 16, color: C.textMuted, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
            Data-driven B2B demand generation programs that connect technology companies with verified in-market
            buyers to accelerate enterprise sales pipeline.
          </p>
        </div>

        <div ref={ref} className="sol-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 20 }}>
          {SOLUTIONS.map((solution, i) => {
            const Icon = icons[i];
            return (
              <div
                key={solution.title}
                className={`card-hover reveal-up d${i + 1}${visible ? " vis" : ""}`}
                style={{ background: "#fff", borderRadius: 12, padding: 28, textAlign: "center", border: `1px solid ${C.borderLight}` }}
              >
                <div className="sol-icon" style={{ margin: "0 auto 16px" }}>
                  <Icon size={28} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.textDark, lineHeight: 1.3, marginBottom: 10 }}>
                  {solution.title}
                </h3>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>{solution.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
