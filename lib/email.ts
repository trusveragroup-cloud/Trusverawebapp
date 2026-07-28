import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.GODADDY_SMTP_HOST,
  port: parseInt(process.env.GODADDY_SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.GODADDY_SMTP_USER,
    pass: process.env.GODADDY_SMTP_PASS,
  },
})

export type ContactEmailData = {
  fullName: string
  email: string
  company?: string
  serviceInterest?: string
  message?: string
  phone?: string
}

// EMAIL 1 — Confirmation email to the person who submitted the form
export function getConfirmationEmailHtml(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank You | TrusVera Group</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F5F0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F5F0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#0F3D25;border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">B2B Intelligence</p>
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#FEFDFB;letter-spacing:-0.5px;">TrusVera Group</h1>
              <div style="width:48px;height:2px;background-color:#C9A84C;margin:16px auto 0;"></div>
            </td>
          </tr>

          <!-- GOLD ACCENT BAR -->
          <tr>
            <td style="background-color:#C9A84C;height:3px;"></td>
          </tr>

          <!-- MAIN CONTENT -->
          <tr>
            <td style="background-color:#FFFFFF;padding:48px 40px 36px;">
              <h2 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#0F3D25;line-height:1.2;">
                Thank You, ${data.fullName.split(" ")[0]}.
              </h2>
              <p style="margin:0 0 28px;font-size:15px;color:#6B7280;line-height:1.6;">
                We have received your enquiry and appreciate you reaching out to TrusVera Group.
              </p>

              <!-- DIVIDER -->
              <div style="border-top:1px solid #E5E7EB;margin-bottom:28px;"></div>

              <!-- ENQUIRY SUMMARY -->
              <p style="margin:0 0 16px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9CA3AF;font-weight:600;">Your Enquiry Summary</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F5F0;border-radius:8px;padding:0;overflow:hidden;">
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                    <span style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;">Name</span><br/>
                    <span style="font-size:15px;color:#0F3D25;font-weight:600;margin-top:2px;display:block;">${data.fullName}</span>
                  </td>
                </tr>
                ${data.company ? `
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                    <span style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;">Company</span><br/>
                    <span style="font-size:15px;color:#0F3D25;font-weight:600;margin-top:2px;display:block;">${data.company}</span>
                  </td>
                </tr>` : ""}
                ${data.serviceInterest ? `
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                    <span style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;">Service Interest</span><br/>
                    <span style="font-size:15px;color:#0F3D25;font-weight:600;margin-top:2px;display:block;">${data.serviceInterest}</span>
                  </td>
                </tr>` : ""}
                ${data.message ? `
                <tr>
                  <td style="padding:14px 20px;">
                    <span style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;">Your Message</span><br/>
                    <span style="font-size:15px;color:#374151;margin-top:2px;display:block;line-height:1.6;">${data.message}</span>
                  </td>
                </tr>` : ""}
              </table>

              <!-- DIVIDER -->
              <div style="border-top:1px solid #E5E7EB;margin:28px 0;"></div>

              <!-- WHAT HAPPENS NEXT -->
              <p style="margin:0 0 16px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9CA3AF;font-weight:600;">What Happens Next</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="32" valign="top" style="padding-top:2px;">
                    <div style="width:24px;height:24px;background-color:#0F3D25;border-radius:50%;text-align:center;line-height:24px;">
                      <span style="color:#C9A84C;font-size:12px;font-weight:700;">1</span>
                    </div>
                  </td>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
                      <strong style="color:#0F3D25;">Review</strong> — A senior TrusVera team member will personally review your enquiry.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="32" valign="top" style="padding-top:2px;">
                    <div style="width:24px;height:24px;background-color:#0F3D25;border-radius:50%;text-align:center;line-height:24px;">
                      <span style="color:#C9A84C;font-size:12px;font-weight:700;">2</span>
                    </div>
                  </td>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
                      <strong style="color:#0F3D25;">Respond</strong> — We will respond to you within one business day with next steps.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="32" valign="top" style="padding-top:2px;">
                    <div style="width:24px;height:24px;background-color:#0F3D25;border-radius:50%;text-align:center;line-height:24px;">
                      <span style="color:#C9A84C;font-size:12px;font-weight:700;">3</span>
                    </div>
                  </td>
                  <td>
                    <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
                      <strong style="color:#0F3D25;">Connect</strong> — We will schedule a focused conversation to understand your pipeline challenges.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="text-align:center;margin-top:36px;">
                <a href="https://trusveragroup.com" style="display:inline-block;background-color:#C9A84C;color:#0F3D25;font-size:14px;font-weight:700;padding:14px 32px;border-radius:6px;text-decoration:none;letter-spacing:0.5px;">
                  Visit TrusVera Group
                </a>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#0F3D25;border-radius:0 0 12px 12px;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#FEFDFB;font-weight:600;">TrusVera Group</p>
              <p style="margin:0 0 8px;font-size:12px;color:#9CA3AF;line-height:1.6;">
                Pune, India
              </p>
              <p style="margin:0 0 16px;font-size:12px;color:#9CA3AF;">
                <a href="mailto:info@trusveragrp.com" style="color:#C9A84C;text-decoration:none;">info@trusveragrp.com</a>
              </p>
              <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;">
                <p style="margin:0;font-size:11px;color:#6B7280;line-height:1.6;">
                  You are receiving this email because you submitted an enquiry on trusveragroup.com.<br/>
                  This is a transactional email. Your data is stored securely and handled in compliance with DPDP 2023.
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

// EMAIL 2 — Internal notification to TVG team
export function getNotificationEmailHtml(data: ContactEmailData): string {
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Enquiry | TrusVera Group</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F5F0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F5F0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#0F3D25;border-radius:12px 12px 0 0;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;">New Enquiry Alert</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#FEFDFB;">TrusVera Group</h1>
            </td>
          </tr>

          <!-- GOLD ACCENT BAR -->
          <tr>
            <td style="background-color:#C9A84C;height:3px;"></td>
          </tr>

          <!-- ALERT BANNER -->
          <tr>
            <td style="background-color:#166B4A;padding:16px 40px;text-align:center;">
              <p style="margin:0;font-size:14px;color:#FEFDFB;font-weight:600;">
                New contact form submission received on ${submittedAt} IST
              </p>
            </td>
          </tr>

          <!-- MAIN CONTENT -->
          <tr>
            <td style="background-color:#FFFFFF;padding:40px;">

              <p style="margin:0 0 20px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9CA3AF;font-weight:600;">Contact Details</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
                <tr style="background-color:#F7F5F0;">
                  <td width="140" style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                    <span style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Name</span>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                    <span style="font-size:15px;color:#0F3D25;font-weight:700;">${data.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td width="140" style="padding:14px 20px;border-bottom:1px solid #E5E7EB;background-color:#F7F5F0;">
                    <span style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</span>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                    <a href="mailto:${data.email}" style="font-size:15px;color:#166B4A;font-weight:600;text-decoration:none;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr style="background-color:#F7F5F0;">
                  <td width="140" style="padding:14px 20px;border-bottom:1px solid #E5E7EB;background-color:#F7F5F0;">
                    <span style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Phone</span>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                    <span style="font-size:15px;color:#0F3D25;font-weight:600;">${data.phone}</span>
                  </td>
                </tr>` : ""}
                ${data.company ? `
                <tr>
                  <td width="140" style="padding:14px 20px;border-bottom:1px solid #E5E7EB;background-color:#F7F5F0;">
                    <span style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Company</span>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                    <span style="font-size:15px;color:#0F3D25;font-weight:600;">${data.company}</span>
                  </td>
                </tr>` : ""}
                ${data.serviceInterest ? `
                <tr style="background-color:#F7F5F0;">
                  <td width="140" style="padding:14px 20px;border-bottom:1px solid #E5E7EB;background-color:#F7F5F0;">
                    <span style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Service</span>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                    <span style="font-size:15px;color:#0F3D25;font-weight:600;">${data.serviceInterest}</span>
                  </td>
                </tr>` : ""}
                ${data.message ? `
                <tr>
                  <td width="140" style="padding:14px 20px;background-color:#F7F5F0;" valign="top">
                    <span style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Message</span>
                  </td>
                  <td style="padding:14px 20px;">
                    <span style="font-size:14px;color:#374151;line-height:1.7;">${data.message}</span>
                  </td>
                </tr>` : ""}
              </table>

              <!-- CTA -->
              <div style="text-align:center;margin-top:32px;">
                <a href="https://trusveragroup.com/admin/contacts" style="display:inline-block;background-color:#0F3D25;color:#FEFDFB;font-size:14px;font-weight:700;padding:14px 32px;border-radius:6px;text-decoration:none;letter-spacing:0.5px;margin-right:12px;">
                  View in Admin Panel
                </a>
                <a href="mailto:${data.email}" style="display:inline-block;background-color:#C9A84C;color:#0F3D25;font-size:14px;font-weight:700;padding:14px 32px;border-radius:6px;text-decoration:none;letter-spacing:0.5px;">
                  Reply to ${data.fullName.split(" ")[0]}
                </a>
              </div>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#0F3D25;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9CA3AF;">
                TrusVera Group Internal Notification | Do not reply to this email
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

// Send confirmation email to contact
export async function sendConfirmationEmail(data: ContactEmailData): Promise<void> {
  await transporter.sendMail({
    from: '"TrusVera Group" <info@trusveragrp.com>',
    to: data.email,
    subject: "We received your enquiry | TrusVera Group",
    html: getConfirmationEmailHtml(data),
  })
}

// Send notification email to TVG team
export async function sendNotificationEmail(data: ContactEmailData): Promise<void> {
  await transporter.sendMail({
    from: '"TrusVera Group" <info@trusveragrp.com>',
    to: process.env.CONTACT_NOTIFICATION_EMAIL || "info@trusveragrp.com",
    subject: `New Enquiry: ${data.fullName} from ${data.company || "Unknown Company"}`,
    html: getNotificationEmailHtml(data),
  })
}
