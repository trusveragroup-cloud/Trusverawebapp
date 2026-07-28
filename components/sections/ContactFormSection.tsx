"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Lock, ShieldCheck, Check, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { CONTACT_SERVICES, CONTACT_STATS, CONTACT_TRUST } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Clock,
  Lock,
  ShieldCheck,
};

type ValidatedField = "firstName" | "lastName" | "email" | "company" | "service";
type FocusableField = ValidatedField | "message";

interface ContactFormSectionProps {
  defaultService?: string;
}

function counterColor(remaining: number) {
  if (remaining <= 0) return C.red400;
  if (remaining <= 20) return C.gold400;
  return "rgba(254,253,251,0.25)";
}

function FieldLabel({ htmlFor, label, current, max }: { htmlFor: string; label: string; current?: number; max?: number }) {
  const remaining = typeof current === "number" && typeof max === "number" ? max - current : null;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
      <label
        htmlFor={htmlFor}
        style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 10, color: "rgba(254,253,251,0.45)", letterSpacing: "0.4px", fontWeight: 500 }}
      >
        {label}
      </label>
      {remaining !== null && (
        <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 10, color: counterColor(remaining) }}>
          {remaining}
        </span>
      )}
    </div>
  );
}

function FieldError({ show, text }: { show: boolean; text: string }) {
  if (!show) return null;
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 10, color: C.red400, marginTop: 4 }}>
      {text}
    </div>
  );
}

export default function ContactFormSection({ defaultService = "" }: ContactFormSectionProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(defaultService || "");
  const [message, setMessage] = useState("");
  const [confirmEmail, setConfirmEmail] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [submitError, setSubmitError] = useState("");
  const [focusedField, setFocusedField] = useState<FocusableField | null>(null);

  function isValid(field: ValidatedField) {
    switch (field) {
      case "firstName":
        return firstName.trim() !== "";
      case "lastName":
        return lastName.trim() !== "";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      case "company":
        return company.trim() !== "";
      case "service":
        return service !== "";
    }
  }

  const baseFieldStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: 6,
    padding: "9px 12px",
    fontSize: 13,
    color: C.cream50,
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s ease",
    fontFamily: "var(--font-inter), sans-serif",
  };

  function borderFor(field: FocusableField, hasError: boolean): string {
    if (hasError) return `1px solid ${C.red400}`;
    return focusedField === field ? "1px solid rgba(200,151,62,0.6)" : "1px solid rgba(200,151,62,0.2)";
  }

  function fieldStyle(field: ValidatedField): React.CSSProperties {
    return { ...baseFieldStyle, border: borderFor(field, submitted && !isValid(field)) };
  }

  async function handleSubmit() {
    console.log("handleSubmit fired");
    setSubmitted(true);
    setSubmitError("");

    console.log("Validation check:", { firstName, lastName, email, company, service });
    const valid =
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      company.trim() !== "" &&
      service !== "";

    if (!valid) return;

    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          company,
          service,
          message,
          consentConfirm: confirmEmail,
          consentMarketing: marketing,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setFormState("idle");
        return;
      }

      setFormState("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setCompany("");
      setService("");
      setMessage("");
      setConfirmEmail(true);
      setMarketing(false);
      setSubmitError("");
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
      setFormState("idle");
    }
  }

  return (
    <section className="cf-section" style={{ background: C.forest900, position: "relative", overflow: "hidden", padding: "100px 24px" }}>
      <div
        aria-hidden="true"
        className="cf-orb"
        style={{
          position: "absolute",
          left: -60,
          top: "50%",
          transform: "translateY(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,151,62,0.09) 0%, rgba(200,151,62,0.03) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="cf-watermark"
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-dm-serif)",
          color: "rgba(200,151,62,0.07)",
          lineHeight: 1,
          userSelect: "none",
          letterSpacing: "-4px",
          paddingLeft: 24,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        TVG
      </div>

      <div className="cf-grid" style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gap: 64, alignItems: "center" }}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div className="cf-left-inner" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", maxWidth: 300 }}>
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 11,
                letterSpacing: "1.5px",
                color: C.gold400,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              LET&apos;S TALK
            </span>

            <h2
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 28,
                color: C.cream50,
                lineHeight: 1.3,
                marginBottom: 12,
                fontWeight: 400,
              }}
            >
              Your Pipeline Deserves Better Than Cold Lists
            </h2>

            <div style={{ width: 40, height: 1, background: "rgba(200,151,62,0.4)", margin: "4px 0 14px" }} />

            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.55)", lineHeight: 1.7 }}>
              Tell us what you are working on and we will take it from there.
            </p>

            <div style={{ display: "flex", gap: 20, marginTop: 24, marginBottom: 20, flexWrap: "wrap" }}>
              {CONTACT_STATS.map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.gold400, lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 10, color: "rgba(254,253,251,0.4)", letterSpacing: "0.3px", marginTop: 2 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ width: "100%", height: 1, background: "rgba(200,151,62,0.12)", marginBottom: 16 }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {CONTACT_TRUST.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Icon size={14} color={C.gold400} aria-hidden="true" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, color: "rgba(254,253,251,0.45)" }}>
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          style={{ background: C.forest850, borderRadius: 12, padding: "28px 28px", border: "1px solid rgba(200,151,62,0.15)" }}
        >
          {formState === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "32px 16px", gap: 16 }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(200,151,62,0.12)",
                  border: "1px solid rgba(200,151,62,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check size={24} color={C.gold400} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.cream50, fontWeight: 400 }}>
                We have got your request
              </h3>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: "rgba(254,253,251,0.6)", lineHeight: 1.7, maxWidth: 320 }}>
                {confirmEmail
                  ? "A confirmation has been sent to your email. One of our experts will reach out within one business day."
                  : "One of our experts will reach out within one business day to discuss how TrusVera Group can support your pipeline goals."}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 11,
                  color: C.gold400,
                  background: "rgba(200,151,62,0.1)",
                  border: "1px solid rgba(200,151,62,0.2)",
                  borderRadius: 10,
                  padding: "4px 14px",
                }}
              >
                Expect a reply by next business day
              </span>
              <button
                onClick={() => setFormState("idle")}
                style={{
                  marginTop: "24px",
                  background: "transparent",
                  border: "1px solid " + C.gold400,
                  color: C.gold400,
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  padding: "10px 24px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                }}
              >
                Submit Another Enquiry
              </button>
            </motion.div>
          ) : (
            <div>
              <div className="cf-row-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <FieldLabel htmlFor="cf-firstName" label="FIRST NAME" current={firstName.length} max={50} />
                  <input
                    id="cf-firstName"
                    type="text"
                    value={firstName}
                    maxLength={50}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                    style={fieldStyle("firstName")}
                  />
                  <FieldError show={submitted && !isValid("firstName")} text="First name is required." />
                </div>
                <div>
                  <FieldLabel htmlFor="cf-lastName" label="LAST NAME" current={lastName.length} max={50} />
                  <input
                    id="cf-lastName"
                    type="text"
                    value={lastName}
                    maxLength={50}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                    style={fieldStyle("lastName")}
                  />
                  <FieldError show={submitted && !isValid("lastName")} text="Last name is required." />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <FieldLabel htmlFor="cf-email" label="EMAIL" current={email.length} max={100} />
                <input
                  id="cf-email"
                  type="email"
                  value={email}
                  maxLength={100}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={fieldStyle("email")}
                />
                <FieldError show={submitted && !isValid("email")} text="Enter a valid email address." />
              </div>

              <div className="cf-row-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                <div>
                  <FieldLabel htmlFor="cf-company" label="COMPANY" current={company.length} max={80} />
                  <input
                    id="cf-company"
                    type="text"
                    value={company}
                    maxLength={80}
                    onChange={(e) => setCompany(e.target.value)}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    style={fieldStyle("company")}
                  />
                  <FieldError show={submitted && !isValid("company")} text="Company is required." />
                </div>
                <div>
                  <FieldLabel htmlFor="cf-service" label="SERVICE" />
                  <select
                    id="cf-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    onFocus={() => setFocusedField("service")}
                    onBlur={() => setFocusedField(null)}
                    style={fieldStyle("service")}
                  >
                    {CONTACT_SERVICES.map((opt) => (
                      <option key={opt.value} value={opt.value} style={{ background: C.forest800, color: C.cream50 }}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <FieldError show={submitted && !isValid("service")} text="Please select a service." />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <FieldLabel htmlFor="cf-message" label="MESSAGE" current={message.length} max={300} />
                <textarea
                  id="cf-message"
                  value={message}
                  maxLength={300}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...baseFieldStyle, border: borderFor("message", false), resize: "none", height: 72 }}
                />
              </div>

              <div style={{ height: 1, background: "rgba(200,151,62,0.1)", margin: "12px 0" }} />

              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={confirmEmail}
                  onChange={() => setConfirmEmail((v) => !v)}
                  style={{ accentColor: C.gold500, marginTop: 2 }}
                />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, color: "rgba(254,253,251,0.45)", lineHeight: 1.5 }}>
                  Send me a confirmation email for this request.
                  <span style={{ fontSize: 10, color: "rgba(200,151,62,0.5)", marginLeft: 4 }}>(Recommended)</span>
                </span>
              </label>

              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={() => setMarketing((v) => !v)}
                  style={{ accentColor: C.gold500, marginTop: 2 }}
                />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, color: "rgba(254,253,251,0.45)", lineHeight: 1.5 }}>
                  Keep me updated on B2B demand generation insights. Unsubscribe anytime.
                </span>
              </label>

              <FieldError show={!!submitError} text={submitError} />

              <button
                type="button"
                onClick={handleSubmit}
                disabled={formState === "loading"}
                className="cf-submit-btn"
                style={{
                  width: "100%",
                  background: C.gold500,
                  color: C.forest900,
                  borderRadius: 7,
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                  border: "none",
                  cursor: formState === "loading" ? "not-allowed" : "pointer",
                  opacity: formState === "loading" ? 0.7 : 1,
                  marginTop: 4,
                  transition: "transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {formState === "loading" ? "Sending..." : "Book a Discovery Call"}
              </button>

              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 10, color: "rgba(254,253,251,0.2)", textAlign: "center", marginTop: 8 }}>
                We store your data securely. Read our{" "}
                <a href="/privacy-policy" style={{ color: C.gold400, textDecoration: "none" }}>
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
