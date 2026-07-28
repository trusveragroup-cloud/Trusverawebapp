import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      return NextResponse.json({ error: "Contact not found." }, { status: 404 })
    }

    return NextResponse.json({ contact: data })
  } catch (err) {
    console.error("Contact GET error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const {
      full_name,
      email,
      phone,
      company_name,
      job_title,
      country,
      service_interest,
      message,
      status,
      notes,
    } = body

    const supabase = createAdminClient()
    const updateData: Record<string, string | null> = {}
    if (full_name !== undefined) updateData.full_name = full_name
    if (email !== undefined) updateData.email = email
    if (phone !== undefined) updateData.phone = phone
    if (company_name !== undefined) updateData.company_name = company_name
    if (job_title !== undefined) updateData.job_title = job_title
    if (country !== undefined) updateData.country = country
    if (service_interest !== undefined) updateData.service_interest = service_interest
    if (message !== undefined) updateData.message = message
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes

    const { error } = await supabase
      .from("contacts")
      .update(updateData)
      .eq("id", id)

    if (error) {
      return NextResponse.json({ error: "Failed to update contact." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact PATCH error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
