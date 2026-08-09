"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AlertCircle, ChevronLeft, Loader2, Save, Send, Sparkles, Undo2 } from "lucide-react"

import { C } from "@/lib/colors"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { slugify, estimateReadTime } from "@/lib/bytesphere/content-helpers"
import type { BsAuthor, BsBlogWithRelations, BsCategory, BsContentStatus, BsTopic } from "@/lib/bytesphere/types"

type BlogFormProps = {
  mode: "create" | "edit"
  initialData?: BsBlogWithRelations
}

type FormErrors = Partial<Record<"title" | "slug" | "excerpt" | "content" | "categoryId" | "authorId", string>>

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: C.textDark,
  marginBottom: 6,
  fontFamily: "var(--font-inter)",
}

const helperStyle: React.CSSProperties = {
  fontSize: 12,
  color: C.textMuted,
  marginTop: 6,
  fontFamily: "var(--font-inter)",
}

const errorTextStyle: React.CSSProperties = {
  fontSize: 12,
  color: C.red400,
  marginTop: 6,
  fontFamily: "var(--font-inter)",
}

function inputStyle(hasError?: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "10px 12px",
    fontSize: 14,
    border: `1px solid ${hasError ? C.red400 : C.borderLight}`,
    borderRadius: 8,
    background: C.white,
    color: C.textDark,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "var(--font-inter)",
    transition: "border-color .15s, box-shadow .15s",
  }
}

function selectStyle(hasError?: boolean): React.CSSProperties {
  return {
    ...inputStyle(hasError),
    paddingRight: 36,
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    cursor: "pointer",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "16px",
  }
}

function handleFieldFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#4F772D"
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79,119,45,0.12)"
}

function handleFieldBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, hasError?: boolean) {
  e.currentTarget.style.borderColor = hasError ? C.red400 : C.borderLight
  e.currentTarget.style.boxShadow = "none"
}

const cardStyle: React.CSSProperties = {
  background: C.white,
  border: `1px solid ${C.borderLight}`,
  borderRadius: 10,
  padding: 24,
}

const sectionHeaderStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: C.textMuted,
  marginBottom: 16,
  paddingBottom: 10,
  borderBottom: `1px solid ${C.borderLight}`,
  fontFamily: "var(--font-inter)",
  fontWeight: 600,
}

const buttonBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontFamily: "var(--font-inter)",
  fontSize: 13,
  fontWeight: 700,
  padding: "10px 20px",
  borderRadius: 8,
  border: "none",
  outline: "none",
}

export function BlogForm({ mode, initialData }: BlogFormProps) {
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

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false
      return
    }
    setDirty(true)
  }, [title, slug, excerpt, content, coverImageUrl, authorId, categoryId, topicId, readTime, metaDescription, status])

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

  useEffect(() => {
    if (!slug) {
      setSlugStatus("idle")
      return
    }
    setSlugStatus("checking")
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/bytesphere/blogs?slug=${encodeURIComponent(slug)}`)
        const data = await res.json()
        const conflict = (data.blogs || []).some(
          (b: BsBlogWithRelations) => b.id !== initialData?.id
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
    router.push("/admin/bytesphere/blogs")
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
    }

    try {
      const res = await fetch(
        mode === "create" ? "/api/admin/bytesphere/blogs" : `/api/admin/bytesphere/blogs/${initialData?.id}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      const data = await res.json()

      if (!res.ok) {
        setSubmitError(data.error || "Failed to save blog post.")
        return
      }

      setDirty(false)
      router.push(`/admin/bytesphere/blogs?${nextStatus === "Published" ? "published=true" : "saved=true"}`)
    } catch {
      setSubmitError("Network error. Please try again.")
    } finally {
      setSubmitting(null)
    }
  }

  return (
    <div style={{ padding: "32px 32px 100px" }}>
      <style>{`
        @media (max-width: 1100px) {
          .bf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <Link
          href="/admin/bytesphere/blogs"
          onClick={handleBackClick}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: C.textMuted,
            textDecoration: "none",
            fontFamily: "var(--font-inter)",
            marginBottom: 12,
          }}
        >
          <ChevronLeft size={16} />
          Blogs
        </Link>
        <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: 0, marginTop: 4 }}>
          {mode === "create" ? "New Blog Post" : "Edit Blog Post"}
        </h1>
      </div>

      {optionsError && (
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 8,
            border: `1px solid ${C.red400}`,
            background: "rgba(226,75,74,0.08)",
            padding: "12px 16px",
            fontSize: 13,
            color: C.red400,
            fontFamily: "var(--font-inter)",
          }}
        >
          {optionsError}
          <button
            type="button"
            onClick={fetchOptions}
            style={{
              background: "none",
              border: `1px solid ${C.red400}`,
              borderRadius: 6,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: C.red400,
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

      <div className="bf-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
        <div>
          <div style={{ ...cardStyle, marginBottom: 24, display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <label style={labelStyle} htmlFor="blog-title">Title</label>
              <input
                id="blog-title"
                style={inputStyle(!!errors.title)}
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                onFocus={handleFieldFocus}
                onBlur={(e) => handleFieldBlur(e, !!errors.title)}
                placeholder="Enter the blog post title..."
              />
              {errors.title && <div style={errorTextStyle}>{errors.title}</div>}
            </div>

            <div>
              <label style={labelStyle} htmlFor="blog-slug">Slug</label>
              <input
                id="blog-slug"
                style={inputStyle(!!errors.slug)}
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                onFocus={handleFieldFocus}
                onBlur={(e) => handleFieldBlur(e, !!errors.slug)}
                placeholder="blog-slug"
              />
              <div style={{ ...helperStyle, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>/blogs/{slug || "..."}</span>
                {slugStatus === "checking" && <span>Checking...</span>}
                {slugStatus === "available" && <span style={{ color: C.forest600 }}>Available</span>}
                {slugStatus === "taken" && <span style={{ color: C.red400 }}>Already in use</span>}
              </div>
              {errors.slug && <div style={errorTextStyle}>{errors.slug}</div>}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ ...labelStyle, marginBottom: 0 }} htmlFor="blog-excerpt">Excerpt</label>
                <span style={{ fontSize: 12, color: C.textMuted, fontFamily: "var(--font-inter)" }}>
                  {excerpt.length} characters
                </span>
              </div>
              <textarea
                id="blog-excerpt"
                style={{ ...inputStyle(!!errors.excerpt), minHeight: 80, resize: "vertical" }}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                onFocus={handleFieldFocus}
                onBlur={(e) => handleFieldBlur(e, !!errors.excerpt)}
                placeholder="A short summary shown on listing pages..."
              />
              {errors.excerpt && <div style={errorTextStyle}>{errors.excerpt}</div>}
            </div>
          </div>

          <div style={{ background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: 10, overflow: "hidden", marginBottom: 24 }}>
            <div style={{ ...sectionHeaderStyle, margin: 0, padding: "16px 24px", borderBottom: `1px solid ${C.borderLight}` }}>
              Content
            </div>
            <RichTextEditor value={content} onChange={setContent} minHeight={420} />
          </div>
          {errors.content && <div style={errorTextStyle}>{errors.content}</div>}
        </div>

        <div>
          <div style={{ ...cardStyle, marginBottom: 20 }}>
            <div style={sectionHeaderStyle}>Publish Settings</div>
            <div>
              <label style={labelStyle} htmlFor="blog-status">Status</label>
              <select
                id="blog-status"
                style={selectStyle()}
                value={status}
                onChange={(e) => setStatus(e.target.value as BsContentStatus)}
                onFocus={handleFieldFocus}
                onBlur={(e) => handleFieldBlur(e)}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div style={{ ...cardStyle, marginBottom: 20, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ ...sectionHeaderStyle, marginBottom: 0 }}>Categorization</div>

            <div>
              <label style={labelStyle} htmlFor="blog-author">Author</label>
              <select
                id="blog-author"
                style={selectStyle(!!errors.authorId)}
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                onFocus={handleFieldFocus}
                onBlur={(e) => handleFieldBlur(e, !!errors.authorId)}
              >
                <option value="">{optionsLoading ? "Loading..." : "Select an author"}</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
              {errors.authorId && <div style={errorTextStyle}>{errors.authorId}</div>}
            </div>

            <div>
              <label style={labelStyle} htmlFor="blog-category">Category</label>
              <select
                id="blog-category"
                style={selectStyle(!!errors.categoryId)}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                onFocus={handleFieldFocus}
                onBlur={(e) => handleFieldBlur(e, !!errors.categoryId)}
              >
                <option value="">{optionsLoading ? "Loading..." : "Select a category"}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {errors.categoryId && <div style={errorTextStyle}>{errors.categoryId}</div>}
            </div>

            <div>
              <label style={labelStyle} htmlFor="blog-topic">Topic (optional)</label>
              <select
                id="blog-topic"
                style={selectStyle()}
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                onFocus={handleFieldFocus}
                onBlur={(e) => handleFieldBlur(e)}
              >
                <option value="">No topic</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>{topic.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle} htmlFor="blog-read-time">Read Time</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  id="blog-read-time"
                  style={inputStyle()}
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  onFocus={handleFieldFocus}
                  onBlur={(e) => handleFieldBlur(e)}
                  placeholder="4 min read"
                />
                <button
                  type="button"
                  onClick={handleCalculateReadTime}
                  title="Calculate from content"
                  style={{
                    flexShrink: 0,
                    width: 38,
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: C.white,
                    border: `1px solid ${C.borderLight}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    color: C.textMuted,
                  }}
                >
                  <Sparkles size={15} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ ...cardStyle, marginBottom: 20 }}>
            <div style={sectionHeaderStyle}>Cover Image</div>
            <ImageUpload value={coverImageUrl} onChange={setCoverImageUrl} folder="covers" />
          </div>

          <div style={{ ...cardStyle, marginBottom: 20 }}>
            <div style={sectionHeaderStyle}>SEO</div>
            <label style={labelStyle} htmlFor="blog-meta">Meta Description</label>
            <textarea
              id="blog-meta"
              style={{ ...inputStyle(), minHeight: 72, resize: "vertical" }}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              onFocus={handleFieldFocus}
              onBlur={(e) => handleFieldBlur(e)}
              placeholder={excerpt || "Defaults to the excerpt if left blank..."}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 10,
          background: C.white,
          borderTop: `1px solid ${C.borderLight}`,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 12,
          marginLeft: -32,
          marginRight: -32,
        }}
      >
        {submitting && (
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.textMuted, marginRight: 4 }}>
            <Loader2 size={15} style={{ animation: "spin 0.8s linear infinite" }} />
            Saving...
          </span>
        )}
        {submitError && (
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.red400, marginRight: 4 }}>
            <AlertCircle size={15} />
            {submitError}
          </span>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        <button
          type="button"
          onClick={handleCancel}
          disabled={!!submitting}
          style={{
            ...buttonBase,
            background: "none",
            color: C.textMuted,
            fontWeight: 500,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          Cancel
        </button>

        {mode === "edit" && status === "Published" && (
          <button
            type="button"
            onClick={() => submit("Draft")}
            disabled={!!submitting}
            style={{
              ...buttonBase,
              background: C.white,
              color: C.forest700,
              border: `1px solid ${C.borderLight}`,
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.6 : 1,
            }}
          >
            <Undo2 size={15} />
            {submitting === "Draft" ? "Unpublishing..." : "Unpublish"}
          </button>
        )}

        <button
          type="button"
          onClick={() => submit("Draft")}
          disabled={!!submitting}
          style={{
            ...buttonBase,
            background: C.white,
            color: C.forest700,
            border: `1px solid ${C.borderLight}`,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          <Save size={15} />
          {submitting === "Draft" ? "Saving..." : "Save as Draft"}
        </button>

        <button
          type="button"
          onClick={() => submit("Published")}
          disabled={!!submitting}
          style={{
            ...buttonBase,
            background: C.gold500,
            color: C.forest800,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          <Send size={15} />
          {submitting === "Published" ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  )
}
