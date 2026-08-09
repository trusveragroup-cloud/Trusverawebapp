"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertCircle, FileText, Inbox, Mail, Newspaper, RefreshCw,
} from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts"
import { C } from "@/lib/colors"
import { useAdmin } from "@/lib/admin-context"
import AccessDenied from "@/components/admin/AccessDenied"

type StatBlock = { total: number; published: number; drafts: number; archived: number }
type SubscriberStats = { total: number; active: number; unsubscribed: number; thisMonth: number }
type ContactStatus = "new" | "read" | "replied" | "closed"
type ContactStats = { total: number; new: number; read: number; replied: number; closed: number }
type CountBlock = { total: number }

type RecentContact = {
  id: string
  name: string
  email: string
  company: string | null
  subject: string
  status: ContactStatus
  submitted_at: string
}

type RecentContentItem = {
  id: string
  title: string
  slug: string
  type: "article" | "blog"
  publishedAt: string | null
  author: string | null
  category: string | null
}

type CategoryBreakdownItem = { id: string; name: string; count: number }

type DashboardData = {
  stats: {
    articles: StatBlock
    blogs: StatBlock
    subscribers: SubscriberStats
    contacts: ContactStats
    authors: CountBlock & { active: number }
    categories: CountBlock
    topics: CountBlock
  }
  recentContacts: RecentContact[]
  recentContent: RecentContentItem[]
  subscriberTrend: { month: string; count: number }[]
  categoryBreakdown: CategoryBreakdownItem[]
}

const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
  closed: "Closed",
}

const CONTACT_STATUS_STYLES: Record<ContactStatus, { background: string; color: string; fontWeight: number; border?: string }> = {
  new: { background: "rgba(200,151,62,0.14)", color: C.gold500, fontWeight: 600 },
  read: { background: C.borderLight, color: C.textMuted, fontWeight: 500 },
  replied: { background: "rgba(74,186,138,0.12)", color: C.forest600, fontWeight: 500 },
  closed: { background: "transparent", color: C.textMuted, fontWeight: 500, border: `1px solid ${C.borderLight}` },
}

function ContactStatusPill({ status }: { status: ContactStatus }) {
  const s = CONTACT_STATUS_STYLES[status]
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", fontFamily: "var(--font-inter)",
        fontSize: 11, fontWeight: s.fontWeight, borderRadius: 999, padding: "3px 10px",
        background: s.background, color: s.color, border: s.border,
      }}
    >
      {CONTACT_STATUS_LABELS[status]}
    </span>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function formatRelativeTime(date: Date) {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  if (days === 1) return "yesterday"
  return `${days} days ago`
}

const cardStyle: React.CSSProperties = {
  background: C.cream100,
  borderRadius: 12,
  border: `1px solid ${C.slate200}`,
  padding: "20px 24px",
}

function StatCard({
  label, icon, value, sub, subColor, dot,
}: { label: string; icon: React.ReactNode; value: number; sub: string; subColor: string; dot?: boolean }) {
  return (
    <div style={{ background: C.cream100, border: `1px solid ${C.slate200}`, borderRadius: 12, padding: 24, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: C.slate500, textTransform: "uppercase", letterSpacing: 1 }}>
          {label}
        </span>
        <div style={{ width: 36, height: 36, background: C.cream200, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "12px 0 4px" }}>
        <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: 32, color: C.forest800 }}>{value}</span>
        {dot && (
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold500, animation: "pulseDot 1.6s ease-out infinite" }} />
        )}
      </div>
      <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: subColor }}>{sub}</span>
    </div>
  )
}

function DefRow({ label, value, last }: { label: string; value: number; last?: boolean }) {
  return (
    <div
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0",
        borderBottom: last ? "none" : `1px solid ${C.slate100}`,
      }}
    >
      <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate600 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-inter)", fontSize: 16, fontWeight: 700, color: C.forest800 }}>{value}</span>
    </div>
  )
}

export default function ByteSphereDashboardPage() {
  const router = useRouter()
  const { can, loading: adminLoading } = useAdmin()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchDashboard = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/bytesphere/dashboard")
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || "Failed to load dashboard data.")
        return
      }
      setData(json as DashboardData)
      setLastUpdated(new Date())
    } catch {
      setError("Network error. Could not load dashboard data.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const nonZeroTrendPoints = useMemo(
    () => data?.subscriberTrend.filter((d) => d.count > 0).length ?? 0,
    [data]
  )

  const showFullSkeleton = loading && data === null

  if (adminLoading) {
    return (
      <div style={{ padding: 32 }}>
        <div style={{ color: C.textMuted, fontFamily: "var(--font-inter)", fontSize: 14 }}>
          Loading...
        </div>
      </div>
    )
  }
  if (!can("view_bs_dashboard")) return <AccessDenied />

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        @keyframes pulseDot { 0% { box-shadow: 0 0 0 0 rgba(200,151,62,0.5); } 70% { box-shadow: 0 0 0 6px rgba(200,151,62,0); } 100% { box-shadow: 0 0 0 0 rgba(200,151,62,0); } }
        .skeleton-block { animation: shimmer 1.4s ease-in-out infinite; background: ${C.cream200}; border-radius: 12px; }
        .bs-dash-row:hover { background: ${C.cream200} !important; }
        @media (max-width: 1100px) {
          .bs-dash-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .bs-dash-row2 { grid-template-columns: 1fr !important; }
          .bs-dash-row3 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: 0 }}>
            ByteSphere Dashboard
          </h1>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 4 }}>
            A consolidated view of content, audience and enquiries.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {lastUpdated && (
            <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate400 }}>
              Updated {formatRelativeTime(lastUpdated)}
            </span>
          )}
          <button
            type="button"
            onClick={fetchDashboard}
            disabled={loading}
            style={{
              background: C.cream100, border: `1px solid ${C.slate200}`, borderRadius: 6, padding: 8,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <RefreshCw size={16} color={C.slate500} style={loading ? { animation: "spin 1s linear infinite" } : undefined} />
          </button>
        </div>
      </div>

      {error ? (
        <div style={{ ...cardStyle, textAlign: "center", padding: "48px 24px" }}>
          <AlertCircle size={28} color={C.red400} style={{ margin: "0 auto 12px" }} />
          <div style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.red400, marginBottom: 16 }}>{error}</div>
          <button
            type="button"
            onClick={fetchDashboard}
            style={{ background: C.forest600, color: C.cream100, border: "none", borderRadius: 6, padding: "10px 20px", fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            Retry
          </button>
        </div>
      ) : showFullSkeleton ? (
        <div>
          <div className="bs-dash-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 20 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton-block" style={{ height: 130 }} />
            ))}
          </div>
          <div className="bs-dash-row2" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, marginTop: 20 }}>
            <div className="skeleton-block" style={{ height: 280 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="skeleton-block" style={{ height: 160 }} />
              <div className="skeleton-block" style={{ height: 220 }} />
            </div>
          </div>
        </div>
      ) : data && (
        <>
          <div className="bs-dash-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            <StatCard
              label="Published Content"
              icon={<Newspaper size={20} color={C.forest600} />}
              value={data.stats.articles.published + data.stats.blogs.published}
              sub={`${data.stats.articles.published} articles, ${data.stats.blogs.published} blogs`}
              subColor={C.slate400}
            />
            <StatCard
              label="Active Subscribers"
              icon={<Mail size={20} color={C.forest600} />}
              value={data.stats.subscribers.active}
              sub={data.stats.subscribers.thisMonth > 0 ? `+${data.stats.subscribers.thisMonth} this month` : "No new this month"}
              subColor={data.stats.subscribers.thisMonth > 0 ? C.forest600 : C.slate400}
            />
            <StatCard
              label="New Enquiries"
              icon={<Inbox size={20} color={C.forest600} />}
              value={data.stats.contacts.new}
              sub={`${data.stats.contacts.total} total enquiries`}
              subColor={C.slate400}
              dot={data.stats.contacts.new > 0}
            />
            <StatCard
              label="Drafts In Progress"
              icon={<FileText size={20} color={C.forest600} />}
              value={data.stats.articles.drafts + data.stats.blogs.drafts}
              sub={`${data.stats.articles.drafts} articles, ${data.stats.blogs.drafts} blogs`}
              subColor={C.slate400}
            />
          </div>

          <div className="bs-dash-row2" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, marginTop: 20 }}>
            <div style={{ background: C.cream100, borderRadius: 12, border: `1px solid ${C.slate200}`, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${C.slate200}` }}>
                <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: C.forest800 }}>Recent Enquiries</span>
                <Link href="/admin/bytesphere/contacts" style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.forest600, textDecoration: "none" }}>
                  View all
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr", padding: "10px 24px", background: C.cream200, fontFamily: "var(--font-inter)", fontSize: 11, color: C.slate500, textTransform: "uppercase", letterSpacing: 1 }}>
                <span>Name</span>
                <span>Subject</span>
                <span>Status</span>
                <span>Received</span>
              </div>

              {data.recentContacts.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>
                  No enquiries yet.
                </div>
              ) : (
                data.recentContacts.map((c) => (
                  <div
                    key={c.id}
                    className="bs-dash-row"
                    onClick={() => router.push("/admin/bytesphere/contacts")}
                    style={{
                      display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr", padding: "0 24px", height: 52,
                      alignItems: "center", borderTop: `1px solid ${C.slate100}`, background: C.cream100, cursor: "pointer",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700, color: C.forest800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {c.name}
                    </span>
                    <span title={c.subject} style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {c.subject}
                    </span>
                    <span><ContactStatusPill status={c.status} /></span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate400 }}>{formatDate(c.submitted_at)}</span>
                  </div>
                ))
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={cardStyle}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: C.forest800, marginBottom: 16 }}>
                  Content Overview
                </div>
                <DefRow label="Published" value={data.stats.articles.published + data.stats.blogs.published} />
                <DefRow label="Drafts" value={data.stats.articles.drafts + data.stats.blogs.drafts} />
                <DefRow label="Archived" value={data.stats.articles.archived + data.stats.blogs.archived} />
                <DefRow label="Authors" value={data.stats.authors.total} />
                <DefRow label="Categories" value={data.stats.categories.total} />
                <DefRow label="Topics" value={data.stats.topics.total} last />
                <Link
                  href="/admin/bytesphere/articles"
                  style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.forest600, marginTop: 12, display: "block", textDecoration: "none" }}
                >
                  Manage articles
                </Link>
              </div>

              <div style={cardStyle}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: C.forest800, marginBottom: 16 }}>
                  Audience
                </div>
                <DefRow label="Total subscribers" value={data.stats.subscribers.total} />
                <DefRow label="Active" value={data.stats.subscribers.active} />
                <DefRow label="Unsubscribed" value={data.stats.subscribers.unsubscribed} last />

                <div style={{ marginTop: 16 }}>
                  {nonZeroTrendPoints < 2 ? (
                    <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "100%", height: 1, background: C.slate200 }} />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={140}>
                      <AreaChart data={data.subscriberTrend} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                        <defs>
                          <linearGradient id="subscriberTrendFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={C.forest600} stopOpacity={0.25} />
                            <stop offset="100%" stopColor={C.forest600} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.slate400 }} axisLine={false} tickLine={false} />
                        <Area type="monotone" dataKey="count" stroke={C.forest600} strokeWidth={2} fill="url(#subscriberTrendFill)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bs-dash-row3" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, marginTop: 20 }}>
            <div style={{ background: C.cream100, borderRadius: 12, border: `1px solid ${C.slate200}`, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.slate200}` }}>
                <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: C.forest800 }}>Latest Content</span>
              </div>
              {data.recentContent.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>
                  No published content yet.
                </div>
              ) : (
                data.recentContent.map((item, i) => (
                  <div
                    key={item.id}
                    className="bs-dash-row"
                    onClick={() => router.push(`/admin/bytesphere/${item.type === "article" ? "articles" : "blogs"}/${item.id}/edit`)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 24px",
                      borderBottom: i < data.recentContent.length - 1 ? `1px solid ${C.slate100}` : "none",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0, fontFamily: "var(--font-inter)", fontSize: 10, fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: 0.5, padding: "3px 8px", borderRadius: 4,
                        background: item.type === "article" ? "rgba(13,148,136,0.12)" : "rgba(200,151,62,0.12)",
                        color: item.type === "article" ? "#0D9488" : C.gold500,
                      }}
                    >
                      {item.type === "article" ? "Article" : "Blog"}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div title={item.title} style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 500, color: C.forest800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.title}
                      </div>
                      <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate500, marginTop: 2 }}>
                        {item.author ?? "Unknown"} · {item.category ?? "Uncategorized"}
                      </div>
                    </div>
                    <span style={{ flexShrink: 0, fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate400 }}>
                      {item.publishedAt ? formatDate(item.publishedAt) : "—"}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div style={cardStyle}>
              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: C.forest800, marginBottom: 16 }}>
                Content by Category
              </div>
              {data.categoryBreakdown.length === 0 ? (
                <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate400 }}>
                  No published content yet.
                </div>
              ) : (
                (() => {
                  const max = Math.max(...data.categoryBreakdown.map((c) => c.count))
                  return data.categoryBreakdown.map((cat) => (
                    <div key={cat.id} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate600 }}>{cat.name}</span>
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 600, color: C.forest800 }}>{cat.count}</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: C.cream200, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(cat.count / max) * 100}%`, background: C.forest600, opacity: 0.6, borderRadius: 3 }} />
                      </div>
                    </div>
                  ))
                })()
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
