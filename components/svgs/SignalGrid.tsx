"use client";

import { useMemo } from "react";

export default function SignalGrid() {
  const dots = useMemo(() => {
    const result = [];
    const cols = 32;
    const rows = 10;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const seed = Math.sin(r * 47 + c * 31) * 0.5 + 0.5;
        const seed2 = Math.sin(r * 13 + c * 97) * 0.5 + 0.5;
        result.push({
          x: (c / (cols - 1)) * 1200,
          y: (r / (rows - 1)) * 320,
          r: 1 + seed * 1.5,
          opacity: 0.08 + seed2 * 0.18,
          delay: (r * cols + c) * 0.008,
        });
      }
    }
    return result;
  }, []);

  const lines = useMemo(
    () => [
      { y: 60, opacity: 0.12, duration: 8 },
      { y: 130, opacity: 0.08, duration: 11 },
      { y: 200, opacity: 0.1, duration: 9 },
      { y: 260, opacity: 0.07, duration: 13 },
    ],
    []
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 1200 320"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#C8973E" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C8973E" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dotFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <mask id="gridMask">
            <rect width="1200" height="320" fill="url(#dotFade)" />
          </mask>
          <style>{`
            @keyframes scanLine {
              0%   { transform: translateX(-100%); opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 1; }
              100% { transform: translateX(200%); opacity: 0; }
            }
            @keyframes dotPulse {
              0%, 100% { opacity: var(--base-op); }
              50%       { opacity: calc(var(--base-op) * 2.5); }
            }
          `}</style>
        </defs>

        {/* Center radial glow behind button */}
        <ellipse cx="600" cy="160" rx="320" ry="140" fill="url(#centerGlow)" />

        {/* Dot grid */}
        <g mask="url(#gridMask)">
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill="#C8973E"
              style={{
                opacity: d.opacity,
                animation: `dotPulse ${3 + (i % 4)}s ease-in-out ${d.delay}s infinite`,
                ["--base-op" as string]: d.opacity,
              }}
            />
          ))}
        </g>

        {/* Horizontal scan lines */}
        {lines.map((line, i) => (
          <g
            key={i}
            style={{
              animation: `scanLine ${line.duration}s linear ${i * 2.5}s infinite`,
            }}
          >
            <line
              x1="0"
              y1={line.y}
              x2="400"
              y2={line.y}
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeOpacity={line.opacity}
            />
          </g>
        ))}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8973E" stopOpacity="0" />
            <stop offset="40%" stopColor="#E5BF63" stopOpacity="1" />
            <stop offset="100%" stopColor="#C8973E" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
