import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"
import { requirePermission } from "@/lib/supabase/permissions"

export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "view_bs_taxonomy")
  if (denied) return denied

  try {
    const supabase = createAdminClient()

    const [categoriesRes, articlesRes, blogsRes] = await Promise.all([
      supabase.from("bs_categories").select("*").order("sort_order", { ascending: true }),
      supabase.from("bs_articles").select("category_id"),
      supabase.from("bs_blogs").select("category_id"),
    ])

    if (categoriesRes.error) {
      console.error("Categories fetch error:", categoriesRes.error)
      return NextResponse.json({ error: "Failed to fetch categories." }, { status: 500 })
    }

    const counts = new Map<string, number>()
    for (const row of [...(articlesRes.data || []), ...(blogsRes.data || [])]) {
      if (!row.category_id) continue
      counts.set(row.category_id, (counts.get(row.category_id) ?? 0) + 1)
    }

    const categories = (categoriesRes.data || []).map((category) => ({
      ...category,
      itemCount: counts.get(category.id) ?? 0,
    }))

    return NextResponse.json({ categories })
  } catch (err) {
    console.error("Categories GET error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "manage_bs_taxonomy")
  if (denied) return denied

  try {
    const body = await req.json()
    const { name, slug, description, icon } = body

    if (!name?.trim() || !slug?.trim()) {
      return NextResponse.json({ error: "Name and slug are required." }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: existing } = await supabase
      .from("bs_categories")
      .select("id")
      .eq("slug", slug)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: "A category with this slug already exists." }, { status: 409 })
    }

    const { data: maxRow } = await supabase
      .from("bs_categories")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle()

    const { data: category, error } = await supabase
      .from("bs_categories")
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
      console.error("Category insert error:", error)
      return NextResponse.json({ error: "Failed to create category." }, { status: 500 })
    }

    return NextResponse.json({ success: true, category }, { status: 201 })
  } catch (err) {
    console.error("Category POST error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
