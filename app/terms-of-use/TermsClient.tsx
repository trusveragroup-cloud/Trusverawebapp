"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { C } from "@/lib/colors"
import {
  FileText, ChevronDown, ChevronUp,
  Shield, Globe, AlertCircle, Scale,
  CheckCircle, Lock, ExternalLink
} from "lucide-react"

const EFFECTIVE_DATE = "July 28, 2026"
const LAST_UPDATED = "July 28, 2026"
const EMAIL_ADDRESS = "info@trusveragrp.com"

const SECTIONS = [
  {
    id: 1,
    icon: FileText,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the TrusVera Group website located at trusveragroup.com (the 'Website'), you agree to be bound by these Terms of Use ('Terms'). If you do not agree to these Terms, please do not use the Website.",
      "These Terms apply to all visitors, users, and others who access the Website. Your continued use of the Website constitutes your acceptance of any updates or modifications to these Terms.",
      "These Terms govern your use of this Website only. They do not govern any service agreements, client contracts, or commercial arrangements between TrusVera Group and its clients, which are subject to separate agreements.",
    ]
  },
  {
    id: 2,
    icon: Globe,
    title: "About TrusVera Group",
    content: [
      "TrusVera Group is a B2B demand generation and marketing intelligence company headquartered in Pune, India. We provide services including intent data, account profiling, BANT-qualified leads, lead generation, email marketing, market research, and whitepaper promotion to enterprise technology companies.",
      "Our Website is intended for business professionals and enterprise clients seeking B2B intelligence services. It is not intended for personal, family, or household use.",
      "For any enquiries about our services, please contact us at info@trusveragrp.com or visit our Contact page.",
    ]
  },
  {
    id: 3,
    icon: CheckCircle,
    title: "Permitted Use",
    content: [
      "You may use the Website for lawful purposes only. Specifically, you are permitted to:",
      "- Browse and access publicly available content on the Website",
      "- Submit enquiries through our contact form for legitimate business purposes",
      "- Download or share content that is explicitly made available for download",
      "- Link to our Website from your own website, provided the link is not misleading and does not suggest endorsement",
      "You agree to use the Website in a manner consistent with all applicable laws and regulations in your jurisdiction.",
    ]
  },
  {
    id: 4,
    icon: AlertCircle,
    title: "Prohibited Activities",
    content: [
      "You must not use the Website in any way that:",
      "- Violates any applicable local, national, or international law or regulation",
      "- Is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable",
      "- Involves the transmission of unsolicited commercial communications",
      "- Attempts to gain unauthorized access to any part of the Website or its related systems",
      "- Involves scraping, crawling, or harvesting data from the Website without our express written permission",
      "- Introduces viruses, trojans, worms, or other malicious or harmful code",
      "- Impersonates TrusVera Group, its employees, or any other person or entity",
      "- Interferes with or disrupts the integrity or performance of the Website",
      "TrusVera Group reserves the right to terminate access to the Website for any user who violates these prohibitions.",
    ]
  },
  {
    id: 5,
    icon: Lock,
    title: "Intellectual Property",
    content: [
      "All content on this Website including but not limited to text, graphics, logos, images, blog posts, data methodologies, service descriptions, and software is the property of TrusVera Group and is protected by applicable intellectual property laws including the Copyright Act, 1957 (India) and international copyright conventions.",
      "You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any content from this Website without our prior written consent, except as follows:",
      "- You may print or download one copy of a reasonable number of pages for your own personal, non-commercial use",
      "- You may share links to our blog posts and public content on social media or professional platforms",
      "The TrusVera Group name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of TrusVera Group. You must not use such marks without our prior written permission.",
    ]
  },
  {
    id: 6,
    icon: AlertCircle,
    title: "Disclaimer of Warranties",
    content: [
      "The Website and its content are provided on an 'as is' and 'as available' basis without any warranties of any kind, either express or implied.",
      "TrusVera Group does not warrant that:",
      "- The Website will be uninterrupted, error-free, or secure",
      "- Any defects or errors will be corrected",
      "- The Website or the servers that make it available are free of viruses or other harmful components",
      "- The content on the Website is accurate, complete, or current",
      "To the fullest extent permitted by applicable law, TrusVera Group disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "Nothing in these Terms shall affect any statutory rights you may have as a business user that cannot be excluded under applicable law.",
    ]
  },
  {
    id: 7,
    icon: Shield,
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, TrusVera Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Website.",
      "This includes but is not limited to damages for loss of profits, loss of data, loss of goodwill, business interruption, or any other commercial or economic losses, even if TrusVera Group has been advised of the possibility of such damages.",
      "Our total aggregate liability to you for any claims arising out of or relating to your use of the Website shall not exceed INR 10,000 (Indian Rupees Ten Thousand).",
      "Some jurisdictions do not allow the exclusion or limitation of liability for certain types of damages. In such jurisdictions, our liability shall be limited to the maximum extent permitted by law.",
    ]
  },
  {
    id: 8,
    icon: Globe,
    title: "Third-Party Links",
    content: [
      "The Website may contain links to third-party websites or resources. These links are provided for your convenience only.",
      "TrusVera Group has no control over the content of those third-party websites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.",
      "The inclusion of any link does not imply endorsement by TrusVera Group of the linked website or its content.",
      "When you leave our Website, we encourage you to read the terms and privacy policy of every website you visit.",
    ]
  },
  {
    id: 9,
    icon: Globe,
    title: "International Users",
    content: [
      "The Website is operated from India and is primarily intended for business users globally. If you access the Website from outside India, you do so on your own initiative and are responsible for compliance with local laws.",
      "For users in the European Union: These Terms do not affect any mandatory rights you may have under EU law that cannot be waived by contract.",
      "For users in the United Kingdom: These Terms do not affect any mandatory rights you may have under UK law that cannot be waived by contract.",
      "For users in the United States: These Terms shall be interpreted in a manner consistent with applicable US law where required.",
      "Regardless of your location, by using this Website you consent to the transfer and processing of your data in India as described in our Privacy Policy.",
    ]
  },
  {
    id: 10,
    icon: Scale,
    title: "Governing Law and Dispute Resolution",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the Republic of India, without regard to its conflict of law provisions.",
      "Dispute Resolution: Any dispute, controversy, or claim arising out of or relating to these Terms, or the breach, termination, or invalidity thereof, shall be settled by arbitration in accordance with the Arbitration and Conciliation Act, 1996 (India).",
      "The place of arbitration shall be Pune, Maharashtra, India. The language of arbitration shall be English. The arbitration shall be conducted by a sole arbitrator mutually appointed by the parties.",
      "For international users: The arbitration award shall be final and binding and enforceable in any court of competent jurisdiction. India is a signatory to the New York Convention on the Recognition and Enforcement of Foreign Arbitral Awards, which provides for enforcement of arbitral awards in over 170 countries including the United States and United Kingdom.",
      "Nothing in this clause shall prevent either party from seeking urgent injunctive or interim relief from a court of competent jurisdiction.",
      "Subject to the arbitration clause above, the courts of Pune, Maharashtra, India shall have exclusive jurisdiction over any disputes that proceed to litigation.",
    ]
  },
  {
    id: 11,
    icon: FileText,
    title: "Changes to These Terms",
    content: [
      "TrusVera Group reserves the right to modify these Terms at any time at our sole discretion.",
      "When we make changes, we will update the 'Last Updated' date at the top of this page. For significant changes, we may also provide additional notice on our Website.",
      "Your continued use of the Website after any changes to these Terms constitutes your acceptance of the new Terms.",
      "We encourage you to review these Terms periodically to stay informed of any updates.",
    ]
  },
  {
    id: 12,
    icon: FileText,
    title: "Contact Information",
    content: [
      "If you have any questions about these Terms of Use, please contact us:",
      "TrusVera Group",
      "Email: info@trusveragrp.com",
      "Address: Kasarwadi, PCMC, Pune - 411034, India",
      "We will respond to all enquiries within 5 business days.",
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

export default function TermsClient() {
  const [activeSection, setActiveSection] = useState<number | null>(null)

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .terms-section:hover {
          border-color: ${C.forest600} !important;
        }
        .toc-link:hover {
          color: ${C.forest600} !important;
          padding-left: 8px !important;
        }
        .toc-link { transition: all 0.15s ease; }
        @media (max-width: 1024px) {
          .terms-layout { grid-template-columns: 1fr !important; }
          .toc-sidebar { display: none !important; }
        }
        @media (max-width: 768px) {
          .terms-hero-title { font-size: 40px !important; }
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
              <Scale size={40} color={C.gold400} />
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
              Legal
            </span>

            <h1
              className="terms-hero-title"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 60,
                color: C.cream100,
                lineHeight: 1.1,
                marginBottom: 20,
                fontWeight: 400,
              }}
            >
              Terms of Use
            </h1>

            <div style={{ width: 64, height: 3, background: C.gold400, margin: "0 auto 24px" }} />

            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.cream300 }}>
                Effective Date: {EFFECTIVE_DATE}
              </span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.cream300 }}>
                Last Updated: {LAST_UPDATED}
              </span>
            </div>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: C.cream400,
                marginTop: 16,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.6,
              }}
            >
              These Terms govern your use of the TrusVera Group website only. Service agreements with clients are
              governed by separate contracts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TWO COLUMN LAYOUT */}
      <div
        className="terms-layout"
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
                href={`#term-${section.id}`}
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

        {/* TERMS SECTIONS */}
        <div>
          {SECTIONS.map((section, index) => {
            const Icon = section.icon
            const isOpen = activeSection === section.id

            return (
              <motion.div
                key={section.id}
                id={`term-${section.id}`}
                className="terms-section"
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

                      return (
                        <p key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: C.slate600, lineHeight: 1.8, marginBottom: 12 }}>
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
