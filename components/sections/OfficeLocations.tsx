"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { C } from "@/lib/colors";
import { CONTACT_OFFICES } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const PINS: Record<string, { cx: number; cy: number; delay: number }> = {
  Pune: { cx: 670, cy: 260, delay: 0 },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function getZonedDate(date: Date, timeZone: string) {
  return new Date(date.toLocaleString("en-US", { timeZone }));
}

function isBusinessHours(date: Date, timeZone: string) {
  const hour = getZonedDate(date, timeZone).getHours();
  return hour >= 9 && hour < 18;
}

function formatLocalTime(date: Date, timeZone: string, tzLabel: string) {
  const time = date.toLocaleTimeString("en-US", { timeZone, hour: "2-digit", minute: "2-digit", hour12: true });
  return `${time} ${tzLabel}`;
}

export default function OfficeLocations() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ background: C.forest900, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 13,
            letterSpacing: "2px",
            color: C.gold400,
            background: "rgba(200,151,62,0.1)",
            border: `1px solid ${C.gold500}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          OUR OFFICES
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.cream50, fontWeight: 400, margin: "20px 0 0", textAlign: "center" }}>
          Global Reach. Personal Service.
        </h2>
      </motion.div>

      <motion.svg
        viewBox="0 0 1000 500"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ width: "100%", maxWidth: 900, margin: "0 auto 56px", display: "block" }}
      >
        <polygon
          points="80,90 220,70 260,140 230,200 150,260 90,220 60,150"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
        <polygon
          points="430,80 520,70 560,140 540,240 500,420 450,400 420,220 410,140"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
        <polygon
          points="620,90 850,70 950,150 900,220 800,200 750,280 650,260 600,180"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
        <polygon
          points="800,350 880,340 900,390 850,410 810,395"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />

        {CONTACT_OFFICES.map((office) => {
          const pin = PINS[office.city];
          if (!pin) return null;
          return (
            <g key={office.city}>
              <motion.circle
                cx={pin.cx}
                cy={pin.cy}
                r={16}
                fill="none"
                stroke={C.gold500}
                strokeOpacity={0.3}
                aria-hidden="true"
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: pin.delay }}
                style={{ transformOrigin: `${pin.cx}px ${pin.cy}px` }}
              />
              <motion.circle
                cx={pin.cx}
                cy={pin.cy}
                r={5}
                fill={C.gold500}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: pin.delay * 0.5 }}
                style={{ transformOrigin: `${pin.cx}px ${pin.cy}px` }}
              />
              <text
                x={pin.cx}
                y={pin.cy - 12}
                textAnchor="middle"
                fontSize={10}
                fill={C.cream50}
                fontFamily="var(--font-inter), sans-serif"
                className="ct-map-citylabel"
              >
                {office.city}
              </text>
            </g>
          );
        })}
      </motion.svg>

      <motion.div
        className="ct-office-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        style={{ maxWidth: 420, margin: "0 auto", gridTemplateColumns: "1fr" }}
      >
        {CONTACT_OFFICES.map((office) => {
          const open = isBusinessHours(now, office.timezone);
          return (
            <motion.div
              key={office.city}
              variants={card}
              style={{
                background: C.forest850,
                border: "1px solid rgba(200,151,62,0.15)",
                borderRadius: 14,
                padding: "32px 28px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 24, color: C.cream50, fontWeight: 400 }}>
                    {office.city}
                  </div>
                  <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.5)", marginTop: 2 }}>
                    {office.country}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 600, color: C.gold400 }}>
                    {formatLocalTime(now, office.timezone, office.tzLabel)}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: open ? "#4ABA8A" : C.textLight,
                      marginTop: 4,
                      marginLeft: "auto",
                    }}
                  />
                </div>
              </div>

              <div style={{ height: 1, background: "rgba(200,151,62,0.1)", margin: "16px 0" }} />

              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <MapPin size={14} color={C.gold400} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.6)", lineHeight: 1.6 }}>
                  {office.address}
                </span>
              </div>

              <a
                href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, textDecoration: "none" }}
              >
                <Phone size={14} color={C.gold400} aria-hidden="true" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.6)" }}>
                  {office.phone}
                </span>
              </a>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
