import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { createAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/requireAdmin"

const MAX_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}
const ALLOWED_FOLDERS = ["covers", "avatars"]

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error

  try {
    const formData = await req.formData()
    const file = formData.get("file")
    const folder = formData.get("folder")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 })
    }
    if (typeof folder !== "string" || !ALLOWED_FOLDERS.includes(folder)) {
      return NextResponse.json({ error: "Invalid upload folder." }, { status: 400 })
    }

    const ext = ALLOWED_TYPES[file.type]
    if (!ext) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a JPG, PNG, or WEBP image." },
        { status: 400 }
      )
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Image is too large. Maximum file size is 5MB." },
        { status: 400 }
      )
    }

    const path = `${folder}/${randomUUID()}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const supabase = createAdminClient()
    const { error: uploadError } = await supabase.storage
      .from("bytesphere")
      .upload(path, buffer, { contentType: file.type, upsert: false })

    if (uploadError) {
      console.error("Image upload error:", uploadError)
      return NextResponse.json({ error: "Failed to upload image. Please try again." }, { status: 500 })
    }

    const { data: publicUrlData } = supabase.storage.from("bytesphere").getPublicUrl(path)

    return NextResponse.json({ success: true, url: publicUrlData.publicUrl }, { status: 201 })
  } catch (err) {
    console.error("Upload POST error:", err)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
