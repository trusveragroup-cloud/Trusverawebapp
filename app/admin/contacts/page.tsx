"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus, Download, Search, Eye, Pencil, CheckCircle } from "lucide-react";
import { C } from "@/lib/colors";
import type { Contact } from "@/lib/supabase/types";
import { usePermissions } from "@/hooks/usePermissions";

const STATUS_STYLES: Record<string, { background: string; color: string }> = {
  New: { background: "rgba(200,151,62,0.10)", color: C.gold500 },
  Contacted: { background: "rgba(59,130,246,0.10)", color: "#3B82F6" },
  Qualified: { background: "rgba(74,186,138,0.10)", color: C.green400 },
  Converted: { background: C.forest100, color: C.forest600 },
  Archived: { background: C.cream200, color: C.textMuted },
};

const TABLE_HEADERS = [
  { label: "NAME", width: "15%" },
  { label: "COMPANY", width: "12%" },
  { label: "EMAIL", width: "18%" },
  { label: "SERVICE", width: "12%" },
  { label: "CHALLENGE", width: "14%" },
  { label: "DATE", width: "10%" },
  { label: "CONSENT", width: "8%" },
  { label: "STATUS", width: "8%" },
  { label: "ACTIONS", width: "8%" },
];

const dropdownStyle: React.CSSProperties = {
  height: 38,
  padding: "0 12px",
  borderRadius: 8,
  border: `1px solid ${C.borderLight}`,
  background: C.white,
  fontSize: 13,
  color: C.textMuted,
  cursor: "pointer",
};

const outlineButtonStyle: React.CSSProperties = {
  height: 38,
  padding: "0 16px",
  background: C.white,
  border: `1px solid ${C.borderLight}`,
  borderRadius: 8,
  fontSize: 13,
  color: C.textDark,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
};

function BadgePill({ background, color, children }: { background: string; color: string; children: React.ReactNode }) {
  return (
    <span style={{ background, color, fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 4 }}>
      {children}
    </span>
  );
}

export default function ContactsPage() {
  return (
    <Suspense fallback={
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
      }}>
        <div style={{
          width: 32,
          height: 32,
          border: "3px solid #E5E7EB",
          borderTop: "3px solid #166B4A",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <ContactsPageContent />
    </Suspense>
  );
}

function ContactsPageContent() {
  const { can } = usePermissions();
  const searchParams = useSearchParams();
  const justAdded = searchParams.get("added") === "true";

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchContacts = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (searchQuery) params.set("search", searchQuery);
      if (serviceFilter !== "All") params.set("service", serviceFilter);
      if (dateFilter !== "All") params.set("date", dateFilter);
      params.set("limit", "10");
      params.set("offset", String((currentPage - 1) * 10));

      const res = await fetch(`/api/admin/contacts?${params.toString()}`,
        { credentials: "include" }
      );
      const data = await res.json();

      if (!res.ok) {
        setFetchError(data.error || "Failed to load contacts.");
        return;
      }

      setContacts(data.contacts);
      setTotal(data.total);
    } catch {
      setFetchError("Network error. Could not load contacts.");
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchContacts();
      }
    } catch {
      console.error("Failed to update status");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery, serviceFilter, dateFilter]);

  useEffect(() => {
    fetchContacts();
  }, [statusFilter, searchQuery, serviceFilter, dateFilter, currentPage]);

  const totalPages = Math.ceil(total / 10);

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {justAdded && (
        <div
          style={{
            background: C.forest100,
            border: "1px solid " + C.green400,
            borderRadius: "8px",
            padding: "12px 20px",
            marginBottom: "20px",
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
            color: C.forest700,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CheckCircle size={16} color={C.forest600} />
          Contact added successfully and saved to Supabase.
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: C.textDark, fontFamily: "var(--font-inter)" }}>
          Contacts
        </span>

        <div style={{ display: "flex", gap: 10 }}>
          {can("create_contacts") && (
            <Link
              href="/admin/contacts/new"
              style={{
                height: 38,
                padding: "0 16px",
                background: C.forest600,
                color: C.cream50,
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              <Plus size={16} />
              Add contact
            </Link>
          )}

          <button type="button" style={outlineButtonStyle}>
            <Download size={16} color={C.textMuted} />
            Export CSV
          </button>
        </div>
      </div>

      <div
        style={{
          background: C.white,
          borderRadius: 12,
          border: `1px solid ${C.borderLight}`,
          padding: "16px 20px",
          marginBottom: 20,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
            size={16}
            color={C.textMuted}
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            placeholder="Search by name, company or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              height: 38,
              borderRadius: 8,
              border: `1px solid ${C.borderLight}`,
              paddingLeft: 36,
              fontSize: 13,
              color: C.textDark,
              background: C.cream100,
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        <select
          style={dropdownStyle}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Converted">Converted</option>
          <option value="Archived">Archived</option>
        </select>

        <select
          style={dropdownStyle}
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
        >
          <option value="All">All Services</option>
          <option value="Intent Data">Intent Data</option>
          <option value="Demand Generation">Demand Generation</option>
          <option value="Account Profiling">Account Profiling</option>
          <option value="Lead Generation">Lead Generation</option>
          <option value="Market Research">Market Research</option>
          <option value="Email Marketing">Email Marketing</option>
          <option value="Whitepaper Promotion">Whitepaper Promotion</option>
          <option value="BANT Qualified Leads">BANT Qualified Leads</option>
        </select>

        <select
          style={dropdownStyle}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="All">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="3months">Last 3 Months</option>
        </select>
      </div>

      <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.borderLight}`, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                border: "3px solid " + C.slate200,
                borderTop: "3px solid " + C.forest600,
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: C.slate400 }}>
              Loading contacts...
            </p>
          </div>
        ) : fetchError ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#DC2626",
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
            }}
          >
            {fetchError}
            <button
              onClick={fetchContacts}
              style={{
                display: "block",
                margin: "12px auto 0",
                background: C.forest600,
                color: C.cream100,
                border: "none",
                borderRadius: "6px",
                padding: "8px 20px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: C.cream100 }}>
                {TABLE_HEADERS.map((h) => (
                  <th
                    key={h.label}
                    style={{
                      fontSize: 11,
                      color: C.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 400,
                      width: h.width,
                    }}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => {
                const statusStyle = STATUS_STYLES[c.status] || { background: C.cream200, color: C.textMuted };
                return (
                  <tr
                    key={c.id}
                    style={{ cursor: "pointer", borderBottom: `1px solid ${C.borderLight}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = C.cream100;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, color: C.textDark }}>{c.full_name}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: C.textMuted }}>{c.company_name}</td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: C.textMuted }}>{c.email}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: C.textMuted }}>{c.service_interest}</td>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: 13,
                        color: C.textMuted,
                        maxWidth: 140,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.message}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: C.textMuted }}>
                      {new Date(c.created_at).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {c.consent_given ? (
                        <BadgePill background="rgba(74,186,138,0.10)" color={C.green400}>
                          Yes
                        </BadgePill>
                      ) : (
                        <BadgePill background={C.cream200} color={C.textMuted}>
                          No
                        </BadgePill>
                      )}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {can("edit_contacts") ? (
                        <select
                          value={c.status}
                          onChange={(e) => updateContactStatus(c.id, e.target.value)}
                          style={{
                            background: statusStyle.background,
                            color: statusStyle.color,
                            border: "none",
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 500,
                            padding: "3px 8px",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Converted">Converted</option>
                          <option value="Archived">Archived</option>
                        </select>
                      ) : (
                        <BadgePill background={statusStyle.background} color={statusStyle.color}>
                          {c.status}
                        </BadgePill>
                      )}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <Link href={`/admin/contacts/${c.id}`} style={{ display: "flex", cursor: "pointer" }}>
                          <Eye size={16} color={C.textMuted} />
                        </Link>
                        {can("edit_contacts") && (
                          <Link
                            href={`/admin/contacts/${c.id}/edit`}
                            style={{ display: "flex", cursor: "pointer" }}
                            title="Edit contact"
                          >
                            <Pencil size={16} color={C.forest600} />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div
          style={{
            padding: "14px 20px",
            borderTop: `1px solid ${C.borderLight}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 13, color: C.textMuted }}>
            Showing {total === 0 ? 0 : ((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, total)} of {total} contacts
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                height: 32, padding: "0 12px", borderRadius: 6,
                border: `1px solid ${C.borderLight}`, fontSize: 13,
                color: currentPage === 1 ? C.slate300 : C.textMuted,
                background: C.white, cursor: currentPage === 1 ? "not-allowed" : "pointer"
              }}
            >
              Prev
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                style={{
                  height: 32, width: 32, borderRadius: 6, fontSize: 13,
                  background: currentPage === page ? C.forest600 : C.white,
                  color: currentPage === page ? C.cream100 : C.textMuted,
                  border: currentPage === page ? "none" : `1px solid ${C.borderLight}`,
                  cursor: "pointer"
                }}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              style={{
                height: 32, padding: "0 12px", borderRadius: 6,
                border: `1px solid ${C.borderLight}`, fontSize: 13,
                color: currentPage === totalPages ? C.slate300 : C.textMuted,
                background: C.white,
                cursor: currentPage === totalPages ? "not-allowed" : "pointer"
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
