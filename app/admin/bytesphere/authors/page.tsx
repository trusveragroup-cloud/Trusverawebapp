"use client"

import { useCallback, useEffect, useState } from "react"
import { AlertCircle, Loader2, Pencil, Plus, Trash2, UserSquare2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ImageUpload } from "@/components/admin/ImageUpload"
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

export default function AuthorsPage() {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Authors</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage ByteSphere&apos;s writer profiles.</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="size-4" />
          New Author
        </Button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading authors...</p>
        </div>
      )}

      {!loading && fetchError && (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <AlertCircle className="size-8 text-destructive" />
          <p className="text-sm text-destructive">{fetchError}</p>
          <Button variant="outline" onClick={fetchAuthors}>Retry</Button>
        </div>
      )}

      {!loading && !fetchError && authors.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card py-16 text-center">
          <UserSquare2 className="size-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No authors yet.</p>
        </div>
      )}

      {!loading && !fetchError && authors.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <div key={author.id} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {author.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={author.avatar_url} alt={author.name} className="size-11 rounded-full object-cover" />
                  ) : (
                    <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {author.initials || deriveInitials(author.name)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-foreground">{author.name}</div>
                    <div className="text-xs text-muted-foreground">{author.role || "—"}</div>
                  </div>
                </div>
                <Badge variant={author.active ? "success" : "outline"}>
                  {author.active ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{author.articleCount} article{author.articleCount === 1 ? "" : "s"}</span>
                <span>{author.blogCount} blog{author.blogCount === 1 ? "" : "s"}</span>
              </div>

              <div className="mt-auto flex items-center justify-end gap-1 border-t border-border pt-3">
                <Button variant="ghost" size="icon-sm" title="Edit" onClick={() => openEditDialog(author)}>
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  title="Delete"
                  onClick={() => { setDeleteTarget(author); setDeleteError("") }}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAuthor ? "Edit Author" : "New Author"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="author-name">Name</Label>
              <Input
                id="author-name"
                className="mt-1.5"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="author-role">Role</Label>
              <Input
                id="author-role"
                className="mt-1.5"
                value={form.role}
                onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                placeholder="e.g. Senior Editor"
              />
            </div>
            <div>
              <Label htmlFor="author-bio">Bio</Label>
              <Textarea
                id="author-bio"
                className="mt-1.5"
                value={form.bio}
                onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="author-initials">Initials</Label>
              <Input
                id="author-initials"
                className="mt-1.5 w-24"
                value={form.initials}
                maxLength={3}
                onChange={(e) => {
                  setInitialsTouched(true)
                  setForm((prev) => ({ ...prev, initials: e.target.value.toUpperCase() }))
                }}
              />
            </div>
            <div>
              <Label>Avatar</Label>
              <div className="mt-1.5">
                <ImageUpload
                  value={form.avatarUrl}
                  onChange={(url) => setForm((prev) => ({ ...prev, avatarUrl: url }))}
                  folder="avatars"
                  aspectClassName="aspect-square max-w-32"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="author-active">Active</Label>
              <Switch
                id="author-active"
                checked={form.active}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, active: checked }))}
              />
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
            <AlertDialogTitle>Delete this author?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget && (
                <>
                  <strong>{deleteTarget.name}</strong> will be permanently deleted. This cannot be undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <div className="space-y-2">
              <p className="flex items-center gap-1.5 text-sm text-destructive">
                <AlertCircle className="size-4" />
                {deleteError}
              </p>
              <Button variant="outline" size="sm" onClick={deactivateInstead} disabled={deactivating}>
                {deactivating ? "Deactivating..." : "Deactivate instead"}
              </Button>
            </div>
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
