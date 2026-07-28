import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import ws from "ws"

config({ path: ".env.local" })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    realtime: {
      transport: ws
    }
  }
)

const ADMIN_EMAIL = "admin@trusveragroup.com"
const ADMIN_PASSWORD = "TrusVera@2026!"
const ADMIN_NAME = "Super Admin"

async function createAdminUser() {
  console.log("Creating admin user in Supabase Auth...")

  const { data: authUser, error: authError } =
    await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    })

  if (authError) {
    console.error("Auth user creation failed:", authError.message)
    return
  }

  console.log("Auth user created:", authUser.user.id)

  const { error: profileError } = await supabase
    .from("admin_users")
    .insert({
      id: authUser.user.id,
      full_name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      role: "Super Admin",
      is_active: true,
    })

  if (profileError) {
    console.error("Admin profile creation failed:", profileError.message)
    return
  }

  console.log("Admin user created successfully!")
  console.log("Email:", ADMIN_EMAIL)
  console.log("Password:", ADMIN_PASSWORD)
  console.log("Role: Super Admin")
  console.log("IMPORTANT: Change this password immediately after first login.")
}

createAdminUser()
