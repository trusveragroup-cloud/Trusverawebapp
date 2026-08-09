"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  AlertCircle, Copy, Loader2, Newspaper, Pencil, Plus, Search, Star, Trash2,
} from "lucide-react"
import { C } from "@/lib/colors"
import { useAdmin } from "@/lib/admin-context"
import AccessDenied from "@/components/admin/AccessDenied"
import type { BsArticleWithRelations, BsAuthor, BsCategory, BsContentStatus } from "@/lib/bytesphere/types"

const gridColumns = "minmax(220px,2fr) 130px 140px 110px 90px 110px 130px"

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

const STATUS_STYLES: Record<BsContentStatus, { background: string; color: string; border?: string }> = {
  Published: { background: "rgba(74,186,138,0.10)", color: C.forest600 },
  Draft: { background: C.cream200, color: C.slate500 },
  Archived: { background: "transparent", color: C.slate500, border: `1px solid ${C.slate300}` },
}

const actionButtonStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  background: "none",
  border: "none",
  cursor: "pointer",
}

export default function ArticlesListPage() {
  const { can, loading: adminLoading } = useAdmin()
  const [articles, setArticles] = useState<BsArticleWithRelations[]>([])
  const [categories, setCategories] = useState<BsCategory[]>([])
  const [authors, setAuthors] = useState<BsAuthor[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [authorFilter, setAuthorFilter] = useState("All")

  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtersActive =
    !!search || statusFilter !== "All" || categoryFilter !== "All" || authorFilter !== "All"

  const clearFilters = () => {
    setSearch("")
    setStatusFilter("All")
    setCategoryFilter("All")
    setAuthorFilter("All")
  }

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    setFetchError("")
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "All") params.set("status", statusFilter)
      if (categoryFilter !== "All") params.set("category", categoryFilter)
      if (authorFilter !== "All") params.set("author", authorFilter)
      if (search) params.set("search", search)

      const res = await fetch(`/api/admin/bytesphere/articles?${params.toString()}`)
      const data = await res.json()
      if (!res.ok) {
        setFetchError(data.error || "Failed to load articles.")
        return
      }
      setArticles(data.articles as BsArticleWithRelations[])
    } catch {
      setFetchError("Network error. Could not load articles.")
    } finally {
      setLoading(false)
    }
  }, [statusFilter, categoryFilter, authorFilter, search])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/bytesphere/categories").then((r) => r.json()),
      fetch("/api/admin/bytesphere/authors").then((r) => r.json()),
    ]).then(([categoriesData, authorsData]) => {
      setCategories(categoriesData.categories || [])
      setAuthors(authorsData.authors || [])
    })
  }, [])

  const stats = useMemo(() => ([
    { label: `${articles.length} Total`, dot: C.slate400 },
    { label: `${articles.filter((a) => a.status === "Published").length} Published`, dot: C.forest600 },
    { label: `${articles.filter((a) => a.status === "Draft").length} Drafts`, dot: C.slate400 },
    { label: `${articles.filter((a) => a.status === "Archived").length} Archived`, dot: C.slate300 },
    { label: `${articles.filter((a) => a.featured).length} Featured`, dot: C.gold500 },
  ]), [articles])

  const handleDuplicate = async (article: BsArticleWithRelations) => {
    setDuplicatingId(article.id)
    try {
      const res = await fetch("/api/admin/bytesphere/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${article.title} (Copy)`,
          slug: `${article.slug}-copy-${Date.now().toString(36)}`,
          excerpt: article.excerpt,
          content: article.content,
          coverImageUrl: article.cover_image_url,
          authorId: article.author_id,
          categoryId: article.category_id,
          topicId: article.topic_id,
          readTime: article.read_time,
          metaDescription: article.meta_description,
          status: "Draft",
          featured: false,
          editorsPick: false,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || "Failed to duplicate article.")
        return
      }
      fetchArticles()
    } catch {
      alert("Network error. Please try again.")
    } finally {
      setDuplicatingId(null)
    }
  }

  const handleDelete = async (article: BsArticleWithRelations) => {
    if (!window.confirm(`Delete "${article.title}"? This cannot be undone.`)) return
    setDeletingId(article.id)
    try {
      const res = await fetch(`/api/admin/bytesphere/articles/${article.id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || "Failed to delete article.")
        return
      }
      fetchArticles()
    } catch {
      alert("Network error. Please try again.")
    } finally {
      setDeletingId(null)
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
  if (!can("view_bs_articles")) return <AccessDenied />

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .article-row:hover { background: ${C.cream200} !important; }
        .article-action:hover { background: ${C.cream200}; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: 0 }}>
            Articles
          </h1>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 4 }}>
            Manage ByteSphere articles.
          </div>
        </div>

        {can("create_bs_articles") && (
          <Link
            href="/admin/bytesphere/articles/new"
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
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <Plus size={16} />
            New Article
          </Link>
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

      <div
        style={{
          background: C.cream100,
          borderRadius: 10,
          border: `1px solid ${C.slate200}`,
          padding: "14px 20px",
          marginBottom: 20,
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
            placeholder="Search by title..."
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
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Archived">Archived</option>
        </select>

        <select style={dropdownStyle} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select style={dropdownStyle} value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)}>
          <option value="All">All Authors</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        {filtersActive && (
          <button
            type="button"
            onClick={clearFilters}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              fontWeight: 500,
              color: C.forest600,
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      <div style={{ background: C.cream100, borderRadius: 12, border: `1px solid ${C.slate200}`, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 900 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: gridColumns,
                background: C.cream200,
                padding: "10px 20px",
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                color: C.slate500,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              <span>Title</span>
              <span>Category</span>
              <span>Author</span>
              <span>Status</span>
              <span>Featured</span>
              <span>Published</span>
              <span style={{ textAlign: "right" }}>Actions</span>
            </div>

            {loading ? (
              <div style={{ padding: 60, textAlign: "center" }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    border: `3px solid ${C.slate200}`,
                    borderTop: `3px solid ${C.forest600}`,
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                    margin: "0 auto 16px",
                  }}
                />
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>
                  Loading articles...
                </p>
              </div>
            ) : fetchError ? (
              <div style={{ padding: 60, textAlign: "center" }}>
                <AlertCircle size={28} color={C.red400} style={{ margin: "0 auto 12px" }} />
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.red400, marginBottom: 16 }}>
                  {fetchError}
                </p>
                <button
                  type="button"
                  onClick={fetchArticles}
                  style={{
                    background: C.forest600,
                    color: C.cream100,
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 20px",
                    cursor: "pointer",
                    fontFamily: "var(--font-inter)",
                    fontSize: 13,
                  }}
                >
                  Retry
                </button>
              </div>
            ) : articles.length === 0 ? (
              <div style={{ padding: 60, textAlign: "center" }}>
                <Newspaper size={40} color={C.slate300} style={{ margin: "0 auto 16px" }} />
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 16, color: C.slate500, marginBottom: 16 }}>
                  No articles match your filters.
                </p>
                {can("create_bs_articles") && (
                  <Link
                    href="/admin/bytesphere/articles/new"
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
                      textDecoration: "none",
                    }}
                  >
                    <Plus size={16} />
                    New Article
                  </Link>
                )}
              </div>
            ) : (
              articles.map((article) => {
                const statusStyle = STATUS_STYLES[article.status]
                return (
                  <div
                    key={article.id}
                    className="article-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: gridColumns,
                      height: 56,
                      padding: "0 20px",
                      alignItems: "center",
                      borderTop: `1px solid ${C.slate100}`,
                      background: C.cream100,
                    }}
                  >
                    <span
                      title={article.title}
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: 14,
                        fontWeight: 500,
                        color: C.forest800,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingRight: 12,
                      }}
                    >
                      {article.title}
                    </span>

                    <span>
                      {article.category?.name ? (
                        <span
                          style={{
                            display: "inline-flex",
                            background: C.cream200,
                            color: C.slate500,
                            fontFamily: "var(--font-inter)",
                            fontSize: 12,
                            fontWeight: 500,
                            padding: "3px 10px",
                            borderRadius: 20,
                          }}
                        >
                          {article.category.name}
                        </span>
                      ) : (
                        <span style={{ color: C.slate300 }}>—</span>
                      )}
                    </span>

                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>
                      {article.author?.name ?? "—"}
                    </span>

                    <span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          background: statusStyle.background,
                          color: statusStyle.color,
                          border: statusStyle.border,
                          fontFamily: "var(--font-inter)",
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                          padding: "4px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {article.status}
                      </span>
                    </span>

                    <span>
                      {article.featured && <Star size={15} color={C.gold500} fill={C.gold500} />}
                    </span>

                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>
                      {article.published_at
                        ? new Date(article.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                        : "—"}
                    </span>

                    <div style={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "flex-end" }}>
                      {can("edit_bs_articles") && (
                        <Link
                          href={`/admin/bytesphere/articles/${article.id}/edit`}
                          title="Edit article"
                          className="article-action"
                          style={{ ...actionButtonStyle, textDecoration: "none" }}
                        >
                          <Pencil size={15} color={C.forest600} />
                        </Link>
                      )}
                      <button
                        type="button"
                        className="article-action"
                        style={actionButtonStyle}
                        title="Duplicate article"
                        disabled={duplicatingId === article.id}
                        onClick={() => handleDuplicate(article)}
                      >
                        {duplicatingId === article.id ? (
                          <Loader2 size={15} color={C.slate400} style={{ animation: "spin 0.8s linear infinite" }} />
                        ) : (
                          <Copy size={15} color={C.slate500} />
                        )}
                      </button>
                      {can("delete_bs_articles") && (
                        <button
                          type="button"
                          className="article-action"
                          style={actionButtonStyle}
                          title="Delete article"
                          disabled={deletingId === article.id}
                          onClick={() => handleDelete(article)}
                        >
                          {deletingId === article.id ? (
                            <Loader2 size={15} color={C.slate400} style={{ animation: "spin 0.8s linear infinite" }} />
                          ) : (
                            <Trash2 size={15} color="#DC2626" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
