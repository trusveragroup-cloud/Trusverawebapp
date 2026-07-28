import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const type = requestUrl.searchParams.get("type")
  const origin = requestUrl.origin

  console.log("Auth callback hit - redirecting to handler page", { type })

  // Redirect to a client-side page that can read hash fragments
  if (type === "invite" || type === "recovery") {
    return NextResponse.redirect(`${origin}/admin/auth-handler?type=${type}`)
  }

  return NextResponse.redirect(`${origin}/admin/dashboard`)
}
