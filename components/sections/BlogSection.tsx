"use client";

import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/hooks/useReveal";
import { BLOGS } from "@/lib/data";
import { C } from "@/lib/colors";

export default function BlogSection() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [ref, visible] = useReveal(0.1);

  return (
    <section id="blogs" style={{ background: C.cream100, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          ref={headerRef}
          className={`reveal-up${headerVisible ? " vis" : ""}`}
          style={{ textAlign: "center" }}
        >
          <span
            style={{
              display: "inline-block",
              color: C.forest700,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              background: "rgba(15,61,46,0.07)",
              borderRadius: 20,
              padding: "6px 16px",
              marginBottom: 20,
            }}
          >
            THOUGHT LEADERSHIP
          </span>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: C.forest800, margin: "16px 0" }}>
            Latest Insights
          </h2>
          <p style={{ fontSize: 16, color: C.textMuted, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
            Expert perspectives on B2B intent data, account-based marketing, and enterprise demand generation
            strategies for technology companies.
          </p>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: 20,
              fontSize: 14,
              fontWeight: 600,
              color: C.forest700,
              textDecoration: "none",
            }}
          >
            View All Articles
            <ArrowRight size={14} />
          </a>
        </div>

        <div ref={ref} className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 48 }}>
          {BLOGS.map((blog, i) => (
            <div key={blog.title} className={`blog-card reveal-up d${i + 1}${visible ? " vis" : ""}`}>
              <div style={{ height: 160, position: "relative", overflow: "hidden", background: blog.gradient }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div style={{ position: "absolute", top: -20, right: -10, width: 120, height: 120, borderRadius: "50%", background: "rgba(200,151,62,0.06)" }} />
                <div style={{ position: "absolute", top: 20, right: 30, width: 60, height: 60, borderRadius: "50%", background: "rgba(200,151,62,0.08)" }} />
                <span
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 20,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: C.gold400,
                    background: "rgba(200,151,62,0.15)",
                    border: "1px solid rgba(200,151,62,0.25)",
                    borderRadius: 4,
                    padding: "3px 10px",
                  }}
                >
                  {blog.category}
                </span>
              </div>
              <div style={{ padding: 24 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: C.textDark, lineHeight: 1.4, minHeight: 64 }}>{blog.title}</h4>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.65, marginBottom: 16, marginTop: 10 }}>{blog.excerpt}</p>
                <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: C.textLight }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={12} />
                      {blog.date}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={12} />
                      {blog.readTime}
                    </span>
                  </div>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: C.forest700 }}>
                    Read
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
