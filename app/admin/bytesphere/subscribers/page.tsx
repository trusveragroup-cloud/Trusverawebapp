"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  AlertCircle, Download, Loader2, Mail, Search, Trash2, UserMinus, UserPlus,
} from "lucide-react"
import { C } from "@/lib/colors"
import { useAdmin } from "@/lib/admin-context"
import AccessDenied from "@/components/admin/AccessDenied"

type Subscriber = {
  id: string
  email: string
  name: string | null
  subscribed_at: string
  active: boolean
  unsubscribed_at: string | null
  created_at: string
}

const dropdownStyle: React.CSSProperties = {
  height: 36,
  padding: "0 12px",
  border: `1px solid ${C.slate200}`,
  borderRadius: 6,
  fontFamily: "var(--font-inter)",
  fontSize: 13,
  color: C.forest900,
  background: C.cream100,
  outline: "none",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export default function SubscribersPage() {
  const { can, loading: adminLoading } = useAdmin()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [actionError, setActionError] = useState("")

  const fetchSubscribers = useCallback(async () => {
    setLoading(true)
    setFetchError("")
    try {
      const res = await fetch("/api/admin/bytesphere/subscribers")
      const data = await res.json()
      if (!res.ok) {
        setFetchError(data.error || "Failed to load subscribers.")
        return
      }
      setSubscribers(data.subscribers as Subscriber[])
    } catch {
      setFetchError("Network error. Could not load subscribers.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubscribers()
  }, [fetchSubscribers])

  const stats = useMemo(() => {
    const now = new Date()
    const thisMonth = subscribers.filter((s) => {
      const d = new Date(s.subscribed_at)
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    }).length
    return [
      { label: `${subscribers.length} Total`, dot: C.slate400 },
      { label: `${subscribers.filter((s) => s.active).length} Active`, dot: C.forest600 },
      { label: `${subscribers.filter((s) => !s.active).length} Unsubscribed`, dot: C.slate300 },
      { label: `${thisMonth} This Month`, dot: C.gold500 },
    ]
  }, [subscribers])

  const filtered = subscribers.filter((s) => {
    if (statusFilter === "Active" && !s.active) return false
    if (statusFilter === "Unsubscribed" && s.active) return false
    if (search) {
      const q = search.toLowerCase()
      const matchesEmail = s.email.toLowerCase().includes(q)
      const matchesName = (s.name ?? "").toLowerCase().includes(q)
      if (!matchesEmail && !matchesName) return false
    }
    return true
  })

  const handleToggle = async (sub: Subscriber) => {
    const nextActive = !sub.active
    if (!nextActive && !window.confirm(`Unsubscribe ${sub.email}?`)) return

    setActionError("")
    setTogglingId(sub.id)
    const previous = sub
    setSubscribers((prev) => prev.map((s) => (s.id === sub.id ? { ...s, active: nextActive } : s)))

    try {
      const res = await fetch(`/api/admin/bytesphere/subscribers/${sub.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextActive }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubscribers((prev) => prev.map((s) => (s.id === sub.id ? previous : s)))
        setActionError(data.error || "Failed to update subscriber.")
        return
      }
      setSubscribers((prev) => prev.map((s) => (s.id === sub.id ? (data.subscriber as Subscriber) : s)))
    } catch {
      setSubscribers((prev) => prev.map((s) => (s.id === sub.id ? previous : s)))
      setActionError("Network error. Please try again.")
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async (sub: Subscriber) => {
    if (!window.confirm(`Permanently delete ${sub.email}? This is different from unsubscribing and cannot be undone.`)) return
    setActionError("")
    setDeletingId(sub.id)
    try {
      const res = await fetch(`/api/admin/bytesphere/subscribers/${sub.id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        setActionError(data.error || "Failed to delete subscriber.")
        return
      }
      fetchSubscribers()
    } catch {
      setActionError("Network error. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  if (adminLoading) {
    return (
      <div style={{ padding: 32 }}>
        <div style={{ color: C.textMuted, fontFamily: "var(--font-inter)", fontSize: 14 }}>
          Loading...
        </div>
      </div>
    )
  }
  if (!can("view_bs_subscribers")) return <AccessDenied />

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .subscriber-row:hover { background: ${C.cream200} !important; }
        .subscriber-action:hover { background: ${C.cream200}; }
        .subscriber-action:hover .subscriber-delete-icon { opacity: 1; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: 0 }}>
            Subscribers
          </h1>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 4 }}>
            Manage the ByteSphere newsletter list.
          </div>
        </div>

        <a
          href="/api/admin/bytesphere/subscribers/export"
          style={{
            background: C.forest600,
            color: C.cream100,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: 8,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <Download size={16} />
          Export CSV
        </a>
      </div>

      {actionError && (
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderRadius: 8,
            border: `1px solid ${C.red400}`,
            background: "rgba(226,75,74,0.08)",
            padding: "10px 16px",
            fontSize: 13,
            color: C.red400,
            fontFamily: "var(--font-inter)",
          }}
        >
          <AlertCircle size={15} />
          {actionError}
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              borderRadius: 20,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: stat.dot, flexShrink: 0, display: "block" }} />
            <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.forest800 }}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          background: C.cream100,
          borderRadius: 10,
          border: `1px solid ${C.slate200}`,
          padding: "14px 20px",
          marginBottom: 12,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
            size={15}
            color={C.slate400}
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            placeholder="Search by email or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              height: 36,
              padding: "0 12px 0 34px",
              border: `1px solid ${C.slate200}`,
              borderRadius: 6,
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              color: C.textDark,
              background: C.cream100,
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        <select style={dropdownStyle} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Unsubscribed">Unsubscribed</option>
        </select>
      </div>

      <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 12, fontFamily: "var(--font-inter)" }}>
        {!loading && !fetchError && `${filtered.length} subscriber${filtered.length === 1 ? "" : "s"}`}
      </div>

      <div style={{ background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: 10, overflow: "hidden" }}>
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "64px 0" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", border: `3px solid ${C.slate200}`, borderTop: `3px solid ${C.forest600}`, animation: "spin 0.8s linear infinite" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>Loading subscribers...</p>
          </div>
        ) : fetchError ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "64px 0" }}>
            <AlertCircle size={28} color={C.red400} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.red400 }}>{fetchError}</p>
            <button
              type="button"
              onClick={fetchSubscribers}
              style={{ background: C.forest600, color: C.cream100, border: "none", borderRadius: 6, padding: "8px 20px", cursor: "pointer", fontFamily: "var(--font-inter)", fontSize: 13 }}
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0" }}>
            <Mail size={40} color={C.slate300} style={{ margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 16, color: C.slate500 }}>
              No subscribers match your filters.
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse" }}>
            <colgroup>
              <col />
              <col style={{ width: 200 }} />
              <col style={{ width: 130 }} />
              <col style={{ width: 140 }} />
              <col style={{ width: 120 }} />
            </colgroup>
            <thead>
              <tr style={{ background: C.cream200 }}>
                {["Email", "Name", "Status", "Subscribed", "Actions"].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px 20px",
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      color: C.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      textAlign: col === "Actions" ? "right" : "left",
                      fontWeight: 400,
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr
                  key={sub.id}
                  className="subscriber-row"
                  style={{ height: 56, borderBottom: `1px solid ${C.borderLight}`, background: C.white }}
                >
                  <td
                    title={sub.email}
                    style={{
                      padding: "0 20px",
                      fontFamily: "var(--font-inter)",
                      fontSize: 14,
                      fontWeight: 500,
                      color: C.textDark,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {sub.email}
                  </td>
                  <td style={{ padding: "0 20px", fontFamily: "var(--font-inter)", fontSize: 13, color: C.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {sub.name || "—"}
                  </td>
                  <td style={{ padding: "0 20px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        fontFamily: "var(--font-inter)",
                        fontSize: 11,
                        fontWeight: 500,
                        borderRadius: 999,
                        padding: "3px 10px",
                        background: sub.active ? "rgba(74,186,138,0.12)" : C.borderLight,
                        color: sub.active ? C.forest600 : C.textMuted,
                      }}
                    >
                      {sub.active ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                  <td style={{ padding: "0 20px", fontFamily: "var(--font-inter)", fontSize: 13, color: C.textMuted }}>
                    {formatDate(sub.subscribed_at)}
                  </td>
                  <td style={{ padding: "0 20px" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 4 }}>
                      {can("manage_bs_subscribers") && (
                        <>
                          <button
                            type="button"
                            className="subscriber-action"
                            title={sub.active ? "Unsubscribe" : "Reactivate"}
                            disabled={togglingId === sub.id}
                            onClick={() => handleToggle(sub)}
                            style={{
                              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                              borderRadius: 6, border: "none", background: "none",
                              cursor: togglingId === sub.id ? "not-allowed" : "pointer",
                            }}
                          >
                            {togglingId === sub.id ? (
                              <Loader2 size={15} color={C.textMuted} style={{ animation: "spin 0.8s linear infinite" }} />
                            ) : sub.active ? (
                              <UserMinus size={15} color={C.forest600} />
                            ) : (
                              <UserPlus size={15} color={C.forest600} />
                            )}
                          </button>
                          <button
                            type="button"
                            className="subscriber-action"
                            title="Delete permanently"
                            disabled={deletingId === sub.id}
                            onClick={() => handleDelete(sub)}
                            style={{
                              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                              borderRadius: 6, border: "none", background: "none",
                              cursor: deletingId === sub.id ? "not-allowed" : "pointer",
                            }}
                          >
                            {deletingId === sub.id ? (
                              <Loader2 size={15} color={C.textMuted} style={{ animation: "spin 0.8s linear infinite" }} />
                            ) : (
                              <Trash2
                                size={15}
                                color={C.red400}
                                className="subscriber-delete-icon"
                                style={{ opacity: 0.6, transition: "opacity .15s" }}
                              />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
