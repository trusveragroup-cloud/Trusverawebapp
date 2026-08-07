export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function estimateReadTime(html: string, wordsPerMinute = 200): string {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  const wordCount = text ? text.split(" ").length : 0
  const minutes = Math.max(1, Math.round(wordCount / wordsPerMinute))
  return `${minutes} min read`
}
