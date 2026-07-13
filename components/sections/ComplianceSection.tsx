"use client";

import { Lock, CheckCircle2, Database, Activity, CheckCircle } from "lucide-react";
import { useReveal } from "@/lib/hooks/useReveal";
import { COMPLIANCE } from "@/lib/data";
import { C } from "@/lib/colors";

const icons = [Lock, CheckCircle2, Database, Activity];

export default function ComplianceSection() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [ref, visible] = useReveal(0.1);

  return (
    <section style={{ background: "linear-gradient(160deg, #0D2E20 0%, #0F3D2E 100%)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          ref={headerRef}
          className={`reveal-up${headerVisible ? " vis" : ""}`}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 32, color: "#fff", marginBottom: 16 }}>
            Built on Compliance. Driven by Data Quality.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            Every dataset, every campaign, and every lead TrusVera delivers is built on the highest standards of
            data integrity, privacy regulation, and real-time verification.
          </p>
        </div>

        <div ref={ref} className="comp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {COMPLIANCE.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                className="comp-card"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "32px 24px", textAlign: "center" }}
              >
                <div
                  className="comp-ring"
                  style={{
                    position: "relative",
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    border: "2px solid rgba(200,151,62,0.30)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    transform: visible ? "scale(1)" : "scale(0.7)",
                    opacity: visible ? 1 : 0,
                    transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  <Icon size={32} color={C.gold500} />
                  <div
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: C.gold500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle size={10} color="#fff" />
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 16 }}>{item.desc}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.gold400 }}>{item.stat}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
