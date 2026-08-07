"use client"

import { useRef, useState } from "react"
import { ImagePlus, Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE_BYTES = 5 * 1024 * 1024

type ImageUploadProps = {
  value: string | null
  onChange: (url: string | null) => void
  folder: "covers" | "avatars"
  className?: string
  aspectClassName?: string
}

export function ImageUpload({
  value,
  onChange,
  folder,
  className,
  aspectClassName = "aspect-video",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [dragOver, setDragOver] = useState(false)

  const upload = async (file: File) => {
    setError("")

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.")
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Image is too large. Maximum file size is 5MB.")
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)

      const res = await fetch("/api/admin/bytesphere/upload", { method: "POST", body: formData })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to upload image.")
        return
      }

      onChange(data.url)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
    e.target.value = ""
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) upload(file)
  }

  if (value) {
    return (
      <div className={cn("space-y-2", className)}>
        <div className={cn("relative overflow-hidden rounded-lg border border-border bg-muted", aspectClassName)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded preview" className="h-full w-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            className="absolute top-2 right-2"
            onClick={() => onChange(null)}
            title="Remove image"
          >
            <X className="size-4" />
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input bg-muted/30 p-6 text-center transition-colors",
          dragOver && "border-primary bg-primary/5",
          aspectClassName
        )}
      >
        {uploading ? (
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        ) : (
          <ImagePlus className="size-6 text-muted-foreground" />
        )}
        <div className="text-sm text-muted-foreground">
          {uploading ? "Uploading..." : "Drag & drop an image, or click to browse"}
        </div>
        <div className="text-xs text-muted-foreground">JPG, PNG or WEBP, up to 5MB</div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
