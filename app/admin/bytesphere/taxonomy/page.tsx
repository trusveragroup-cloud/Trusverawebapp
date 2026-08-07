"use client"

import { useCallback, useEffect, useState } from "react"
import * as LucideIcons from "lucide-react"
import {
  AlertCircle, AlertTriangle, GripVertical, HelpCircle, Loader2, Pencil, Plus, Tags, Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { slugify } from "@/lib/bytesphere/content-helpers"

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

function DynamicIcon({ name, className }: { name: string | null; className?: string }) {
  const IconComponent = name
    ? ((LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name] ?? null)
    : null
  const Icon = IconComponent ?? HelpCircle
  return <Icon className={className} />
}

function isValidIconName(name: string): boolean {
  if (!name) return true
  return !!(LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name]
}

function TaxonomyTab({ kind }: { kind: TaxonomyKind }) {
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
  const urlExample = kind === "categories" ? "/category/tech" : "/topic/strategy"

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Drag rows to reorder. Order controls display order on the site.</p>
        <Button onClick={openCreateDialog}>
          <Plus className="size-4" />
          New {label}
        </Button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading {kind}...</p>
        </div>
      )}

      {!loading && fetchError && (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <AlertCircle className="size-8 text-destructive" />
          <p className="text-sm text-destructive">{fetchError}</p>
          <Button variant="outline" onClick={fetchItems}>Retry</Button>
        </div>
      )}

      {!loading && !fetchError && items.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card py-16 text-center">
          <Tags className="size-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No {kind} yet.</p>
        </div>
      )}

      {!loading && !fetchError && items.length > 0 && (
        <div className="divide-y divide-border rounded-xl border border-border bg-card">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className="flex items-center gap-3 px-4 py-3"
            >
              <GripVertical className="size-4 shrink-0 cursor-grab text-muted-foreground/50" />
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <DynamicIcon name={item.icon} className="size-4 text-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-foreground">{item.name}</div>
                <div className="truncate text-xs text-muted-foreground">/{item.slug}</div>
              </div>
              <div className="shrink-0 text-xs text-muted-foreground">
                {item.itemCount} item{item.itemCount === 1 ? "" : "s"}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon-sm" title="Edit" onClick={() => openEditDialog(item)}>
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  title={item.itemCount > 0 ? "In use — cannot delete" : "Delete"}
                  disabled={item.itemCount > 0}
                  onClick={() => { setDeleteTarget(item); setDeleteError("") }}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          {reordering && (
            <div className="flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" />
              Saving order...
            </div>
          )}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? `Edit ${label}` : `New ${label}`}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor={`${kind}-name`}>Name</Label>
              <Input
                id={`${kind}-name`}
                className="mt-1.5"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor={`${kind}-slug`}>Slug</Label>
              <Input
                id={`${kind}-slug`}
                className="mt-1.5"
                value={form.slug}
                onChange={(e) => { setSlugTouched(true); setForm((prev) => ({ ...prev, slug: slugify(e.target.value) })) }}
              />
              {editingItem && (
                <p className="mt-1.5 flex items-start gap-1.5 text-xs text-amber-600">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                  Changing the slug breaks existing public URLs, e.g. {urlExample}.
                </p>
              )}
            </div>
            <div>
              <Label htmlFor={`${kind}-description`}>Description</Label>
              <Textarea
                id={`${kind}-description`}
                className="mt-1.5"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor={`${kind}-icon`}>Icon (Lucide icon name)</Label>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
                  <DynamicIcon name={form.icon} className="size-4 text-foreground" />
                </div>
                <Input
                  id={`${kind}-icon`}
                  value={form.icon}
                  onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))}
                  placeholder="e.g. Cpu, Briefcase, Target"
                  aria-invalid={!isValidIconName(form.icon)}
                />
              </div>
              {form.icon && !isValidIconName(form.icon) && (
                <p className="mt-1 text-sm text-destructive">Not a recognized Lucide icon name.</p>
              )}
            </div>
            {formError && (
              <p className="flex items-center gap-1.5 text-sm text-destructive">
                <AlertCircle className="size-4" />
                {formError}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this {label.toLowerCase()}?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget && (
                <>
                  <strong>{deleteTarget.name}</strong> will be permanently deleted. This cannot be undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <p className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="size-4" />
              {deleteError}
            </p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default function TaxonomyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Taxonomy</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the categories and topics used to organize ByteSphere content.
        </p>
      </div>

      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTab value="categories">Categories</TabsTab>
          <TabsTab value="topics">Topics</TabsTab>
        </TabsList>
        <TabsPanel value="categories" className="mt-4">
          <TaxonomyTab kind="categories" />
        </TabsPanel>
        <TabsPanel value="topics" className="mt-4">
          <TaxonomyTab kind="topics" />
        </TabsPanel>
      </Tabs>
    </div>
  )
}
