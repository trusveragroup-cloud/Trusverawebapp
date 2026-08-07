"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AlertCircle, ChevronLeft, Loader2, Save, Send, Sparkles, Undo2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { slugify, estimateReadTime } from "@/lib/bytesphere/content-helpers"
import type { BsArticleWithRelations, BsAuthor, BsCategory, BsContentStatus, BsTopic } from "@/lib/bytesphere/types"

type ArticleFormProps = {
  mode: "create" | "edit"
  initialData?: BsArticleWithRelations
}

type FormErrors = Partial<Record<"title" | "slug" | "excerpt" | "content" | "categoryId" | "authorId", string>>

export function ArticleForm({ mode, initialData }: ArticleFormProps) {
  const router = useRouter()

  const [title, setTitle] = useState(initialData?.title ?? "")
  const [slug, setSlug] = useState(initialData?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(mode === "edit")
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken">("idle")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "")
  const [content, setContent] = useState(initialData?.content ?? "")
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(initialData?.cover_image_url ?? null)
  const [authorId, setAuthorId] = useState(initialData?.author_id ?? "")
  const [categoryId, setCategoryId] = useState(initialData?.category_id ?? "")
  const [topicId, setTopicId] = useState(initialData?.topic_id ?? "")
  const [readTime, setReadTime] = useState(initialData?.read_time ?? "")
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description ?? "")
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [editorsPick, setEditorsPick] = useState(initialData?.editors_pick ?? false)
  const [status, setStatus] = useState<BsContentStatus>(initialData?.status ?? "Draft")

  const [authors, setAuthors] = useState<BsAuthor[]>([])
  const [categories, setCategories] = useState<BsCategory[]>([])
  const [topics, setTopics] = useState<BsTopic[]>([])
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState("")

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState<BsContentStatus | null>(null)
  const [submitError, setSubmitError] = useState("")
  const [dirty, setDirty] = useState(false)

  const initialLoad = useRef(true)

  const fetchOptions = useCallback(async () => {
    setOptionsLoading(true)
    setOptionsError("")
    try {
      const [authorsRes, categoriesRes, topicsRes] = await Promise.all([
        fetch("/api/admin/bytesphere/authors"),
        fetch("/api/admin/bytesphere/categories"),
        fetch("/api/admin/bytesphere/topics"),
      ])
      const [authorsData, categoriesData, topicsData] = await Promise.all([
        authorsRes.json(),
        categoriesRes.json(),
        topicsRes.json(),
      ])
      if (!authorsRes.ok || !categoriesRes.ok || !topicsRes.ok) {
        setOptionsError("Failed to load authors, categories, or topics.")
        return
      }
      setAuthors((authorsData.authors as BsAuthor[]).filter((a) => a.active))
      setCategories(categoriesData.categories as BsCategory[])
      setTopics(topicsData.topics as BsTopic[])
    } catch {
      setOptionsError("Network error while loading form options.")
    } finally {
      setOptionsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOptions()
  }, [fetchOptions])

  // Mark the form dirty once the user changes anything after initial load.
  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false
      return
    }
    setDirty(true)
  }, [
    title, slug, excerpt, content, coverImageUrl, authorId, categoryId,
    topicId, readTime, metaDescription, featured, editorsPick, status,
  ])

  useEffect(() => {
    if (!dirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [dirty])

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  const handleSlugChange = (value: string) => {
    setSlugTouched(true)
    setSlug(slugify(value))
  }

  // Live slug uniqueness check, debounced.
  useEffect(() => {
    if (!slug) {
      setSlugStatus("idle")
      return
    }
    setSlugStatus("checking")
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/bytesphere/articles?slug=${encodeURIComponent(slug)}`)
        const data = await res.json()
        const conflict = (data.articles || []).some(
          (a: BsArticleWithRelations) => a.id !== initialData?.id
        )
        setSlugStatus(conflict ? "taken" : "available")
      } catch {
        setSlugStatus("idle")
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [slug, initialData?.id])

  const handleCalculateReadTime = () => {
    setReadTime(estimateReadTime(content))
  }

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!title.trim()) next.title = "Title is required."
    if (!slug.trim()) next.slug = "Slug is required."
    else if (slugStatus === "taken") next.slug = "This slug is already in use."
    if (!excerpt.trim()) next.excerpt = "Excerpt is required."
    if (!content || !content.replace(/<[^>]*>/g, "").trim()) next.content = "Content is required."
    if (!categoryId) next.categoryId = "Category is required."
    if (!authorId) next.authorId = "Author is required."
    return next
  }

  const handleBackClick = (e: React.MouseEvent) => {
    if (dirty && !window.confirm("You have unsaved changes. Leave without saving?")) {
      e.preventDefault()
    }
  }

  const handleCancel = () => {
    if (dirty && !window.confirm("You have unsaved changes. Leave without saving?")) return
    router.push("/admin/bytesphere/articles")
  }

  const submit = async (nextStatus: BsContentStatus) => {
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      setSubmitError("Please fix the errors above before saving.")
      return
    }

    setSubmitting(nextStatus)
    setSubmitError("")

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content,
      coverImageUrl,
      authorId,
      categoryId,
      topicId: topicId || null,
      readTime: readTime.trim(),
      metaDescription: metaDescription.trim() || excerpt.trim(),
      status: nextStatus,
      featured,
      editorsPick,
    }

    try {
      const res = await fetch(
        mode === "create"
          ? "/api/admin/bytesphere/articles"
          : `/api/admin/bytesphere/articles/${initialData?.id}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      const data = await res.json()

      if (!res.ok) {
        setSubmitError(data.error || "Failed to save article.")
        return
      }

      setDirty(false)
      router.push(
        `/admin/bytesphere/articles?${nextStatus === "Published" ? "published=true" : "saved=true"}`
      )
    } catch {
      setSubmitError("Network error. Please try again.")
    } finally {
      setSubmitting(null)
    }
  }

  return (
    <div className="pb-24">
      <div className="mb-6">
        <Link
          href="/admin/bytesphere/articles"
          onClick={handleBackClick}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text"
        >
          <ChevronLeft className="size-4" />
          Articles
        </Link>
        <h1 className="mt-1 text-2xl font-semibold text-text">
          {mode === "create" ? "New Article" : "Edit Article"}
        </h1>
      </div>

      {optionsError && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {optionsError}
          <Button variant="outline" size="sm" onClick={fetchOptions}>
            Retry
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="space-y-4 rounded-xl border border-border bg-card p-6">
            <div>
              <Label htmlFor="article-title">Title</Label>
              <Input
                id="article-title"
                className="mt-1.5"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter the article title..."
                aria-invalid={!!errors.title}
              />
              {errors.title && <p className="mt-1 text-xs text-danger">{errors.title}</p>}
            </div>

            <div>
              <Label htmlFor="article-slug">Slug</Label>
              <Input
                id="article-slug"
                className="mt-1.5"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="article-slug"
                aria-invalid={!!errors.slug}
              />
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">/articles/{slug || "..."}</span>
                {slugStatus === "checking" && <span className="text-muted-foreground">Checking...</span>}
                {slugStatus === "available" && <span className="text-success">Available</span>}
                {slugStatus === "taken" && <span className="text-danger">Already in use</span>}
              </div>
              {errors.slug && <p className="mt-1 text-xs text-danger">{errors.slug}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="article-excerpt">Excerpt</Label>
                <span className="text-xs text-muted-foreground">{excerpt.length} characters</span>
              </div>
              <Textarea
                id="article-excerpt"
                className="mt-1.5 min-h-20"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short summary shown on listing pages..."
                aria-invalid={!!errors.excerpt}
              />
              {errors.excerpt && <p className="mt-1 text-xs text-danger">{errors.excerpt}</p>}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Content
            </div>
            <RichTextEditor value={content} onChange={setContent} minHeight={420} />
          </div>
          {errors.content && <p className="text-xs text-danger">{errors.content}</p>}
        </div>

        <div className="space-y-6">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Publish Settings
            </div>

            <div>
              <Label htmlFor="article-status">Status</Label>
              <Select value={status} onValueChange={(v) => v && setStatus(v as BsContentStatus)}>
                <SelectTrigger id="article-status" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="article-featured">Featured</Label>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Enabling this demotes the current featured article — the homepage hero shows only one.
                </p>
              </div>
              <Switch id="article-featured" checked={featured} onCheckedChange={setFeatured} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="article-editors-pick">Editor&apos;s Pick</Label>
              <Switch id="article-editors-pick" checked={editorsPick} onCheckedChange={setEditorsPick} />
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Categorization
            </div>

            <div>
              <Label htmlFor="article-author">Author</Label>
              <Select value={authorId || undefined} onValueChange={(v) => v && setAuthorId(v)}>
                <SelectTrigger id="article-author" className="mt-1.5" aria-invalid={!!errors.authorId}>
                  <SelectValue placeholder={optionsLoading ? "Loading..." : "Select an author"} />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.authorId && <p className="mt-1 text-xs text-danger">{errors.authorId}</p>}
            </div>

            <div>
              <Label htmlFor="article-category">Category</Label>
              <Select value={categoryId || undefined} onValueChange={(v) => v && setCategoryId(v)}>
                <SelectTrigger id="article-category" className="mt-1.5" aria-invalid={!!errors.categoryId}>
                  <SelectValue placeholder={optionsLoading ? "Loading..." : "Select a category"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && <p className="mt-1 text-xs text-danger">{errors.categoryId}</p>}
            </div>

            <div>
              <Label htmlFor="article-topic">Topic (optional)</Label>
              <Select
                value={topicId || undefined}
                onValueChange={(v) => setTopicId(v || "")}
              >
                <SelectTrigger id="article-topic" className="mt-1.5">
                  <SelectValue placeholder="No topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="article-read-time">Read Time</Label>
              <div className="mt-1.5 flex gap-2">
                <Input
                  id="article-read-time"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="6 min read"
                />
                <Button type="button" variant="outline" size="icon" onClick={handleCalculateReadTime} title="Calculate from content">
                  <Sparkles className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Cover Image
            </div>
            <ImageUpload value={coverImageUrl} onChange={setCoverImageUrl} folder="covers" />
          </div>

          <div className="space-y-2 rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              SEO
            </div>
            <Label htmlFor="article-meta">Meta Description</Label>
            <Textarea
              id="article-meta"
              className="min-h-18"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder={excerpt || "Defaults to the excerpt if left blank..."}
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-5 mt-6 border-t border-border bg-surface px-5 py-4 md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-danger">
            {submitError && (
              <>
                <AlertCircle className="size-4" />
                {submitError}
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {submitting && (
              <span className="flex items-center gap-1.5 text-sm text-text-muted">
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </span>
            )}
            <Button variant="ghost" onClick={handleCancel} disabled={!!submitting}>
              Cancel
            </Button>
            {mode === "edit" && status === "Published" && (
              <Button variant="outline" onClick={() => submit("Draft")} disabled={!!submitting}>
                <Undo2 className="size-4" />
                {submitting === "Draft" ? "Unpublishing..." : "Unpublish"}
              </Button>
            )}
            <Button variant="outline" onClick={() => submit("Draft")} disabled={!!submitting}>
              <Save className="size-4" />
              {submitting === "Draft" ? "Saving..." : "Save as Draft"}
            </Button>
            <Button onClick={() => submit("Published")} disabled={!!submitting}>
              <Send className="size-4" />
              {submitting === "Published" ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
