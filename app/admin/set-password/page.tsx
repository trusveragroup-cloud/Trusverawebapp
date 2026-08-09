"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { C } from "@/lib/colors";

function HexagonIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7" fill={C.forest800} />
    </svg>
  );
}

function LockBadgeIcon() {
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
        <radialGradient id="wpAdminGlowA2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold500} stopOpacity={0.25} />
          <stop offset="100%" stopColor={C.gold500} stopOpacity={0} />
        </radialGradient>
        <radialGradient id="wpAdminGlowB2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold400} stopOpacity={0.2} />
          <stop offset="100%" stopColor={C.gold400} stopOpacity={0} />
        </radialGradient>
      </defs>

      <circle cx={210} cy={260} r={220} fill="url(#wpAdminGlowA2)" />
      <circle cx={130} cy={700} r={170} fill="url(#wpAdminGlowB2)" />

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

function SplitShell({ children }: { children: React.ReactNode }) {
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
          <LockBadgeIcon />
          <span>Secured by Supabase Auth</span>
        </div>

        <div style={{ width: "100%", maxWidth: 400, marginLeft: 0, marginRight: 0 }}>{children}</div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 44,
  borderRadius: 8,
  border: `1px solid ${C.borderLight}`,
  background: C.white,
  paddingLeft: 14,
  paddingRight: 44,
  fontSize: 14,
  color: C.textDark,
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: C.textDark,
  display: "block",
  marginBottom: 6,
};

type Status = "loading" | "ready" | "success" | "expired" | "error";

export default function SetPasswordPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Guards against setState after unmount when the timeout or the
  // auth-state subscription fires after this component has gone away.
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const supabase = createClient();

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let subscription: { unsubscribe: () => void } | null = null;

    const finishWaiting = () => {
      if (timeoutId) clearTimeout(timeoutId);
      subscription?.unsubscribe();
    };

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!mountedRef.current) return;

      if (session?.user) {
        setStatus("ready");
        return;
      }

      const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
        if (!mountedRef.current) return;
        if ((event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") && newSession?.user) {
          finishWaiting();
          setStatus("ready");
        }
      });
      subscription = data.subscription;

      timeoutId = setTimeout(() => {
        if (!mountedRef.current) return;
        finishWaiting();
        setStatus((current) => (current === "loading" ? "expired" : current));
      }, 10000);
    };

    checkSession();

    return () => {
      mountedRef.current = false;
      finishWaiting();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setUpdateError("");

    if (!password || !confirmPassword) {
      setValidationError("Please fill in both fields.");
      return;
    }
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setStatus("error");
        setUpdateError(error.message);
        return;
      }

      setStatus("success");
      await supabase.auth.signOut();
      setTimeout(() => {
        router.push("/admin/login?message=password_updated");
      }, 2000);
    } catch {
      setStatus("error");
      setUpdateError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <SplitShell>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: `3px solid ${C.borderLight}`,
              borderTop: `3px solid ${C.forest800}`,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <div style={{ fontSize: 22, fontWeight: 600, color: C.textDark, marginBottom: 8 }}>
            Verifying your link
          </div>
          <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>
            Please wait while we confirm your reset link.
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </SplitShell>
    );
  }

  if (status === "expired") {
    return (
      <SplitShell>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(220,38,38,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <AlertCircle size={24} color="#DC2626" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: C.textDark, marginBottom: 12 }}>
            Link expired
          </div>
          <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6, marginBottom: 28 }}>
            This reset link has expired or is invalid.
          </div>
          <a
            href="/admin/forgot-password"
            style={{
              display: "inline-block",
              background: C.forest800,
              color: C.cream50,
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 8,
              padding: "12px 24px",
              textDecoration: "none",
            }}
          >
            Request a new reset link
          </a>
        </div>
      </SplitShell>
    );
  }

  if (status === "success") {
    return (
      <SplitShell>
        <div style={{ textAlign: "center" }}>
          <CheckCircle size={56} color={C.forest600} style={{ margin: "0 auto 20px" }} />
          <div style={{ fontSize: 28, fontWeight: 600, color: C.textDark, marginBottom: 12 }}>
            Password updated
          </div>
          <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>
            Redirecting to sign in...
          </div>
        </div>
      </SplitShell>
    );
  }

  // "ready" and "error" both render the form — "error" additionally shows
  // the updateUser failure message so the user can correct and retry.
  return (
    <SplitShell>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "rgba(200,151,62,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Lock size={24} color={C.gold500} />
        </div>

        <div style={{ fontSize: 28, fontWeight: 600, color: C.textDark, marginBottom: 8 }}>
          Set your password
        </div>
        <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 36, lineHeight: 1.6 }}>
          Create a secure password for your TrusVera Group admin account.
        </div>

        <div>
          <label style={labelStyle}>New password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
              }}
            >
              {showPassword ? <EyeOff size={16} color={C.textMuted} /> : <Eye size={16} color={C.textMuted} />}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <label style={labelStyle}>Confirm password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
              }}
            >
              {showConfirm ? <EyeOff size={16} color={C.textMuted} /> : <Eye size={16} color={C.textMuted} />}
            </button>
          </div>
        </div>

        {(validationError || (status === "error" && updateError)) && (
          <div
            style={{
              background: "rgba(220,38,38,0.08)",
              border: "1px solid rgba(220,38,38,0.25)",
              borderRadius: 6,
              padding: "10px 14px",
              marginTop: 16,
              color: "#DC2626",
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <AlertCircle size={14} color="#DC2626" />
            {validationError || updateError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            height: 48,
            background: C.forest800,
            color: C.cream50,
            fontSize: 15,
            fontWeight: 600,
            borderRadius: 8,
            border: "none",
            cursor: isSubmitting ? "default" : "pointer",
            marginTop: 28,
          }}
        >
          {isSubmitting ? "Setting password..." : "Set password & continue"}
        </button>
      </form>
    </SplitShell>
  );
}
