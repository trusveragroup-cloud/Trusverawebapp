"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { C } from "@/lib/colors"
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"

export default function SetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSetPassword = async () => {
    setError("")

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })

      if (updateError) {
        setError(updateError.message)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 2000)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: C.forest800,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        background: C.cream100,
        borderRadius: 16,
        padding: "48px 40px",
        width: "100%",
        maxWidth: 440,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        {success ? (
          <div style={{ textAlign: "center" }}>
            <CheckCircle size={56} color={C.forest600} style={{ margin: "0 auto 20px" }} />
            <h1 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: 28,
              color: C.forest800,
              margin: "0 0 12px",
            }}>Password Set!</h1>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              color: C.slate500,
              lineHeight: 1.6,
            }}>
              Redirecting you to the dashboard...
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{
                width: 56,
                height: 56,
                background: C.forest600,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Lock size={28} color={C.cream100} />
              </div>
              <h1 style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 28,
                color: C.forest800,
                margin: "0 0 8px",
              }}>Set Your Password</h1>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: 14,
                color: C.slate500,
                lineHeight: 1.6,
                margin: 0,
              }}>
                Create a secure password for your TrusVera Group admin account.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: "block",
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: C.slate500,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: 6,
              }}>New Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  style={{
                    width: "100%",
                    height: 44,
                    border: `1px solid ${C.slate200}`,
                    borderRadius: 8,
                    padding: "0 44px 0 14px",
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: C.forest900,
                    background: C.cream100,
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
                <button
                  onClick={() => setShowPassword(v => !v)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {showPassword
                    ? <EyeOff size={16} color={C.slate400} />
                    : <Eye size={16} color={C.slate400} />
                  }
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block",
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: C.slate500,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: 6,
              }}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  onKeyDown={(e) => e.key === "Enter" && handleSetPassword()}
                  style={{
                    width: "100%",
                    height: 44,
                    border: `1px solid ${C.slate200}`,
                    borderRadius: 8,
                    padding: "0 44px 0 14px",
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: C.forest900,
                    background: C.cream100,
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
                <button
                  onClick={() => setShowConfirm(v => !v)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {showConfirm
                    ? <EyeOff size={16} color={C.slate400} />
                    : <Eye size={16} color={C.slate400} />
                  }
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.25)",
                borderRadius: 6,
                padding: "10px 14px",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
                <AlertCircle size={14} color="#DC2626" />
                <span style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  color: "#DC2626",
                }}>
                  {error}
                </span>
              </div>
            )}

            <button
              onClick={handleSetPassword}
              disabled={isLoading}
              style={{
                width: "100%",
                height: 44,
                background: isLoading ? C.slate300 : C.forest600,
                color: C.cream100,
                border: "none",
                borderRadius: 8,
                fontFamily: "var(--font-inter)",
                fontSize: 14,
                fontWeight: 700,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Setting Password..." : "Set Password & Continue"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
