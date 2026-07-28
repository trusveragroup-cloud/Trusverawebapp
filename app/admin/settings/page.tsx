"use client"

import { useState } from "react"
import { C } from "@/lib/colors"
import {
  User, Lock, Users, Bell, Shield, AlertTriangle,
  Edit2, Save, X, Plus, Trash2, Mail, Eye, EyeOff,
  CheckCircle, ChevronRight, Crown, UserCheck,
  FileText, Clock, AlertCircle
} from "lucide-react"
import { usePermissions } from "@/hooks/usePermissions"
import AccessDenied from "@/components/admin/AccessDenied"

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "team", label: "Team", icon: Users },
  { id: "privacy", label: "Privacy", icon: Shield },
]

const teamMembers = [
  { id: "1", name: "Super Admin", email: "admin@trusveragroup.com", role: "Super Admin", isActive: true, lastLogin: "Today, 09:45 AM" },
  { id: "2", name: "Rohan Mehta", email: "rohan@trusveragroup.com", role: "Content Admin", isActive: true, lastLogin: "Yesterday, 03:12 PM" },
  { id: "3", name: "Priya Desai", email: "priya@trusveragroup.com", role: "Sales Admin", isActive: true, lastLogin: "Jul 20, 2026" },
  { id: "4", name: "Arjun Kulkarni", email: "arjun@trusveragroup.com", role: "Viewer", isActive: false, lastLogin: "Jul 15, 2026" },
]

const contactsDueForDeletion = [
  { id: "1", name: "John Smith", email: "john@example.com", dueDate: "Aug 15, 2026" },
  { id: "2", name: "Sarah Connor", email: "sarah@example.com", dueDate: "Aug 22, 2026" },
]

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const ToggleSwitch = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <div
    onClick={onChange}
    style={{
      width: 44,
      height: 24,
      borderRadius: 12,
      background: value ? C.forest600 : C.slate400,
      position: "relative",
      cursor: "pointer",
      transition: "background 0.2s",
      flexShrink: 0,
    }}
  >
    <div style={{
      width: 18,
      height: 18,
      background: "white",
      borderRadius: "50%",
      position: "absolute",
      top: 3,
      left: value ? 23 : 3,
      transition: "left 0.2s",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    }} />
  </div>
)

const RoleBadge = ({ role }: { role: string }) => {
  const colors: Record<string, { bg: string; text: string }> = {
    "Super Admin": { bg: C.cream200, text: C.gold500 },
    "Sales Admin": { bg: C.forest100, text: C.forest700 },
    "Content Admin": { bg: C.cream300, text: C.slate700 },
    "Viewer": { bg: C.cream200, text: C.slate500 },
  }
  const style = colors[role] || colors["Viewer"]
  return (
    <span style={{
      background: style.bg,
      color: style.text,
      fontFamily: "var(--font-inter)",
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 10px",
      borderRadius: 20,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
    }}>
      {role === "Super Admin" && <Crown size={10} />}
      {role}
    </span>
  )
}

export default function SettingsPage() {
  const { can, loading } = usePermissions()
  const [activeTab, setActiveTab] = useState("profile")

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileName, setProfileName] = useState("Super Admin")
  const [profileEmail, setProfileEmail] = useState("admin@trusveragroup.com")
  const [profileRole] = useState("Super Admin")
  const [profileSaved, setProfileSaved] = useState(false)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const [notifyNewContact, setNotifyNewContact] = useState(true)
  const [notifyNewBlog, setNotifyNewBlog] = useState(false)
  const [notifyWeeklyReport, setNotifyWeeklyReport] = useState(true)
  const [notifySaved, setNotifySaved] = useState(false)

  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Viewer")
  const [inviteSent, setInviteSent] = useState(false)

  const [showDangerZone, setShowDangerZone] = useState(false)
  const [deactivateConfirm, setDeactivateConfirm] = useState("")

  const handleSaveProfile = () => {
    setIsEditingProfile(false)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  const handleSaveNotifications = () => {
    setNotifySaved(true)
    setTimeout(() => setNotifySaved(false), 3000)
  }

  const handleUpdatePassword = () => {
    setPasswordError("")
    if (!currentPassword) {
      setPasswordError("Current password is required.")
      return
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.")
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.")
      return
    }
    setPasswordSaved(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setTimeout(() => setPasswordSaved(false), 3000)
  }

  const handleSendInvite = () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) {
      setInviteSent(true)
    }
  }

  const hasMixedChars = /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
  let passwordStrength = 0
  if (newPassword.length > 0) {
    if (newPassword.length < 6) passwordStrength = 1
    else if (newPassword.length <= 8) passwordStrength = 2
    else if (newPassword.length <= 10) passwordStrength = 3
    else passwordStrength = hasMixedChars ? 4 : 3
  }
  const strengthColors = [C.red400, C.gold400, C.gold300, C.forest600]

  if (!loading && !can("view_settings")) return <AccessDenied />

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .settings-tab-content { animation: fadeIn 0.2s ease forwards; }
        .team-row:hover { background: ${C.cream200} !important; }
        .settings-input:focus { border-color: ${C.forest600} !important; outline: none; }
        .settings-input {
          font-family: var(--font-inter);
          font-size: 14px;
          color: ${C.forest900};
          background: ${C.cream100};
          transition: border-color 0.15s;
        }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: 0 }}>
            Settings
          </h1>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 4 }}>
            Manage your account, team, and privacy preferences.
          </div>
        </div>
      </div>

      <div style={{ background: C.cream100, borderRadius: 14, border: `1px solid ${C.slate200}`, overflow: "hidden" }}>
        <div style={{ display: "flex", borderBottom: `1px solid ${C.slate200}`, background: C.cream100 }}>
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 24px",
                  border: "none",
                  borderBottom: isActive ? `2px solid ${C.forest600}` : "2px solid transparent",
                  background: C.cream100,
                  cursor: "pointer",
                  color: isActive ? C.forest700 : C.slate500,
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="settings-tab-content" key={activeTab} style={{ padding: 32 }}>
          {activeTab === "profile" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800 }}>
                  Profile Information
                </div>
                {!isEditingProfile ? (
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: C.cream200,
                      color: C.slate600,
                      fontFamily: "var(--font-inter)",
                      fontSize: 12,
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Edit2 size={14} />
                    Edit Profile
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: C.cream200,
                        color: C.slate500,
                        fontFamily: "var(--font-inter)",
                        fontSize: 12,
                        padding: "8px 16px",
                        borderRadius: 6,
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <X size={14} />
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: C.forest600,
                        color: C.cream100,
                        fontFamily: "var(--font-inter)",
                        fontSize: 12,
                        padding: "8px 16px",
                        borderRadius: 6,
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Save size={14} />
                      Save
                    </button>
                  </div>
                )}
              </div>

              {profileSaved && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: C.forest100,
                    border: `1px solid ${C.green400}`,
                    borderRadius: 6,
                    padding: "10px 16px",
                    marginBottom: 20,
                  }}
                >
                  <CheckCircle size={16} color={C.forest600} />
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.forest700 }}>
                    Profile updated successfully.
                  </span>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 32 }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    background: C.forest600,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 20, fontWeight: 700, color: C.cream100 }}>
                    SA
                  </span>
                </div>

                {!isEditingProfile ? (
                  <div>
                    <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 24, color: C.forest800 }}>
                      {profileName}
                    </div>
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate500, marginTop: 4 }}>
                      {profileEmail}
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <RoleBadge role={profileRole} />
                    </div>
                  </div>
                ) : (
                  <div style={{ flex: 1, maxWidth: 400 }}>
                    <input
                      type="text"
                      className="settings-input"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      style={{
                        width: "100%",
                        border: `1px solid ${C.slate200}`,
                        borderRadius: 6,
                        padding: "8px 12px",
                        marginBottom: 10,
                        boxSizing: "border-box",
                      }}
                    />
                    <input
                      type="email"
                      className="settings-input"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      style={{
                        width: "100%",
                        border: `1px solid ${C.slate200}`,
                        borderRadius: 6,
                        padding: "8px 12px",
                        marginBottom: 10,
                        boxSizing: "border-box",
                      }}
                    />
                    <RoleBadge role={profileRole} />
                  </div>
                )}
              </div>

              <div style={{ borderTop: `1px solid ${C.slate200}`, margin: "28px 0" }} />

              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800, marginBottom: 20 }}>
                Notification Preferences
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: `1px solid ${C.slate200}` }}>
                <div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.forest800, fontWeight: 700 }}>
                    New Contact Alert
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 2 }}>
                    Get notified when a new contact submits the website form.
                  </div>
                </div>
                <ToggleSwitch value={notifyNewContact} onChange={() => setNotifyNewContact((v) => !v)} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: `1px solid ${C.slate200}` }}>
                <div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.forest800, fontWeight: 700 }}>
                    Blog Published
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 2 }}>
                    Get notified when a blog post goes live.
                  </div>
                </div>
                <ToggleSwitch value={notifyNewBlog} onChange={() => setNotifyNewBlog((v) => !v)} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: `1px solid ${C.slate200}` }}>
                <div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.forest800, fontWeight: 700 }}>
                    Weekly Report
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 2 }}>
                    Receive a weekly summary of contacts and blog performance.
                  </div>
                </div>
                <ToggleSwitch value={notifyWeeklyReport} onChange={() => setNotifyWeeklyReport((v) => !v)} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
                <button
                  type="button"
                  onClick={handleSaveNotifications}
                  style={{
                    background: C.forest600,
                    color: C.cream100,
                    fontFamily: "var(--font-inter)",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "10px 20px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Save Notifications
                </button>
                {notifySaved && (
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.forest600 }}>
                    Saved!
                  </span>
                )}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800, marginBottom: 24 }}>
                Change Password
              </div>

              <div style={{ maxWidth: 480 }}>
                <div style={{ position: "relative" }}>
                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                    Current Password
                  </label>
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    className="settings-input"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{
                      width: "100%",
                      border: `1px solid ${C.slate200}`,
                      borderRadius: 6,
                      padding: "10px 40px 10px 12px",
                      marginBottom: 16,
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw((v) => !v)}
                    style={{ position: "absolute", right: 12, top: 32, background: "none", border: "none", cursor: "pointer", display: "flex" }}
                  >
                    {showCurrentPw ? <EyeOff size={16} color={C.slate400} /> : <Eye size={16} color={C.slate400} />}
                  </button>
                </div>

                <div style={{ position: "relative" }}>
                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                    New Password
                  </label>
                  <input
                    type={showNewPw ? "text" : "password"}
                    className="settings-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      width: "100%",
                      border: `1px solid ${C.slate200}`,
                      borderRadius: 6,
                      padding: "10px 40px 10px 12px",
                      marginBottom: 16,
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw((v) => !v)}
                    style={{ position: "absolute", right: 12, top: 32, background: "none", border: "none", cursor: "pointer", display: "flex" }}
                  >
                    {showNewPw ? <EyeOff size={16} color={C.slate400} /> : <Eye size={16} color={C.slate400} />}
                  </button>
                </div>

                {newPassword.length > 0 && (
                  <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          height: 4,
                          borderRadius: 2,
                          flex: 1,
                          background: i < passwordStrength ? strengthColors[passwordStrength - 1] : C.slate200,
                        }}
                      />
                    ))}
                  </div>
                )}

                <div style={{ position: "relative" }}>
                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                    Confirm New Password
                  </label>
                  <input
                    type={showConfirmPw ? "text" : "password"}
                    className="settings-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      width: "100%",
                      border: `1px solid ${C.slate200}`,
                      borderRadius: 6,
                      padding: "10px 40px 10px 12px",
                      marginBottom: 16,
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw((v) => !v)}
                    style={{ position: "absolute", right: 12, top: 32, background: "none", border: "none", cursor: "pointer", display: "flex" }}
                  >
                    {showConfirmPw ? <EyeOff size={16} color={C.slate400} /> : <Eye size={16} color={C.slate400} />}
                  </button>
                </div>

                {passwordError && (
                  <div
                    style={{
                      background: "rgba(220,38,38,0.08)",
                      border: "1px solid rgba(220,38,38,0.25)",
                      borderRadius: 6,
                      padding: "10px 14px",
                      marginBottom: 16,
                      color: "#DC2626",
                      fontFamily: "var(--font-inter)",
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <AlertCircle size={14} color="#DC2626" />
                    {passwordError}
                  </div>
                )}

                {passwordSaved && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: C.forest100,
                      border: `1px solid ${C.green400}`,
                      borderRadius: 6,
                      padding: "10px 16px",
                      marginBottom: 16,
                    }}
                  >
                    <CheckCircle size={16} color={C.forest600} />
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.forest700 }}>
                      Password updated successfully.
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  style={{
                    background: C.forest600,
                    color: C.cream100,
                    fontFamily: "var(--font-inter)",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "10px 20px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Update Password
                </button>
              </div>

              <div style={{ borderTop: `1px solid ${C.slate200}`, margin: "32px 0" }} />

              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800, marginBottom: 20 }}>
                Active Sessions
              </div>

              <div
                style={{
                  background: C.cream200,
                  borderRadius: 8,
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700, color: C.forest800 }}>
                    Current Session
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 2 }}>
                    Chrome on Windows, Pune India
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate400, marginTop: 2 }}>
                    Started: Today, 09:45 AM IST
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.forest600 }} />
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.forest600 }}>Active</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800 }}>
                  Team Members
                </div>
                <button
                  type="button"
                  onClick={() => setShowInviteForm(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: C.forest600,
                    color: C.cream100,
                    fontFamily: "var(--font-inter)",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Plus size={14} />
                  Invite Member
                </button>
              </div>

              {showInviteForm && (
                <div
                  style={{
                    background: C.cream200,
                    borderRadius: 10,
                    padding: 24,
                    marginBottom: 20,
                    border: `1px solid ${C.slate200}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700, color: C.forest800 }}>
                      Invite Team Member
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowInviteForm(false)
                        setInviteEmail("")
                        setInviteSent(false)
                      }}
                      style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
                    >
                      <X size={16} color={C.slate500} />
                    </button>
                  </div>

                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, display: "block", marginBottom: 6 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="settings-input"
                    placeholder="colleague@trusveragroup.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    style={{
                      width: "100%",
                      border: `1px solid ${C.slate200}`,
                      borderRadius: 6,
                      padding: "10px 12px",
                      marginBottom: 14,
                      boxSizing: "border-box",
                    }}
                  />

                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, display: "block", marginBottom: 6 }}>
                    Role
                  </label>
                  <select
                    className="settings-input"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    style={{
                      width: "100%",
                      border: `1px solid ${C.slate200}`,
                      borderRadius: 6,
                      padding: "10px 12px",
                      marginBottom: 16,
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Content Admin">Content Admin</option>
                    <option value="Sales Admin">Sales Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>

                  {inviteSent && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <CheckCircle size={16} color={C.forest600} />
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.forest600 }}>
                        Invitation sent to {inviteEmail}
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSendInvite}
                    style={{
                      background: C.forest600,
                      color: C.cream100,
                      fontFamily: "var(--font-inter)",
                      fontSize: 13,
                      fontWeight: 700,
                      padding: "10px 20px",
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Send Invitation
                  </button>
                  {/* Email sending wired in Phase 2 with Resend */}
                </div>
              )}

              <div style={{ background: C.cream100, borderRadius: 10, border: `1px solid ${C.slate200}`, overflow: "hidden" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.5fr 1fr 1fr 80px",
                    padding: "10px 20px",
                    background: C.cream200,
                    fontFamily: "var(--font-inter)",
                    fontSize: 11,
                    color: C.slate500,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  <span>Member</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Last Login</span>
                  <span>Actions</span>
                </div>

                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="team-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1.5fr 1fr 1fr 80px",
                      padding: "14px 20px",
                      alignItems: "center",
                      borderTop: `1px solid ${C.slate200}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          background: C.forest100,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 700, color: C.forest700 }}>
                          {getInitials(member.name)}
                        </span>
                      </div>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700, color: C.forest800 }}>
                        {member.name}
                      </span>
                      {!member.isActive && (
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: C.slate400 }}>
                          (Inactive)
                        </span>
                      )}
                    </div>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>
                      {member.email}
                    </span>
                    <span>
                      <RoleBadge role={member.role} />
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate400 }}>
                      <Clock size={12} />
                      {member.lastLogin}
                    </span>
                    <span style={{ display: "flex", gap: 8 }}>
                      {member.id !== "1" ? (
                        <span title="Remove member" style={{ display: "flex", cursor: "pointer" }}>
                          <Trash2 size={15} color={C.slate400} />
                        </span>
                      ) : (
                        <span title="Cannot remove Super Admin" style={{ display: "flex" }}>
                          <Lock size={14} color={C.cream400} />
                        </span>
                      )}
                      {/* Remove wired in Phase 2 */}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div>
              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800, marginBottom: 8 }}>
                Data Retention
              </div>
              <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate600, lineHeight: 1.7, marginBottom: 24 }}>
                Under DPDP 2023 and GDPR, contact data is retained for a maximum of 730 days (2 years) from consent date. Contacts approaching their retention limit are listed below.
              </div>

              <div style={{ background: C.cream100, borderRadius: 10, border: `1px solid ${C.slate200}`, overflow: "hidden", marginBottom: 32 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 2fr 1fr 120px",
                    padding: "10px 20px",
                    background: C.cream200,
                    fontFamily: "var(--font-inter)",
                    fontSize: 11,
                    color: C.slate500,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  <span>Contact</span>
                  <span>Email</span>
                  <span>Due Date</span>
                  <span>Action</span>
                </div>

                {contactsDueForDeletion.map((contact) => (
                  <div
                    key={contact.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 2fr 1fr 120px",
                      padding: "14px 20px",
                      alignItems: "center",
                      borderTop: `1px solid ${C.slate200}`,
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700, color: C.forest800 }}>
                      {contact.name}
                    </span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>
                      {contact.email}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Clock size={13} color={C.gold500} />
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.gold500, fontWeight: 700 }}>
                        {contact.dueDate}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => window.confirm("Anonymize this contact? This cannot be undone.")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: "transparent",
                        border: `1px solid ${C.slate400}`,
                        color: C.slate600,
                        fontFamily: "var(--font-inter)",
                        fontSize: 12,
                        padding: "6px 12px",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      <AlertTriangle size={13} />
                      Anonymize
                    </button>
                    {/* Anonymize wired in Phase 2 */}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${C.slate200}`, margin: "32px 0" }} />

              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800, marginBottom: 20 }}>
                Compliance Status
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: C.cream200, borderRadius: 10, padding: 20 }}>
                  <CheckCircle size={20} color={C.forest600} style={{ marginBottom: 12 }} />
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700, color: C.forest800 }}>
                    DPDP 2023
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.forest600, marginTop: 4 }}>
                    Compliant
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, marginTop: 8 }}>
                    Consent captured, retention enforced, right to erasure supported.
                  </div>
                </div>

                <div style={{ background: C.cream200, borderRadius: 10, padding: 20 }}>
                  <CheckCircle size={20} color={C.forest600} style={{ marginBottom: 12 }} />
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700, color: C.forest800 }}>
                    GDPR
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.forest600, marginTop: 4 }}>
                    Compliant
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, marginTop: 8 }}>
                    Lawful basis recorded, data minimization applied.
                  </div>
                </div>

                <div style={{ background: C.cream200, borderRadius: 10, padding: 20 }}>
                  <CheckCircle size={20} color={C.forest600} style={{ marginBottom: 12 }} />
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700, color: C.forest800 }}>
                    CCPA
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.forest600, marginTop: 4 }}>
                    Compliant
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, marginTop: 8 }}>
                    Do-not-contact flag supported, data portability tracked.
                  </div>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${C.slate200}`, margin: "32px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: "#DC2626" }}>
                  Danger Zone
                </div>
                <button
                  type="button"
                  onClick={() => setShowDangerZone((v) => !v)}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
                >
                  <ChevronRight
                    size={18}
                    color={C.slate500}
                    style={{ transform: showDangerZone ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
                  />
                </button>
              </div>

              {showDangerZone && (
                <div
                  style={{
                    background: "rgba(220,38,38,0.04)",
                    border: "1px solid rgba(220,38,38,0.2)",
                    borderRadius: 10,
                    padding: 24,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
                    <AlertTriangle size={20} color="#DC2626" />
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate600 }}>
                      Deactivating your account is permanent and cannot be undone. All your admin access will be revoked immediately.
                    </span>
                  </div>

                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate600, display: "block", marginBottom: 8 }}>
                    Type &quot;DEACTIVATE&quot; to confirm
                  </label>
                  <input
                    type="text"
                    className="settings-input"
                    value={deactivateConfirm}
                    onChange={(e) => setDeactivateConfirm(e.target.value)}
                    style={{
                      width: "100%",
                      maxWidth: 320,
                      border: "1px solid rgba(220,38,38,0.3)",
                      borderRadius: 6,
                      padding: "10px 12px",
                      marginBottom: 16,
                      boxSizing: "border-box",
                      display: "block",
                    }}
                  />

                  <button
                    type="button"
                    disabled={deactivateConfirm !== "DEACTIVATE"}
                    onClick={() => window.confirm("Are you absolutely sure?")}
                    style={{
                      background: "#DC2626",
                      color: "white",
                      fontFamily: "var(--font-inter)",
                      fontSize: 13,
                      fontWeight: 700,
                      padding: "10px 24px",
                      borderRadius: 6,
                      border: "none",
                      opacity: deactivateConfirm !== "DEACTIVATE" ? 0.4 : 1,
                      cursor: deactivateConfirm !== "DEACTIVATE" ? "not-allowed" : "pointer",
                    }}
                  >
                    Deactivate Account
                  </button>
                  {/* Deactivation wired in Phase 2 */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
