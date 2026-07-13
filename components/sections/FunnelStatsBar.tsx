"use client";

import { Zap, Filter, UserCheck, Users, Award } from "lucide-react";
import { AnimatedNum } from "@/lib/hooks/useAnimatedNum";
import { useReveal } from "@/lib/hooks/useReveal";
import { FUNNEL_STATS } from "@/lib/data";
import { C } from "@/lib/colors";

const icons = [Zap, Filter, UserCheck, Users, Award];

export default function FunnelStatsBar() {
  const [ref, visible] = useReveal(0.2);

  return (
    <section style={{ background: C.forest700, padding: "0 24px" }}>
      <div
        ref={ref}
        className="funnel-grid"
        style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}
      >
        {FUNNEL_STATS.map((stat, i) => {
          const Icon = icons[i];
          return (
            <div key={stat.label} className={`funnel-stat reveal-up d${i + 1}${visible ? " vis" : ""}`}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: `2px solid ${C.gold500}`,
                  color: C.gold500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Icon size={20} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.gold300, lineHeight: 1, marginBottom: 2 }}>
                <AnimatedNum value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textAlign: "center", lineHeight: 1.4 }}>
                {stat.desc}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
