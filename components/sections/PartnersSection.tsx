"use client";

import { useReveal } from "@/lib/hooks/useReveal";
import { PARTNERS } from "@/lib/data";
import { C } from "@/lib/colors";

export default function PartnersSection() {
  const [ref, visible] = useReveal(0.1);

  return (
    <section style={{ background: C.cream50, padding: "44px 24px", borderBottom: `1px solid ${C.borderLight}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: C.textMuted,
            textTransform: "uppercase",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          Trusted By Our Leading Partners
        </div>

        <div ref={ref} className="partner-row" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 52, flexWrap: "wrap" }}>
          {PARTNERS.map((partner, i) => (
            <span
              key={partner.name}
              className={`partner-logo reveal-up d${Math.min(i + 1, 5)}${visible ? " vis" : ""}`}
              style={{ color: partner.color, fontWeight: partner.weight }}
            >
              {partner.badge ? (
                <span style={{ background: "#FF492C", color: "#fff", borderRadius: 4, padding: "1px 7px", fontSize: 18, fontWeight: 900 }}>
                  G2
                </span>
              ) : (
                partner.name
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
