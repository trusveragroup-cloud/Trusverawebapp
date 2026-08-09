"use client"

import { useCallback, useEffect, useState } from "react"
import * as LucideIcons from "lucide-react"
import {
  AlertCircle, AlertTriangle, GripVertical, HelpCircle, Loader2, Pencil, Plus, Tags, Trash2,
} from "lucide-react"

import { C } from "@/lib/colors"
import { slugify } from "@/lib/bytesphere/content-helpers"
import { useAdmin } from "@/lib/admin-context"
import AccessDenied from "@/components/admin/AccessDenied"

type TaxonomyKind = "categories" | "topics"

type TaxonomyRow = {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  sort_order: number
  itemCount: number
}

type FormState = {
  name: string
  slug: string
  description: string
  icon: string
}

const EMPTY_FORM: FormState = { name: "", slug: "", description: "", icon: "" }

function DynamicIcon({ name, size = 18, color }: { name: string | null; size?: number; color?: string }) {
  const IconComponent = name
    ? ((LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name] ?? null)
    : null
  const Icon = IconComponent ?? HelpCircle
  return <Icon size={size} color={color} />
}

function isValidIconName(name: string): boolean {
  if (!name) return true
  return !!(LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name]
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

function Modal({
  open, onClose, title, children,
}: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(19,42,19,0.45)", zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{ background: C.white, borderRadius: 12, width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto", padding: 24 }}
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

function useTaxonomyKind(kind: TaxonomyKind) {
  const [items, setItems] = useState<TaxonomyRow[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [reordering, setReordering] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TaxonomyRow | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [slugTouched, setSlugTouched] = useState(false)
  const [formError, setFormError] = useState("")
  const [saving, setSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState<TaxonomyRow | null>(null)
  const [deleteError, setDeleteError] = useState("")
  const [deleting, setDeleting] = useState(false)

  const label = kind === "categories" ? "Category" : "Topic"
  const urlPrefix = kind === "categories" ? "/category/" : "/topic/"

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setFetchError("")
    try {
      const res = await fetch(`/api/admin/bytesphere/${kind}`)
      const data = await res.json()
      if (!res.ok) {
        setFetchError(data.error || `Failed to load ${kind}.`)
        return
      }
      setItems((data[kind] as TaxonomyRow[]) || [])
    } catch {
      setFetchError(`Network error. Could not load ${kind}.`)
    } finally {
      setLoading(false)
    }
  }, [kind])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const openCreateDialog = () => {
    setEditingItem(null)
    setForm(EMPTY_FORM)
    setSlugTouched(false)
    setFormError("")
    setDialogOpen(true)
  }

  const openEditDialog = (item: TaxonomyRow) => {
    setEditingItem(item)
    setForm({ name: item.name, slug: item.slug, description: item.description ?? "", icon: item.icon ?? "" })
    setSlugTouched(true)
    setFormError("")
    setDialogOpen(true)
  }

  const handleNameChange = (value: string) => {
    setForm((prev) => ({ ...prev, name: value, slug: slugTouched ? prev.slug : slugify(value) }))
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      setFormError("Name and slug are required.")
      return
    }
    if (!isValidIconName(form.icon)) {
      setFormError(`"${form.icon}" is not a valid Lucide icon name.`)
      return
    }
    setSaving(true)
    setFormError("")
    try {
      const res = await fetch(
        editingItem ? `/api/admin/bytesphere/${kind}/${editingItem.id}` : `/api/admin/bytesphere/${kind}`,
        {
          method: editingItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            slug: form.slug,
            description: form.description,
            icon: form.icon,
          }),
        }
      )
      const data = await res.json()
      if (!res.ok) {
        setFormError(data.error || `Failed to save ${label.toLowerCase()}.`)
        return
      }
      setDialogOpen(false)
      fetchItems()
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
      const res = await fetch(`/api/admin/bytesphere/${kind}/${deleteTarget.id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        setDeleteError(data.error || `Failed to delete ${label.toLowerCase()}.`)
        return
      }
      setDeleteTarget(null)
      fetchItems()
    } catch {
      setDeleteError("Network error. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  const handleDrop = async (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null)
      return
    }
    const reordered = [...items]
    const [moved] = reordered.splice(dragIndex, 1)
    reordered.splice(targetIndex, 0, moved)
    setItems(reordered)
    setDragIndex(null)

    setReordering(true)
    try {
      await Promise.all(
        reordered.map((item, index) =>
          item.sort_order === index + 1
            ? Promise.resolve()
            : fetch(`/api/admin/bytesphere/${kind}/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: item.name,
                  slug: item.slug,
                  description: item.description,
                  icon: item.icon,
                  sortOrder: index + 1,
                }),
              })
        )
      )
      fetchItems()
    } catch {
      setFetchError("Failed to save the new order. Refreshing...")
      fetchItems()
    } finally {
      setReordering(false)
    }
  }

  return {
    kind, label, urlPrefix, items, loading, fetchError, dragIndex, setDragIndex, reordering,
    dialogOpen, setDialogOpen, editingItem, form, setForm, slugTouched, setSlugTouched,
    formError, saving, deleteTarget, setDeleteTarget, deleteError, setDeleteError, deleting,
    openCreateDialog, openEditDialog, handleNameChange, handleSave, confirmDelete, handleDrop, fetchItems,
  }
}

type TaxonomyState = ReturnType<typeof useTaxonomyKind>

function TabButton({ active, count, label, onClick }: { active: boolean; count: number; label: string; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "8px 16px",
        borderRadius: 8,
        fontSize: 14,
        cursor: "pointer",
        border: "none",
        fontFamily: "var(--font-inter)",
        fontWeight: active ? 600 : 400,
        background: active ? C.forest600 : hover ? "rgba(229,231,235,0.5)" : "transparent",
        color: active ? C.cream50 : C.textMuted,
        transition: "background .15s",
      }}
    >
      {label} ({count})
    </button>
  )
}

function TaxonomyList({ state }: { state: TaxonomyState }) {
  const { can } = useAdmin()
  const { kind, label, urlPrefix, items, loading, fetchError, reordering, setDragIndex, handleDrop, fetchItems, openEditDialog, setDeleteTarget, setDeleteError } = state

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "64px 0" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: `3px solid ${C.slate200}`, borderTop: `3px solid ${C.forest600}`, animation: "spin 0.8s linear infinite" }} />
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>Loading {kind}...</p>
      </div>
    )
  }

  if (fetchError) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "64px 0" }}>
        <AlertCircle size={28} color={C.red400} />
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.red400 }}>{fetchError}</p>
        <button
          type="button"
          onClick={fetchItems}
          style={{ background: C.forest600, color: C.cream100, border: "none", borderRadius: 6, padding: "8px 20px", cursor: "pointer", fontFamily: "var(--font-inter)", fontSize: 13 }}
        >
          Retry
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "64px 0" }}>
        <Tags size={40} color={C.slate300} style={{ margin: "0 auto 16px" }} />
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 16, color: C.slate500, marginBottom: 16 }}>
          No {kind} yet.
        </p>
        {can("manage_bs_taxonomy") && (
          <button
            type="button"
            onClick={state.openCreateDialog}
            style={{
              background: C.forest600, color: C.cream100, display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 8,
              border: "none", cursor: "pointer",
            }}
          >
            <Plus size={16} />
            New {label}
          </button>
        )}
      </div>
    )
  }

  return (
    <div style={{ background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: 10, overflow: "hidden" }}>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable={can("manage_bs_taxonomy")}
          onDragStart={() => setDragIndex(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
          className="taxonomy-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 16px",
            borderBottom: index < items.length - 1 ? `1px solid ${C.borderLight}` : "none",
            transition: "background .15s",
          }}
        >
          <GripVertical size={16} color={C.textMuted} style={{ opacity: 0.5, cursor: "grab", flexShrink: 0 }} />

          <div
            style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: "rgba(22,107,74,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <DynamicIcon name={item.icon} size={18} color={C.forest600} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textDark, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "var(--font-inter)" }}>
              {item.name}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "var(--font-inter)" }}>
              {urlPrefix}{item.slug}
            </div>
          </div>

          <div style={{ flexShrink: 0, marginRight: 8, fontSize: 12, color: item.itemCount === 0 ? C.textLight : C.textMuted, fontFamily: "var(--font-inter)" }}>
            {item.itemCount} item{item.itemCount === 1 ? "" : "s"}
          </div>

          {can("manage_bs_taxonomy") && (
            <div style={{ flexShrink: 0, display: "flex", gap: 4 }}>
              <button
                type="button"
                className="taxonomy-icon-btn"
                title="Edit"
                onClick={() => openEditDialog(item)}
                style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, border: "none", background: "none", cursor: "pointer" }}
              >
                <Pencil size={15} color={C.forest600} />
              </button>
              <button
                type="button"
                className="taxonomy-icon-btn"
                title={item.itemCount > 0 ? `In use by ${item.itemCount} item${item.itemCount === 1 ? "" : "s"} — cannot delete` : "Delete"}
                disabled={item.itemCount > 0}
                onClick={() => { setDeleteTarget(item); setDeleteError("") }}
                style={{
                  width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6,
                  border: "none", background: "none",
                  cursor: item.itemCount > 0 ? "not-allowed" : "pointer",
                }}
              >
                <Trash2
                  size={15}
                  color={C.red400}
                  className={item.itemCount > 0 ? undefined : "taxonomy-delete-icon"}
                  style={{ opacity: item.itemCount > 0 ? 0.3 : 0.6, transition: "opacity .15s" }}
                />
              </button>
            </div>
          )}
        </div>
      ))}
      {reordering && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", fontSize: 12, color: C.textMuted, fontFamily: "var(--font-inter)" }}>
          <Loader2 size={13} style={{ animation: "spin 0.8s linear infinite" }} />
          Saving order...
        </div>
      )}
    </div>
  )
}

function TaxonomyDialogs({ state }: { state: TaxonomyState }) {
  const {
    label, urlPrefix, dialogOpen, setDialogOpen, editingItem, form, setForm, formError, saving, handleNameChange, handleSave,
    deleteTarget, setDeleteTarget, deleteError, deleting, confirmDelete,
  } = state

  return (
    <>
      <Modal open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? `Edit ${label}` : `New ${label}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle} htmlFor="taxonomy-name">Name</label>
            <input
              id="taxonomy-name"
              style={inputStyle}
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="taxonomy-slug">Slug</label>
            <input
              id="taxonomy-slug"
              style={inputStyle}
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
            />
            {editingItem && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginTop: 6, fontSize: 12, color: C.gold500, fontFamily: "var(--font-inter)" }}>
                <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                Changing this slug will break the existing public URL, e.g. {urlPrefix}{form.slug || "..."}.
              </div>
            )}
          </div>
          <div>
            <label style={labelStyle} htmlFor="taxonomy-description">Description</label>
            <textarea
              id="taxonomy-description"
              style={{ ...inputStyle, minHeight: 72, resize: "vertical" }}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="taxonomy-icon">Icon (Lucide icon name)</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 8, border: `1px solid ${C.borderLight}`, background: C.cream100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DynamicIcon name={form.icon} size={16} color={C.textDark} />
              </div>
              <input
                id="taxonomy-icon"
                style={inputStyle}
                value={form.icon}
                onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))}
                onFocus={handleFieldFocus}
                onBlur={handleFieldBlur}
                placeholder="e.g. Cpu, Briefcase, Target"
              />
            </div>
            {form.icon && !isValidIconName(form.icon) && (
              <div style={{ marginTop: 6, fontSize: 12, color: C.red400, fontFamily: "var(--font-inter)" }}>
                Not a recognized Lucide icon name.
              </div>
            )}
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
            style={{ background: "none", border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "10px 20px", fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 600, color: C.textMuted, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            style={{ background: C.forest600, color: C.cream100, border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1, display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            {saving && <Loader2 size={14} style={{ animation: "spin 0.8s linear infinite" }} />}
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title={`Delete this ${label.toLowerCase()}?`}>
        <p style={{ fontSize: 14, color: C.textDark, fontFamily: "var(--font-inter)", lineHeight: 1.6 }}>
          <strong>{deleteTarget?.name}</strong> will be permanently deleted. This cannot be undone.
        </p>
        {deleteError && (
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.red400, fontFamily: "var(--font-inter)" }}>
            <AlertCircle size={15} />
            {deleteError}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
          <button
            type="button"
            onClick={() => setDeleteTarget(null)}
            disabled={deleting}
            style={{ background: "none", border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "10px 20px", fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 600, color: C.textMuted, cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? 0.6 : 1 }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            disabled={deleting}
            style={{ background: C.red400, color: C.white, border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 700, cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? 0.6 : 1 }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  )
}

export default function TaxonomyPage() {
  const { can, loading: adminLoading } = useAdmin()
  const [activeTab, setActiveTab] = useState<TaxonomyKind>("categories")
  const categoriesState = useTaxonomyKind("categories")
  const topicsState = useTaxonomyKind("topics")
  const active = activeTab === "categories" ? categoriesState : topicsState

  if (adminLoading) {
    return (
      <div style={{ padding: 32 }}>
        <div style={{ color: C.textMuted, fontFamily: "var(--font-inter)", fontSize: 14 }}>
          Loading...
        </div>
      </div>
    )
  }
  if (!can("view_bs_taxonomy")) return <AccessDenied />

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .taxonomy-row:hover { background: ${C.cream100}; }
        .taxonomy-icon-btn:hover { background: ${C.cream200}; }
        .taxonomy-icon-btn:hover .taxonomy-delete-icon { opacity: 1; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: 0 }}>
            Taxonomy
          </h1>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 4 }}>
            Manage the categories and topics used to organize ByteSphere content.
          </div>
        </div>

        {can("manage_bs_taxonomy") && (
          <button
            type="button"
            onClick={active.openCreateDialog}
            style={{
              background: C.forest600, color: C.cream100, display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 8,
              border: "none", cursor: "pointer", flexShrink: 0,
            }}
          >
            <Plus size={16} />
            New {active.label}
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        <TabButton
          active={activeTab === "categories"}
          count={categoriesState.items.length}
          label="Categories"
          onClick={() => setActiveTab("categories")}
        />
        <TabButton
          active={activeTab === "topics"}
          count={topicsState.items.length}
          label="Topics"
          onClick={() => setActiveTab("topics")}
        />
      </div>

      <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 12, fontFamily: "var(--font-inter)" }}>
        Drag rows to reorder. Order controls display order on the site.
      </p>

      <TaxonomyList state={active} />
      <TaxonomyDialogs state={active} />
    </div>
  )
}
