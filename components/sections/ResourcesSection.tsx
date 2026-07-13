"use client";

import { ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/hooks/useReveal";
import { RESOURCES } from "@/lib/data";
import { C } from "@/lib/colors";
import NetworkBG from "@/components/svgs/NetworkBG";
import DataStreamBG from "@/components/svgs/DataStreamBG";
import WorkspaceBG from "@/components/svgs/WorkspaceBG";
import WavePatternBG from "@/components/svgs/WavePatternBG";

const bgs = [NetworkBG, DataStreamBG, WorkspaceBG, WavePatternBG];

export default function ResourcesSection() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [ref, visible] = useReveal(0.1);

  return (
    <section style={{ background: C.cream100, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          ref={headerRef}
          className={`reveal-up${headerVisible ? " vis" : ""}`}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: C.forest800, marginBottom: 16 }}>
            Resources
          </h2>
          <p style={{ fontSize: 15, color: C.textMuted, maxWidth: 560, margin: "0 auto" }}>
            Gated content and thought leadership to help B2B technology teams build better enterprise sales
            pipeline.
          </p>
        </div>

        <div ref={ref} className="res-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {RESOURCES.map((resource, i) => {
            const Bg = bgs[i];
            return (
              <div key={resource.title} className={`resource-card reveal-up d${i + 1}${visible ? " vis" : ""}`}>
                <Bg />
                <div className="rc-overlay" />
                <div style={{ position: "relative", zIndex: 2, padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: resource.tagColor,
                      alignSelf: "flex-start",
                    }}
                  >
                    {resource.tag}
                  </span>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.4, minHeight: 66 }}>{resource.title}</h4>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.gold400, display: "flex", alignItems: "center", gap: 6 }}>
                    {resource.cta}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
