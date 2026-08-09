"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AlertCircle, Loader2, Pencil, Plus, Trash2, UserSquare2 } from "lucide-react"

import { C } from "@/lib/colors"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { useAdmin } from "@/lib/admin-context"
import AccessDenied from "@/components/admin/AccessDenied"
import type { BsAuthor } from "@/lib/bytesphere/types"

type AuthorRow = BsAuthor & { articleCount: number; blogCount: number }

type AuthorFormState = {
  name: string
  role: string
  bio: string
  avatarUrl: string | null
  initials: string
  active: boolean
}

const EMPTY_FORM: AuthorFormState = {
  name: "",
  role: "",
  bio: "",
  avatarUrl: null,
  initials: "",
  active: true,
}

function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ""
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: C.textDark,
  marginBottom: 6,
  fontFamily: "var(--font-inter)",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 14,
  border: `1px solid ${C.borderLight}`,
  borderRadius: 8,
  background: C.white,
  color: C.textDark,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-inter)",
  transition: "border-color .15s, box-shadow .15s",
}

function handleFieldFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#4F772D"
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79,119,45,0.12)"
}
function handleFieldBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = C.borderLight
  e.currentTarget.style.boxShadow = "none"
}

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id?: string }) {
  return (
    <div
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        background: checked ? C.forest600 : C.slate200,
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          background: "white",
          borderRadius: "50%",
          position: "absolute",
          top: 3,
          left: checked ? 21 : 3,
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  )
}

function Modal({
  open, onClose, title, children,
}: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(19,42,19,0.45)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: C.white,
          borderRadius: 12,
          width: "100%",
          maxWidth: 480,
          maxHeight: "85vh",
          overflowY: "auto",
          padding: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 20, color: C.forest800, marginBottom: 16 }}>
          {title}
        </div>
        {children}
      </div>
    </div>
  )
}

function AuthorAvatar({ author, size = 52 }: { author: AuthorRow; size?: number }) {
  const [failed, setFailed] = useState(false)
  const initials = author.initials || deriveInitials(author.name)

  if (author.avatar_url && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={author.avatar_url}
        alt={author.name}
        onError={() => setFailed(true)}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
      />
    )
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: C.gold500,
        color: C.forest800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        fontWeight: 700,
        flexShrink: 0,
        fontFamily: "var(--font-inter)",
      }}
    >
      {initials}
    </div>
  )
}

export default function AuthorsPage() {
  const { can, loading: adminLoading } = useAdmin()
  const [authors, setAuthors] = useState<AuthorRow[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<AuthorRow | null>(null)
  const [form, setForm] = useState<AuthorFormState>(EMPTY_FORM)
  const [initialsTouched, setInitialsTouched] = useState(false)
  const [formError, setFormError] = useState("")
  const [saving, setSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState<AuthorRow | null>(null)
  const [deleteError, setDeleteError] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [deactivating, setDeactivating] = useState(false)

  const fetchAuthors = useCallback(async () => {
    setLoading(true)
    setFetchError("")
    try {
      const res = await fetch("/api/admin/bytesphere/authors")
      const data = await res.json()
      if (!res.ok) {
        setFetchError(data.error || "Failed to load authors.")
        return
      }
      setAuthors(data.authors as AuthorRow[])
    } catch {
      setFetchError("Network error. Could not load authors.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAuthors()
  }, [fetchAuthors])

  const stats = useMemo(() => ([
    { label: `${authors.length} Authors`, dot: C.slate400 },
    { label: `${authors.filter((a) => a.active).length} Active`, dot: C.forest600 },
    { label: `${authors.filter((a) => !a.active).length} Inactive`, dot: C.slate300 },
  ]), [authors])

  const openCreateDialog = () => {
    setEditingAuthor(null)
    setForm(EMPTY_FORM)
    setInitialsTouched(false)
    setFormError("")
    setDialogOpen(true)
  }

  const openEditDialog = (author: AuthorRow) => {
    setEditingAuthor(author)
    setForm({
      name: author.name,
      role: author.role ?? "",
      bio: author.bio ?? "",
      avatarUrl: author.avatar_url,
      initials: author.initials ?? "",
      active: author.active,
    })
    setInitialsTouched(true)
    setFormError("")
    setDialogOpen(true)
  }

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      initials: initialsTouched ? prev.initials : deriveInitials(value),
    }))
  }

  const handleSave = async () => {
    if (!form.name.trim()) {
      setFormError("Name is required.")
      return
    }
    setSaving(true)
    setFormError("")
    try {
      const res = await fetch(
        editingAuthor ? `/api/admin/bytesphere/authors/${editingAuthor.id}` : "/api/admin/bytesphere/authors",
        {
          method: editingAuthor ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            role: form.role,
            bio: form.bio,
            avatarUrl: form.avatarUrl,
            initials: form.initials,
            active: form.active,
          }),
        }
      )
      const data = await res.json()
      if (!res.ok) {
        setFormError(data.error || "Failed to save author.")
        return
      }
      setDialogOpen(false)
      fetchAuthors()
    } catch {
      setFormError("Network error. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    setDeleteError("")
    try {
      const res = await fetch(`/api/admin/bytesphere/authors/${deleteTarget.id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        setDeleteError(data.error || "Failed to delete author.")
        return
      }
      setDeleteTarget(null)
      fetchAuthors()
    } catch {
      setDeleteError("Network error. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  const deactivateInstead = async () => {
    if (!deleteTarget) return
    setDeactivating(true)
    try {
      const res = await fetch(`/api/admin/bytesphere/authors/${deleteTarget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: deleteTarget.name,
          role: deleteTarget.role,
          bio: deleteTarget.bio,
          avatarUrl: deleteTarget.avatar_url,
          initials: deleteTarget.initials,
          active: false,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setDeleteError(data.error || "Failed to deactivate author.")
        return
      }
      setDeleteTarget(null)
      fetchAuthors()
    } catch {
      setDeleteError("Network error. Please try again.")
    } finally {
      setDeactivating(false)
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
  if (!can("view_bs_authors")) return <AccessDenied />

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .author-card { transition: border-color .15s, box-shadow .15s; }
        .author-card:hover { border-color: ${C.slate300}; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .author-icon-btn { transition: background .15s; }
        .author-icon-btn:hover { background: ${C.cream200}; }
        .author-icon-btn:hover .author-delete-icon { opacity: 1; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: 0 }}>
            Authors
          </h1>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 4 }}>
            Manage ByteSphere&apos;s writer profiles.
          </div>
        </div>

        {can("manage_bs_authors") && (
          <button
            type="button"
            onClick={openCreateDialog}
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
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Plus size={16} />
            New Author
          </button>
        )}
      </div>

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

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "64px 0" }}>
          <div
            style={{
              width: 32, height: 32, borderRadius: "50%",
              border: `3px solid ${C.slate200}`, borderTop: `3px solid ${C.forest600}`,
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>Loading authors...</p>
        </div>
      )}

      {!loading && fetchError && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "64px 0" }}>
          <AlertCircle size={28} color={C.red400} />
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.red400 }}>{fetchError}</p>
          <button
            type="button"
            onClick={fetchAuthors}
            style={{
              background: C.forest600, color: C.cream100, border: "none", borderRadius: 6,
              padding: "8px 20px", cursor: "pointer", fontFamily: "var(--font-inter)", fontSize: 13,
            }}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !fetchError && authors.length === 0 && (
        <div style={{ textAlign: "center", padding: "64px 0" }}>
          <UserSquare2 size={40} color={C.slate300} style={{ margin: "0 auto 16px" }} />
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 16, color: C.slate500, marginBottom: 16 }}>
            No authors yet.
          </p>
          {can("manage_bs_authors") && (
            <button
              type="button"
              onClick={openCreateDialog}
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
                border: "none",
                cursor: "pointer",
              }}
            >
              <Plus size={16} />
              New Author
            </button>
          )}
        </div>
      )}

      {!loading && !fetchError && authors.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {authors.map((author) => (
            <div
              key={author.id}
              className="author-card"
              style={{
                display: "flex",
                flexDirection: "column",
                background: C.white,
                border: `1px solid ${C.borderLight}`,
                borderRadius: 10,
                padding: 20,
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <AuthorAvatar author={author} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: C.textDark,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {author.name}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: C.textMuted,
                      marginTop: 2,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {author.role || "—"}
                  </div>
                </div>

                <span
                  style={{
                    flexShrink: 0,
                    fontSize: 11,
                    fontWeight: 500,
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontFamily: "var(--font-inter)",
                    background: author.active ? "rgba(74,186,138,0.12)" : C.borderLight,
                    color: author.active ? C.forest600 : C.textMuted,
                  }}
                >
                  {author.active ? "Active" : "Inactive"}
                </span>
              </div>

              {author.bio && (
                <div
                  style={{
                    fontSize: 13,
                    color: C.textMuted,
                    lineHeight: 1.6,
                    marginTop: 12,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {author.bio}
                </div>
              )}

              <div style={{ marginTop: 14, fontSize: 12, color: C.textMuted, fontFamily: "var(--font-inter)" }}>
                <span style={{ fontWeight: 600, color: C.textDark }}>{author.articleCount}</span> article{author.articleCount === 1 ? "" : "s"}
                {" · "}
                <span style={{ fontWeight: 600, color: C.textDark }}>{author.blogCount}</span> blog{author.blogCount === 1 ? "" : "s"}
              </div>

              {can("manage_bs_authors") && (
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 14,
                    borderTop: `1px solid ${C.borderLight}`,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 4,
                  }}
                >
                  <button
                    type="button"
                    className="author-icon-btn"
                    title="Edit"
                    onClick={() => openEditDialog(author)}
                    style={{
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 6, border: "none", background: "none", cursor: "pointer",
                    }}
                  >
                    <Pencil size={15} color={C.forest600} />
                  </button>
                  <button
                    type="button"
                    className="author-icon-btn"
                    title="Delete"
                    onClick={() => { setDeleteTarget(author); setDeleteError("") }}
                    style={{
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 6, border: "none", background: "none", cursor: "pointer",
                    }}
                  >
                    <Trash2 size={15} color={C.red400} className="author-delete-icon" style={{ opacity: 0.55, transition: "opacity .15s" }} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingAuthor ? "Edit Author" : "New Author"}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle} htmlFor="author-name">Name</label>
            <input
              id="author-name"
              style={inputStyle}
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="author-role">Role</label>
            <input
              id="author-role"
              style={inputStyle}
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
              placeholder="e.g. Senior Editor"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="author-bio">Bio</label>
            <textarea
              id="author-bio"
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
              value={form.bio}
              onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="author-initials">Initials</label>
            <input
              id="author-initials"
              style={{ ...inputStyle, width: 96 }}
              value={form.initials}
              maxLength={3}
              onChange={(e) => {
                setInitialsTouched(true)
                setForm((prev) => ({ ...prev, initials: e.target.value.toUpperCase() }))
              }}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
            />
          </div>
          <div>
            <label style={labelStyle}>Avatar</label>
            <ImageUpload
              value={form.avatarUrl}
              onChange={(url) => setForm((prev) => ({ ...prev, avatarUrl: url }))}
              folder="avatars"
              aspectClassName="aspect-square max-w-32"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ ...labelStyle, marginBottom: 0 }} htmlFor="author-active">Active</label>
            <Toggle id="author-active" checked={form.active} onChange={(checked) => setForm((prev) => ({ ...prev, active: checked }))} />
          </div>
          {formError && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.red400, fontFamily: "var(--font-inter)" }}>
              <AlertCircle size={15} />
              {formError}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
          <button
            type="button"
            onClick={() => setDialogOpen(false)}
            disabled={saving}
            style={{
              background: "none", border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "10px 20px",
              fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 600, color: C.textMuted,
              cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1,
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            style={{
              background: C.forest600, color: C.cream100, border: "none", borderRadius: 8, padding: "10px 20px",
              fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 700,
              cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1,
              display: "inline-flex", alignItems: "center", gap: 8,
            }}
          >
            {saving && <Loader2 size={14} style={{ animation: "spin 0.8s linear infinite" }} />}
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete this author?">
        <p style={{ fontSize: 14, color: C.textDark, fontFamily: "var(--font-inter)", lineHeight: 1.6 }}>
          <strong>{deleteTarget?.name}</strong> will be permanently deleted. This cannot be undone.
        </p>
        {deleteError && (
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.red400, fontFamily: "var(--font-inter)" }}>
              <AlertCircle size={15} />
              {deleteError}
            </div>
            <button
              type="button"
              onClick={deactivateInstead}
              disabled={deactivating}
              style={{
                alignSelf: "flex-start",
                background: "none", border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "8px 16px",
                fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 600, color: C.textDark,
                cursor: deactivating ? "not-allowed" : "pointer", opacity: deactivating ? 0.6 : 1,
              }}
            >
              {deactivating ? "Deactivating..." : "Deactivate instead"}
            </button>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
          <button
            type="button"
            onClick={() => setDeleteTarget(null)}
            disabled={deleting}
            style={{
              background: "none", border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "10px 20px",
              fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 600, color: C.textMuted,
              cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? 0.6 : 1,
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            disabled={deleting}
            style={{
              background: C.red400, color: C.white, border: "none", borderRadius: 8, padding: "10px 20px",
              fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 700,
              cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? 0.6 : 1,
            }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  )
}
