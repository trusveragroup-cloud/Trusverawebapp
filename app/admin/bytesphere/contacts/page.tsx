"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AlertCircle, Eye, Inbox, Loader2, Search, Send, Trash2, X } from "lucide-react"
import { C } from "@/lib/colors"

type ContactStatus = "new" | "read" | "replied" | "closed"

type Contact = {
  id: string
  name: string
  email: string
  company: string | null
  subject: string
  message: string
  status: ContactStatus
  submitted_at: string
  created_at: string
}

const STATUS_LABELS: Record<ContactStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
  closed: "Closed",
}

const STATUS_STYLES: Record<ContactStatus, { background: string; color: string; fontWeight: number; border?: string }> = {
  new: { background: "rgba(200,151,62,0.14)", color: C.gold500, fontWeight: 600 },
  read: { background: C.borderLight, color: C.textMuted, fontWeight: 500 },
  replied: { background: "rgba(74,186,138,0.12)", color: C.forest600, fontWeight: 500 },
  closed: { background: "transparent", color: C.textMuted, fontWeight: 500, border: `1px solid ${C.borderLight}` },
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

function StatusPill({ status }: { status: ContactStatus }) {
  const s = STATUS_STYLES[status]
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-inter)",
        fontSize: 11,
        fontWeight: s.fontWeight,
        borderRadius: 999,
        padding: "3px 10px",
        background: s.background,
        color: s.color,
        border: s.border,
      }}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}

function ContactPanel({
  contact, onClose, onStatusChange, statusSaving,
}: {
  contact: Contact
  onClose: () => void
  onStatusChange: (status: ContactStatus) => void
  statusSaving: boolean
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const handleReply = () => {
    onStatusChange("replied")
  }

  return (
    <>
      <style>{`.contact-detail-link:hover { text-decoration: underline; }`}</style>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 200 }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: 480,
          maxWidth: "90vw",
          background: C.white,
          zIndex: 201,
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.2s ease",
        }}
      >
        <div style={{ flexShrink: 0, padding: 24, borderBottom: `1px solid ${C.borderLight}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: C.textDark, fontFamily: "var(--font-inter)", lineHeight: 1.4 }}>
              {contact.subject}
            </div>
            <button
              type="button"
              onClick={onClose}
              title="Close"
              style={{
                flexShrink: 0, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 6, border: "none", background: "none", cursor: "pointer",
              }}
            >
              <X size={16} color={C.textMuted} />
            </button>
          </div>
          <div style={{ marginTop: 10 }}>
            <StatusPill status={contact.status} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: C.textMuted, fontFamily: "var(--font-inter)", marginBottom: 4 }}>
              Name
            </div>
            <div style={{ fontSize: 14, color: C.textDark, fontFamily: "var(--font-inter)" }}>{contact.name}</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: C.textMuted, fontFamily: "var(--font-inter)", marginBottom: 4 }}>
              Email
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="contact-detail-link"
              style={{ fontSize: 14, color: C.forest600, fontFamily: "var(--font-inter)", textDecoration: "none" }}
            >
              {contact.email}
            </a>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: C.textMuted, fontFamily: "var(--font-inter)", marginBottom: 4 }}>
              Company
            </div>
            <div style={{ fontSize: 14, color: C.textDark, fontFamily: "var(--font-inter)" }}>{contact.company || "—"}</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: C.textMuted, fontFamily: "var(--font-inter)", marginBottom: 4 }}>
              Received
            </div>
            <div style={{ fontSize: 14, color: C.textDark, fontFamily: "var(--font-inter)" }}>{formatDate(contact.submitted_at)}</div>
          </div>

          <div style={{ borderTop: `1px solid ${C.borderLight}`, margin: "20px 0" }} />

          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: C.textMuted, fontFamily: "var(--font-inter)", marginBottom: 8 }}>
            Message
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: C.textDark, whiteSpace: "pre-wrap", fontFamily: "var(--font-inter)" }}>
            {contact.message}
          </div>
        </div>

        <div style={{ flexShrink: 0, padding: 20, borderTop: `1px solid ${C.borderLight}`, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: C.textMuted, fontFamily: "var(--font-inter)", marginBottom: 6 }}>
              Status
            </div>
            <select
              value={contact.status}
              disabled={statusSaving}
              onChange={(e) => onStatusChange(e.target.value as ContactStatus)}
              style={{ ...dropdownStyle, width: "100%" }}
            >
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent(`Re: ${contact.subject}`)}`}
            onClick={handleReply}
            style={{
              background: C.forest600,
              color: C.cream100,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              fontWeight: 700,
              padding: "10px 20px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            <Send size={15} />
            Reply by Email
          </a>
        </div>
      </div>
    </>
  )
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [statusSaving, setStatusSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [actionError, setActionError] = useState("")

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    setFetchError("")
    try {
      const res = await fetch("/api/admin/bytesphere/contacts")
      const data = await res.json()
      if (!res.ok) {
        setFetchError(data.error || "Failed to load contacts.")
        return
      }
      setContacts(data.contacts as Contact[])
    } catch {
      setFetchError("Network error. Could not load contacts.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const stats = useMemo(() => ([
    { label: `${contacts.length} Total`, dot: C.slate400 },
    { label: `${contacts.filter((c) => c.status === "new").length} New`, dot: C.gold500 },
    { label: `${contacts.filter((c) => c.status === "read").length} Read`, dot: C.slate400 },
    { label: `${contacts.filter((c) => c.status === "replied").length} Replied`, dot: C.forest600 },
    { label: `${contacts.filter((c) => c.status === "closed").length} Closed`, dot: C.slate300 },
  ]), [contacts])

  const filtered = contacts.filter((c) => {
    if (statusFilter !== "All" && c.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const haystack = [c.name, c.email, c.company ?? "", c.subject].join(" ").toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  const selected = contacts.find((c) => c.id === selectedId) ?? null

  const patchStatus = async (id: string, status: ContactStatus) => {
    const previous = contacts.find((c) => c.id === id)
    if (!previous) return
    setActionError("")
    setStatusSaving(true)
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))
    try {
      const res = await fetch(`/api/admin/bytesphere/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (!res.ok) {
        setContacts((prev) => prev.map((c) => (c.id === id ? previous : c)))
        setActionError(data.error || "Failed to update status.")
        return
      }
      setContacts((prev) => prev.map((c) => (c.id === id ? (data.contact as Contact) : c)))
    } catch {
      setContacts((prev) => prev.map((c) => (c.id === id ? previous : c)))
      setActionError("Network error. Please try again.")
    } finally {
      setStatusSaving(false)
    }
  }

  const openPanel = (contact: Contact) => {
    setSelectedId(contact.id)
    if (contact.status === "new") {
      patchStatus(contact.id, "read")
    }
  }

  const handleDelete = async (contact: Contact, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!window.confirm(`Permanently delete this enquiry from ${contact.name}? This cannot be undone.`)) return
    setActionError("")
    setDeletingId(contact.id)
    try {
      const res = await fetch(`/api/admin/bytesphere/contacts/${contact.id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        setActionError(data.error || "Failed to delete contact.")
        return
      }
      if (selectedId === contact.id) setSelectedId(null)
      fetchContacts()
    } catch {
      setActionError("Network error. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-row:hover { background: ${C.cream200} !important; }
        .contact-action:hover { background: ${C.cream100}; }
        .contact-action:hover .contact-delete-icon { opacity: 1; }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: 0 }}>
          Contacts
        </h1>
        <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 4 }}>
          Enquiries submitted through the ByteSphere contact form.
        </div>
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
            placeholder="Search by name, email, company or subject..."
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
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 12, fontFamily: "var(--font-inter)" }}>
        {!loading && !fetchError && `${filtered.length} enquir${filtered.length === 1 ? "y" : "ies"}`}
      </div>

      <div style={{ background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: 10, overflow: "hidden" }}>
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "64px 0" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", border: `3px solid ${C.slate200}`, borderTop: `3px solid ${C.forest600}`, animation: "spin 0.8s linear infinite" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>Loading contacts...</p>
          </div>
        ) : fetchError ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "64px 0" }}>
            <AlertCircle size={28} color={C.red400} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.red400 }}>{fetchError}</p>
            <button
              type="button"
              onClick={fetchContacts}
              style={{ background: C.forest600, color: C.cream100, border: "none", borderRadius: 6, padding: "8px 20px", cursor: "pointer", fontFamily: "var(--font-inter)", fontSize: 13 }}
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0" }}>
            <Inbox size={40} color={C.slate300} style={{ margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 16, color: C.slate500 }}>
              No enquiries match your filters.
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse" }}>
            <colgroup>
              <col style={{ width: 180 }} />
              <col style={{ width: 160 }} />
              <col />
              <col style={{ width: 120 }} />
              <col style={{ width: 130 }} />
              <col style={{ width: 100 }} />
            </colgroup>
            <thead>
              <tr style={{ background: C.cream200 }}>
                {["Name", "Company", "Subject", "Status", "Received", "Actions"].map((col) => (
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
              {filtered.map((contact) => (
                <tr
                  key={contact.id}
                  className="contact-row"
                  onClick={() => openPanel(contact)}
                  style={{
                    height: 56,
                    borderBottom: `1px solid ${C.borderLight}`,
                    background: C.white,
                    cursor: "pointer",
                    boxShadow: contact.status === "new" ? `inset 3px 0 0 0 ${C.gold500}` : undefined,
                  }}
                >
                  <td style={{ padding: "0 20px" }}>
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, color: C.textDark, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {contact.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.textMuted, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {contact.email}
                    </div>
                  </td>
                  <td style={{ padding: "0 20px", fontFamily: "var(--font-inter)", fontSize: 13, color: C.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {contact.company || "—"}
                  </td>
                  <td
                    title={contact.subject}
                    style={{ padding: "0 20px", fontFamily: "var(--font-inter)", fontSize: 13, color: C.textDark, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {contact.subject}
                  </td>
                  <td style={{ padding: "0 20px" }}>
                    <StatusPill status={contact.status} />
                  </td>
                  <td style={{ padding: "0 20px", fontFamily: "var(--font-inter)", fontSize: 13, color: C.textMuted }}>
                    {formatDate(contact.submitted_at)}
                  </td>
                  <td style={{ padding: "0 20px" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 4 }} onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="contact-action"
                        title="View"
                        onClick={() => openPanel(contact)}
                        style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, border: "none", background: "none", cursor: "pointer" }}
                      >
                        <Eye size={15} color={C.forest600} />
                      </button>
                      <button
                        type="button"
                        className="contact-action"
                        title="Delete permanently"
                        disabled={deletingId === contact.id}
                        onClick={(e) => handleDelete(contact, e)}
                        style={{
                          width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6,
                          border: "none", background: "none", cursor: deletingId === contact.id ? "not-allowed" : "pointer",
                        }}
                      >
                        {deletingId === contact.id ? (
                          <Loader2 size={15} color={C.textMuted} style={{ animation: "spin 0.8s linear infinite" }} />
                        ) : (
                          <Trash2 size={15} color={C.red400} className="contact-delete-icon" style={{ opacity: 0.6, transition: "opacity .15s" }} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <ContactPanel
          contact={selected}
          onClose={() => setSelectedId(null)}
          onStatusChange={(status) => patchStatus(selected.id, status)}
          statusSaving={statusSaving}
        />
      )}
    </div>
  )
}
