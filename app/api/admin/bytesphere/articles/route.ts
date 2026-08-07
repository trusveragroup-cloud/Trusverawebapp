import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"
import { BS_CONTENT_STATUSES, type BsContentStatus } from "@/lib/bytesphere/types"

const RELATION_SELECT = `
  *,
  author:bs_authors(id, name, initials, avatar_url),
  category:bs_categories(id, name, slug),
  topic:bs_topics(id, name, slug)
`

export async function GET(req: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const author = searchParams.get("author")
    const search = searchParams.get("search")
    const slug = searchParams.get("slug")
    const id = searchParams.get("id")

    const supabase = createAdminClient()

    let query = supabase
      .from("bs_articles")
      .select(RELATION_SELECT)
      .order("published_at", { ascending: false, nullsFirst: false })

    if (status && status !== "All") query = query.eq("status", status)
    if (category && category !== "All") query = query.eq("category_id", category)
    if (author && author !== "All") query = query.eq("author_id", author)
    if (search) query = query.ilike("title", `%${search}%`)
    if (slug) query = query.eq("slug", slug)
    if (id) query = query.eq("id", id)

    const { data, error } = await query

    if (error) {
      console.error("Articles fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch articles." }, { status: 500 })
    }

    return NextResponse.json({ articles: data || [] })
  } catch (err) {
    console.error("Articles GET error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  try {
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
      featured,
      editorsPick,
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

    const { data: existing } = await supabase
      .from("bs_articles")
      .select("id")
      .eq("slug", slug)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: "An article with this slug already exists. Please use a different title or edit the slug." },
        { status: 409 }
      )
    }

    if (featured) {
      await supabase.from("bs_articles").update({ featured: false }).eq("featured", true)
    }

    const { data: article, error: insertError } = await supabase
      .from("bs_articles")
      .insert({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content,
        cover_image_url: coverImageUrl?.trim() || null,
        author_id: authorId,
        category_id: categoryId,
        topic_id: topicId || null,
        status,
        featured: !!featured,
        editors_pick: !!editorsPick,
        read_time: readTime?.trim() || null,
        meta_description: metaDescription?.trim() || excerpt.trim(),
        published_at: (status as BsContentStatus) === "Published" ? new Date().toISOString() : null,
      })
      .select("id, slug, status")
      .single()

    if (insertError) {
      console.error("Article insert error:", insertError)
      return NextResponse.json({ error: "Failed to save article. Please try again." }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: status === "Published" ? "Article published successfully." : "Article saved as draft.",
        article,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error("Article POST error:", err)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
