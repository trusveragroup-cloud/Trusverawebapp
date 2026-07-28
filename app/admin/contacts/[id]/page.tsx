"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { C } from "@/lib/colors";
import {
  ChevronRight, Download, ChevronDown,
  Mail, Building2, Phone, Globe, Briefcase,
  Calendar, Shield, AlertCircle, Loader2,
  CheckCircle, MessageSquare, Clock, Tag
} from "lucide-react";
import type { Contact } from "@/lib/supabase/types";

type AuditEvent = {
  id: string
  event_type: string
  event_timestamp: string
  notes: string | null
  ip_address: string | null
}

const STATUS_STYLES: Record<string, { background: string; color: string }> = {
  New: { background: "rgba(200,151,62,0.10)", color: C.gold500 },
  Contacted: { background: "rgba(59,130,246,0.10)", color: "#3B82F6" },
  Qualified: { background: "rgba(74,186,138,0.10)", color: C.forest600 },
  Converted: { background: C.forest100, color: C.forest700 },
  Archived: { background: C.cream200, color: C.slate400 },
}

function formatSnakeCase(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function cardStyle(): React.CSSProperties {
  return {
    background: C.white,
    borderRadius: 12,
    border: `1px solid ${C.borderLight}`,
    padding: 24,
    marginBottom: 24,
  };
}

function fieldLabelStyle(): React.CSSProperties {
  return {
    fontSize: 11,
    color: C.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
    display: "flex",
    alignItems: "center",
    gap: 6,
  };
}

function outlineButtonStyle(): React.CSSProperties {
  return {
    height: 38,
    padding: "0 16px",
    background: C.white,
    border: `1px solid ${C.borderLight}`,
    borderRadius: 8,
    fontSize: 13,
    color: C.textDark,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  };
}

export default function ContactDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [contact, setContact] = useState<Contact | null>(null);
  const [activity, setActivity] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchContact = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [contactRes, activityRes] = await Promise.all([
        fetch(`/api/admin/contacts?id=${id}`, { credentials: "include" }),
        fetch(`/api/admin/activity?contact_id=${id}`, { credentials: "include" }),
      ]);

      const contactData = await contactRes.json();
      if (!contactRes.ok || !contactData.contacts?.length) {
        setError("Contact not found.");
        return;
      }

      const loadedContact: Contact = contactData.contacts[0];
      setContact(loadedContact);
      setNotes(loadedContact.notes || "");

      if (activityRes.ok) {
        const activityData = await activityRes.json();
        setActivity(activityData.events || []);
      }
    } catch {
      setError("Failed to load contact details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchContact() }, [fetchContact]);

  const updateStatus = async (newStatus: string) => {
    if (!contact) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/contacts`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setContact(prev => prev ? { ...prev, status: newStatus as Contact["status"] } : null);
      }
    } catch {
      console.error("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const saveNote = async () => {
    if (!notes.trim()) return;
    setSavingNote(true);
    try {
      const res = await fetch(`/api/admin/contacts`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, notes: notes.trim() }),
      });
      if (res.ok) {
        setContact(prev => prev ? { ...prev, notes: notes.trim() } : null);
        setNoteSaved(true);
        setTimeout(() => setNoteSaved(false), 3000);
      }
    } catch {
      console.error("Failed to save note");
    } finally {
      setSavingNote(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const formatRelativeTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (mins < 60) return `${mins} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const formatEventLabel = (event: AuditEvent) => {
    switch (event.event_type) {
      case "consent_given": return "Consent recorded";
      case "consent_withdrawn": return "Consent withdrawn";
      case "erasure_requested": return "Data erasure requested";
      case "do_not_contact_set": return "Marked do not contact";
      default: return event.notes || event.event_type;
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 32 }}>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
        <div style={{ padding: "60px", textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid " + C.slate200,
              borderTop: "3px solid " + C.forest600,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: C.slate400 }}>
            Loading contact...
          </p>
        </div>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div style={{ padding: 32 }}>
        <div style={{ padding: "60px", textAlign: "center" }}>
          <AlertCircle size={32} color="#DC2626" style={{ margin: "0 auto 16px" }} />
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: C.textDark, marginBottom: 16 }}>
            {error || "Contact not found."}
          </p>
          <Link href="/admin/contacts" style={{ fontSize: 13, color: C.gold500, textDecoration: "none" }}>
            Back to Contacts
          </Link>
        </div>
      </div>
    );
  }

  const statusStyle = STATUS_STYLES[contact.status] || { background: C.cream200, color: C.textMuted };

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .detail-content { animation: fadeIn 0.25s ease forwards; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>
            <Link href="/admin/contacts" style={{ fontSize: 13, color: C.slate500, textDecoration: "none" }}>
              Contacts
            </Link>
            <ChevronRight size={14} color={C.slate500} />
            <span style={{ color: C.textDark, fontWeight: 500 }}>{contact.full_name}</span>
          </div>
          <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, marginTop: 6 }}>
            {contact.full_name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                background: C.cream200,
                color: C.slate500,
                padding: "3px 10px",
                borderRadius: 4,
              }}
            >
              <Tag size={11} />
              {formatSnakeCase(contact.source)}
            </span>
            <span
              style={{
                fontSize: 11,
                background: C.cream200,
                color: C.slate500,
                padding: "3px 10px",
                borderRadius: 4,
              }}
            >
              Lead score: {contact.lead_score}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button type="button" style={outlineButtonStyle()}>
            <Download size={16} color={C.textMuted} />
            Export
          </button>

          <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <select
              value={contact.status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={updatingStatus}
              style={{
                appearance: "none",
                background: statusStyle.background,
                color: statusStyle.color,
                border: "none",
                borderRadius: 8,
                height: 38,
                padding: "0 32px 0 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: updatingStatus ? "default" : "pointer",
                outline: "none",
              }}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Archived">Archived</option>
            </select>
            {updatingStatus ? (
              <Loader2
                size={14}
                color={statusStyle.color}
                style={{ position: "absolute", right: 10, animation: "spin 0.8s linear infinite" }}
              />
            ) : (
              <ChevronDown size={14} color={statusStyle.color} style={{ position: "absolute", right: 10, pointerEvents: "none" }} />
            )}
          </div>

          <Link href={`/admin/contacts/${id}/edit`} style={{ ...outlineButtonStyle(), background: C.forest600, color: C.cream50, border: "none" }}>
            Edit contact
          </Link>
        </div>
      </div>

      <div className="detail-content" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <div>
          <div style={{ ...cardStyle(), borderTop: `3px solid ${C.gold500}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textDark, marginBottom: 20 }}>
              Contact information
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <div style={fieldLabelStyle()}><Mail size={12} />Email</div>
                <div style={{ fontSize: 14, color: C.gold500, fontWeight: 500 }}>{contact.email}</div>
              </div>
              <div>
                <div style={fieldLabelStyle()}><Phone size={12} />Phone</div>
                <div style={{ fontSize: 14, color: C.textDark, fontWeight: 500 }}>{contact.phone || "Not provided"}</div>
              </div>
              <div>
                <div style={fieldLabelStyle()}><Building2 size={12} />Company</div>
                <div style={{ fontSize: 14, color: C.textDark, fontWeight: 500 }}>{contact.company_name || "Not provided"}</div>
              </div>
              <div>
                <div style={fieldLabelStyle()}><Briefcase size={12} />Job title</div>
                <div style={{ fontSize: 14, color: C.textDark, fontWeight: 500 }}>{contact.job_title || "Not provided"}</div>
              </div>
              <div>
                <div style={fieldLabelStyle()}><Globe size={12} />Country</div>
                <div style={{ fontSize: 14, color: C.textDark, fontWeight: 500 }}>{contact.country || "Not provided"}</div>
              </div>
              <div>
                <div style={fieldLabelStyle()}><Tag size={12} />Service interest</div>
                <div style={{ fontSize: 14, color: C.textDark, fontWeight: 500 }}>{contact.service_interest || "Not specified"}</div>
              </div>
              <div>
                <div style={fieldLabelStyle()}><Calendar size={12} />Submitted</div>
                <div style={{ fontSize: 14, color: C.textDark, fontWeight: 500 }}>{formatDate(contact.created_at)}</div>
              </div>
              <div>
                <div style={fieldLabelStyle()}><Clock size={12} />Last updated</div>
                <div style={{ fontSize: 14, color: C.textDark, fontWeight: 500 }}>{formatDate(contact.updated_at)}</div>
              </div>
            </div>
          </div>

          <div style={cardStyle()}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: C.textDark, marginBottom: 16 }}>
              <MessageSquare size={16} color={C.textMuted} />
              Message
            </div>
            <p style={{ fontSize: 14, color: contact.message ? C.textMuted : C.textLight, lineHeight: 1.7, margin: 0, fontStyle: contact.message ? "normal" : "italic" }}>
              {contact.message || "No message provided."}
            </p>
          </div>
        </div>

        <div>
          <div style={cardStyle()}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textDark, marginBottom: 16 }}>Internal notes</div>

            <textarea
              placeholder="Add a note..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: "100%",
                height: 100,
                borderRadius: 8,
                border: `1px solid ${C.borderLight}`,
                background: C.white,
                padding: "10px 12px",
                fontSize: 13,
                color: C.textDark,
                boxSizing: "border-box",
                resize: "none",
                fontFamily: "inherit",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <button
                type="button"
                onClick={saveNote}
                disabled={savingNote || !notes.trim()}
                style={{
                  height: 34,
                  padding: "0 16px",
                  background: C.forest600,
                  color: C.cream50,
                  borderRadius: 6,
                  border: "none",
                  fontSize: 13,
                  cursor: savingNote ? "default" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {savingNote && <Loader2 size={13} style={{ animation: "spin 0.8s linear infinite" }} />}
                {savingNote ? "Saving..." : "Save note"}
              </button>
              {noteSaved && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: C.green400 }}>
                  <CheckCircle size={14} />
                  Note saved
                </span>
              )}
            </div>
          </div>

          <div style={cardStyle()}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: C.textDark, marginBottom: 16 }}>
              <Clock size={16} color={C.textMuted} />
              Activity
            </div>
            {activity.length === 0 ? (
              <p style={{ fontSize: 13, color: C.textLight, margin: 0 }}>No activity recorded yet.</p>
            ) : (
              activity.map((event, i) => (
                <div
                  key={event.id}
                  style={{ display: "flex", gap: 12, marginBottom: i === activity.length - 1 ? 0 : 16 }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      background: C.gold500,
                      borderRadius: "50%",
                      flexShrink: 0,
                      marginTop: 5,
                    }}
                  />
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.textDark, display: "block" }}>
                      {formatEventLabel(event)}
                    </span>
                    <span style={{ fontSize: 11, color: C.textMuted, marginTop: 2, display: "block" }}>
                      {formatRelativeTime(event.event_timestamp)}
                      {event.ip_address ? ` · ${event.ip_address}` : ""}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ ...cardStyle(), marginBottom: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: C.textDark, marginBottom: 16 }}>
              <Shield size={16} color={C.textMuted} />
              Compliance
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: C.textMuted }}>Legal basis</span>
                <span style={{ fontSize: 13, color: C.textDark, fontWeight: 500 }}>{formatSnakeCase(contact.legal_basis)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: C.textMuted }}>Marketing consent</span>
                {contact.consent_given ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, background: "rgba(74,186,138,0.10)", color: C.green400, padding: "2px 8px", borderRadius: 4 }}>
                    <CheckCircle size={11} />
                    Given
                  </span>
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, background: C.cream200, color: C.textMuted, padding: "2px 8px", borderRadius: 4 }}>
                    <AlertCircle size={11} />
                    Not given
                  </span>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: C.textMuted }}>Do not contact</span>
                <span style={{ fontSize: 13, color: contact.do_not_contact ? "#DC2626" : C.textDark, fontWeight: 500 }}>
                  {contact.do_not_contact ? "Yes" : "No"}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: C.textMuted }}>Erasure requested</span>
                <span style={{ fontSize: 13, color: C.textDark, fontWeight: 500 }}>
                  {contact.erasure_requested ? "Yes" : "No"}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: C.textMuted }}>Data portability requested</span>
                <span style={{ fontSize: 13, color: C.textDark, fontWeight: 500 }}>
                  {contact.data_portability_requested ? "Yes" : "No"}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: C.textMuted }}>Retention period</span>
                <span style={{ fontSize: 13, color: C.textDark, fontWeight: 500 }}>{contact.retention_period_days} days</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: C.textMuted }}>Scheduled deletion</span>
                <span style={{ fontSize: 13, color: C.textDark, fontWeight: 500 }}>
                  {contact.scheduled_deletion_at ? formatDate(contact.scheduled_deletion_at) : "Not scheduled"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
