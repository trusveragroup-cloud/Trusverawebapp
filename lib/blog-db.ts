import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import ws from "ws"
import { createClient } from "@/lib/supabase/server"
import { BlogPost } from "@/lib/blog"

// Map Supabase blog row to BlogPost type
function mapBlogRow(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    category: row.category as BlogPost["category"],
    author: row.author as string,
    authorRole: row.author_role as string,
    authorInitials: row.author_initials as string,
    date: row.published_at
      ? new Date(row.published_at as string).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : new Date(row.created_at as string).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
    readTime: (row.read_time as string) || "5 min read",
    coverImage: (row.cover_image as string) || "",
    featured: row.featured as boolean,
    tags: (row.tags as string[]) || [],
    content: row.content as string,
  }
}

export async function getAllPostsFromDB(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "Published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("getAllPostsFromDB error:", error)
    return []
  }

  return (data || []).map(mapBlogRow)
}

export async function getFeaturedPostFromDB(): Promise<BlogPost | undefined> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "Published")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return undefined
  return mapBlogRow(data)
}

export async function getGridPostsFromDB(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "Published")
    .eq("featured", false)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("getGridPostsFromDB error:", error)
    return []
  }

  return (data || []).map(mapBlogRow)
}

export async function getPostBySlugFromDB(slug: string): Promise<BlogPost | undefined> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "Published")
    .eq("slug", slug)
    .single()

  if (error || !data) return undefined
  return mapBlogRow(data)
}

export async function getRelatedPostsFromDB(
  currentSlug: string,
  category: string,
  count: number = 3
): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "Published")
    .eq("category", category)
    .neq("slug", currentSlug)
    .limit(count)

  if (error) {
    console.error("getRelatedPostsFromDB error:", error)
    return []
  }

  return (data || []).map(mapBlogRow)
}

// generateStaticParams runs at build time with no request/cookies context,
// so this uses a plain anon-key client instead of the cookie-based server client.
export async function getAllSlugsFromDB(): Promise<{ slug: string }[]> {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { realtime: { transport: ws as never } }
  )
  const { data, error } = await supabase
    .from("blogs")
    .select("slug")
    .eq("status", "Published")

  if (error) return []
  return data || []
}
