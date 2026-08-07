export type BsContentStatus = "Draft" | "Published" | "Archived"

export type BsAuthor = {
  id: string
  name: string
  role: string | null
  bio: string | null
  avatar_url: string | null
  initials: string | null
  active: boolean
  created_at: string
  updated_at: string
}

export type BsCategory = {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export type BsTopic = {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export type BsArticle = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string | null
  author_id: string | null
  category_id: string | null
  topic_id: string | null
  status: BsContentStatus
  featured: boolean
  editors_pick: boolean
  read_time: string | null
  meta_description: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export type BsBlog = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string | null
  author_id: string | null
  category_id: string | null
  topic_id: string | null
  status: BsContentStatus
  read_time: string | null
  meta_description: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export type BsArticleWithRelations = BsArticle & {
  author: Pick<BsAuthor, "id" | "name" | "initials" | "avatar_url"> | null
  category: Pick<BsCategory, "id" | "name" | "slug"> | null
  topic: Pick<BsTopic, "id" | "name" | "slug"> | null
}

export type BsBlogWithRelations = BsBlog & {
  author: Pick<BsAuthor, "id" | "name" | "initials" | "avatar_url"> | null
  category: Pick<BsCategory, "id" | "name" | "slug"> | null
  topic: Pick<BsTopic, "id" | "name" | "slug"> | null
}

export const BS_CONTENT_STATUSES: BsContentStatus[] = ["Draft", "Published", "Archived"]
