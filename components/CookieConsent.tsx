"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { C } from "@/lib/colors"
import { Cookie, X, Settings, CheckCircle } from "lucide-react"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [analyticsAccepted, setAnalyticsAccepted] = useState(false)
  const [preferencesAccepted, setPreferencesAccepted] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("tvg-cookie-consent")
    if (!consent) {
      setTimeout(() => setVisible(true), 1500)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("tvg-cookie-consent", "accepted-all")
    localStorage.setItem("tvg-cookie-timestamp", new Date().toISOString())
    setVisible(false)
  }

  const declineOptional = () => {
    localStorage.setItem("tvg-cookie-consent", "essential-only")
    localStorage.setItem("tvg-cookie-timestamp", new Date().toISOString())
    setVisible(false)
  }

  const savePreferences = () => {
    const value = analyticsAccepted ? "accepted-all" : "essential-only"
    localStorage.setItem("tvg-cookie-consent", value)
    localStorage.setItem("tvg-cookie-timestamp", new Date().toISOString())
    setVisible(false)
    setShowPreferences(false)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .cookie-banner {
          animation: slideUp 0.4s ease forwards;
        }
      `}</style>

      <div
        className="cookie-banner"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: C.forest900,
          borderTop: `3px solid ${C.gold400}`,
          boxShadow: "0 -8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {!showPreferences ? (
          <div style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}>
            {/* LEFT: Cookie icon + text */}
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              flex: 1,
              minWidth: 280,
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(201,168,76,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <Cookie size={20} color={C.gold400} />
              </div>
              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.cream100,
                  margin: "0 0 4px",
                }}>
                  We use cookies
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  color: C.cream300,
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  We use essential cookies to make our website work.
                  With your consent we may also use optional cookies
                  to improve your experience.{" "}
                  <Link
                    href="/cookie-policy"
                    style={{
                      color: C.gold400,
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                  >
                    Cookie Policy
                  </Link>
                </p>
              </div>
            </div>

            {/* RIGHT: Action buttons */}
            <div style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
              flexShrink: 0,
            }}>
              <button
                onClick={() => setShowPreferences(true)}
                style={{
                  height: 38,
                  padding: "0 16px",
                  background: "transparent",
                  border: `1px solid rgba(255,255,255,0.2)`,
                  color: C.cream300,
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  borderRadius: 6,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Settings size={14} />
                Manage Preferences
              </button>

              <button
                onClick={declineOptional}
                style={{
                  height: 38,
                  padding: "0 16px",
                  background: "transparent",
                  border: `1px solid rgba(255,255,255,0.2)`,
                  color: C.cream300,
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Essential Only
              </button>

              <button
                onClick={acceptAll}
                style={{
                  height: 38,
                  padding: "0 20px",
                  background: C.gold500,
                  border: "none",
                  color: C.forest900,
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  fontWeight: 700,
                  borderRadius: 6,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <CheckCircle size={14} />
                Accept All
              </button>

              <button
                onClick={declineOptional}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
                title="Close"
              >
                <X size={18} color={C.cream400} />
              </button>
            </div>
          </div>
        ) : (
          /* PREFERENCES PANEL */
          <div style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "24px",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}>
              <h3 style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 20,
                color: C.cream100,
                margin: 0,
              }}>
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                <X size={18} color={C.cream400} />
              </button>
            </div>

            {/* Essential cookies row (always on) */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 12,
            }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.cream100,
                  margin: "0 0 4px",
                }}>
                  Essential Cookies
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  color: C.cream400,
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  Required for the website to function. Cannot be disabled.
                </p>
              </div>
              <div style={{
                background: C.forest600,
                borderRadius: 20,
                padding: "4px 12px",
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                fontWeight: 700,
                color: C.cream100,
              }}>
                Always On
              </div>
            </div>

            {/* Analytics cookies row (optional) */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 20,
            }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.cream100,
                  margin: "0 0 4px",
                }}>
                  Analytics Cookies
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  color: C.cream400,
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  Help us understand how visitors use our website.
                  Currently not in use.
                </p>
              </div>
              <div
                onClick={() => setAnalyticsAccepted(v => !v)}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  background: analyticsAccepted ? C.forest600 : "rgba(255,255,255,0.2)",
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
                  left: analyticsAccepted ? 23 : 3,
                  transition: "left 0.2s",
                }} />
              </div>
            </div>

            {/* Save button */}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowPreferences(false)}
                style={{
                  height: 38,
                  padding: "0 16px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: C.cream300,
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={savePreferences}
                style={{
                  height: 38,
                  padding: "0 24px",
                  background: C.gold500,
                  border: "none",
                  color: C.forest900,
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  fontWeight: 700,
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
