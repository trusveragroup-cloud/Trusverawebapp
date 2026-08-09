"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlogForm } from "@/components/admin/bytesphere/BlogForm"
import { useAdmin } from "@/lib/admin-context"
import AccessDenied from "@/components/admin/AccessDenied"
import { C } from "@/lib/colors"
import type { BsBlogWithRelations } from "@/lib/bytesphere/types"

export default function EditBlogPage() {
  const { can, loading: adminLoading } = useAdmin()
  const params = useParams()
  const id = params.id as string

  const [blog, setBlog] = useState<BsBlogWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchBlog = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/admin/bytesphere/blogs/${id}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to load blog post.")
        return
      }
      setBlog(data.blog as BsBlogWithRelations)
    } catch {
      setError("Network error. Could not load blog post.")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchBlog()
  }, [fetchBlog])

  if (adminLoading) {
    return (
      <div style={{ padding: 32 }}>
        <div style={{ color: C.textMuted, fontFamily: "var(--font-inter)", fontSize: 14 }}>
          Loading...
        </div>
      </div>
    )
  }
  if (!can("edit_bs_blogs")) return <AccessDenied />

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading blog post...</p>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <AlertCircle className="size-8 text-destructive" />
        <p className="text-sm text-destructive">{error || "Blog post not found."}</p>
        <Button variant="outline" onClick={fetchBlog}>
          Retry
        </Button>
      </div>
    )
  }

  return <BlogForm mode="edit" initialData={blog} />
}
