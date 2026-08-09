"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { C } from "@/lib/colors"
import {
  PenSquare, Search, Eye, Edit2, Trash2,
  Plus, Star, Clock, CheckCircle, AlertCircle,
  Globe, FileText, Archive
} from "lucide-react"
import { usePermissions } from "@/hooks/usePermissions"

type BlogRow = {
  id: string
  title: string
  slug: string
  category: string
  author: string
  author_initials: string
  tags: string[]
  featured: boolean
  status: "Draft" | "Published" | "Archived"
  created_at: string
  published_at: string | null
  read_time: string | null
}

const STATUS_TABS = [
  { id: "All", label: "All Posts", icon: FileText },
  { id: "Published", label: "Published", icon: Globe },
  { id: "Draft", label: "Drafts", icon: Clock },
  { id: "Archived", label: "Archived", icon: Archive },
]

function AdminBlogsPageContent() {
  const { can } = usePermissions()
  const searchParams = useSearchParams()
  const justPublished = searchParams.get("published") === "true"
  const justSaved = searchParams.get("saved") === "true"

  const [allPosts, setAllPosts] = useState<BlogRow[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    setFetchError("")
    try {
      const res = await fetch("/api/admin/blogs")
      const data = await res.json()

      if (!res.ok) {
        setFetchError(data.error || "Failed to load posts.")
        return
      }
      setAllPosts(data.blogs)
    } catch {
      setFetchError("Network error. Could not load posts.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBlogs() }, [fetchBlogs])

  const filtered = allPosts.filter((blog) => {
    if (statusFilter !== "All" && blog.status !== statusFilter) return false
    if (searchQuery && !blog.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Archive "${title}"? It will be removed from the website.`)) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || "Failed to archive post.")
        return
      }
      fetchBlogs()
    } catch {
      alert("Network error. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  const statCards = [
    { label: "Total Posts", value: allPosts.length, icon: PenSquare, iconColor: C.forest600 },
    { label: "Published", value: allPosts.filter((b) => b.status === "Published").length, icon: Globe, iconColor: C.forest600 },
    { label: "Drafts", value: allPosts.filter((b) => b.status === "Draft").length, icon: Clock, iconColor: C.slate400 },
    { label: "Featured", value: allPosts.filter((b) => b.featured).length, icon: Star, iconColor: C.gold500 },
  ]

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .blog-row:hover { background: ${C.cream200} !important; }
      `}</style>

      {(justPublished || justSaved) && (
        <div
          style={{
            background: C.forest100,
            border: `1px solid ${C.forest300}`,
            borderRadius: 8,
            padding: "12px 20px",
            marginBottom: 20,
            fontFamily: "var(--font-inter)",
            fontSize: 14,
            color: C.forest700,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <CheckCircle size={16} color={C.forest600} />
          {justPublished
            ? "Blog post published successfully. It is now live on the website."
            : "Blog post saved as draft."}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: 26,
              color: C.forest800,
              margin: 0,
            }}
          >
            Blog Posts
          </h1>
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              color: C.slate500,
              marginTop: 4,
            }}
          >
            Manage and publish articles for the TrusVera Group website.
          </div>
        </div>
        {can("create_blogs") && (
          <Link
            href="/admin/blogs/new"
            style={{
              background: C.forest600,
              color: C.cream100,
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              fontWeight: 700,
              padding: "10px 20px",
              borderRadius: 6,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Plus size={16} />
            New Post
          </Link>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              borderRadius: 10,
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 11,
                  color: C.slate500,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: 28,
                  color: C.forest800,
                  marginTop: 4,
                }}
              >
                {card.value}
              </div>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: C.cream200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <card.icon size={16} color={card.iconColor} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 0 }}>
          {STATUS_TABS.map((tab) => {
            const isActive = statusFilter === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  borderBottom: `2px solid ${isActive ? C.forest600 : "transparent"}`,
                  color: isActive ? C.forest700 : C.slate500,
                  fontWeight: isActive ? 700 : 400,
                  background: isActive ? C.cream100 : "transparent",
                }}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div style={{ position: "relative" }}>
          <Search
            size={15}
            color={C.slate400}
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            style={{
              height: 36,
              padding: "0 12px 0 34px",
              border: `1px solid ${C.slate200}`,
              borderRadius: 6,
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              color: C.forest900,
              background: C.cream100,
              outline: "none",
              width: 240,
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: C.cream100,
          borderRadius: 12,
          border: `1px solid ${C.slate200}`,
          overflow: "hidden",
        }}
      >
        {loading && (
          <div style={{ padding: 60, textAlign: "center" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: `3px solid ${C.slate200}`,
                borderTop: `3px solid ${C.forest600}`,
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>
              Loading posts...
            </div>
          </div>
        )}

        {!loading && fetchError && (
          <div style={{ padding: 40, textAlign: "center" }}>
            <AlertCircle size={28} color={C.red400} style={{ marginBottom: 12 }} />
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.red400, marginBottom: 16 }}>
              {fetchError}
            </div>
            <button
              onClick={fetchBlogs}
              style={{
                background: C.forest600,
                color: C.cream100,
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                fontWeight: 700,
                padding: "8px 20px",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !fetchError && filtered.length === 0 && (
          <div style={{ padding: 60, textAlign: "center" }}>
            <PenSquare size={40} color={C.slate300} style={{ marginBottom: 16 }} />
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 16, color: C.slate500 }}>
              No posts found
            </div>
            {statusFilter !== "All" && (
              <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 4 }}>
                No {statusFilter} posts yet.
              </div>
            )}
            <Link
              href="/admin/blogs/new"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: C.forest600,
                display: "inline-block",
                marginTop: 16,
              }}
            >
              Create your first post
            </Link>
          </div>
        )}

        {!loading && !fetchError && filtered.length > 0 && (
          <table style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse" }}>
            <colgroup>
              <col />
              <col style={{ width: 180 }} />
              <col style={{ width: 140 }} />
              <col style={{ width: 120 }} />
              <col style={{ width: 120 }} />
            </colgroup>
            <thead>
              <tr style={{ background: C.cream200 }}>
                {["Title", "Category", "Status", "Date", "Actions"].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px 20px",
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      color: C.slate500,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      textAlign: "left",
                      fontWeight: 400,
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((blog) => {
                const displayDate = blog.published_at
                  ? new Date(blog.published_at).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" })
                  : new Date(blog.created_at).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" })

                const statusStyles =
                  blog.status === "Published"
                    ? { background: C.forest100, color: C.forest700, Icon: CheckCircle }
                    : blog.status === "Draft"
                    ? { background: C.cream300, color: C.slate600, Icon: Clock }
                    : { background: C.cream200, color: C.slate400, Icon: Archive }

                const cellStyle: React.CSSProperties = {
                  verticalAlign: "top",
                  paddingTop: 14,
                  paddingBottom: 14,
                  paddingLeft: 20,
                  paddingRight: 12,
                }

                return (
                  <tr
                    key={blog.id}
                    className="blog-row"
                    style={{ borderTop: `1px solid ${C.slate100}`, background: C.cream100 }}
                  >
                    <td style={cellStyle}>
                      <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", gap: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: "100%" }}>
                          {blog.featured && <Star size={13} color={C.gold500} fill={C.gold500} style={{ flexShrink: 0 }} />}
                          <div
                            style={{
                              fontFamily: "var(--font-inter)",
                              fontSize: 14,
                              fontWeight: 700,
                              color: C.forest800,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {blog.title}
                          </div>
                        </div>
                        {blog.tags.length > 0 && (
                          <div style={{ display: "flex", gap: 6 }}>
                            {blog.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  background: C.cream200,
                                  fontFamily: "var(--font-inter)",
                                  fontSize: 10,
                                  color: C.slate500,
                                  padding: "2px 8px",
                                  borderRadius: 10,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    <td style={cellStyle}>
                      <span
                        title={blog.category}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          maxWidth: "100%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          background: C.forest600,
                          color: C.cream100,
                          fontFamily: "var(--font-inter)",
                          fontSize: 10,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          padding: "3px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {blog.category}
                      </span>
                    </td>

                    <td style={cellStyle}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          background: statusStyles.background,
                          color: statusStyles.color,
                          fontFamily: "var(--font-inter)",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 20,
                          textTransform: "uppercase",
                        }}
                      >
                        <statusStyles.Icon size={12} />
                        {blog.status}
                      </span>
                    </td>

                    <td style={{ ...cellStyle, fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>
                      {displayDate}
                    </td>

                    <td style={{ ...cellStyle, paddingRight: 20 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <Link href={`/blog/${blog.slug}`} target="_blank" title="View on website">
                          <Eye size={15} color={C.slate500} />
                        </Link>
                        {can("edit_blogs") && (
                          <Link href={`/admin/blogs/${blog.id}/edit`} title="Edit post">
                            <Edit2 size={15} color={C.forest600} />
                          </Link>
                        )}
                        {can("delete_blogs") && (
                          deletingId === blog.id ? (
                            <div
                              style={{
                                width: 14,
                                height: 14,
                                borderRadius: "50%",
                                border: `2px solid ${C.slate200}`,
                                borderTop: `2px solid ${C.slate400}`,
                                animation: "spin 0.8s linear infinite",
                              }}
                            />
                          ) : (
                            <Trash2
                              size={15}
                              color={C.slate400}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(blog.id, blog.title)}
                            />
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default function AdminBlogsPage() {
  return (
    <Suspense fallback={
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
      }}>
        <div style={{
          width: 32,
          height: 32,
          border: "3px solid #E5E7EB",
          borderTop: "3px solid #166B4A",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <AdminBlogsPageContent />
    </Suspense>
  )
}
