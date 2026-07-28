"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { C } from "@/lib/colors";
import type { Contact, ContactStatus } from "@/lib/supabase/types";

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

export default function EditContactPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [country, setCountry] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ContactStatus>("New");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const res = await fetch(`/api/admin/contacts/${id}`, { credentials: "include" });
        const data = await res.json();

        if (!res.ok) {
          setLoadError(data.error || "Failed to load contact.");
          return;
        }

        const contact: Contact = data.contact;

        if (!contact) {
          setLoadError("Contact not found.");
          return;
        }

        setFullName(contact.full_name || "");
        setEmail(contact.email || "");
        setPhone(contact.phone || "");
        setCompanyName(contact.company_name || "");
        setJobTitle(contact.job_title || "");
        setCountry(contact.country || "");
        setServiceInterest(contact.service_interest || "");
        setMessage(contact.message || "");
        setStatus(contact.status || "New");
        setNotes(contact.notes || "");
      } catch {
        setLoadError("Network error. Could not load contact.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchContact();
  }, [id]);

  const handleSave = async () => {
    setSaveError("");

    if (!fullName.trim()) {
      setSaveError("Full name is required.");
      return;
    }
    if (!email.trim()) {
      setSaveError("Email address is required.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          company_name: companyName.trim() || null,
          job_title: jobTitle.trim() || null,
          country: country.trim() || null,
          service_interest: serviceInterest || null,
          message: message.trim() || null,
          status,
          notes: notes.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveError(data.error || "Failed to save contact.");
        return;
      }

      router.push("/admin/contacts");
    } catch {
      setSaveError("Network error. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 32 }}>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
        <div style={{ padding: "60px", textAlign: "center" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid " + C.slate200,
              borderTop: "3px solid " + C.forest600,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: C.slate400 }}>
            Loading contact...
          </p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{ padding: 32 }}>
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: C.red400,
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
          }}
        >
          {loadError}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Link href="/admin/contacts" style={{ fontSize: 13, color: C.textMuted, textDecoration: "none" }}>
              Contacts
            </Link>
            <ChevronRight size={14} color={C.textMuted} />
            <span style={{ fontSize: 13, fontWeight: 500, color: C.textDark }}>Edit contact</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: C.textDark, marginTop: 4 }}>Edit contact</div>
        </div>

        <Link href="/admin/contacts" style={outlineButtonStyle}>
          Cancel
        </Link>
      </div>

      <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`, padding: 32, maxWidth: 800 }}>
        <div style={sectionHeadingStyle}>Contact details</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          <div>
            <label style={fieldLabelStyle}>Full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
            <label style={fieldLabelStyle}>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <div>
            <label style={fieldLabelStyle}>Job title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              style={fieldInputStyle}
            />
          </div>
          <div>
            <label style={fieldLabelStyle}>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={fieldInputStyle}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div>
            <label style={fieldLabelStyle}>Service interest</label>
            <select
              value={serviceInterest}
              onChange={(e) => setServiceInterest(e.target.value)}
              style={fieldInputStyle}
            >
              <option value="">Select service</option>
              <option value="Intent Data">Intent Data</option>
              <option value="Demand Generation">Demand Generation</option>
              <option value="Account Profiling">Account Profiling</option>
              <option value="Lead Generation">Lead Generation</option>
              <option value="Market Research">Market Research</option>
              <option value="Email Marketing">Email Marketing</option>
              <option value="Whitepaper Promotion">Whitepaper Promotion</option>
              <option value="BANT Qualified Leads">BANT Qualified Leads</option>
            </select>
          </div>
          <div>
            <label style={fieldLabelStyle}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ContactStatus)}
              style={fieldInputStyle}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <div style={sectionHeadingStyle}>Message</div>
          <textarea
            placeholder="Contact message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
          <div style={sectionHeadingStyle}>Internal notes</div>
          <textarea
            placeholder="Add internal notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: "100%",
              height: 100,
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

        {saveError && (
          <div
            style={{
              background: "rgba(226,75,74,0.1)",
              border: `1px solid ${C.red400}`,
              borderRadius: "6px",
              padding: "10px 14px",
              marginTop: "24px",
              color: C.red400,
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
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
