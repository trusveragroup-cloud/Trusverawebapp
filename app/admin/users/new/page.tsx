"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { C } from "@/lib/colors";
import {
  ChevronLeft, UserPlus, Mail, User,
  Shield, Info, CheckCircle, AlertCircle
} from "lucide-react";

const ROLE_INFO: Record<string, string> = {
  "Super Admin": "Full access to all features including user management, all contacts, blogs, and settings.",
  "Sales Admin": "Can view and manage contacts, add manual entries, and update contact status.",
  "Content Admin": "Can create, edit, and publish blog posts. Read-only access to contacts.",
  "Viewer": "Read-only access to contacts and published blogs. Cannot make changes.",
};

const ROLE_STYLES: Record<string, { color: string; badgeBg: string }> = {
  "Super Admin": { color: C.gold500, badgeBg: "rgba(200,151,62,0.10)" },
  "Sales Admin": { color: "#3B82F6", badgeBg: "rgba(59,130,246,0.10)" },
  "Content Admin": { color: C.forest600, badgeBg: "rgba(74,186,138,0.10)" },
  Viewer: { color: C.slate400, badgeBg: C.cream200 },
};

const ROLES = ["Super Admin", "Sales Admin", "Content Admin", "Viewer"];

const fieldLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter)",
  fontSize: 12,
  color: C.slate500,
  textTransform: "uppercase",
  letterSpacing: 1,
  marginBottom: 6,
  display: "block",
};

const fieldInputStyle: React.CSSProperties = {
  width: "100%",
  height: 44,
  border: `1px solid ${C.slate200}`,
  borderRadius: 8,
  padding: "0 14px",
  fontFamily: "var(--font-inter)",
  fontSize: 14,
  color: C.forest900,
  background: C.cream100,
  boxSizing: "border-box",
};

function truncate(text: string, length: number) {
  return text.length > length ? text.slice(0, length).trimEnd() + "..." : text;
}

export default function NewUserPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setSaveError("");

    if (!fullName.trim()) {
      setSaveError("Full name is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSaveError("Please enter a valid email address.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fullName, email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveError(data.error || "Failed to create user.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/users?created=true");
      }, 2000);
    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const roleStyle = ROLE_STYLES[role];

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        .role-card { transition: all 0.15s ease; cursor: pointer; }
        .role-card:hover { border-color: ${C.forest600} !important; }
        .form-input:focus { border-color: ${C.forest600} !important; outline: none; }
      `}</style>

      {success ? (
        <div
          style={{
            maxWidth: 480,
            margin: "80px auto",
            background: C.cream100,
            borderRadius: 14,
            border: `1px solid ${C.slate200}`,
            padding: "48px 32px",
            textAlign: "center",
          }}
        >
          <CheckCircle size={56} color={C.forest600} style={{ margin: "0 auto 20px" }} />
          <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 28, color: C.forest800 }}>
            Invitation Sent!
          </div>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 15, color: C.slate500, lineHeight: 1.7, marginTop: 12 }}>
            An invitation email has been sent to {email} with a link to set their password and access the admin panel.
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate400, marginTop: 20 }}>
            Redirecting to users list...
          </p>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <Link href="/admin/users" style={{ display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                <ChevronLeft size={16} color={C.slate500} />
                <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>Users</span>
              </Link>
              <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: "4px 0 0" }}>
                Create New User
              </h1>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "flex-start" }}>
            <div>
              <div style={{ background: C.cream100, borderRadius: 12, border: `1px solid ${C.slate200}`, padding: 28 }}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800, marginBottom: 24 }}>
                  User Details
                </div>

                <div>
                  <label style={fieldLabelStyle}>Full Name</label>
                  <input
                    className="form-input"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    style={fieldInputStyle}
                  />
                </div>

                <div style={{ marginTop: 20 }}>
                  <label style={fieldLabelStyle}>Work Email</label>
                  <input
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="colleague@trusveragroup.com"
                    style={fieldInputStyle}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      marginTop: 10,
                      background: C.cream200,
                      borderRadius: 6,
                      padding: "10px 14px",
                    }}
                  >
                    <Info size={14} color={C.slate400} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, lineHeight: 1.6 }}>
                      An invitation email will be sent to this address. The user will set their own password via the link in the email.
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ background: C.cream100, borderRadius: 12, border: `1px solid ${C.slate200}`, padding: 28, marginTop: 20 }}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800, marginBottom: 8 }}>
                  Assign Role
                </div>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginBottom: 20 }}>
                  Select the level of access this user will have.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {ROLES.map((roleName) => {
                    const selected = role === roleName;
                    return (
                      <div
                        key={roleName}
                        className="role-card"
                        onClick={() => setRole(roleName)}
                        style={{
                          border: `2px solid ${selected ? C.forest600 : C.slate200}`,
                          background: selected ? C.forest100 : C.cream100,
                          borderRadius: 10,
                          padding: 16,
                          position: "relative",
                        }}
                      >
                        {selected && (
                          <CheckCircle size={18} color={C.forest600} style={{ position: "absolute", top: 12, right: 12 }} />
                        )}
                        <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700, color: selected ? C.forest800 : C.slate600 }}>
                          {roleName}
                        </div>
                        <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, lineHeight: 1.5, marginTop: 6 }}>
                          {ROLE_INFO[roleName]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div style={{ background: C.cream100, borderRadius: 12, border: `1px solid ${C.slate200}`, padding: 24 }}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: C.forest800, marginBottom: 20 }}>
                  Invitation Summary
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.slate100}` }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>Name</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.forest800 }}>{fullName || "Not set"}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.slate100}` }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>Email</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>{email || "Not set"}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.slate100}` }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>Role</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      background: roleStyle.badgeBg,
                      color: roleStyle.color,
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      padding: "4px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {role === "Super Admin" && <Shield size={10} />}
                    {role}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.slate100}` }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>Access</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate400, textAlign: "right" }}>
                    {truncate(ROLE_INFO[role], 50)}
                  </span>
                </div>

                <div style={{ margin: "20px 0" }} />

                {saveError && (
                  <div
                    style={{
                      background: "rgba(220,38,38,0.08)",
                      border: "1px solid rgba(220,38,38,0.25)",
                      borderRadius: 6,
                      padding: "10px 14px",
                      marginBottom: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <AlertCircle size={14} color="#DC2626" />
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "#DC2626" }}>{saveError}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSaving}
                  style={{
                    width: "100%",
                    height: 44,
                    background: C.forest600,
                    color: C.cream100,
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    fontWeight: 700,
                    borderRadius: 8,
                    border: "none",
                    cursor: isSaving ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: isSaving ? 0.7 : 1,
                  }}
                >
                  {isSaving ? (
                    "Sending Invitation..."
                  ) : (
                    <>
                      <Mail size={16} />
                      Send Invitation
                    </>
                  )}
                </button>

                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <Link href="/admin/users" style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate400, textDecoration: "none" }}>
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
