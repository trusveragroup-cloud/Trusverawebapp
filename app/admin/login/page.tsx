"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { C } from "@/lib/colors";

function HexagonIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7" fill={C.forest800} />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke={C.gold500} strokeWidth={2} />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={C.gold500} strokeWidth={2} />
    </svg>
  );
}

function PanelArtwork() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 420 900"
      preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0 }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="wpAdminGlowA" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold500} stopOpacity={0.25} />
          <stop offset="100%" stopColor={C.gold500} stopOpacity={0} />
        </radialGradient>
        <radialGradient id="wpAdminGlowB" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold400} stopOpacity={0.2} />
          <stop offset="100%" stopColor={C.gold400} stopOpacity={0} />
        </radialGradient>
      </defs>

      <circle cx={210} cy={260} r={220} fill="url(#wpAdminGlowA)" />
      <circle cx={130} cy={700} r={170} fill="url(#wpAdminGlowB)" />

      <circle cx={210} cy={450} r={70} stroke={C.gold500} strokeWidth={1} fill="none" opacity={0.16} />
      <circle cx={210} cy={450} r={130} stroke={C.gold500} strokeWidth={1} fill="none" opacity={0.14} />
      <circle cx={210} cy={450} r={190} stroke={C.gold500} strokeWidth={1} fill="none" opacity={0.12} />

      <polygon points="210,300 320,500 100,500" stroke={C.gold500} strokeWidth={1} fill="none" opacity={0.18} />
      <polygon
        points="210,260 360,520 60,520"
        stroke={C.gold400}
        strokeWidth={1}
        fill="none"
        opacity={0.15}
        transform="rotate(15 210 450)"
      />
      <polygon
        points="210,340 280,460 140,460"
        stroke={C.gold500}
        strokeWidth={1}
        fill="none"
        opacity={0.2}
        transform="rotate(-10 210 450)"
      />

      <line x1={210} y1={0} x2={210} y2={900} stroke={C.gold500} strokeWidth={1} opacity={0.12} />
      <line x1={0} y1={450} x2={420} y2={450} stroke={C.gold500} strokeWidth={1} opacity={0.12} />

      <rect x={130} y={370} width={160} height={160} stroke={C.gold500} strokeWidth={1} fill="none" opacity={0.12} />
      <rect
        x={160}
        y={400}
        width={100}
        height={100}
        stroke={C.gold400}
        strokeWidth={1}
        fill="none"
        opacity={0.12}
        transform="rotate(45 210 450)"
      />

      <circle cx={210} cy={380} r={2} fill={C.gold500} opacity={0.6} />
      <circle cx={210} cy={520} r={2} fill={C.gold500} opacity={0.55} />
      <circle cx={140} cy={450} r={2} fill={C.gold400} opacity={0.65} />
      <circle cx={280} cy={450} r={2} fill={C.gold400} opacity={0.5} />
      <circle cx={100} cy={500} r={2} fill={C.gold500} opacity={0.7} />
      <circle cx={320} cy={500} r={2} fill={C.gold500} opacity={0.55} />
    </svg>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
      }}>
        <div style={{
          width: 32,
          height: 32,
          border: "3px solid #E5E7EB",
          borderTop: "3px solid #166B4A",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const urlError = searchParams.get("error");

  useEffect(() => {
    if (urlError === "auth_callback_failed") {
      setAuthError("Authentication failed. Please try logging in again.");
    }
  }, [urlError]);

  const handleLogin = async () => {
    setAuthError("");

    if (!email?.trim()) {
      setAuthError("Email address is required.");
      return;
    }
    if (!password?.trim()) {
      setAuthError("Password is required.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || "Login failed. Please try again.");
        return;
      }

      const redirectTo = searchParams.get("redirectTo") || "/admin/dashboard";
      router.push(redirectTo);
      router.refresh();
    } catch {
      setAuthError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100%" }}>
      <div style={{ width: 420, flexShrink: 0, background: C.forest800, position: "relative", overflow: "hidden" }}>
        <PanelArtwork />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: C.gold500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HexagonIcon />
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: C.cream50, marginTop: 16 }}>TrusVera</div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: C.gold300,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            Admin Portal
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          background: C.cream100,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: C.gold500,
          }}
        >
          <LockIcon />
          <span>Secured by Supabase Auth</span>
        </div>

        <div style={{ width: "100%", maxWidth: 400, marginLeft: 0, marginRight: 0 }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: C.textDark, marginBottom: 8 }}>Welcome back</div>
          <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 36 }}>
            Sign in to your admin account to continue
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: C.textDark, display: "block", marginBottom: 6 }}>
              Email address
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                height: 44,
                borderRadius: 8,
                border: `1px solid ${C.borderLight}`,
                background: C.white,
                paddingLeft: 14,
                fontSize: 14,
                color: C.textDark,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: C.textDark, display: "block", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                height: 44,
                borderRadius: 8,
                border: `1px solid ${C.borderLight}`,
                background: C.white,
                paddingLeft: 14,
                fontSize: 14,
                color: C.textDark,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <a
            href="/admin/forgot-password"
            style={{
              display: "block",
              textAlign: "right",
              marginTop: 8,
              fontSize: 13,
              color: C.gold500,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Forgot password?
          </a>

          {authError && (
            <div
              style={{
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.25)",
                borderRadius: "6px",
                padding: "10px 14px",
                marginTop: "16px",
                marginBottom: "16px",
                color: "#DC2626",
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertCircle size={14} color="#DC2626" />
              {authError}
            </div>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            style={{
              width: "100%",
              height: 48,
              background: C.forest800,
              color: C.cream50,
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 8,
              border: "none",
              cursor: isLoading ? "default" : "pointer",
              marginTop: 28,
            }}
          >
            {isLoading ? "Signing in..." : "Sign in to Admin"}
          </button>

          <div style={{ textAlign: "center", fontSize: 12, color: C.textMuted, marginTop: 16 }}>
            Protected access only. Unauthorized entry is logged.
          </div>
        </div>
      </div>
    </div>
  );
}
