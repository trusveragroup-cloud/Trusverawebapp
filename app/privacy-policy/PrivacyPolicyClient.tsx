"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { C } from "@/lib/colors"
import {
  Shield, FileText, Eye, Trash2, Download,
  AlertCircle, Lock, Globe, Cookie,
  ChevronDown, ChevronUp, Mail, MapPin,
  CheckCircle, Clock
} from "lucide-react"

const LAST_UPDATED = "July 25, 2026"
const EMAIL_ADDRESS = "info@trusveragrp.com"

const SECTIONS = [
  {
    id: 1,
    icon: FileText,
    title: "Information We Collect",
    content: `
      We collect information directly from individuals, automatically
      through website interactions, and from enquiries submitted via
      our contact form.

      Personal Information we collect includes:
      - Contact Information: Full name, email address, phone number,
        job title, and company name
      - Enquiry Information: Service interest and pipeline challenge
        details submitted through our contact form
      - Demographic Information: Industry, company size, and location
        where voluntarily provided

      Usage Information collected automatically includes:
      - Device Data: IP address, device type, browser type, operating
        system, and referral information
      - Interaction Data: Pages visited, links clicked, and actions
        taken on our website
      - Consent Data: Timestamp, IP address, and browser details
        recorded at the moment of consent submission
    `
  },
  {
    id: 2,
    icon: Eye,
    title: "How We Use Your Information",
    content: `
      We use personal information to:

      - Provide Services: Manage and respond to requests for our B2B
        intelligence services including intent data, account profiling,
        BANT-qualified leads, lead generation, email marketing, market
        research, and whitepaper promotion
      - Communications: Send confirmation emails and respond to enquiries
        submitted through our website
      - Service Improvement: Understand how visitors use our website to
        improve functionality and content
      - Compliance and Security: Comply with applicable legal requirements
        and protect against unauthorized access or misuse of data
      - Audit Trail: Maintain records of consent for compliance with
        DPDP 2023, GDPR, and CCPA

      We do not use personal information for automated decision-making
      or profiling that produces legal or similarly significant effects.
    `
  },
  {
    id: 3,
    icon: Shield,
    title: "Legal Basis for Data Processing",
    content: `
      We process personal data under the following lawful bases:

      Under DPDP 2023 (India):
      - Consent: When individuals submit our contact form and provide
        explicit consent to processing. Consent is recorded with
        timestamp, IP address, and the exact consent text shown.
      - Legitimate Use: For purposes such as responding to enquiries
        and improving our services.

      Under GDPR (European Union):
      - Consent: When users opt into communications or submit enquiries.
      - Legitimate Interest: For fraud prevention, security, and
        service improvement purposes.
      - Contractual Obligation: To fulfill requests for our services
        or respond to enquiries.

      Under CCPA (California, USA):
      - We process personal information for legitimate business purposes
        as disclosed in this policy.
      - We do not sell personal data as defined under CCPA.
    `
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Your Rights",
    content: `
      Under DPDP 2023, GDPR, and CCPA, you have the following rights
      regarding your personal data:

      Rights under DPDP 2023 (India):
      - Right to Access: Obtain information about personal data
        processed by us
      - Right to Correction: Request correction of inaccurate or
        incomplete data
      - Right to Erasure: Request deletion of your personal data
      - Right to Grievance Redressal: Raise concerns with our
        designated contact
      - Right to Nominee: Designate a person to exercise rights
        on your behalf

      Rights under GDPR (EU):
      - Right to Access: Obtain a copy of your personal data
      - Right to Rectification: Request correction of inaccurate data
      - Right to Erasure: Request deletion under certain conditions
      - Right to Restrict Processing: Limit how we process your data
      - Right to Data Portability: Receive data in a machine-readable
        format
      - Right to Object: Opt out of specific processing activities

      Rights under CCPA (California):
      - Right to Know: Request details on data collection and sharing
      - Right to Delete: Request deletion of personal information
      - Right to Opt-Out: Choose not to have data sold (we do not
        sell data)
      - Right to Non-Discrimination: Exercise rights without penalty

      To exercise any of these rights, contact us at
      info@trusveragrp.com
    `
  },
  {
    id: 5,
    icon: Globe,
    title: "Data Sharing and Disclosure",
    content: `
      We may share personal data with:

      - Service Providers: Third-party providers who assist in
        operating our website, sending emails, and storing data
        securely. These providers are contractually bound to handle
        data only as directed by us.
      - Compliance Purposes: To comply with legal obligations,
        respond to lawful government requests, or enforce our terms.
      - Business Transfers: In the event of a merger, acquisition,
        or asset sale, personal data may be transferred as part of
        that transaction.

      We do not sell personal data to third parties.
      We do not share personal data for third-party advertising purposes.

      All third-party service providers we engage are required to
      maintain appropriate security standards and process data only
      for the purposes we specify.
    `
  },
  {
    id: 6,
    icon: Lock,
    title: "Data Security",
    content: `
      We implement technical and organizational measures to protect
      personal data from unauthorized access, misuse, alteration,
      or disclosure. These measures include:

      - Encryption: Data is encrypted in transit using TLS and at
        rest in our database
      - Access Controls: Personal data is accessible only to
        authorized personnel with a legitimate need
      - Row Level Security: Database-level access controls enforced
        on all data tables
      - Audit Logging: All consent events are recorded in an
        immutable audit log
      - Regular Reviews: Security practices are reviewed periodically
        to address emerging risks

      While we take all reasonable measures to protect your data,
      no method of transmission over the internet is 100% secure.
      We encourage you to contact us immediately if you suspect any
      unauthorized use of your information.
    `
  },
  {
    id: 7,
    icon: Clock,
    title: "Data Retention",
    content: `
      We retain personal information only for as long as necessary
      for legitimate business purposes and compliance with legal
      obligations.

      Our standard retention periods are:

      - Contact form submissions: 730 days (2 years) from the date
        of consent, in compliance with DPDP 2023
      - Consent audit logs: Retained for the duration of the
        associated contact record
      - Website usage data: Retained for up to 12 months

      After the retention period expires, personal data is either
      securely deleted or anonymized so that it can no longer be
      associated with an individual.

      You may request early deletion of your data at any time by
      contacting us at info@trusveragrp.com
    `
  },
  {
    id: 8,
    icon: Globe,
    title: "International Data Transfers",
    content: `
      TrusVera Group is headquartered in Pune, India. Personal data
      submitted through our website is stored on servers provided by
      our infrastructure partners.

      Where personal data is transferred outside India or the European
      Economic Area (EEA), we ensure appropriate safeguards are in
      place including:

      - Standard Contractual Clauses approved by the European Commission
      - Data processing agreements with all third-party service providers
      - Compliance with DPDP 2023 cross-border transfer requirements

      By submitting your information through our website, you
      acknowledge that your data may be processed in countries
      outside your own.
    `
  },
  {
    id: 9,
    icon: Cookie,
    title: "Cookies and Tracking Technologies",
    content: `
      Our website uses cookies and similar tracking technologies to
      enhance user experience and understand how visitors interact
      with our content.

      Types of cookies we use:
      - Essential Cookies: Required for the website to function
        correctly. These cannot be disabled.
      - Analytics Cookies: Help us understand how visitors use our
        website so we can improve it.
      - Preference Cookies: Remember your settings and preferences
        for a better experience.

      You can manage cookie settings through your browser preferences.
      Most browsers allow you to refuse cookies or alert you when
      cookies are being sent. Note that disabling certain cookies
      may affect the functionality of our website.

      We do not use cookies for advertising or cross-site tracking
      purposes.
    `
  },
  {
    id: 10,
    icon: AlertCircle,
    title: "Children's Privacy",
    content: `
      Our services are designed for business professionals and are
      not intended for individuals under the age of 18.

      We do not knowingly collect personal data from anyone under
      18 years of age. If you believe we have inadvertently collected
      information from a minor, please contact us immediately at
      info@trusveragrp.com and we will promptly delete such data.
    `
  },
  {
    id: 11,
    icon: FileText,
    title: "Policy Updates",
    content: `
      We may update this Privacy Policy periodically to reflect
      changes in our practices, legal requirements, or regulatory
      guidance.

      When we make significant changes, we will:
      - Update the "Last Updated" date at the top of this policy
      - Post the updated policy on this page
      - Where required by law, notify affected individuals directly

      We encourage you to review this policy periodically to stay
      informed about how we protect your information.

      Continued use of our website after policy updates constitutes
      acceptance of the revised policy.
    `
  },
  {
    id: 12,
    icon: Mail,
    title: "Contact Us",
    content: `
      For any questions, concerns, or to exercise your data rights,
      please contact us:

      TrusVera Group
      Email: info@trusveragrp.com
      Address: Kasarwadi, PCMC, Pune - 411034, India

      We will respond to all data rights requests within 30 days
      of receipt, in accordance with applicable regulations.

      For complaints related to DPDP 2023 compliance, you may also
      contact the Data Protection Board of India once established
      under the Digital Personal Data Protection Act, 2023.

      For GDPR-related complaints, you may contact your local
      supervisory authority in the European Union.
    `
  },
]

type ContentBlock = { type: "bullet" | "paragraph" | "heading"; text: string }

function parseContent(content: string): ContentBlock[] {
  const lines = content.split("\n")
  const blocks: ContentBlock[] = []
  let openBullet: ContentBlock | null = null

  for (const raw of lines) {
    const line = raw.trim()

    if (!line) {
      openBullet = null
      continue
    }

    if (line.startsWith("- ")) {
      const block: ContentBlock = { type: "bullet", text: line.slice(2) }
      blocks.push(block)
      openBullet = block
      continue
    }

    if (openBullet) {
      openBullet.text = `${openBullet.text} ${line}`
      continue
    }

    blocks.push({ type: line.endsWith(":") ? "heading" : "paragraph", text: line })
  }

  return blocks
}

function renderBlockText(text: string, linkEmail: boolean) {
  if (!linkEmail || !text.includes(EMAIL_ADDRESS)) return text

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

export default function PrivacyPolicyClient() {
  const [activeSection, setActiveSection] = useState<number | null>(null)

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .policy-section:hover {
          border-color: ${C.forest600} !important;
        }
        .toc-link:hover {
          color: ${C.forest600} !important;
          padding-left: 8px !important;
        }
        .toc-link { transition: all 0.15s ease; }
        @media (max-width: 1024px) {
          .privacy-layout { grid-template-columns: 1fr !important; }
          .toc-sidebar { display: none !important; }
        }
        @media (max-width: 768px) {
          .privacy-hero-title { font-size: 40px !important; }
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
            top: -80,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C.gold400}14 0%, transparent 70%)`,
            pointerEvents: "none",
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
              <Shield size={40} color={C.gold400} />
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
              className="privacy-hero-title"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 60,
                color: C.cream100,
                lineHeight: 1.1,
                marginBottom: 20,
                fontWeight: 400,
              }}
            >
              Privacy Policy
            </h1>

            <div style={{ width: 64, height: 3, background: C.gold400, margin: "0 auto 24px" }} />

            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.cream300 }}>
              Last Updated: {LAST_UPDATED}
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
              {["DPDP 2023", "GDPR", "CCPA"].map((label) => (
                <span
                  key={label}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 20,
                    padding: "6px 16px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: C.cream200,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <CheckCircle size={12} color={C.gold400} />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TWO COLUMN LAYOUT */}
      <div
        className="privacy-layout"
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
                href={`#section-${section.id}`}
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
          </div>
        </div>

        {/* POLICY SECTIONS */}
        <div>
          {SECTIONS.map((section, index) => {
            const Icon = section.icon
            const isOpen = activeSection === section.id
            const blocks = parseContent(section.content)
            const isContactSection = section.id === 12

            return (
              <motion.div
                key={section.id}
                id={`section-${section.id}`}
                className="policy-section"
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
                    {blocks.map((block, i) => {
                      if (block.type === "bullet") {
                        return (
                          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                            <span
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: C.forest600,
                                marginTop: 8,
                                flexShrink: 0,
                              }}
                            />
                            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.slate600, lineHeight: 1.8, margin: 0 }}>
                              {renderBlockText(block.text, isContactSection)}
                            </p>
                          </div>
                        )
                      }

                      if (block.type === "heading") {
                        return (
                          <p
                            key={i}
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: 15,
                              fontWeight: 700,
                              color: C.forest700,
                              marginTop: i === 0 ? 0 : 20,
                              marginBottom: 8,
                            }}
                          >
                            {block.text}
                          </p>
                        )
                      }

                      return (
                        <p key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.slate600, lineHeight: 1.8, marginBottom: 10 }}>
                          {renderBlockText(block.text, isContactSection)}
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
