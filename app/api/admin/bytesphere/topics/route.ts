import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"

export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  try {
    const supabase = createAdminClient()

    const [topicsRes, articlesRes, blogsRes] = await Promise.all([
      supabase.from("bs_topics").select("*").order("sort_order", { ascending: true }),
      supabase.from("bs_articles").select("topic_id"),
      supabase.from("bs_blogs").select("topic_id"),
    ])

    if (topicsRes.error) {
      console.error("Topics fetch error:", topicsRes.error)
      return NextResponse.json({ error: "Failed to fetch topics." }, { status: 500 })
    }

    const counts = new Map<string, number>()
    for (const row of [...(articlesRes.data || []), ...(blogsRes.data || [])]) {
      if (!row.topic_id) continue
      counts.set(row.topic_id, (counts.get(row.topic_id) ?? 0) + 1)
    }

    const topics = (topicsRes.data || []).map((topic) => ({
      ...topic,
      itemCount: counts.get(topic.id) ?? 0,
    }))

    return NextResponse.json({ topics })
  } catch (err) {
    console.error("Topics GET error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  try {
    const body = await req.json()
    const { name, slug, description, icon } = body

    if (!name?.trim() || !slug?.trim()) {
      return NextResponse.json({ error: "Name and slug are required." }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: existing } = await supabase
      .from("bs_topics")
      .select("id")
      .eq("slug", slug)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: "A topic with this slug already exists." }, { status: 409 })
    }

    const { data: maxRow } = await supabase
      .from("bs_topics")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle()

    const { data: topic, error } = await supabase
      .from("bs_topics")
      .insert({
        name: name.trim(),
        slug: slug.trim(),
        description: description?.trim() || null,
        icon: icon?.trim() || null,
        sort_order: (maxRow?.sort_order ?? 0) + 1,
      })
      .select("*")
      .single()

    if (error) {
      console.error("Topic insert error:", error)
      return NextResponse.json({ error: "Failed to create topic." }, { status: 500 })
    }

    return NextResponse.json({ success: true, topic }, { status: 201 })
  } catch (err) {
    console.error("Topic POST error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
