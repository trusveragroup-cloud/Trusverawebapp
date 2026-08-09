import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"
import { requirePermission } from "@/lib/supabase/permissions"

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "manage_bs_authors")
  if (denied) return denied

  try {
    const { id } = await params
    const body = await req.json()
    const { name, role, bio, avatarUrl, initials, active } = body

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: author, error } = await supabase
      .from("bs_authors")
      .update({
        name: name.trim(),
        role: role?.trim() || null,
        bio: bio?.trim() || null,
        avatar_url: avatarUrl?.trim() || null,
        initials: initials?.trim() || null,
        active: active ?? true,
      })
      .eq("id", id)
      .select("*")
      .single()

    if (error) {
      console.error("Author update error:", error)
      return NextResponse.json({ error: "Failed to update author." }, { status: 500 })
    }

    return NextResponse.json({ success: true, author })
  } catch (err) {
    console.error("Author PUT error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "manage_bs_authors")
  if (denied) return denied

  try {
    const { id } = await params
    const supabase = createAdminClient()

    const [articlesRes, blogsRes] = await Promise.all([
      supabase.from("bs_articles").select("id", { count: "exact", head: true }).eq("author_id", id),
      supabase.from("bs_blogs").select("id", { count: "exact", head: true }).eq("author_id", id),
    ])

    const articleCount = articlesRes.count ?? 0
    const blogCount = blogsRes.count ?? 0

    if (articleCount > 0 || blogCount > 0) {
      const parts: string[] = []
      if (articleCount > 0) parts.push(`${articleCount} article${articleCount === 1 ? "" : "s"}`)
      if (blogCount > 0) parts.push(`${blogCount} blog post${blogCount === 1 ? "" : "s"}`)
      return NextResponse.json(
        {
          error: `Cannot delete: this author is referenced by ${parts.join(" and ")}. Deactivate the author instead, or reassign the content first.`,
        },
        { status: 409 }
      )
    }

    const { error } = await supabase.from("bs_authors").delete().eq("id", id)

    if (error) {
      console.error("Author delete error:", error)
      return NextResponse.json({ error: "Failed to delete author." }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Author deleted." })
  } catch (err) {
    console.error("Author DELETE error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
