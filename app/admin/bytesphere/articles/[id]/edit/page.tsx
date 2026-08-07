"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ArticleForm } from "@/components/admin/bytesphere/ArticleForm"
import type { BsArticleWithRelations } from "@/lib/bytesphere/types"

export default function EditArticlePage() {
  const params = useParams()
  const id = params.id as string

  const [article, setArticle] = useState<BsArticleWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchArticle = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/admin/bytesphere/articles/${id}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to load article.")
        return
      }
      setArticle(data.article as BsArticleWithRelations)
    } catch {
      setError("Network error. Could not load article.")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchArticle()
  }, [fetchArticle])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading article...</p>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <AlertCircle className="size-8 text-destructive" />
        <p className="text-sm text-destructive">{error || "Article not found."}</p>
        <Button variant="outline" onClick={fetchArticle}>
          Retry
        </Button>
      </div>
    )
  }

  return <ArticleForm mode="edit" initialData={article} />
}
