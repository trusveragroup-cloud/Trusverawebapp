"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { C } from "@/lib/colors";
import { matchData, engagementData, intentSignals } from "@/lib/data";
import { ChevronDown } from "lucide-react";

const badgeStyles: Record<string, { bg: string; color: string }> = {
  High: { bg: "rgba(200,151,62,0.15)", color: C.gold400 },
  Medium: { bg: "rgba(22,107,74,0.2)", color: "#4ADE80" },
  Low: { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" },
};

export default function DashboardMockup() {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #081C13, #0A2219)",
        borderRadius: 16,
        padding: 20,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Audience Intelligence Dashboard</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
            background: "rgba(255,255,255,0.05)",
            padding: "4px 10px",
            borderRadius: 20,
          }}
        >
          Last 30 Days <ChevronDown size={12} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div className="dashboard-panel">
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, marginBottom: 12 }}>
            Account Match Score
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={matchData}
                    innerRadius={26}
                    outerRadius={36}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {matchData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1 }}>82</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 8 }}>High Match</div>
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              {matchData.map((d) => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.6)", flex: 1 }}>{d.name}</span>
                  <span style={{ color: "#fff", fontWeight: 600 }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Top Tier Accounts</span>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>1,248</span>
          </div>
        </div>

        <div className="dashboard-panel">
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, marginBottom: 12 }}>
            Intent Signals
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {intentSignals.map((s) => {
              const badge = badgeStyles[s.level];
              return (
                <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{s.label}</span>
                  <span className="level-badge" style={{ background: badge.bg, color: badge.color }}>
                    {s.level}
                  </span>
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Intent Accounts</span>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>2,346</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="dashboard-panel">
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
            Pipeline Impact
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>$24.6M</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <span style={{ color: "#4ADE80", fontSize: 11, fontWeight: 600 }}>▲ 38%</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>vs prior 30 days</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 4 }}>Influenced Pipeline</div>
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>156</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <span style={{ color: "#4ADE80", fontSize: 11, fontWeight: 600 }}>▲ 27%</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 4 }}>Opportunities Created</div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600 }}>Engagement Overview</span>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: 1, background: C.gold500 }} />
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Impressions</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: 1, background: C.forest600 }} />
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Engagements</span>
              </div>
            </div>
          </div>
          <div style={{ height: 90 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData} barGap={2}>
                <XAxis
                  dataKey="name"
                  fontSize={8}
                  fill="rgba(255,255,255,0.3)"
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="imp" fill={C.gold500} radius={[2, 2, 0, 0]} barSize={10} />
                <Bar dataKey="eng" fill={C.forest600} radius={[2, 2, 0, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
