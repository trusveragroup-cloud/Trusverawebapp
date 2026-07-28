"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { C } from "@/lib/colors";
import { usePermissions } from "@/hooks/usePermissions";
import AccessDenied from "@/components/admin/AccessDenied";

const fieldLabelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: C.textDark,
  display: "block",
  marginBottom: 6,
};

const fieldInputStyle: React.CSSProperties = {
  width: "100%",
  height: 44,
  borderRadius: 8,
  border: `1px solid ${C.borderLight}`,
  background: C.white,
  paddingLeft: 14,
  fontSize: 14,
  color: C.textDark,
  boxSizing: "border-box",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: C.textDark,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  marginBottom: 20,
  paddingBottom: 12,
  borderBottom: `1px solid ${C.borderLight}`,
};

const outlineButtonStyle: React.CSSProperties = {
  height: 38,
  padding: "0 16px",
  background: C.white,
  border: `1px solid ${C.borderLight}`,
  borderRadius: 8,
  fontSize: 13,
  color: C.textDark,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
};

function Toggle() {
  return (
    <div style={{ width: 40, height: 22, borderRadius: 11, background: C.green400, position: "relative" }}>
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: C.white,
          position: "absolute",
          right: 2,
          top: 2,
        }}
      />
    </div>
  );
}

function PreferenceRow({ label, last }: { label: string; last?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 16,
        borderBottom: last ? "none" : `1px solid ${C.borderLight}`,
        marginBottom: last ? 0 : 16,
      }}
    >
      <span style={{ fontSize: 13, color: C.textDark }}>{label}</span>
      <Toggle />
    </div>
  );
}

export default function NewContactPage() {
  const { can, loading } = usePermissions();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [pipelineChallenge, setPipelineChallenge] = useState("");
  const [source, setSource] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  if (!loading && !can("create_contacts")) return <AccessDenied />;

  const handleSave = async () => {
    setSaveError("");

    const fullName = `${firstName} ${lastName}`.trim();

    if (!fullName) {
      setSaveError("Full name is required.");
      return;
    }
    if (!email.trim()) {
      setSaveError("Email address is required.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          companyName: companyName || undefined,
          serviceInterest: serviceInterest || undefined,
          message: contactMessage || undefined,
          sourceDetail: source || undefined,
          notes: pipelineChallenge || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveError(data.error || "Failed to save contact.");
        return;
      }

      router.push("/admin/contacts?added=true");
    } catch {
      setSaveError("Network error. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Link href="/admin/contacts" style={{ fontSize: 13, color: C.textMuted, textDecoration: "none" }}>
              Contacts
            </Link>
            <ChevronRight size={14} color={C.textMuted} />
            <span style={{ fontSize: 13, fontWeight: 500, color: C.textDark }}>New contact</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: C.textDark, marginTop: 4 }}>Add new contact</div>
        </div>

        <Link href="/admin/contacts" style={outlineButtonStyle}>
          Cancel
        </Link>
      </div>

      <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`, padding: 32, maxWidth: 800 }}>
        <div style={sectionHeadingStyle}>Contact details</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          <div>
            <label style={fieldLabelStyle}>First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={fieldInputStyle}
            />
          </div>
          <div>
            <label style={fieldLabelStyle}>Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={fieldInputStyle}
            />
          </div>
          <div>
            <label style={fieldLabelStyle}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={fieldInputStyle}
            />
          </div>
          <div>
            <label style={fieldLabelStyle}>Company name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={fieldInputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={fieldLabelStyle}>Service interest</label>
          <select
            value={serviceInterest}
            onChange={(e) => setServiceInterest(e.target.value)}
            style={fieldInputStyle}
          >
            <option value="">Select service</option>
            <option value="Intent Data">Intent Data</option>
            <option value="BANTLeads">BANTLeads</option>
            <option value="Account Profiling">Account Profiling</option>
            <option value="Whitepaper">Whitepaper</option>
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={fieldLabelStyle}>Pipeline challenge</label>
          <input
            type="text"
            placeholder="What is their main sales challenge?"
            value={pipelineChallenge}
            onChange={(e) => setPipelineChallenge(e.target.value)}
            style={fieldInputStyle}
          />
        </div>

        <div>
          <label style={fieldLabelStyle}>Source</label>
          <input
            type="text"
            placeholder="e.g. Phone call, LinkedIn, Referral"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={fieldInputStyle}
          />
        </div>

        <div style={{ marginTop: 32 }}>
          <div style={sectionHeadingStyle}>Message</div>
          <textarea
            placeholder="Enter the contact message or notes from the conversation..."
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            style={{
              width: "100%",
              height: 120,
              borderRadius: 8,
              border: `1px solid ${C.borderLight}`,
              padding: "12px 14px",
              fontSize: 14,
              color: C.textDark,
              background: C.white,
              boxSizing: "border-box",
              resize: "none",
              fontFamily: "inherit",
            }}
          />
        </div>

        <div style={{ marginTop: 32 }}>
          <div style={sectionHeadingStyle}>Preferences</div>
          <PreferenceRow label="Marketing consent" />
          <PreferenceRow label="Confirm email" last />
        </div>

        {saveError && (
          <div
            style={{
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: "6px",
              padding: "10px 14px",
              marginBottom: "12px",
              color: "#DC2626",
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
            }}
          >
            {saveError}
          </div>
        )}

        <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Link href="/admin/contacts" style={outlineButtonStyle}>
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            style={{
              height: 44,
              padding: "0 24px",
              background: C.forest600,
              color: C.cream50,
              borderRadius: 8,
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              cursor: isSaving ? "default" : "pointer",
            }}
          >
            {isSaving ? "Saving..." : "Save contact"}
          </button>
        </div>
      </div>
    </div>
  );
}
