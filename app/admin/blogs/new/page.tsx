"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import LinkExtension from "@tiptap/extension-link"
import ImageExtension from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import { C } from "@/lib/colors"
import {
  ChevronLeft, Save, Eye, Send,
  Bold, Italic, Underline as UnderlineIcon,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Link2, Image as ImageIcon,
  X, Plus, Star, AlertCircle
} from "lucide-react"
import { usePermissions } from "@/hooks/usePermissions"
import AccessDenied from "@/components/admin/AccessDenied"

const CATEGORIES = [
  "Intent Data",
  "Demand Generation",
  "Account Profiling",
  "Lead Generation",
  "Market Research",
  "Email Marketing",
]

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        width: 32,
        height: 32,
        borderRadius: 4,
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: active ? C.forest600 : "transparent",
        color: active ? C.cream100 : C.slate600,
      }}
    >
      {children}
    </button>
  )
}

function ToolbarDivider() {
  return <div style={{ width: 1, height: 20, background: C.slate200, margin: "0 4px" }} />
}

export default function NewBlogPostPage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [slugEditing, setSlugEditing] = useState(false)
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [author, setAuthor] = useState("")
  const [authorRole, setAuthorRole] = useState("")
  const [authorInitials, setAuthorInitials] = useState("")
  const [readTime, setReadTime] = useState("")
  const [coverImageUrl, setCoverImageUrl] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [featured, setFeatured] = useState(false)
  const [status, setStatus] = useState<"Draft" | "Published">("Draft")
  const [metaDescription, setMetaDescription] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [titleFocused, setTitleFocused] = useState(false)
  const [excerptFocused, setExcerptFocused] = useState(false)

  const { can, loading } = usePermissions()
  const router = useRouter()

  const savePost = async (postStatus: "Draft" | "Published") => {
    if (!title.trim()) {
      alert("Please add a title before saving.")
      return
    }
    if (!excerpt.trim()) {
      alert("Please add an excerpt before saving.")
      return
    }
    if (!category) {
      alert("Please select a category before saving.")
      return
    }
    if (!author.trim()) {
      alert("Please add an author name before saving.")
      return
    }
    if (!authorRole.trim()) {
      alert("Please add an author role before saving.")
      return
    }
    if (postStatus === "Published" && !editor?.getText().trim()) {
      alert("Please add content before publishing.")
      return
    }

    setIsSaving(true)

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content: editor?.getHTML() || "",
          coverImage: coverImageUrl,
          category,
          tags,
          featured,
          author,
          authorRole,
          authorInitials,
          readTime,
          metaDescription,
          status: postStatus,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Failed to save post. Please try again.")
        return
      }

      if (postStatus === "Published") {
        router.push("/admin/blogs?published=true")
      } else {
        router.push("/admin/blogs?saved=true")
      }
    } catch {
      alert("Network error. Please check your connection and try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
      Placeholder.configure({ placeholder: "Start writing your article..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class: "tiptap-editor",
        style: "min-height: 480px; padding: 24px; outline: none; font-family: var(--font-inter); font-size: 16px; line-height: 1.8; color: #1a2332;",
      },
    },
  })

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    )
  }

  const handleAuthorChange = (value: string) => {
    setAuthor(value)
    const parts = value.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) {
      setAuthorInitials("")
    } else if (parts.length === 1) {
      setAuthorInitials(parts[0].slice(0, 2).toUpperCase())
    } else {
      setAuthorInitials((parts[0][0] + parts[parts.length - 1][0]).toUpperCase())
    }
  }

  const handleAddTag = useCallback(() => {
    const value = tagInput.trim()
    if (value && !tags.includes(value)) {
      setTags((prev) => [...prev, value])
    }
    setTagInput("")
  }, [tagInput, tags])

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  const handleSetLink = () => {
    const url = window.prompt("Enter URL:")
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run()
    }
  }

  const handleSetImage = () => {
    const url = window.prompt("Enter image URL:")
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  const metaOverLimit = metaDescription.length > 160

  if (!loading && !can("create_blogs")) return <AccessDenied />

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        .tiptap-editor:focus { outline: none; }
        .tiptap-editor h1 { font-family: var(--font-dm-serif); font-size: 32px; color: #0F3D25; margin: 32px 0 16px; line-height: 1.2; }
        .tiptap-editor h2 { font-family: var(--font-dm-serif); font-size: 26px; color: #0F3D25; margin: 28px 0 14px; line-height: 1.25; }
        .tiptap-editor h3 { font-family: var(--font-playfair); font-size: 20px; color: #166B4A; margin: 24px 0 12px; }
        .tiptap-editor p { font-family: var(--font-inter); font-size: 16px; line-height: 1.8; margin-bottom: 16px; color: #374151; }
        .tiptap-editor blockquote { border-left: 4px solid #C9A84C; padding: 16px 20px; margin: 24px 0; font-style: italic; background: #F7F5F0; border-radius: 0 8px 8px 0; }
        .tiptap-editor ul, .tiptap-editor ol { padding-left: 24px; margin-bottom: 16px; }
        .tiptap-editor li { font-size: 15px; line-height: 1.75; margin-bottom: 6px; color: #374151; }
        .tiptap-editor a { color: #166B4A; text-decoration: underline; }
        .tiptap-editor img { max-width: 100%; border-radius: 8px; margin: 16px 0; }
        .tiptap-editor p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #9CA3AF; pointer-events: none; float: left; height: 0; }
        .preview-prose h2 { font-family: var(--font-dm-serif); font-size: 30px; color: #0F3D25; margin: 48px 0 20px; }
        .preview-prose p { font-family: var(--font-inter); font-size: 17px; line-height: 1.85; margin-bottom: 22px; color: #374151; }
        .preview-prose blockquote { border-left: 4px solid #C9A84C; padding: 20px 24px; margin: 32px 0; font-style: italic; background: #F7F5F0; border-radius: 0 8px 8px 0; }
        .preview-prose ul { padding-left: 24px; margin-bottom: 20px; }
        .preview-prose li { font-size: 16px; line-height: 1.8; margin-bottom: 8px; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <Link
            href="/admin/blogs"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
            }}
          >
            <ChevronLeft size={16} color={C.slate500} />
            <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>
              Blog Posts
            </span>
          </Link>
          <h1
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: 26,
              color: C.forest800,
              margin: "4px 0 0",
            }}
          >
            New Blog Post
          </h1>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={() => savePost("Draft")}
            disabled={isSaving}
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              color: C.slate600,
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              padding: "9px 18px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: isSaving ? "default" : "pointer",
            }}
          >
            <Save size={15} />
            {isSaving ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={() => savePost("Published")}
            disabled={isSaving}
            style={{
              background: C.forest600,
              color: C.cream100,
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              fontWeight: 700,
              padding: "9px 18px",
              borderRadius: 6,
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: isSaving ? "default" : "pointer",
            }}
          >
            <Send size={15} />
            {isSaving ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "flex-start" }}>
        <div>
          <div
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              borderRadius: 12,
              padding: 28,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: C.slate500,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              Post Title
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              placeholder="Enter your post title..."
              style={{
                width: "100%",
                border: "none",
                borderBottom: `2px solid ${titleFocused ? C.forest600 : C.slate200}`,
                padding: "8px 0",
                fontFamily: "var(--font-dm-serif)",
                fontSize: 28,
                color: C.forest800,
                outline: "none",
                background: "transparent",
                boxSizing: "border-box",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate400 }}>
                URL:
              </span>
              {slugEditing ? (
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  onBlur={() => setSlugEditing(false)}
                  autoFocus
                  style={{
                    border: "none",
                    borderBottom: `1px solid ${C.slate400}`,
                    fontFamily: "var(--font-inter)",
                    fontSize: 13,
                    width: 280,
                    outline: "none",
                    background: "transparent",
                    color: C.forest600,
                  }}
                />
              ) : (
                <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.forest600, fontStyle: "normal" }}>
                  /blog/{slug}
                </span>
              )}
              <button
                type="button"
                onClick={() => setSlugEditing((prev) => !prev)}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 11,
                  color: C.slate400,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </div>

            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: C.slate500,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginTop: 20,
              }}
            >
              Excerpt
            </div>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              onFocus={() => setExcerptFocused(true)}
              onBlur={() => setExcerptFocused(false)}
              placeholder="Write a 2-3 sentence summary shown on the blog listing page..."
              style={{
                width: "100%",
                minHeight: 80,
                border: `1px solid ${excerptFocused ? C.forest600 : C.slate200}`,
                borderRadius: 6,
                padding: "10px 12px",
                fontFamily: "var(--font-inter)",
                fontSize: 14,
                color: C.slate700,
                lineHeight: 1.65,
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
                marginTop: 8,
              }}
            />
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: C.slate400, textAlign: "right" }}>
              {excerpt.length} / 200 chars
            </div>
          </div>

          <div
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: `1px solid ${C.slate200}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 12,
                  color: C.slate500,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Content
              </span>
              <button
                type="button"
                onClick={() => setPreviewMode((prev) => !prev)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-inter)",
                  fontSize: 12,
                  color: C.slate500,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Eye size={14} />
                Preview
              </button>
            </div>

            {!previewMode && (
              <div
                style={{
                  padding: "10px 16px",
                  borderBottom: `1px solid ${C.slate200}`,
                  background: C.cream200,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  flexWrap: "wrap",
                }}
              >
                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                  active={editor?.isActive("heading", { level: 1 })}
                  title="Heading 1"
                >
                  <Heading1 size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                  active={editor?.isActive("heading", { level: 2 })}
                  title="Heading 2"
                >
                  <Heading2 size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                  active={editor?.isActive("heading", { level: 3 })}
                  title="Heading 3"
                >
                  <Heading3 size={16} />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  active={editor?.isActive("bold")}
                  title="Bold"
                >
                  <Bold size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  active={editor?.isActive("italic")}
                  title="Italic"
                >
                  <Italic size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                  active={editor?.isActive("underline")}
                  title="Underline"
                >
                  <UnderlineIcon size={16} />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  active={editor?.isActive("bulletList")}
                  title="Bullet List"
                >
                  <List size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  active={editor?.isActive("orderedList")}
                  title="Ordered List"
                >
                  <ListOrdered size={16} />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                  active={editor?.isActive("blockquote")}
                  title="Blockquote"
                >
                  <Quote size={16} />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton onClick={handleSetLink} title="Insert Link">
                  <Link2 size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={handleSetImage} title="Insert Image">
                  <ImageIcon size={16} />
                </ToolbarButton>
              </div>
            )}

            {previewMode ? (
              <div
                className="prose preview-prose"
                style={{ padding: 24, minHeight: 480 }}
                dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
              />
            ) : (
              <EditorContent editor={editor} />
            )}
          </div>
        </div>

        <div>
          <div
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: C.slate500,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: `1px solid ${C.slate200}`,
              }}
            >
              Publish Settings
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate600 }}>
                Status
              </span>
              <span
                style={{
                  background: status === "Draft" ? C.forest100 : C.forest600,
                  color: status === "Draft" ? C.forest700 : C.cream100,
                  fontFamily: "var(--font-inter)",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: 20,
                }}
              >
                {status}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate600 }}>
                Featured Post
              </span>
              <div
                onClick={() => setFeatured((prev) => !prev)}
                style={{
                  width: 40,
                  height: 22,
                  borderRadius: 11,
                  background: featured ? C.forest600 : C.slate400,
                  position: "relative",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    background: C.white,
                    borderRadius: "50%",
                    position: "absolute",
                    top: 2,
                    left: featured ? 20 : 2,
                    transition: "left 0.2s",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate600 }}>
                Read Time
              </span>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="6 min"
                style={{
                  width: 80,
                  border: `1px solid ${C.slate200}`,
                  borderRadius: 4,
                  padding: "4px 8px",
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: C.slate500,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
              }}
            >
              Categorization
            </div>

            <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate600, marginBottom: 6 }}>
              Category
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                border: `1px solid ${C.slate200}`,
                borderRadius: 6,
                padding: "8px 10px",
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: C.forest900,
                background: C.cream100,
                outline: "none",
                marginBottom: 14,
                boxSizing: "border-box",
              }}
            >
              <option value=""></option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate600, marginBottom: 6 }}>
              Tags
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: C.forest100,
                    color: C.forest700,
                    fontFamily: "var(--font-inter)",
                    fontSize: 12,
                    padding: "4px 10px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {tag}
                  <X
                    size={10}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveTag(tag)}
                  />
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="Add tag..."
                style={{
                  flex: 1,
                  border: `1px solid ${C.slate200}`,
                  borderRadius: 6,
                  padding: "6px 10px",
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={handleAddTag}
                style={{
                  background: C.forest600,
                  color: C.cream100,
                  border: "none",
                  borderRadius: 4,
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: C.slate500,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
              }}
            >
              Author
            </div>

            <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate600, marginBottom: 4 }}>
              Name
            </div>
            <input
              type="text"
              value={author}
              onChange={(e) => handleAuthorChange(e.target.value)}
              style={{
                width: "100%",
                border: `1px solid ${C.slate200}`,
                borderRadius: 6,
                padding: "8px 10px",
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: C.forest900,
                outline: "none",
                marginBottom: 12,
                boxSizing: "border-box",
              }}
            />

            <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate600, marginBottom: 4 }}>
              Role
            </div>
            <input
              type="text"
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              placeholder="e.g. Head of Strategy"
              style={{
                width: "100%",
                border: `1px solid ${C.slate200}`,
                borderRadius: 6,
                padding: "8px 10px",
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: C.forest900,
                outline: "none",
                marginBottom: 12,
                boxSizing: "border-box",
              }}
            />

            <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate400, marginBottom: 6 }}>
              Initials (auto)
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                background: C.forest100,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                fontWeight: 700,
                color: C.forest700,
              }}
            >
              {authorInitials || "?"}
            </div>
          </div>

          <div
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: C.slate500,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
              }}
            >
              Cover Image
            </div>
            <input
              type="text"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              style={{
                width: "100%",
                border: `1px solid ${C.slate200}`,
                borderRadius: 6,
                padding: "8px 10px",
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: C.forest900,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {coverImageUrl ? (
              <img
                src={coverImageUrl}
                alt="Cover preview"
                style={{
                  width: "100%",
                  height: 140,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginTop: 10,
                  border: `1px solid ${C.slate200}`,
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 100,
                  background: C.cream200,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <ImageIcon size={24} color={C.slate400} />
              </div>
            )}
          </div>

          <div
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: C.slate500,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
              }}
            >
              SEO
            </div>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate600, marginBottom: 4 }}>
              Meta Description
            </div>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Describe this post for search engines..."
              style={{
                width: "100%",
                minHeight: 72,
                border: `1px solid ${C.slate200}`,
                borderRadius: 6,
                padding: "8px 10px",
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: C.slate700,
                lineHeight: 1.5,
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 4,
                marginTop: 4,
              }}
            >
              {metaOverLimit && <AlertCircle size={12} color={C.red400} />}
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 11,
                  color: metaOverLimit ? C.red400 : C.slate400,
                }}
              >
                {metaDescription.length} / 160 chars
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
