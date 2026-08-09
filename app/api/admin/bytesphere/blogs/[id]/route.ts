import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"
import { requirePermission } from "@/lib/supabase/permissions"
import { BS_CONTENT_STATUSES } from "@/lib/bytesphere/types"
import { notifySubscribers } from "@/lib/bytesphere/notify"

const RELATION_SELECT = `
  *,
  author:bs_authors(id, name, initials, avatar_url),
  category:bs_categories(id, name, slug),
  topic:bs_topics(id, name, slug)
`

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "view_bs_blogs")
  if (denied) return denied

  try {
    const { id } = await params
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("bs_blogs")
      .select(RELATION_SELECT)
      .eq("id", id)
      .maybeSingle()

    if (error || !data) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 })
    }

    return NextResponse.json({ blog: data })
  } catch (err) {
    console.error("Blog GET error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "edit_bs_blogs")
  if (denied) return denied

  try {
    const { id } = await params
    const body = await req.json()

    const {
      title,
      slug,
      excerpt,
      content,
      coverImageUrl,
      authorId,
      categoryId,
      topicId,
      readTime,
      metaDescription,
      status,
    } = body

    if (!title || !slug || !excerpt || !content || !categoryId || !authorId) {
      return NextResponse.json(
        { error: "Required fields missing: title, slug, excerpt, content, category, author." },
        { status: 400 }
      )
    }

    if (!BS_CONTENT_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: current, error: currentError } = await supabase
      .from("bs_blogs")
      .select("id, status, published_at")
      .eq("id", id)
      .maybeSingle()

    if (currentError || !current) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 })
    }

    const isFirstPublish = current.status !== "Published"

    const { data: existing } = await supabase
      .from("bs_blogs")
      .select("id")
      .eq("slug", slug)
      .neq("id", id)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: "A blog post with this slug already exists." },
        { status: 409 }
      )
    }

    const publishedAt =
      status === "Published" && !current.published_at
        ? new Date().toISOString()
        : current.published_at

    const { data: blog, error: updateError } = await supabase
      .from("bs_blogs")
      .update({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content,
        cover_image_url: coverImageUrl?.trim() || null,
        author_id: authorId,
        category_id: categoryId,
        topic_id: topicId || null,
        status,
        read_time: readTime?.trim() || null,
        meta_description: metaDescription?.trim() || excerpt.trim(),
        published_at: publishedAt,
      })
      .eq("id", id)
      .select("id, slug, status")
      .single()

    if (updateError) {
      console.error("Blog update error:", updateError)
      return NextResponse.json({ error: "Failed to update blog post." }, { status: 500 })
    }

    // Only notify on the transition INTO Published, never on a republish/edit.
    // Fire and forget: never let a notification failure affect this response.
    if (status === "Published" && isFirstPublish) {
      ;(async () => {
        try {
          const [{ data: authorRow }, { data: categoryRow }] = await Promise.all([
            supabase.from("bs_authors").select("name").eq("id", authorId).maybeSingle(),
            supabase.from("bs_categories").select("name").eq("id", categoryId).maybeSingle(),
          ])
          await notifySubscribers({
            type: "blog",
            title: title.trim(),
            excerpt: excerpt.trim(),
            slug: slug.trim(),
            coverImageUrl: coverImageUrl?.trim() || null,
            authorName: authorRow?.name ?? null,
            categoryName: categoryRow?.name ?? null,
          })
        } catch (err) {
          console.error("Notification error (non-blocking):", err)
        }
      })()
    }

    return NextResponse.json({
      success: true,
      message: status === "Published" ? "Blog post updated and published." : "Blog post saved.",
      blog,
    })
  } catch (err) {
    console.error("Blog PUT error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const denied = requirePermission(auth.user, "delete_bs_blogs")
  if (denied) return denied

  try {
    const { id } = await params
    const supabase = createAdminClient()

    const { error } = await supabase.from("bs_blogs").delete().eq("id", id)

    if (error) {
      console.error("Blog delete error:", error)
      return NextResponse.json({ error: "Failed to delete blog post." }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Blog post deleted." })
  } catch (err) {
    console.error("Blog DELETE error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
