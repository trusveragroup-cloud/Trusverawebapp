"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { C } from "@/lib/colors"
import {
  ArrowRight, Mail, MapPin,
  Target, Shield, Award, Users,
  CheckCircle, Briefcase,
  TrendingUp, BookOpen,
} from "lucide-react"

const VALUE_CARDS = [
  {
    icon: Target,
    iconColor: C.forest600,
    title: "Precision in Everything",
    body: "We do not cut corners. Every data point, every account profile, and every qualified lead we deliver is held to a rigorous standard of accuracy and reliability.",
  },
  {
    icon: Shield,
    iconColor: C.forest600,
    title: "Integrity as a Foundation",
    body: "Our relationships with clients are built on transparency and trust. We operate with full accountability and never overpromise what we cannot deliver.",
  },
  {
    icon: Award,
    iconColor: C.gold500,
    title: "Recognition of Excellence",
    body: "High performance is acknowledged and rewarded. We believe in creating an environment where exceptional work is seen, valued, and celebrated.",
  },
  {
    icon: BookOpen,
    iconColor: C.forest600,
    title: "Continuous Development",
    body: "The B2B intelligence landscape evolves constantly. We invest in the professional growth of our team through learning, exposure, and meaningful challenges.",
  },
  {
    icon: Users,
    iconColor: C.forest600,
    title: "Collaborative by Design",
    body: "We work as one team across functions. Ideas are shared openly, decisions are made collectively, and success is celebrated together.",
  },
  {
    icon: TrendingUp,
    iconColor: C.gold500,
    title: "Impact-Driven Work",
    body: "The work we do directly influences how enterprise sales and marketing teams build pipeline. The impact of your contribution is tangible and measurable.",
  },
]

const CULTURE_STATEMENTS = [
  {
    title: "We Measure What Matters",
    body: "Performance at TrusVera is defined by outcomes, not activity. We focus on metrics that reflect genuine business impact.",
  },
  {
    title: "Ownership at Every Level",
    body: "Every team member owns their work end to end. We do not pass responsibility. We take it.",
  },
  {
    title: "Honest Feedback, Always",
    body: "We communicate with candor. Constructive feedback is how we grow, and we give it with respect and intention.",
  },
  {
    title: "Clients as Partners",
    body: "We treat every client engagement as a long-term partnership. Their success is the measure of our success.",
  },
]

const COMMITMENT_PILLS = [
  "Client Precision",
  "Data Integrity",
  "Accountable Delivery",
  "Research Quality",
  "Strategic Thinking",
  "Professional Excellence",
  "Ethical Practices",
  "Outcome Focused",
]

export default function CareersClient() {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.10) !important;
          transition: all 0.25s ease;
        }
        @media (max-width: 768px) {
          .careers-hero-title { font-size: 42px !important; }
          .careers-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr 1fr !important; }
          .culture-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* SECTION 1: HERO */}
      <section
        style={{
          width: "100%",
          background: C.forest800,
          padding: "120px 24px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.12,
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C.gold400}1A 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                color: C.gold400,
                textTransform: "uppercase",
                letterSpacing: 3,
                marginBottom: 20,
                display: "block",
              }}
            >
              We Are Hiring
            </span>

            <h1
              className="careers-hero-title"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 72,
                color: C.cream100,
                lineHeight: 1.05,
                marginBottom: 28,
                fontWeight: 400,
              }}
            >
              Build the Future of
              <br />
              <span style={{ color: C.gold400 }}>B2B Intelligence</span>
            </h1>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 19,
                color: C.cream300,
                lineHeight: 1.75,
                maxWidth: 680,
                margin: "0 auto 40px",
              }}
            >
              TrusVera Group is built on the belief that precision intelligence drives better business outcomes. We bring together sharp minds who are committed to delivering excellence in B2B demand generation, account profiling, and market intelligence.
            </p>

            <div
              style={{
                width: 64,
                height: 3,
                background: C.gold400,
                margin: "0 auto 40px",
              }}
            />

            <Link
              href="#apply-section"
              style={{
                background: C.gold500,
                color: C.forest900,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                padding: "14px 32px",
                borderRadius: 6,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Explore Opportunities
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: WHY TRUSVERA */}
      <section style={{ width: "100%", background: C.cream100, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto 64px", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                color: C.forest600,
                textTransform: "uppercase",
                letterSpacing: 3,
                marginBottom: 16,
                display: "block",
              }}
            >
              Why TrusVera Group
            </span>
            <h2
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 48,
                color: C.forest800,
                marginBottom: 20,
                fontWeight: 400,
              }}
            >
              Where Expertise Meets Purpose
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 18,
                color: C.slate600,
                lineHeight: 1.7,
                maxWidth: 640,
                margin: "0 auto",
              }}
            >
              We are a team of specialists who take pride in the quality of our work. At TrusVera Group, every engagement is an opportunity to raise the standard of B2B intelligence delivery.
            </p>
          </motion.div>
        </div>

        <div
          className="careers-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {VALUE_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                className="value-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.1 }}
                style={{
                  background: C.cream100,
                  borderRadius: 14,
                  padding: "32px 28px",
                  border: `1px solid ${C.slate200}`,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: C.forest100,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon size={28} color={card.iconColor} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: 20,
                    color: C.forest800,
                    marginBottom: 12,
                    fontWeight: 400,
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.slate600, lineHeight: 1.7 }}>
                  {card.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* SECTION 3: CULTURE AT TRUSVERA */}
      <section style={{ width: "100%", background: C.forest700, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                color: C.gold400,
                textTransform: "uppercase",
                letterSpacing: 3,
                display: "block",
                marginBottom: 16,
              }}
            >
              Our Culture
            </span>
            <h2
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 48,
                color: C.cream100,
                marginBottom: 20,
                fontWeight: 400,
              }}
            >
              A Culture of Craft and Accountability
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 17,
                color: C.cream300,
                lineHeight: 1.7,
                maxWidth: 580,
                margin: "0 auto",
              }}
            >
              We hold ourselves to high standards because our clients depend on us to deliver intelligence that drives real business decisions.
            </p>
          </div>

          <div
            className="culture-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              {CULTURE_STATEMENTS.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  style={{ display: "flex", gap: 16, marginBottom: 32 }}
                >
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    <CheckCircle size={20} color={C.gold400} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 16,
                        fontWeight: 700,
                        color: C.cream100,
                        marginBottom: 6,
                      }}
                    >
                      {s.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: C.cream300,
                        lineHeight: 1.65,
                      }}
                    >
                      {s.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: 36,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  color: C.gold400,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 24,
                }}
              >
                Our Commitments
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {COMMITMENT_PILLS.map((pill) => (
                  <span
                    key={pill}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 24,
                      padding: "10px 20px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      color: C.cream200,
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", margin: "24px 0" }} />

              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: 18,
                  fontStyle: "italic",
                  color: C.cream200,
                  lineHeight: 1.7,
                }}
              >
                Intelligence without integrity is just data. We deliver both.
              </p>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  color: C.gold400,
                  marginTop: 12,
                }}
              >
                TrusVera Group
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OFFICE LOCATIONS */}
      <section style={{ width: "100%", background: C.cream200, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 40,
                color: C.forest800,
                marginBottom: 12,
                fontWeight: 400,
              }}
            >
              Where We Work
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                color: C.slate600,
                lineHeight: 1.6,
              }}
            >
              TrusVera Group operates from our Pune headquarters, serving enterprise clients across global markets.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24,
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                background: C.cream100,
                borderRadius: 14,
                padding: 36,
                border: `1px solid ${C.slate200}`,
              }}
            >
              <MapPin size={24} color={C.forest600} style={{ marginBottom: 16 }} />
              <h3
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: 24,
                  color: C.forest800,
                  fontWeight: 400,
                }}
              >
                Pune, India
              </h3>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  color: C.forest600,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  marginBottom: 12,
                }}
              >
                Headquarters
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.slate600, lineHeight: 1.65 }}>
                Our primary operations hub where our core team of B2B intelligence specialists, demand generation strategists, and account profiling experts are based.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: APPLICATION CTA */}
      <section id="apply-section" style={{ width: "100%", background: C.forest800, padding: "100px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <Briefcase size={40} color={C.gold400} style={{ marginBottom: 24 }} />
            <h2
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 44,
                color: C.cream100,
                lineHeight: 1.2,
                marginBottom: 20,
                fontWeight: 400,
              }}
            >
              Ready to Contribute to Something Meaningful?
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 17,
                color: C.cream300,
                lineHeight: 1.75,
                marginBottom: 36,
              }}
            >
              We are always interested in connecting with talented professionals who share our commitment to precision, integrity, and excellence in B2B intelligence. If you believe you can add value to what we do, we want to hear from you.
            </p>

            <div
              style={{
                width: 64,
                height: 3,
                background: C.gold400,
                margin: "0 auto 36px",
              }}
            />

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="mailto:info@trusveragrp.com?subject=Career Enquiry - TrusVera Group"
                style={{
                  background: C.gold500,
                  color: C.forest900,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  padding: "14px 32px",
                  borderRadius: 6,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Mail size={16} />
                Send Your CV
              </Link>

              <Link
                href="/contact"
                style={{
                  background: "transparent",
                  color: C.cream100,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  padding: "14px 32px",
                  borderRadius: 6,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.3)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Get in Touch
                <ArrowRight size={16} />
              </Link>
            </div>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: C.cream400,
                marginTop: 16,
              }}
            >
              Send your CV and a brief introduction to info@trusveragrp.com
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
