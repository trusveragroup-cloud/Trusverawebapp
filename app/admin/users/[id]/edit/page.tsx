"use client"
import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { C } from "@/lib/colors"
import {
  ChevronLeft, Save, AlertCircle, CheckCircle,
  Shield, Crown, Loader2
} from "lucide-react"

type AdminUser = {
  id: string
  full_name: string
  email: string
  role: "Super Admin" | "Sales Admin" | "Content Admin" | "Viewer"
  is_active: boolean
  last_login_at: string | null
  created_at: string
}

const ROLE_INFO: Record<string, string> = {
  "Super Admin": "Full access to all features including user management, contacts, blogs, and settings.",
  "Sales Admin": "Can view and manage contacts, add manual entries, and update contact status.",
  "Content Admin": "Can create, edit, and publish blog posts. Read-only access to contacts.",
  "Viewer": "Read-only access to contacts and published blogs. Cannot make changes.",
}

const ROLE_STYLES: Record<string, { color: string; badgeBg: string }> = {
  "Super Admin": { color: C.gold500, badgeBg: "rgba(200,151,62,0.10)" },
  "Sales Admin": { color: "#3B82F6", badgeBg: "rgba(59,130,246,0.10)" },
  "Content Admin": { color: C.forest600, badgeBg: "rgba(74,186,138,0.10)" },
  "Viewer": { color: C.slate400, badgeBg: C.cream200 },
}

export default function EditUserPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [user, setUser] = useState<AdminUser | null>(null)
  const [role, setRole] = useState<string>("")
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [saveError, setSaveError] = useState("")
  const [success, setSuccess] = useState(false)

  const fetchUser = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/admin/users?id=${id}`,
        { credentials: "include" }
      )
      const data = await res.json()

      if (!res.ok || !data.users?.length) {
        setError("User not found.")
        return
      }

      const u = data.users[0]
      setUser(u)
      setRole(u.role)
      setIsActive(u.is_active)
    } catch {
      setError("Failed to load user.")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => { fetchUser() }, [fetchUser])

  const handleSave = async () => {
    setSaveError("")
    setIsSaving(true)
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, role, isActive }),
      })

      const data = await res.json()

      if (!res.ok) {
        setSaveError(data.error || "Failed to update user.")
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/users")
      }, 1500)
    } catch {
      setSaveError("Network error. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 32, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
        <div style={{
          width: 32, height: 32,
          border: `3px solid ${C.slate200}`,
          borderTop: `3px solid ${C.forest600}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div style={{ padding: 32, textAlign: "center" }}>
        <AlertCircle size={32} color="#DC2626" style={{ margin: "0 auto 12px" }} />
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "#DC2626" }}>
          {error || "User not found."}
        </p>
        <Link
          href="/admin/users"
          style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.forest600 }}
        >
          Back to Users
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div style={{ padding: 32, textAlign: "center", maxWidth: 480, margin: "80px auto" }}>
        <CheckCircle size={56} color={C.forest600} style={{ margin: "0 auto 20px" }} />
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 28, color: C.forest800, margin: "0 0 12px" }}>
          User Updated
        </h2>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 15, color: C.slate500 }}>
          Redirecting to users list...
        </p>
      </div>
    )
  }

  const initials = user.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  const roleStyle = ROLE_STYLES[role] || ROLE_STYLES["Viewer"]

  return (
    <div style={{ padding: 32 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* PAGE HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <Link
            href="/admin/users"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500,
              textDecoration: "none", marginBottom: 8,
            }}
          >
            <ChevronLeft size={16} color={C.slate500} />
            Users
          </Link>
          <h1 style={{
            fontFamily: "var(--font-dm-serif)", fontSize: 26,
            color: C.forest800, margin: 0,
          }}>
            Edit User
          </h1>
        </div>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "flex-start" }}>

        {/* LEFT COLUMN */}
        <div>

          {/* USER INFO CARD (read only) */}
          <div style={{
            background: C.cream100, borderRadius: 12,
            border: `1px solid ${C.slate200}`, padding: 28, marginBottom: 20,
          }}>
            <h2 style={{
              fontFamily: "var(--font-dm-serif)", fontSize: 20,
              color: C.forest800, margin: "0 0 20px",
            }}>User Information</h2>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: roleStyle.badgeBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "var(--font-inter)", fontSize: 18,
                  fontWeight: 700, color: roleStyle.color,
                }}>{initials}</span>
              </div>
              <div>
                <p style={{
                  margin: "0 0 4px", fontFamily: "var(--font-dm-serif)",
                  fontSize: 20, color: C.forest800,
                }}>{user.full_name}</p>
                <p style={{
                  margin: 0, fontFamily: "var(--font-inter)",
                  fontSize: 14, color: C.slate500,
                }}>{user.email}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <p style={{ margin: "0 0 4px", fontFamily: "var(--font-inter)", fontSize: 11, color: C.slate400, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Member Since
                </p>
                <p style={{ margin: 0, fontFamily: "var(--font-inter)", fontSize: 14, color: C.forest800, fontWeight: 500 }}>
                  {new Date(user.created_at).toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata", day: "numeric",
                    month: "short", year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p style={{ margin: "0 0 4px", fontFamily: "var(--font-inter)", fontSize: 11, color: C.slate400, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Last Login
                </p>
                <p style={{ margin: 0, fontFamily: "var(--font-inter)", fontSize: 14, color: C.forest800, fontWeight: 500 }}>
                  {user.last_login_at
                    ? new Date(user.last_login_at).toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata", day: "numeric",
                        month: "short", year: "numeric",
                      })
                    : "Never"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* ROLE SELECTION CARD */}
          <div style={{
            background: C.cream100, borderRadius: 12,
            border: `1px solid ${C.slate200}`, padding: 28,
          }}>
            <h2 style={{
              fontFamily: "var(--font-dm-serif)", fontSize: 20,
              color: C.forest800, margin: "0 0 6px",
            }}>Assign Role</h2>
            <p style={{
              fontFamily: "var(--font-inter)", fontSize: 13,
              color: C.slate500, margin: "0 0 20px",
            }}>Select the level of access for this user.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {(["Super Admin", "Sales Admin", "Content Admin", "Viewer"] as const).map((r) => (
                <div
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    border: `2px solid ${role === r ? C.forest600 : C.slate200}`,
                    background: role === r ? C.forest100 : C.cream100,
                    borderRadius: 10, padding: 16,
                    cursor: "pointer", position: "relative",
                    transition: "all 0.15s ease",
                  }}
                >
                  {role === r && (
                    <CheckCircle
                      size={18} color={C.forest600}
                      style={{ position: "absolute", top: 12, right: 12 }}
                    />
                  )}
                  <p style={{
                    margin: "0 0 6px",
                    fontFamily: "var(--font-inter)", fontSize: 14,
                    fontWeight: 700,
                    color: role === r ? C.forest800 : C.slate600,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    {r === "Super Admin" && <Crown size={14} color={C.gold500} />}
                    {r}
                  </p>
                  <p style={{
                    margin: 0, fontFamily: "var(--font-inter)",
                    fontSize: 12, color: C.slate500, lineHeight: 1.5,
                  }}>{ROLE_INFO[r]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>

          {/* ACCOUNT STATUS CARD */}
          <div style={{
            background: C.cream100, borderRadius: 12,
            border: `1px solid ${C.slate200}`, padding: 24, marginBottom: 16,
          }}>
            <h3 style={{
              fontFamily: "var(--font-dm-serif)", fontSize: 18,
              color: C.forest800, margin: "0 0 16px",
            }}>Account Status</h3>

            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 16,
            }}>
              <div>
                <p style={{
                  margin: "0 0 2px", fontFamily: "var(--font-inter)",
                  fontSize: 14, fontWeight: 600, color: C.forest800,
                }}>
                  {isActive ? "Active" : "Inactive"}
                </p>
                <p style={{
                  margin: 0, fontFamily: "var(--font-inter)",
                  fontSize: 12, color: C.slate500,
                }}>
                  {isActive ? "User can log in to the admin panel." : "User cannot log in."}
                </p>
              </div>
              <div
                onClick={() => setIsActive(v => !v)}
                style={{
                  width: 44, height: 24, borderRadius: 12,
                  background: isActive ? C.forest600 : C.slate300,
                  position: "relative", cursor: "pointer",
                  transition: "background 0.2s", flexShrink: 0,
                }}
              >
                <div style={{
                  width: 18, height: 18, background: "white",
                  borderRadius: "50%", position: "absolute",
                  top: 3, left: isActive ? 23 : 3,
                  transition: "left 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }} />
              </div>
            </div>

            {saveError && (
              <div style={{
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.25)",
                borderRadius: 6, padding: "10px 14px", marginBottom: 12,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <AlertCircle size={14} color="#DC2626" />
                <span style={{
                  fontFamily: "var(--font-inter)", fontSize: 13, color: "#DC2626",
                }}>{saveError}</span>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              style={{
                width: "100%", height: 44,
                background: isSaving ? C.slate300 : C.forest600,
                color: C.cream100, border: "none", borderRadius: 8,
                fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700,
                cursor: isSaving ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8,
              }}
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>

            <Link
              href="/admin/users"
              style={{
                display: "block", textAlign: "center", marginTop: 12,
                fontFamily: "var(--font-inter)", fontSize: 13,
                color: C.slate400, textDecoration: "none",
              }}
            >
              Cancel
            </Link>
          </div>

          {/* ROLE SUMMARY CARD */}
          <div style={{
            background: C.cream100, borderRadius: 12,
            border: `1px solid ${C.slate200}`, padding: 24,
          }}>
            <h3 style={{
              fontFamily: "var(--font-dm-serif)", fontSize: 18,
              color: C.forest800, margin: "0 0 16px",
            }}>Role Summary</h3>

            <div style={{
              background: roleStyle.badgeBg, borderRadius: 8,
              padding: 16, marginBottom: 12,
            }}>
              <p style={{
                margin: "0 0 6px", fontFamily: "var(--font-inter)",
                fontSize: 14, fontWeight: 700, color: roleStyle.color,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <Shield size={14} />
                {role}
              </p>
              <p style={{
                margin: 0, fontFamily: "var(--font-inter)",
                fontSize: 12, color: C.slate600, lineHeight: 1.6,
              }}>{ROLE_INFO[role]}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
