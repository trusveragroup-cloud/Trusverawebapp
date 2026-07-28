"use client"
import { C } from "@/lib/colors"
import { ShieldOff } from "lucide-react"
import Link from "next/link"

export default function AccessDenied() {
  return (
    <div style={{
      padding: 60, textAlign: "center",
      maxWidth: 480, margin: "80px auto"
    }}>
      <div style={{
        width: 64, height: 64,
        background: "rgba(220,38,38,0.08)",
        borderRadius: "50%",
        display: "flex", alignItems: "center",
        justifyContent: "center", margin: "0 auto 20px"
      }}>
        <ShieldOff size={28} color="#DC2626" />
      </div>
      <h2 style={{
        fontFamily: "var(--font-dm-serif)",
        fontSize: 24, color: C.forest800, margin: "0 0 12px"
      }}>
        Access Restricted
      </h2>
      <p style={{
        fontFamily: "var(--font-inter)",
        fontSize: 14, color: C.slate500,
        lineHeight: 1.7, margin: "0 0 24px"
      }}>
        You do not have permission to perform this action.
        Contact your Super Admin to request access.
      </p>
      <Link
        href="/admin/dashboard"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: C.forest600,
          color: C.cream100,
          fontFamily: "var(--font-inter)",
          fontSize: 13, fontWeight: 700,
          padding: "10px 24px",
          borderRadius: 6,
          textDecoration: "none",
        }}
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
