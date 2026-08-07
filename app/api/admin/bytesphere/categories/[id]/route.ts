import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    const body = await req.json()
    const { name, slug, description, icon, sortOrder } = body

    if (!name?.trim() || !slug?.trim()) {
      return NextResponse.json({ error: "Name and slug are required." }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: existing } = await supabase
      .from("bs_categories")
      .select("id")
      .eq("slug", slug)
      .neq("id", id)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: "A category with this slug already exists." }, { status: 409 })
    }

    const updateData: Record<string, string | number | null> = {
      name: name.trim(),
      slug: slug.trim(),
      description: description?.trim() || null,
      icon: icon?.trim() || null,
    }
    if (typeof sortOrder === "number") updateData.sort_order = sortOrder

    const { data: category, error } = await supabase
      .from("bs_categories")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .single()

    if (error) {
      console.error("Category update error:", error)
      return NextResponse.json({ error: "Failed to update category." }, { status: 500 })
    }

    return NextResponse.json({ success: true, category })
  } catch (err) {
    console.error("Category PUT error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  try {
    const { id } = await params
    const supabase = createAdminClient()

    const [articlesRes, blogsRes] = await Promise.all([
      supabase.from("bs_articles").select("id", { count: "exact", head: true }).eq("category_id", id),
      supabase.from("bs_blogs").select("id", { count: "exact", head: true }).eq("category_id", id),
    ])

    const articleCount = articlesRes.count ?? 0
    const blogCount = blogsRes.count ?? 0

    if (articleCount > 0 || blogCount > 0) {
      const parts: string[] = []
      if (articleCount > 0) parts.push(`${articleCount} article${articleCount === 1 ? "" : "s"}`)
      if (blogCount > 0) parts.push(`${blogCount} blog post${blogCount === 1 ? "" : "s"}`)
      return NextResponse.json(
        { error: `Cannot delete: this category is used by ${parts.join(" and ")}. Reassign that content first.` },
        { status: 409 }
      )
    }

    const { error } = await supabase.from("bs_categories").delete().eq("id", id)

    if (error) {
      console.error("Category delete error:", error)
      return NextResponse.json({ error: "Failed to delete category." }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Category deleted." })
  } catch (err) {
    console.error("Category DELETE error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
