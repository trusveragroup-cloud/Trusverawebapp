"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { C } from "@/lib/colors"
import {
  Users, FileText, BookOpen, Shield,
  TrendingUp, Clock, CheckCircle, Eye,
  AlertCircle, RefreshCw
} from "lucide-react"

type MetricData = {
  totalContacts: number
  newUnread: number
  blogsPublished: number
  activeAdmins: number
  contactsThisMonth: number
  blogsDraft: number
  blogsArchived: number
}

type RecentContact = {
  id: string
  full_name: string
  company_name: string | null
  service_interest: string | null
  status: string
  created_at: string
}

type ActivityItem = {
  id: string
  event_type: string
  event_timestamp: string
  notes: string | null
  contact_id: string | null
}

const STATUS_STYLES: Record<string, { background: string; color: string }> = {
  New: { background: "rgba(200,151,62,0.10)", color: C.gold500 },
  Reviewed: { background: "rgba(59,130,246,0.10)", color: "#3B82F6" },
  Replied: { background: "rgba(74,186,138,0.10)", color: C.green400 },
  Archived: { background: C.cream200, color: C.textMuted },
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<MetricData | null>(null)
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([])
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchDashboardData = async () => {
    setLoading(true)
    setError("")
    try {
      const [metricsRes, contactsRes, activityRes] = await Promise.all([
        fetch("/api/admin/dashboard", { credentials: "include" }),
        fetch("/api/admin/contacts?limit=5", { credentials: "include" }),
        fetch("/api/admin/activity?limit=5", { credentials: "include" }),
      ])

      console.log("Dashboard:", metricsRes.status)
      console.log("Contacts:", contactsRes.status)
      console.log("Activity:", activityRes.status)

      const metricsData = metricsRes.ok ? await metricsRes.json() : null
      const contactsData = contactsRes.ok ? await contactsRes.json() : { contacts: [] }
      const activityData = activityRes.ok ? await activityRes.json() : { events: [] }

      if (!metricsData) {
        const errText = await metricsRes.text()
        console.error("Metrics error:", errText)
        setError("Failed to load dashboard metrics.")
        return
      }

      setMetrics(metricsData)
      setRecentContacts(contactsData.contacts || [])
      setActivity(activityData.events || [])
      setLastUpdated(new Date())
    } catch (err) {
      console.error("Dashboard fetch error:", err)
      setError("Failed to load dashboard data. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatRelativeTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)
    if (mins < 60) return `${mins} minutes ago`
    if (hours < 24) return `${hours} hours ago`
    if (days === 1) return "Yesterday"
    return `${days} days ago`
  }

  const formatEventLabel = (event: ActivityItem) => {
    switch (event.event_type) {
      case "consent_given": return "New contact enquiry received"
      case "consent_withdrawn": return "Contact withdrew consent"
      case "erasure_requested": return "Data erasure requested"
      case "do_not_contact_set": return "Contact marked do not contact"
      default: return event.notes || event.event_type
    }
  }

  const activityDotColor = (eventType: string) => {
    switch (eventType) {
      case "consent_given": return C.forest600
      case "erasure_requested": return "#DC2626"
      case "do_not_contact_set": return C.gold500
      default: return C.slate400
    }
  }

  const metricCards = [
    {
      key: "total",
      label: "Total Contacts",
      value: metrics?.totalContacts ?? 0,
      sub: `+${metrics?.contactsThisMonth ?? 0} this month`,
      subColor: C.forest600,
      icon: <Users size={20} color={C.forest600} />,
    },
    {
      key: "unread",
      label: "New Unread",
      value: metrics?.newUnread ?? 0,
      sub: "Awaiting review",
      subColor: C.slate400,
      icon: <Eye size={20} color={C.gold500} />,
      showPulse: (metrics?.newUnread ?? 0) > 0,
    },
    {
      key: "blogs",
      label: "Blogs Published",
      value: metrics?.blogsPublished ?? 0,
      sub: `${metrics?.blogsDraft ?? 0} drafts pending`,
      subColor: C.slate400,
      icon: <BookOpen size={20} color={C.forest600} />,
    },
    {
      key: "admins",
      label: "Active Admins",
      value: metrics?.activeAdmins ?? 0,
      sub: "All roles filled",
      subColor: C.forest600,
      icon: <Shield size={20} color={C.forest600} />,
    },
  ]

  const showFullSkeleton = loading && metrics === null

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        @keyframes pulseDot { 0% { box-shadow: 0 0 0 0 rgba(200,151,62,0.5); } 70% { box-shadow: 0 0 0 6px rgba(200,151,62,0); } 100% { box-shadow: 0 0 0 0 rgba(200,151,62,0); } }
        .dashboard-content { animation: fadeIn 0.3s ease forwards; }
        .contact-row:hover { background: ${C.cream200} !important; }
        .skeleton-card { animation: shimmer 1.4s ease-in-out infinite; }
      `}</style>

      {error ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0" }}>
          <AlertCircle size={32} color="#DC2626" style={{ marginBottom: 12 }} />
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#DC2626", marginBottom: 16 }}>
            {error}
          </div>
          <button
            onClick={fetchDashboardData}
            style={{
              background: C.forest600,
              color: C.cream100,
              border: "none",
              borderRadius: 6,
              padding: "10px 20px",
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      ) : showFullSkeleton ? (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="skeleton-card"
                style={{ background: C.cream200, borderRadius: 10, height: 100 }}
              />
            ))}
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.slate400, textAlign: "center", marginTop: 24 }}>
            Loading dashboard...
          </div>
        </div>
      ) : (
        <div className="dashboard-content">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: 0 }}>
                Dashboard
              </h1>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.slate500 }}>
                Welcome back. Here is what is happening today.
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {lastUpdated && (
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.slate400 }}>
                  Updated {formatRelativeTime(lastUpdated.toISOString())}
                </span>
              )}
              <button
                onClick={fetchDashboardData}
                disabled={loading}
                style={{
                  background: C.cream100,
                  border: `1px solid ${C.slate200}`,
                  borderRadius: 6,
                  padding: 8,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RefreshCw
                  size={16}
                  color={C.slate500}
                  style={loading ? { animation: "spin 1s linear infinite" } : undefined}
                />
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
            {metricCards.map((card) => (
              <div
                key={card.key}
                style={{
                  background: C.cream100,
                  border: `1px solid ${C.slate200}`,
                  borderRadius: 12,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.slate500, textTransform: "uppercase", letterSpacing: 1 }}>
                    {card.label}
                  </span>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: C.cream200,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {card.icon}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "12px 0 4px" }}>
                  <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: 32, color: C.forest800 }}>
                    {card.value}
                  </span>
                  {card.showPulse && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: C.gold500,
                        animation: "pulseDot 1.6s ease-out infinite",
                      }}
                    />
                  )}
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: card.subColor }}>
                  {card.sub}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
            <div style={{ background: C.cream100, borderRadius: 12, border: `1px solid ${C.slate200}`, overflow: "hidden" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 24px",
                  borderBottom: `1px solid ${C.slate200}`,
                }}
              >
                <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: C.forest800 }}>
                  Recent Contacts
                </span>
                <Link href="/admin/contacts" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.forest600, textDecoration: "none" }}>
                  View all
                </Link>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.5fr 1.5fr 1fr 1fr",
                  padding: "10px 24px",
                  background: C.cream200,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  color: C.slate500,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                <span>Name</span>
                <span>Company</span>
                <span>Service</span>
                <span>Status</span>
                <span>Date</span>
              </div>

              {recentContacts.length === 0 && !loading ? (
                <div style={{ textAlign: "center", padding: 40, fontFamily: "Inter, sans-serif", fontSize: 14, color: C.slate400 }}>
                  No contacts yet.
                </div>
              ) : (
                recentContacts.map((contact) => {
                  const statusStyle = STATUS_STYLES[contact.status] || STATUS_STYLES.Archived
                  return (
                    <div
                      key={contact.id}
                      className="contact-row"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1.5fr 1.5fr 1fr 1fr",
                        padding: "14px 24px",
                        alignItems: "center",
                        borderTop: `1px solid ${C.slate100}`,
                        background: C.cream100,
                      }}
                    >
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: C.forest800 }}>
                        {contact.full_name}
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.slate500 }}>
                        {contact.company_name || "N/A"}
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.slate500 }}>
                        {contact.service_interest || "General"}
                      </span>
                      <span>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: 20,
                            textTransform: "uppercase",
                            background: statusStyle.background,
                            color: statusStyle.color,
                          }}
                        >
                          {contact.status}
                        </span>
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.slate400 }}>
                        {formatDate(contact.created_at)}
                      </span>
                    </div>
                  )
                })
              )}
            </div>

            <div>
              <div
                style={{
                  background: C.cream100,
                  borderRadius: 12,
                  border: `1px solid ${C.slate200}`,
                  padding: "20px 24px",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: C.forest800, marginBottom: 16 }}>
                  Blog Overview
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.slate100}` }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.slate600 }}>Published</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: C.forest800 }}>
                    {metrics?.blogsPublished ?? 0}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.slate100}` }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.slate600 }}>Drafts</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: C.gold500 }}>
                    {metrics?.blogsDraft ?? 0}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.slate100}` }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.slate600 }}>Archived</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: C.slate400 }}>
                    {metrics?.blogsArchived ?? 0}
                  </span>
                </div>

                <Link
                  href="/admin/blogs"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    color: C.forest600,
                    marginTop: 12,
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Manage posts
                </Link>
              </div>

              <div style={{ background: C.cream100, borderRadius: 12, border: `1px solid ${C.slate200}`, padding: "20px 24px" }}>
                <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 18, color: C.forest800, marginBottom: 16 }}>
                  Recent Activity
                </div>

                {activity.length === 0 ? (
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.slate400 }}>
                    No recent activity.
                  </div>
                ) : (
                  activity.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.slate100}` }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: activityDotColor(event.event_type),
                          marginTop: 4,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.forest800 }}>
                          {formatEventLabel(event)}
                        </div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.slate400 }}>
                          {formatRelativeTime(event.event_timestamp)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
