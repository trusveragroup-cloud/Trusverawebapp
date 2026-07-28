import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      featured,
      author,
      authorRole,
      authorInitials,
      readTime,
      metaDescription,
      status,
    } = body

    // Validation
    if (!title || !slug || !excerpt || !content || !category || !author || !authorRole || !authorInitials) {
      return NextResponse.json(
        { error: "Required fields missing: title, slug, excerpt, content, category, author, authorRole, authorInitials." },
        { status: 400 }
      )
    }

    if (!["Draft", "Published", "Archived"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value." },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Check slug is unique
    const { data: existing } = await supabase
      .from("blogs")
      .select("id")
      .eq("slug", slug)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists. Please use a different title or edit the slug." },
        { status: 409 }
      )
    }

    // Insert blog post
    const { data: blog, error: blogError } = await supabase
      .from("blogs")
      .insert({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content: content,
        cover_image: coverImage?.trim() || null,
        category: category,
        tags: tags || [],
        featured: featured || false,
        author: author.trim(),
        author_role: authorRole.trim(),
        author_initials: authorInitials.trim(),
        read_time: readTime?.trim() || null,
        meta_description: metaDescription?.trim() || null,
        status: status,
      })
      .select("id, slug, status")
      .single()

    if (blogError) {
      console.error("Blog insert error:", blogError)
      return NextResponse.json(
        { error: "Failed to save blog post. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: status === "Published"
          ? "Blog post published successfully."
          : "Blog post saved as draft.",
        blog,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error("Blog API error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const id = searchParams.get("id")

    const supabase = createAdminClient()

    let query = supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false })

    if (status && status !== "All") {
      query = query.eq("status", status)
    }

    if (search) {
      query = query.ilike("title", `%${search}%`)
    }

    if (id) {
      query = query.eq("id", id)
    }

    const { data, error } = await query

    if (error) {
      console.error("Blogs fetch error:", error)
      return NextResponse.json(
        { error: "Failed to fetch blog posts." },
        { status: 500 }
      )
    }

    return NextResponse.json({ blogs: data || [] })
  } catch (err) {
    console.error("Blogs GET error:", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      id,
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      featured,
      author,
      authorRole,
      authorInitials,
      readTime,
      metaDescription,
      status,
    } = body

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required." },
        { status: 400 }
      )
    }

    if (!title || !slug || !excerpt || !content || !category || !author) {
      return NextResponse.json(
        { error: "Required fields missing." },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Check slug uniqueness excluding current post
    const { data: existing } = await supabase
      .from("blogs")
      .select("id")
      .eq("slug", slug)
      .neq("id", id)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists." },
        { status: 409 }
      )
    }

    const { data: blog, error: updateError } = await supabase
      .from("blogs")
      .update({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content,
        cover_image: coverImage?.trim() || null,
        category,
        tags: tags || [],
        featured: featured || false,
        author: author.trim(),
        author_role: authorRole.trim(),
        author_initials: authorInitials.trim(),
        read_time: readTime?.trim() || null,
        meta_description: metaDescription?.trim() || null,
        status,
      })
      .eq("id", id)
      .select("id, slug, status")
      .single()

    if (updateError) {
      console.error("Blog update error:", updateError)
      return NextResponse.json(
        { error: "Failed to update blog post." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: status === "Published"
        ? "Blog post updated and published."
        : "Blog post saved as draft.",
      blog,
    })
  } catch (err) {
    console.error("Blog PATCH error:", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required." },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Soft delete — set status to Archived instead of hard delete
    const { error } = await supabase
      .from("blogs")
      .update({ status: "Archived" })
      .eq("id", id)

    if (error) {
      console.error("Blog delete error:", error)
      return NextResponse.json(
        { error: "Failed to delete blog post." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Blog post archived successfully.",
    })
  } catch (err) {
    console.error("Blog DELETE error:", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}
