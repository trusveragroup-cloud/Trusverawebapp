import nodemailer from "nodemailer"
import { config } from "dotenv"

config({ path: ".env.local" })

const transporter = nodemailer.createTransport({
  host: process.env.GODADDY_SMTP_HOST,
  port: parseInt(process.env.GODADDY_SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.GODADDY_SMTP_USER,
    pass: process.env.GODADDY_SMTP_PASS,
  },
})

async function testEmail() {
  console.log("Testing SMTP connection...")
  console.log("Host:", process.env.GODADDY_SMTP_HOST)
  console.log("Port:", process.env.GODADDY_SMTP_PORT)
  console.log("User:", process.env.GODADDY_SMTP_USER)

  try {
    await transporter.verify()
    console.log("SMTP connection verified successfully!")

    const info = await transporter.sendMail({
      from: '"TrusVera Group" <info@trusveragrp.com>',
      to: process.env.GODADDY_SMTP_USER,
      subject: "TrusVera SMTP Test Email",
      text: "This is a test email to confirm the SMTP connection is working correctly.",
      html: "<p>This is a test email to confirm the SMTP connection is working correctly.</p>",
    })

    console.log("Test email sent successfully!")
    console.log("Message ID:", info.messageId)
    console.log("Check info@trusveragrp.com inbox now.")
  } catch (error) {
    console.error("SMTP Error:", error.message)
    console.error("Full error:", error)
  }
}

testEmail()
