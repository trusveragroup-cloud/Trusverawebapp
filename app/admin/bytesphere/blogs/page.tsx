"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { AlertCircle, Copy, Edit2, FileText, Loader2, Plus, Search, Trash2, X } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import type { BsAuthor, BsBlogWithRelations, BsCategory, BsContentStatus } from "@/lib/bytesphere/types"

const STATUS_VARIANT: Record<BsContentStatus, "status-published" | "status-draft" | "status-archived"> = {
  Published: "status-published",
  Draft: "status-draft",
  Archived: "status-archived",
}

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState<BsBlogWithRelations[]>([])
  const [categories, setCategories] = useState<BsCategory[]>([])
  const [authors, setAuthors] = useState<BsAuthor[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [authorFilter, setAuthorFilter] = useState("All")

  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<BsBlogWithRelations | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")

  const filtersActive =
    !!search || statusFilter !== "All" || categoryFilter !== "All" || authorFilter !== "All"

  const clearFilters = () => {
    setSearch("")
    setStatusFilter("All")
    setCategoryFilter("All")
    setAuthorFilter("All")
  }

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    setFetchError("")
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "All") params.set("status", statusFilter)
      if (categoryFilter !== "All") params.set("category", categoryFilter)
      if (authorFilter !== "All") params.set("author", authorFilter)
      if (search) params.set("search", search)

      const res = await fetch(`/api/admin/bytesphere/blogs?${params.toString()}`)
      const data = await res.json()
      if (!res.ok) {
        setFetchError(data.error || "Failed to load blog posts.")
        return
      }
      setBlogs(data.blogs as BsBlogWithRelations[])
    } catch {
      setFetchError("Network error. Could not load blog posts.")
    } finally {
      setLoading(false)
    }
  }, [statusFilter, categoryFilter, authorFilter, search])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/bytesphere/categories").then((r) => r.json()),
      fetch("/api/admin/bytesphere/authors").then((r) => r.json()),
    ]).then(([categoriesData, authorsData]) => {
      setCategories(categoriesData.categories || [])
      setAuthors(authorsData.authors || [])
    })
  }, [])

  const resultLabel = useMemo(
    () => `${blogs.length} blog post${blogs.length === 1 ? "" : "s"}`,
    [blogs.length]
  )

  const handleDuplicate = async (blog: BsBlogWithRelations) => {
    setDuplicatingId(blog.id)
    try {
      const res = await fetch("/api/admin/bytesphere/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${blog.title} (Copy)`,
          slug: `${blog.slug}-copy-${Date.now().toString(36)}`,
          excerpt: blog.excerpt,
          content: blog.content,
          coverImageUrl: blog.cover_image_url,
          authorId: blog.author_id,
          categoryId: blog.category_id,
          topicId: blog.topic_id,
          readTime: blog.read_time,
          metaDescription: blog.meta_description,
          status: "Draft",
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || "Failed to duplicate blog post.")
        return
      }
      fetchBlogs()
    } catch {
      alert("Network error. Please try again.")
    } finally {
      setDuplicatingId(null)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    setDeleteError("")
    try {
      const res = await fetch(`/api/admin/bytesphere/blogs/${deleteTarget.id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        setDeleteError(data.error || "Failed to delete blog post.")
        return
      }
      setDeleteTarget(null)
      fetchBlogs()
    } catch {
      setDeleteError("Network error. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text">Blogs</h1>
          <p className="mt-1 text-sm text-text-muted">Manage ByteSphere&apos;s blog posts.</p>
        </div>
        <Link href="/admin/bytesphere/blogs/new" className={buttonVariants({})}>
          <Plus className="size-4" />
          New Blog Post
        </Link>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-56 flex-1">
            <Label htmlFor="blogs-search" className="mb-1.5 text-xs text-text-muted">
              Search
            </Label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-text-subtle" />
              <Input
                id="blogs-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title"
                className={cn("pl-8", search && "pr-8")}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-0.5 text-text-subtle outline-none hover:text-text focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="w-44">
            <Label htmlFor="blogs-status" className="mb-1.5 text-xs text-text-muted">
              Status
            </Label>
            <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
              <SelectTrigger id="blogs-status"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All statuses</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <Label htmlFor="blogs-category" className="mb-1.5 text-xs text-text-muted">
              Category
            </Label>
            <Select value={categoryFilter} onValueChange={(v) => v && setCategoryFilter(v)}>
              <SelectTrigger id="blogs-category"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <Label htmlFor="blogs-author" className="mb-1.5 text-xs text-text-muted">
              Author
            </Label>
            <Select value={authorFilter} onValueChange={(v) => v && setAuthorFilter(v)}>
              <SelectTrigger id="blogs-author"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All authors</SelectItem>
                {authors.map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-text-muted">
          {!loading && !fetchError && <span>{resultLabel}</span>}
          {filtersActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="font-medium text-brand-accent outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <Loader2 className="size-8 animate-spin text-text-subtle" />
            <p className="text-sm text-text-muted">Loading blog posts...</p>
          </div>
        )}

        {!loading && fetchError && (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <AlertCircle className="size-8 text-danger" />
            <p className="text-sm text-danger">{fetchError}</p>
            <Button variant="outline" onClick={fetchBlogs}>Retry</Button>
          </div>
        )}

        {!loading && !fetchError && blogs.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <FileText className="size-10 text-text-subtle" />
            <p className="text-sm text-text-muted">No blog posts match your filters.</p>
            <Link href="/admin/bytesphere/blogs/new" className={buttonVariants({ size: "sm" })}>
              <Plus className="size-4" />
              Create your first blog post
            </Link>
          </div>
        )}

        {!loading && !fetchError && blogs.length > 0 && (
          <div className="max-h-[calc(100vh-320px)] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-text-muted">Title</TableHead>
                  <TableHead className="w-36 text-text-muted">Category</TableHead>
                  <TableHead className="w-40 text-text-muted">Author</TableHead>
                  <TableHead className="w-28 text-text-muted">Status</TableHead>
                  <TableHead className="w-28 text-text-muted">Published</TableHead>
                  <TableHead className="w-28 text-right text-text-muted">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell title={blog.title} className="max-w-0 truncate text-sm font-medium text-text">
                      {blog.title}
                    </TableCell>
                    <TableCell>
                      {blog.category?.name ? (
                        <span className="inline-flex items-center rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-text-muted">
                          {blog.category.name}
                        </span>
                      ) : (
                        <span className="text-text-subtle">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-text-muted">{blog.author?.name ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[blog.status]}>{blog.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-text-muted tabular-nums">
                      {blog.published_at
                        ? new Date(blog.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/bytesphere/blogs/${blog.id}/edit`}
                          title="Edit blog post"
                          className={buttonVariants({ variant: "ghost", size: "icon-lg" })}
                        >
                          <Edit2 className="size-4" />
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon-lg"
                          title="Duplicate blog post"
                          disabled={duplicatingId === blog.id}
                          onClick={() => handleDuplicate(blog)}
                        >
                          {duplicatingId === blog.id ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-lg"
                          title="Delete blog post"
                          className="text-text-muted hover:bg-danger/10 hover:text-danger"
                          onClick={() => { setDeleteTarget(blog); setDeleteError("") }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this blog post?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget && (
                <>
                  <strong>{deleteTarget.title}</strong> will be permanently deleted. This cannot be undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <p className="flex items-center gap-1.5 text-sm text-danger">
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
