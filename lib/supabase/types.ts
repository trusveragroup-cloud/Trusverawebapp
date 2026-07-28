export type ContactStatus = "New" | "Contacted" | "Qualified" | "Converted" | "Archived"
export type ContactSource = "website_form" | "manual_entry" | "chat_agent" | "referral" | "event" | "other"
export type LegalBasis = "consent" | "legitimate_interest" | "contract"
export type BlogStatus = "Draft" | "Published" | "Archived"
export type BlogCategory = "Intent Data" | "Demand Generation" | "Account Profiling" | "Lead Generation" | "Market Research" | "Email Marketing"
export type AdminRole = "Super Admin" | "Sales Admin" | "Content Admin" | "Viewer"
export type ConsentEventType = "consent_given" | "consent_withdrawn" | "erasure_requested" | "data_accessed" | "do_not_contact_set"

export type Contact = {
  id: string
  full_name: string
  email: string
  phone: string | null
  company_name: string | null
  job_title: string | null
  country: string | null
  message: string | null
  service_interest: string | null
  lead_score: number
  status: ContactStatus
  source: ContactSource
  source_detail: string | null
  legal_basis: LegalBasis
  consent_given: boolean
  consent_timestamp: string | null
  consent_method: string | null
  consent_text: string | null
  consent_ip_address: string | null
  consent_user_agent: string | null
  is_anonymized: boolean
  anonymized_at: string | null
  do_not_contact: boolean
  data_portability_requested: boolean | null
  erasure_requested: boolean | null
  erasure_requested_at: string | null
  retention_period_days: number
  scheduled_deletion_at: string | null
  created_by: string | null
  created_at: string
  updated_at: string
  notes: string | null
}

export type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string | null
  category: BlogCategory
  tags: string[]
  featured: boolean
  author: string
  author_role: string
  author_initials: string
  status: BlogStatus
  published_at: string | null
  read_time: string | null
  meta_description: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export type AdminUser = {
  id: string
  full_name: string
  email: string
  role: AdminRole
  is_active: boolean
  last_login_at: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export type ConsentAuditLog = {
  id: string
  contact_id: string | null
  event_type: ConsentEventType
  event_timestamp: string
  ip_address: string | null
  user_agent: string | null
  performed_by: string | null
  notes: string | null
}
