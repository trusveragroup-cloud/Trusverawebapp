import nodemailer from "nodemailer"
import { createAdminClient } from "@/lib/supabase/admin"

const transporter = nodemailer.createTransport({
  host: process.env.GODADDY_SMTP_HOST,
  port: parseInt(process.env.GODADDY_SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.GODADDY_SMTP_USER,
    pass: process.env.GODADDY_SMTP_PASS,
  },
})

type ContentType = "article" | "blog"

type NotifyPayload = {
  type: ContentType
  title: string
  excerpt: string
  slug: string
  coverImageUrl: string | null
  authorName: string | null
  categoryName: string | null
}

export async function notifySubscribers(payload: NotifyPayload) {
  const supabase = createAdminClient()

  // Fetch all active subscribers
  const { data: subscribers, error } = await supabase
    .from("bs_subscribers")
    .select("id, email, name, unsubscribe_token")
    .eq("active", true)

  if (error || !subscribers || subscribers.length === 0) {
    console.log("No active subscribers or fetch error:", error)
    return
  }

  const siteUrl = process.env.NEXT_PUBLIC_BS_SITE_URL
    || "https://bytesphere.com"

  const contentUrl = `${siteUrl}/${payload.type === "article"
    ? "articles" : "blogs"}/${payload.slug}`

  const typeLabel = payload.type === "article" ? "Article" : "Blog Post"

  // Send to each subscriber individually so unsubscribe links are
  // personalised. Fire-and-forget with per-email error handling.
  const results = await Promise.allSettled(
    subscribers.map((subscriber) =>
      transporter.sendMail({
        from: '"ByteSphere" <info@trusveragrp.com>',
        to: subscriber.email,
        subject: `New ${typeLabel}: ${payload.title}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin:0;padding:0;background:#FAF8F3;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#FAF8F3;padding:40px 20px;">
              <tr><td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                       style="background:#fff;border-radius:8px;
                              border:1px solid #DDD5C2;overflow:hidden;">

                  <tr>
                    <td style="background:#0B2B27;padding:28px 40px;
                               border-bottom:3px solid #C79A3E;">
                      <h1 style="margin:0;font-family:Georgia,serif;
                                 font-size:24px;font-weight:400;
                                 color:#FAF8F3;">
                        Byte<span style="color:#C79A3E;">Sphere</span>
                      </h1>
                      <p style="margin:4px 0 0;font-family:Arial,sans-serif;
                                font-size:11px;color:#BFDAD3;
                                text-transform:uppercase;
                                letter-spacing:0.1em;">
                        New ${typeLabel}
                      </p>
                    </td>
                  </tr>

                  ${payload.coverImageUrl ? `
                  <tr>
                    <td style="padding:0;">
                      <img src="${payload.coverImageUrl}"
                           alt="${payload.title}"
                           width="600"
                           style="display:block;width:100%;
                                  max-height:280px;object-fit:cover;" />
                    </td>
                  </tr>` : ""}

                  <tr>
                    <td style="padding:36px 40px 28px;">
                      ${payload.categoryName ? `
                      <p style="margin:0 0 12px;
                                font-family:Arial,sans-serif;
                                font-size:11px;color:#0E5C52;
                                text-transform:uppercase;
                                letter-spacing:0.12em;font-weight:600;">
                        ${payload.categoryName}
                      </p>` : ""}
                      <h2 style="margin:0 0 16px;
                                 font-family:Georgia,serif;
                                 font-size:26px;font-weight:400;
                                 color:#0B2B27;line-height:1.25;">
                        ${payload.title}
                      </h2>
                      <p style="margin:0 0 24px;
                                font-family:Arial,sans-serif;
                                font-size:15px;color:#5A5750;
                                line-height:1.7;">
                        ${payload.excerpt}
                      </p>
                      ${payload.authorName ? `
                      <p style="margin:0 0 28px;
                                font-family:Arial,sans-serif;
                                font-size:13px;color:#8A877F;">
                        By ${payload.authorName}
                      </p>` : ""}
                      <a href="${contentUrl}"
                         style="display:inline-block;
                                background:#0E5C52;color:#fff;
                                font-family:Arial,sans-serif;
                                font-size:14px;font-weight:600;
                                text-decoration:none;
                                padding:14px 28px;border-radius:4px;">
                        Read ${typeLabel} →
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td style="background:#F1EDE3;padding:20px 40px;
                               border-top:1px solid #DDD5C2;">
                      <p style="margin:0 0 6px;
                                font-family:Arial,sans-serif;
                                font-size:12px;color:#8A877F;
                                line-height:1.6;">
                        You received this because you subscribed
                        to ByteSphere updates.<br>
                        ByteSphere is a Trusvera publication.
                      </p>
                      <a href="${siteUrl}/unsubscribe?token=${subscriber.unsubscribe_token}"
                         style="font-family:Arial,sans-serif;
                                font-size:12px;color:#0E5C52;
                                text-decoration:underline;">
                        Unsubscribe from ByteSphere emails
                      </a>
                    </td>
                  </tr>

                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      })
    )
  )

  const failed = results.filter((r) => r.status === "rejected").length
  const sent = results.length - failed
  console.log(`Subscriber notifications: ${sent} sent, ${failed} failed`)
}
