"use client"

import { useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ImageExtension from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image as ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
  minHeight?: number
}

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
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="icon-sm"
      onClick={onClick}
      title={title}
      aria-pressed={!!active}
    >
      {children}
    </Button>
  )
}

function ToolbarDivider() {
  return <div className="mx-1 h-5 w-px bg-border" />
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your article...",
  className,
  minHeight = 320,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false },
        underline: {},
      }),
      ImageExtension,
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-editor",
        style: `min-height: ${minHeight}px; padding: 24px; outline: none; font-family: var(--font-inter); font-size: 16px; line-height: 1.8; color: #1a2332;`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [value, editor])

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

  return (
    <div className={cn(className)}>
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
      `}</style>

      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/50 px-4 py-2.5">
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

      <EditorContent editor={editor} />
    </div>
  )
}
