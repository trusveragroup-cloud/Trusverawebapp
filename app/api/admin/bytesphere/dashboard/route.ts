import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"
import { requirePermission } from "@/lib/supabase/permissions"

type ContentType = "article" | "blog"

type RawContentRow = {
  id: string
  title: string
  slug: string
  status: string
  published_at: string | null
  author: { name: string } | { name: string }[] | null
  category: { name: string } | { name: string }[] | null
}

function relationName(rel: RawContentRow["author"]): string | null {
  if (!rel) return null
  return Array.isArray(rel) ? (rel[0]?.name ?? null) : rel.name
}

export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "view_bs_dashboard")
  if (denied) return denied

  try {
    const supabase = createAdminClient()

    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setDate(1)
    sixMonthsAgo.setHours(0, 0, 0, 0)
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5)

    const CONTENT_SELECT = "id, title, slug, status, published_at, author:bs_authors(name), category:bs_categories(name)"

    const [
      articlesTotal, articlesPublished, articlesDraft, articlesArchived,
      blogsTotal, blogsPublished, blogsDraft, blogsArchived,
      subscribersTotal, subscribersActive, subscribersUnsub, subscribersThisMonth,
      contactsTotal, contactsNew, contactsRead, contactsReplied, contactsClosed,
      authorsTotal, authorsActive,
      categoriesTotal, topicsTotal,
      recentContactsRes,
      recentArticlesRes, recentBlogsRes,
      subscriberTrendRes,
      categoriesRes, publishedArticleCategoriesRes, publishedBlogCategoriesRes,
    ] = await Promise.all([
      supabase.from("bs_articles").select("id", { count: "exact", head: true }),
      supabase.from("bs_articles").select("id", { count: "exact", head: true }).eq("status", "Published"),
      supabase.from("bs_articles").select("id", { count: "exact", head: true }).eq("status", "Draft"),
      supabase.from("bs_articles").select("id", { count: "exact", head: true }).eq("status", "Archived"),
      supabase.from("bs_blogs").select("id", { count: "exact", head: true }),
      supabase.from("bs_blogs").select("id", { count: "exact", head: true }).eq("status", "Published"),
      supabase.from("bs_blogs").select("id", { count: "exact", head: true }).eq("status", "Draft"),
      supabase.from("bs_blogs").select("id", { count: "exact", head: true }).eq("status", "Archived"),
      supabase.from("bs_subscribers").select("id", { count: "exact", head: true }),
      supabase.from("bs_subscribers").select("id", { count: "exact", head: true }).eq("active", true),
      supabase.from("bs_subscribers").select("id", { count: "exact", head: true }).eq("active", false),
      supabase.from("bs_subscribers").select("id", { count: "exact", head: true }).gte("subscribed_at", monthStart.toISOString()),
      supabase.from("bs_contacts").select("id", { count: "exact", head: true }),
      supabase.from("bs_contacts").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("bs_contacts").select("id", { count: "exact", head: true }).eq("status", "read"),
      supabase.from("bs_contacts").select("id", { count: "exact", head: true }).eq("status", "replied"),
      supabase.from("bs_contacts").select("id", { count: "exact", head: true }).eq("status", "closed"),
      supabase.from("bs_authors").select("id", { count: "exact", head: true }),
      supabase.from("bs_authors").select("id", { count: "exact", head: true }).eq("active", true),
      supabase.from("bs_categories").select("id", { count: "exact", head: true }),
      supabase.from("bs_topics").select("id", { count: "exact", head: true }),
      supabase
        .from("bs_contacts")
        .select("id, name, email, company, subject, status, submitted_at")
        .order("submitted_at", { ascending: false })
        .limit(5),
      supabase
        .from("bs_articles")
        .select(CONTENT_SELECT)
        .not("published_at", "is", null)
        .order("published_at", { ascending: false })
        .limit(6),
      supabase
        .from("bs_blogs")
        .select(CONTENT_SELECT)
        .not("published_at", "is", null)
        .order("published_at", { ascending: false })
        .limit(6),
      supabase.from("bs_subscribers").select("subscribed_at").gte("subscribed_at", sixMonthsAgo.toISOString()),
      supabase.from("bs_categories").select("id, name"),
      supabase.from("bs_articles").select("category_id").eq("status", "Published"),
      supabase.from("bs_blogs").select("category_id").eq("status", "Published"),
    ])

    const stats = {
      articles: {
        total: articlesTotal.count ?? 0,
        published: articlesPublished.count ?? 0,
        drafts: articlesDraft.count ?? 0,
        archived: articlesArchived.count ?? 0,
      },
      blogs: {
        total: blogsTotal.count ?? 0,
        published: blogsPublished.count ?? 0,
        drafts: blogsDraft.count ?? 0,
        archived: blogsArchived.count ?? 0,
      },
      subscribers: {
        total: subscribersTotal.count ?? 0,
        active: subscribersActive.count ?? 0,
        unsubscribed: subscribersUnsub.count ?? 0,
        thisMonth: subscribersThisMonth.count ?? 0,
      },
      contacts: {
        total: contactsTotal.count ?? 0,
        new: contactsNew.count ?? 0,
        read: contactsRead.count ?? 0,
        replied: contactsReplied.count ?? 0,
        closed: contactsClosed.count ?? 0,
      },
      authors: {
        total: authorsTotal.count ?? 0,
        active: authorsActive.count ?? 0,
      },
      categories: {
        total: categoriesTotal.count ?? 0,
      },
      topics: {
        total: topicsTotal.count ?? 0,
      },
    }

    const recentContacts = recentContactsRes.data || []

    const articleRows = ((recentArticlesRes.data || []) as unknown as RawContentRow[]).map((r) => ({ ...r, type: "article" as ContentType }))
    const blogRows = ((recentBlogsRes.data || []) as unknown as RawContentRow[]).map((r) => ({ ...r, type: "blog" as ContentType }))

    const recentContent = [...articleRows, ...blogRows]
      .sort((a, b) => new Date(b.published_at as string).getTime() - new Date(a.published_at as string).getTime())
      .slice(0, 6)
      .map((r) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        type: r.type,
        publishedAt: r.published_at,
        author: relationName(r.author),
        category: relationName(r.category),
      }))

    const buckets: { year: number; month: number; label: string; count: number }[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setDate(1)
      d.setMonth(d.getMonth() - i)
      buckets.push({ year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleDateString("en-US", { month: "short" }), count: 0 })
    }
    for (const row of subscriberTrendRes.data || []) {
      const d = new Date(row.subscribed_at)
      const bucket = buckets.find((b) => b.year === d.getFullYear() && b.month === d.getMonth())
      if (bucket) bucket.count += 1
    }
    const subscriberTrend = buckets.map((b) => ({ month: b.label, count: b.count }))

    const categoryCounts = new Map<string, number>()
    for (const row of [...(publishedArticleCategoriesRes.data || []), ...(publishedBlogCategoriesRes.data || [])]) {
      if (!row.category_id) continue
      categoryCounts.set(row.category_id, (categoryCounts.get(row.category_id) ?? 0) + 1)
    }
    const categoryBreakdown = (categoriesRes.data || [])
      .map((cat) => ({ id: cat.id, name: cat.name, count: categoryCounts.get(cat.id) ?? 0 }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count)

    return NextResponse.json({
      stats,
      recentContacts,
      recentContent,
      subscriberTrend,
      categoryBreakdown,
    })
  } catch (err) {
    console.error("ByteSphere dashboard error:", err)
    return NextResponse.json({ error: "Failed to fetch dashboard data." }, { status: 500 })
  }
}
