"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { C } from "@/lib/colors"

export default function AuthHandlerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const [status, setStatus] = useState("Processing your invitation...")
  const [error, setError] = useState("")

  useEffect(() => {
    const handleAuth = async () => {
      const supabase = createClient()

      // Get the current session - Supabase client automatically
      // reads the hash fragment and establishes the session
      const { data: { session }, error: sessionError } =
        await supabase.auth.getSession()

      console.log("Auth handler session:", {
        user: session?.user?.email,
        error: sessionError?.message,
        type
      })

      if (sessionError) {
        setError("Authentication failed: " + sessionError.message)
        setTimeout(() => router.push("/admin/login?error=auth_failed"), 3000)
        return
      }

      if (session?.user) {
        setStatus("Authentication successful! Redirecting...")

        if (type === "invite" || type === "recovery") {
          router.push("/admin/set-password")
        } else {
          router.push("/admin/dashboard")
        }
        return
      }

      // If no session yet, wait for the auth state change
      // This handles the case where Supabase is still processing
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          console.log("Auth state change:", event, newSession?.user?.email)

          if (event === "SIGNED_IN" && newSession) {
            subscription.unsubscribe()
            setStatus("Authentication successful! Redirecting...")

            if (type === "invite" || type === "recovery") {
              router.push("/admin/set-password")
            } else {
              router.push("/admin/dashboard")
            }
          }

          if (event === "PASSWORD_RECOVERY") {
            subscription.unsubscribe()
            router.push("/admin/set-password")
          }
        }
      )

      // Timeout after 10 seconds
      setTimeout(() => {
        subscription.unsubscribe()
        setError("Authentication timed out. Please try again.")
        setTimeout(() => router.push("/admin/login"), 3000)
      }, 10000)
    }

    handleAuth()
  }, [router, type])

  return (
    <div style={{
      minHeight: "100vh",
      background: C.forest800,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <div style={{
        background: C.cream100,
        borderRadius: 16,
        padding: "48px 40px",
        width: "100%",
        maxWidth: 440,
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        {error ? (
          <>
            <div style={{
              width: 56, height: 56,
              background: "rgba(220,38,38,0.1)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <circle cx={12} cy={12} r={10} stroke="#DC2626" strokeWidth={2}/>
                <path d="M15 9l-6 6M9 9l6 6" stroke="#DC2626" strokeWidth={2}
                  strokeLinecap="round"/>
              </svg>
            </div>
            <h2 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: 24, color: C.forest800,
              margin: "0 0 12px",
            }}>
              Authentication Failed
            </h2>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: 14, color: C.slate500,
              lineHeight: 1.6, margin: 0,
            }}>
              {error}
            </p>
          </>
        ) : (
          <>
            <div style={{
              width: 56, height: 56,
              background: C.forest100,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <div style={{
                width: 28, height: 28,
                border: `3px solid ${C.slate200}`,
                borderTop: `3px solid ${C.forest600}`,
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
            </div>
            <h2 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: 24, color: C.forest800,
              margin: "0 0 12px",
            }}>
              Verifying Your Account
            </h2>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: 14, color: C.slate500,
              lineHeight: 1.6, margin: 0,
            }}>
              {status}
            </p>
          </>
        )}
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
