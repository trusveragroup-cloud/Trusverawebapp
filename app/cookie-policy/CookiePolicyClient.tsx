"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { C } from "@/lib/colors"
import {
  Cookie, Shield, Settings, Eye,
  CheckCircle, X, ChevronDown, ChevronUp,
  AlertCircle, Lock
} from "lucide-react"

const LAST_UPDATED = "July 29, 2026"
const EMAIL_ADDRESS = "info@trusveragrp.com"

const SECTIONS = [
  {
    id: 1,
    icon: Cookie,
    title: "What Are Cookies",
    content: [
      "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.",
      "Cookies help us remember your preferences, understand how you use our website, and improve your experience on subsequent visits.",
      "Similar technologies such as web beacons, pixels, and local storage may also be used for similar purposes and are covered by this policy.",
    ]
  },
  {
    id: 2,
    icon: Shield,
    title: "Types of Cookies We Use",
    content: [
      "Essential Cookies (Always Active):",
      "- Session cookies that keep you logged in to the admin panel",
      "- Security cookies that protect against cross-site request forgery",
      "- Load balancing cookies that ensure consistent website performance",
      "- These cookies are strictly necessary for the website to function and cannot be disabled",
      "Preference Cookies (Optional):",
      "- Cookies that remember your cookie consent choice",
      "- Cookies that remember your language and display preferences",
      "Analytics Cookies (Optional):",
      "- Currently TrusVera Group does not use analytics cookies",
      "- If we introduce analytics in the future this policy will be updated",
      "Marketing Cookies (Not Used):",
      "- TrusVera Group does not use any marketing or advertising cookies",
      "- We do not track visitors across third-party websites",
    ]
  },
  {
    id: 3,
    icon: Eye,
    title: "How We Use Cookies",
    content: [
      "We use cookies for the following purposes:",
      "- Authentication: To keep admin users logged in securely across page visits",
      "- Security: To protect the website and admin panel from unauthorized access",
      "- Preferences: To remember your cookie consent choice so we do not ask repeatedly",
      "- Performance: To ensure the website loads correctly and consistently",
      "We do not use cookies to:",
      "- Track your browsing activity across other websites",
      "- Build advertising profiles",
      "- Share your data with advertising networks",
      "- Identify you personally without your consent",
    ]
  },
  {
    id: 4,
    icon: Settings,
    title: "Managing Your Cookie Preferences",
    content: [
      "You can manage your cookie preferences in several ways:",
      "Cookie Consent Banner: When you first visit our website a cookie consent banner will appear. You can choose to accept all cookies, decline optional cookies, or manage your preferences individually.",
      "Browser Settings: Most browsers allow you to control cookies through their settings. You can:",
      "- Block all cookies",
      "- Delete existing cookies",
      "- Allow cookies from specific websites only",
      "- Set your browser to notify you when cookies are being set",
      "Please note that blocking essential cookies may affect the functionality of our website and admin panel.",
      "For information on managing cookies in your browser visit:",
      "- Google Chrome: chrome://settings/cookies",
      "- Mozilla Firefox: about:preferences#privacy",
      "- Safari: Preferences > Privacy",
      "- Microsoft Edge: edge://settings/cookies",
    ]
  },
  {
    id: 5,
    icon: Lock,
    title: "Third-Party Cookies",
    content: [
      "Our website uses a limited number of third-party services that may set their own cookies:",
      "Supabase (Authentication): Our authentication provider may set cookies to manage secure sessions. These are essential cookies required for the admin panel to function.",
      "We do not permit third-party advertising networks, social media platforms, or analytics providers to set cookies on our website without your explicit consent.",
      "Any third-party services we use in the future will be disclosed in this policy before they are implemented.",
    ]
  },
  {
    id: 6,
    icon: AlertCircle,
    title: "Cookie Retention Periods",
    content: [
      "Different cookies are retained for different periods:",
      "- Session cookies: Deleted automatically when you close your browser",
      "- Authentication cookies: Retained for up to 7 days for logged-in admin users",
      "- Consent cookies: Retained for 365 days so we remember your preference",
      "- Preference cookies: Retained for up to 12 months",
      "After these periods expire the cookies are automatically deleted from your device.",
    ]
  },
  {
    id: 7,
    icon: Shield,
    title: "Your Rights",
    content: [
      "Under GDPR, DPDP 2023, and CCPA you have the following rights regarding cookies:",
      "- Right to be informed: We tell you clearly what cookies we use and why",
      "- Right to consent: We ask for your consent before setting non-essential cookies",
      "- Right to withdraw consent: You can change your cookie preferences at any time",
      "- Right to access: You can see what cookies are set in your browser settings",
      "- Right to delete: You can delete cookies at any time through your browser",
      "To exercise these rights or for any questions about our use of cookies please contact us at info@trusveragrp.com",
    ]
  },
  {
    id: 8,
    icon: Cookie,
    title: "Updates to This Policy",
    content: [
      "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices.",
      "When we make significant changes we will update the Last Updated date at the top of this page.",
      "We encourage you to review this policy periodically to stay informed about how we use cookies.",
      "Your continued use of our website after any changes constitutes acceptance of the updated policy.",
    ]
  },
]

function renderTextWithEmail(text: string) {
  if (!text.includes(EMAIL_ADDRESS)) return text

  const parts = text.split(EMAIL_ADDRESS)
  const nodes: React.ReactNode[] = []
  parts.forEach((part, i) => {
    if (i > 0) {
      nodes.push(
        <Link key={`email-${i}`} href={`mailto:${EMAIL_ADDRESS}`} style={{ color: C.forest600, textDecoration: "none" }}>
          {EMAIL_ADDRESS}
        </Link>
      )
    }
    if (part) nodes.push(part)
  })
  return nodes
}

export default function CookiePolicyClient() {
  const [activeSection, setActiveSection] = useState<number | null>(null)

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cookie-section:hover {
          border-color: ${C.forest600} !important;
        }
        .toc-link:hover {
          color: ${C.forest600} !important;
          padding-left: 8px !important;
        }
        .toc-link { transition: all 0.15s ease; }
        @media (max-width: 1024px) {
          .cookie-layout { grid-template-columns: 1fr !important; }
          .toc-sidebar { display: none !important; }
        }
        @media (max-width: 768px) {
          .cookie-hero-title { font-size: 40px !important; }
        }
      `}</style>

      {/* HERO */}
      <section
        style={{
          width: "100%",
          background: C.forest800,
          padding: "100px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.10,
            zIndex: 0,
          }}
        />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <Cookie size={40} color={C.gold400} />
            </div>

            <span
              style={{
                display: "block",
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                color: C.gold400,
                textTransform: "uppercase",
                letterSpacing: 3,
                marginBottom: 16,
              }}
            >
              Legal & Compliance
            </span>

            <h1
              className="cookie-hero-title"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 60,
                color: C.cream100,
                lineHeight: 1.1,
                marginBottom: 20,
                fontWeight: 400,
              }}
            >
              Cookie Policy
            </h1>

            <div style={{ width: 64, height: 3, background: C.gold400, margin: "0 auto 24px" }} />

            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.cream300 }}>
              Last Updated: {LAST_UPDATED}
            </p>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: C.cream400,
                marginTop: 12,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.6,
              }}
            >
              We use only essential cookies required for our website to function. No advertising or tracking
              cookies are used.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TWO COLUMN LAYOUT */}
      <div
        className="cookie-layout"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 24px",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 48,
          alignItems: "flex-start",
        }}
      >
        {/* TOC */}
        <div className="toc-sidebar" style={{ position: "sticky", top: 80 }}>
          <div style={{ background: C.cream100, borderRadius: 12, border: `1px solid ${C.slate200}`, padding: 24 }}>
            <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: C.forest800, marginBottom: 16 }}>
              Contents
            </div>
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#cookie-${section.id}`}
                className="toc-link"
                style={{
                  display: "block",
                  padding: "8px 0",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  color: C.slate600,
                  textDecoration: "none",
                  borderBottom: `1px solid ${C.slate100}`,
                }}
              >
                {section.id}. {section.title}
              </a>
            ))}

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.slate200}` }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.slate500, lineHeight: 1.6, margin: 0 }}>
                To change your cookie preferences click the cookie icon at the bottom of any page.
              </p>
            </div>
          </div>
        </div>

        {/* COOKIE SECTIONS */}
        <div>
          {SECTIONS.map((section, index) => {
            const Icon = section.icon
            const isOpen = activeSection === section.id

            return (
              <motion.div
                key={section.id}
                id={`cookie-${section.id}`}
                className="cookie-section"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.1 }}
                onClick={() => setActiveSection(isOpen ? null : section.id)}
                style={{
                  background: C.cream100,
                  borderRadius: 12,
                  border: `1px solid ${C.slate200}`,
                  borderLeft: `3px solid ${C.forest600}`,
                  padding: 32,
                  marginBottom: 16,
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: C.forest100,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} color={C.forest600} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 11,
                          color: C.slate400,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                        }}
                      >
                        Section {section.id}
                      </div>
                      <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800 }}>
                        {section.title}
                      </div>
                    </div>
                  </div>
                  <div>
                    {isOpen ? <ChevronUp size={20} color={C.slate400} /> : <ChevronDown size={20} color={C.slate400} />}
                  </div>
                </div>

                {isOpen && (
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.slate100}` }}>
                    {section.content.map((text, i) => {
                      if (text.startsWith("- ")) {
                        return (
                          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: C.forest600,
                                marginTop: 8,
                                flexShrink: 0,
                              }}
                            />
                            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.slate600, lineHeight: 1.8, margin: 0 }}>
                              {renderTextWithEmail(text.slice(2))}
                            </p>
                          </div>
                        )
                      }

                      if (text.endsWith(":")) {
                        return (
                          <p
                            key={i}
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: 14,
                              fontWeight: 700,
                              color: C.forest800,
                              marginTop: i === 0 ? 0 : 12,
                              marginBottom: 8,
                            }}
                          >
                            {text}
                          </p>
                        )
                      }

                      return (
                        <p key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.slate600, lineHeight: 1.8, marginBottom: 10 }}>
                          {renderTextWithEmail(text)}
                        </p>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}
