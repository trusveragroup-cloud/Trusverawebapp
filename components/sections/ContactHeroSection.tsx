"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, UserCheck, Database, Clock, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";
import { CONTACT_SERVICES, CONTACT_TRUST_SIGNALS, CONTACT_OFFICES } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST_ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  UserCheck,
  Database,
  Clock,
};

const PROOF_STATS = [
  { value: "97%", label: "Client retention rate" },
  { value: "20K+", label: "Leads delivered" },
  { value: "$1.2B+", label: "Pipeline influenced" },
];

const SUCCESS_STEPS = [
  "We review your brief today",
  "We send you a discovery call link",
  "We prepare a tailored proposal",
];

type ValidatedField = "firstName" | "lastName" | "email" | "company" | "service";
type FocusableField = ValidatedField | "challenge";

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

export default function ContactHeroSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [challenge, setChallenge] = useState("");
  const [confirmEmail, setConfirmEmail] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [submitError, setSubmitError] = useState("");
  const [focusedField, setFocusedField] = useState<FocusableField | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

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
    setSubmitted(true);
    setSubmitError("");

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
          message: challenge,
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
      setChallenge("");
      setConfirmEmail(true);
      setMarketing(false);
      setSubmitError("");
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
      setFormState("idle");
    }
  }

  return (
    <section className="ct-hero" style={{ marginTop: 0 }}>
      <div className="ct-hero-left" style={{ background: C.forest900 }}>
        <div style={{ maxWidth: 520, margin: "0 auto", width: "100%" }}>
          {formState === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "40px 20px", gap: 20 }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(200,151,62,0.12)",
                  border: "2px solid rgba(200,151,62,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check size={28} color={C.gold400} aria-hidden="true" />
              </div>
              <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.cream50, fontWeight: 400 }}>
                The conversation has started.
              </h1>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 14, color: "rgba(254,253,251,0.6)", lineHeight: 1.7, maxWidth: 360 }}>
                {confirmEmail
                  ? "A confirmation has been sent to your email. One of our team will reach out within one business day."
                  : "One of our senior team members will review your submission and reach out within one business day."}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                {SUCCESS_STEPS.map((s, i) => (
                  <div key={s} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, fontWeight: 700, color: C.gold400, width: 20 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, color: "rgba(254,253,251,0.6)", lineHeight: 1.5 }}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div>
              <div
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 11,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: C.gold400,
                  marginBottom: 32,
                }}
              >
                START THE CONVERSATION
              </div>

              <h1 className="ct-hero-h1" style={{ fontFamily: "var(--font-dm-serif)", color: C.cream50, lineHeight: 1.2, marginBottom: 8, fontWeight: 400 }}>
                Tell Us About Your Pipeline Challenge.
              </h1>

              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: "rgba(254,253,251,0.55)", lineHeight: 1.6, marginBottom: 40 }}>
                We read every submission personally. A senior team member will respond within one business day.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <FieldLabel htmlFor="ch-firstName" label="FIRST NAME" current={firstName.length} max={50} />
                  <input
                    id="ch-firstName"
                    type="text"
                    value={firstName}
                    maxLength={50}
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                    style={fieldStyle("firstName")}
                  />
                  <FieldError show={submitted && !isValid("firstName")} text="First name is required." />
                </div>
                <div>
                  <FieldLabel htmlFor="ch-lastName" label="LAST NAME" current={lastName.length} max={50} />
                  <input
                    id="ch-lastName"
                    type="text"
                    value={lastName}
                    maxLength={50}
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                    style={fieldStyle("lastName")}
                  />
                  <FieldError show={submitted && !isValid("lastName")} text="Last name is required." />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <FieldLabel htmlFor="ch-email" label="EMAIL" current={email.length} max={100} />
                <input
                  id="ch-email"
                  type="email"
                  value={email}
                  maxLength={100}
                  placeholder="Work email"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={fieldStyle("email")}
                />
                <FieldError show={submitted && !isValid("email")} text="Enter a valid email address." />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                <div>
                  <FieldLabel htmlFor="ch-company" label="COMPANY" current={company.length} max={80} />
                  <input
                    id="ch-company"
                    type="text"
                    value={company}
                    maxLength={80}
                    placeholder="Company name"
                    onChange={(e) => setCompany(e.target.value)}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    style={fieldStyle("company")}
                  />
                  <FieldError show={submitted && !isValid("company")} text="Company is required." />
                </div>
                <div>
                  <FieldLabel htmlFor="ch-service" label="SERVICE" />
                  <select
                    id="ch-service"
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
                <FieldLabel htmlFor="ch-challenge" label="WHAT IS YOUR BIGGEST PIPELINE CHALLENGE RIGHT NOW? (OPTIONAL)" current={challenge.length} max={500} />
                <textarea
                  id="ch-challenge"
                  value={challenge}
                  maxLength={500}
                  placeholder="e.g. We are generating leads but conversion to pipeline is too low..."
                  onChange={(e) => setChallenge(e.target.value)}
                  onFocus={() => setFocusedField("challenge")}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...baseFieldStyle, border: borderFor("challenge", false), resize: "none", height: 100 }}
                />
              </div>

              <div style={{ height: 1, background: "rgba(200,151,62,0.1)", margin: "16px 0 12px" }} />

              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={confirmEmail}
                  onChange={() => setConfirmEmail((v) => !v)}
                  style={{ accentColor: C.gold500, marginTop: 2 }}
                />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, color: "rgba(254,253,251,0.45)", lineHeight: 1.5 }}>
                  Send me a confirmation of this submission.
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
                className="ct-submit-btn"
                style={{
                  width: "100%",
                  background: C.gold500,
                  color: C.forest900,
                  borderRadius: 8,
                  padding: "13px",
                  fontSize: 15,
                  fontWeight: 600,
                  border: "none",
                  cursor: formState === "loading" ? "not-allowed" : "pointer",
                  opacity: formState === "loading" ? 0.7 : 1,
                  marginTop: 4,
                  transition: "transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {formState === "loading" ? "Sending..." : "Start the Conversation"}
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
        </div>
      </div>

      <motion.div
        className="ct-hero-right"
        style={{ background: C.cream50 }}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
      >
        <div style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
          <div style={{ marginBottom: 40 }}>
            <p
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontStyle: "italic",
                fontSize: 24,
                color: C.forest800,
                lineHeight: 1.4,
                borderLeft: `3px solid ${C.gold500}`,
                paddingLeft: 20,
              }}
            >
              We respond to every inquiry personally. Not a bot. Not an auto-reply. A senior member of our team.
            </p>
          </div>

          <div className="ct-proof-row">
            {PROOF_STATS.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 32, color: C.gold500, lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11, color: C.textMuted, marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: C.borderLight, margin: "0 0 32px" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
            {CONTACT_TRUST_SIGNALS.map((t) => {
              const Icon = TRUST_ICONS[t.icon];
              return (
                <div key={t.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon size={16} color={C.gold500} aria-hidden="true" />
                  <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted }}>
                    {t.text}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 8 }}>
            <div
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: C.textLight,
                marginBottom: 12,
              }}
            >
              OUR OFFICES RIGHT NOW
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CONTACT_OFFICES.map((office) => {
                const open = isBusinessHours(now, office.timezone);
                return (
                  <div
                    key={office.city}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 14px",
                      background: C.cream100,
                      borderRadius: 8,
                      border: `1px solid ${C.borderLight}`,
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 500, color: C.textDark }}>
                      {office.city}, {office.country}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted }}>
                        {formatLocalTime(now, office.timezone, office.tzLabel)}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: open ? "#4ABA8A" : C.textLight,
                          flexShrink: 0,
                        }}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
