"use client";

import { ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/hooks/useReveal";
import SignalGrid from "@/components/svgs/SignalGrid";

type BottomCTAProps = {
  headline?: string;
  subhead?: string;
  buttonLabel?: string;
};

export default function BottomCTA({
  headline = "Ready to Reach the Right Technology Buyers?",
  subhead = "Build your next enterprise sales pipeline milestone with TrusVera. Talk to a B2B demand generation specialist today.",
  buttonLabel = "Book Your Strategy Session",
}: BottomCTAProps) {
  const [ref, visible] = useReveal(0.3);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #061510 0%, #0D2E20 100%)",
        padding: "100px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SignalGrid />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 500,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(200,151,62,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={ref}
        className={`reveal-up${visible ? " vis" : ""}`}
        style={{ maxWidth: 650, margin: "0 auto", position: "relative", zIndex: 2 }}
      >
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 40, color: "#fff", lineHeight: 1.2, marginBottom: 14 }}>
          {headline}
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 36 }}>
          {subhead}
        </p>
        <button className="btn-gold-lg">
          {buttonLabel}
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
