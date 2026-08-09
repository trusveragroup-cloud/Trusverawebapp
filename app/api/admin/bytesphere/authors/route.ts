import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"
import { requirePermission } from "@/lib/supabase/permissions"

export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "view_bs_authors")
  if (denied) return denied

  try {
    const supabase = createAdminClient()

    const [authorsRes, articlesRes, blogsRes] = await Promise.all([
      supabase.from("bs_authors").select("*").order("name", { ascending: true }),
      supabase.from("bs_articles").select("author_id"),
      supabase.from("bs_blogs").select("author_id"),
    ])

    if (authorsRes.error) {
      console.error("Authors fetch error:", authorsRes.error)
      return NextResponse.json({ error: "Failed to fetch authors." }, { status: 500 })
    }

    const articleCounts = new Map<string, number>()
    for (const row of articlesRes.data || []) {
      if (!row.author_id) continue
      articleCounts.set(row.author_id, (articleCounts.get(row.author_id) ?? 0) + 1)
    }
    const blogCounts = new Map<string, number>()
    for (const row of blogsRes.data || []) {
      if (!row.author_id) continue
      blogCounts.set(row.author_id, (blogCounts.get(row.author_id) ?? 0) + 1)
    }

    const authors = (authorsRes.data || []).map((author) => ({
      ...author,
      articleCount: articleCounts.get(author.id) ?? 0,
      blogCount: blogCounts.get(author.id) ?? 0,
    }))

    return NextResponse.json({ authors })
  } catch (err) {
    console.error("Authors GET error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "manage_bs_authors")
  if (denied) return denied

  try {
    const body = await req.json()
    const { name, role, bio, avatarUrl, initials, active } = body

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: author, error } = await supabase
      .from("bs_authors")
      .insert({
        name: name.trim(),
        role: role?.trim() || null,
        bio: bio?.trim() || null,
        avatar_url: avatarUrl?.trim() || null,
        initials: initials?.trim() || null,
        active: active ?? true,
      })
      .select("*")
      .single()

    if (error) {
      console.error("Author insert error:", error)
      return NextResponse.json({ error: "Failed to create author." }, { status: 500 })
    }

    return NextResponse.json({ success: true, author }, { status: 201 })
  } catch (err) {
    console.error("Author POST error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
