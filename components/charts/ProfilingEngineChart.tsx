"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { C } from "@/lib/colors";
import { PROFILING_STATS } from "@/lib/data";

const SEGMENT_COLORS = [C.gold500, C.gold400, C.forest600, C.gold300];

export default function ProfilingEngineChart() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 220, aspectRatio: "1 / 1", margin: "0 auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={PROFILING_STATS}
            dataKey="chartValue"
            innerRadius="62%"
            outerRadius="100%"
            paddingAngle={3}
            stroke="none"
          >
            {PROFILING_STATS.map((_, i) => (
              <Cell key={i} fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 12,
            color: "rgba(254,253,251,0.5)",
            letterSpacing: "0.4px",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Profile Engine
        </span>
      </div>
    </div>
  );
}
