"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { C } from "@/lib/colors";
import {
  UserPlus, Search, Pencil, UserX, UserCheck,
  Shield, Crown, Eye, AlertCircle, CheckCircle,
  Loader2, Trash2
} from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import AccessDenied from "@/components/admin/AccessDenied";

type AdminUser = {
  id: string
  full_name: string
  email: string
  role: "Super Admin" | "Sales Admin" | "Content Admin" | "Viewer"
  is_active: boolean
  last_login_at: string | null
  created_at: string
}

const ROLE_STYLES: Record<string, { avatarBg: string; color: string; badgeBg: string }> = {
  "Super Admin": { avatarBg: "rgba(200,151,62,0.15)", color: C.gold500, badgeBg: "rgba(200,151,62,0.10)" },
  "Sales Admin": { avatarBg: "rgba(59,130,246,0.15)", color: "#3B82F6", badgeBg: "rgba(59,130,246,0.10)" },
  "Content Admin": { avatarBg: "rgba(74,186,138,0.15)", color: C.forest600, badgeBg: "rgba(74,186,138,0.10)" },
  Viewer: { avatarBg: C.cream200, color: C.slate400, badgeBg: C.cream200 },
};

const gridColumns = "2fr 2fr 1.5fr 1.5fr 1fr 120px";

const dropdownStyle: React.CSSProperties = {
  height: 36,
  padding: "0 12px",
  border: `1px solid ${C.slate200}`,
  borderRadius: 6,
  fontFamily: "var(--font-inter)",
  fontSize: 13,
  color: C.forest900,
  background: C.cream100,
  outline: "none",
};

const actionButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  padding: 4,
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function formatLastLogin(dateStr: string | null) {
  if (!dateStr) return "Never";
  return new Date(dateStr).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const ROLES = ["Super Admin", "Sales Admin", "Content Admin", "Viewer"];

const PERMISSION_GROUPS = [
  {
    group: "Dashboard",
    permissions: [
      { key: "view_dashboard", label: "View Dashboard" },
    ]
  },
  {
    group: "Contacts",
    permissions: [
      { key: "view_contacts", label: "View Contacts" },
      { key: "create_contacts", label: "Add Contacts" },
      { key: "edit_contacts", label: "Edit Contacts" },
      { key: "delete_contacts", label: "Delete Contacts" },
    ]
  },
  {
    group: "Blogs",
    permissions: [
      { key: "view_blogs", label: "View Blogs" },
      { key: "create_blogs", label: "Create Blogs" },
      { key: "edit_blogs", label: "Edit Blogs" },
      { key: "delete_blogs", label: "Delete Blogs" },
    ]
  },
  {
    group: "Users",
    permissions: [
      { key: "view_users", label: "View Users" },
      { key: "create_users", label: "Create Users" },
      { key: "edit_users", label: "Edit Users" },
      { key: "delete_users", label: "Delete Users" },
    ]
  },
  {
    group: "System",
    permissions: [
      { key: "view_settings", label: "View Settings" },
      { key: "manage_permissions", label: "Manage Permissions" },
    ]
  },
];

function PermissionsMatrix() {
  const [permissions, setPermissions] = useState<
    { role: string; permission: string; granted: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState("");

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/permissions", { credentials: "include" });
      const data = await res.json();
      setPermissions(data.permissions || []);
    } catch {
      console.error("Failed to fetch permissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPermissions() }, []);

  const isGranted = (role: string, permission: string): boolean => {
    if (role === "Super Admin") return true;
    const found = permissions.find(p => p.role === role && p.permission === permission);
    return found?.granted ?? false;
  };

  const togglePermission = async (role: string, permission: string) => {
    if (role === "Super Admin") return; // Super Admin always has all permissions
    const current = isGranted(role, permission);
    const key = `${role}-${permission}`;
    setSaving(key);
    try {
      const res = await fetch("/api/admin/permissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role, permission, granted: !current }),
      });
      if (res.ok) {
        setPermissions(prev => {
          const exists = prev.some(p => p.role === role && p.permission === permission);
          if (exists) {
            return prev.map(p =>
              p.role === role && p.permission === permission
                ? { ...p, granted: !current }
                : p
            );
          }
          return [...prev, { role, permission, granted: !current }];
        });
        setSaveSuccess(`Updated ${role} - ${permission}`);
        setTimeout(() => setSaveSuccess(""), 3000);
      }
    } catch {
      console.error("Failed to update permission");
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <div style={{
          width: 32, height: 32,
          border: `3px solid ${C.slate200}`,
          borderTop: `3px solid ${C.forest600}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 16px"
        }} />
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>
          Loading permissions...
        </p>
      </div>
    );
  }

  return (
    <div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontFamily: "var(--font-dm-serif)",
          fontSize: 22, color: C.forest800, margin: "0 0 6px"
        }}>
          Roles & Permissions
        </h2>
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: 13, color: C.slate500, margin: 0
        }}>
          Configure what each role can access and perform.
          Changes take effect immediately.
          Super Admin permissions cannot be modified.
        </p>
      </div>

      {/* SUCCESS BANNER */}
      {saveSuccess && (
        <div style={{
          background: C.forest100,
          border: `1px solid ${C.forest300}`,
          borderRadius: 8, padding: "10px 16px",
          marginBottom: 16, display: "flex",
          alignItems: "center", gap: 8,
          fontFamily: "var(--font-inter)",
          fontSize: 13, color: C.forest700,
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke={C.forest600} strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {saveSuccess}
        </div>
      )}

      {/* PERMISSIONS TABLE */}
      <div style={{
        background: C.cream100,
        borderRadius: 12,
        border: `1px solid ${C.slate200}`,
        overflow: "hidden"
      }}>

        {/* TABLE HEADER */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "220px repeat(4, 1fr)",
          background: C.cream200,
          padding: "12px 20px",
          borderBottom: `1px solid ${C.slate200}`
        }}>
          <div style={{
            fontFamily: "var(--font-inter)",
            fontSize: 11, color: C.slate500,
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Permission
          </div>
          {ROLES.map(role => (
            <div key={role} style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11, color: C.slate500,
              textTransform: "uppercase",
              letterSpacing: "1px",
              textAlign: "center"
            }}>
              {role}
            </div>
          ))}
        </div>

        {/* PERMISSION GROUPS */}
        {PERMISSION_GROUPS.map((group, gi) => (
          <div key={group.group}>
            {/* GROUP HEADER */}
            <div style={{
              padding: "10px 20px",
              background: "rgba(22,107,74,0.04)",
              borderTop: gi > 0 ? `1px solid ${C.slate200}` : "none",
              fontFamily: "var(--font-inter)",
              fontSize: 12, fontWeight: 700,
              color: C.forest700,
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              {group.group}
            </div>

            {/* PERMISSION ROWS */}
            {group.permissions.map((perm) => (
              <div
                key={perm.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "220px repeat(4, 1fr)",
                  padding: "14px 20px",
                  borderTop: `1px solid ${C.slate100}`,
                  alignItems: "center",
                }}
              >
                {/* PERMISSION LABEL */}
                <div style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13, color: C.forest800,
                }}>
                  {perm.label}
                </div>

                {/* ROLE TOGGLES */}
                {ROLES.map(role => {
                  const granted = isGranted(role, perm.key);
                  const isSuperAdmin = role === "Super Admin";
                  const key = `${role}-${perm.key}`;
                  const isSaving = saving === key;

                  return (
                    <div key={role} style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      {isSaving ? (
                        <div style={{
                          width: 20, height: 20,
                          border: `2px solid ${C.slate200}`,
                          borderTop: `2px solid ${C.forest600}`,
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite"
                        }} />
                      ) : (
                        <div
                          onClick={() => !isSuperAdmin && togglePermission(role, perm.key)}
                          style={{
                            width: 40, height: 22,
                            borderRadius: 11,
                            background: granted ? C.forest600 : C.slate200,
                            position: "relative",
                            cursor: isSuperAdmin ? "not-allowed" : "pointer",
                            transition: "background 0.2s",
                            opacity: isSuperAdmin ? 0.6 : 1,
                          }}
                          title={isSuperAdmin ? "Super Admin always has all permissions" : ""}
                        >
                          <div style={{
                            width: 16, height: 16,
                            background: "white",
                            borderRadius: "50%",
                            position: "absolute",
                            top: 3,
                            left: granted ? 21 : 3,
                            transition: "left 0.2s",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                          }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* LEGEND */}
      <div style={{
        display: "flex", gap: 24, marginTop: 16,
        fontFamily: "var(--font-inter)", fontSize: 12, color: C.slate400
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 24, height: 14, borderRadius: 7,
            background: C.forest600
          }} />
          Allowed
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 24, height: 14, borderRadius: 7,
            background: C.slate200
          }} />
          Restricted
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 24, height: 14, borderRadius: 7,
            background: C.forest600, opacity: 0.6
          }} />
          Always Allowed (Super Admin)
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
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
      <UsersPageContent />
    </Suspense>
  );
}

function UsersPageContent() {
  const searchParams = useSearchParams();
  const justCreated = searchParams.get("created") === "true";

  const { can, role, loading: permsLoading } = usePermissions();
  const [activeTab, setActiveTab] = useState<"users" | "permissions">("users");

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const params = new URLSearchParams();
      if (roleFilter !== "All") params.set("role", roleFilter);
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (searchQuery) params.set("search", searchQuery);

      const res = await fetch(
        `/api/admin/users?${params.toString()}`,
        { credentials: "include" }
      );
      const data = await res.json();

      if (!res.ok) {
        setFetchError(data.error || "Failed to load users.");
        return;
      }
      setUsers(data.users);
    } catch {
      setFetchError("Network error. Could not load users.");
    } finally {
      setLoading(false);
    }
  }, [roleFilter, statusFilter, searchQuery]);

  useEffect(() => { fetchUsers() }, [fetchUsers]);

  useEffect(() => {
    if (justCreated) {
      setSuccessMessage("Invitation sent successfully.");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [justCreated]);

  if (permsLoading) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!can("view_users")) {
    return <AccessDenied />;
  }

  const toggleActive = async (user: AdminUser) => {
    setUpdatingId(user.id);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: user.id,
          isActive: !user.is_active,
        }),
      });
      if (res.ok) {
        setUsers(prev =>
          prev.map(u =>
            u.id === user.id ? { ...u, is_active: !u.is_active } : u
          )
        );
      }
    } catch {
      console.error("Failed to toggle user status");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteUser = async (user: AdminUser) => {
    if (user.role === "Super Admin") {
      alert("Super Admin cannot be deleted. Deactivate instead.");
      return;
    }

    if (!window.confirm(
      `Are you sure you want to permanently delete ${user.full_name}? This cannot be undone.`
    )) return;

    setDeletingId(user.id);
    try {
      const res = await fetch(`/api/admin/users?id=${user.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to delete user.");
        return;
      }

      setUsers(prev => prev.filter(u => u.id !== user.id));
      setSuccessMessage(`${user.full_name} has been deleted.`);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const stats = [
    { label: `${users.length} Total users`, dot: C.slate400 },
    { label: `${users.filter(u => u.role === "Super Admin").length} Super Admin`, dot: C.gold500 },
    { label: `${users.filter(u => u.role === "Sales Admin").length} Sales Admin`, dot: "#3B82F6" },
    { label: `${users.filter(u => u.role === "Content Admin").length} Content Admin`, dot: C.forest600 },
    { label: `${users.filter(u => u.role === "Viewer").length} Viewers`, dot: C.slate300 },
    { label: `${users.filter(u => !u.is_active).length} Inactive`, dot: "#DC2626" },
  ];

  return (
    <div style={{ padding: 32 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .user-row:hover { background: ${C.cream200} !important; transition: background 0.15s; }
      `}</style>

      <div style={{
        display: "flex", gap: 0, marginBottom: 24,
        borderBottom: `1px solid ${C.slate200}`
      }}>
        {[
          { id: "users", label: "Team Members" },
          ...(role === "Super Admin" ? [{ id: "permissions", label: "Roles & Permissions" }] : []),
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "users" | "permissions")}
            style={{
              padding: "12px 24px", border: "none",
              background: "transparent", cursor: "pointer",
              fontFamily: "var(--font-inter)", fontSize: 13,
              fontWeight: activeTab === tab.id ? 700 : 400,
              color: activeTab === tab.id ? C.forest700 : C.slate500,
              borderBottom: activeTab === tab.id
                ? `2px solid ${C.forest600}`
                : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "permissions" && role === "Super Admin" && (
        <PermissionsMatrix />
      )}

      {activeTab === "users" && (
      <>
      {successMessage && (
        <div
          style={{
            background: C.forest100,
            border: `1px solid ${C.forest300}`,
            borderRadius: 8,
            padding: "12px 20px",
            marginBottom: 20,
            fontFamily: "var(--font-inter)",
            fontSize: 14,
            color: C.forest700,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <CheckCircle size={16} color={C.forest600} />
          {successMessage}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 26, color: C.forest800, margin: 0 }}>
            Users
          </h1>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500, marginTop: 4 }}>
            Manage admin panel access and roles.
          </div>
        </div>

        <Link
          href="/admin/users/new"
          style={{
            background: C.forest600,
            color: C.cream100,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          <UserPlus size={16} />
          Create User
        </Link>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: C.cream100,
              border: `1px solid ${C.slate200}`,
              borderRadius: 20,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: stat.dot, flexShrink: 0, display: "block" }} />
            <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.forest800 }}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          background: C.cream100,
          borderRadius: 10,
          border: `1px solid ${C.slate200}`,
          padding: "14px 20px",
          marginBottom: 20,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
            size={15}
            color={C.slate400}
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              height: 36,
              padding: "0 12px 0 34px",
              border: `1px solid ${C.slate200}`,
              borderRadius: 6,
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              color: C.forest900,
              background: C.cream100,
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        <select style={dropdownStyle} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Sales Admin">Sales Admin</option>
          <option value="Content Admin">Content Admin</option>
          <option value="Viewer">Viewer</option>
        </select>

        <select style={dropdownStyle} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div style={{ background: C.cream100, borderRadius: 12, border: `1px solid ${C.slate200}`, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridColumns,
            background: C.cream200,
            padding: "10px 20px",
            fontFamily: "var(--font-inter)",
            fontSize: 11,
            color: C.slate500,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          <span>User</span>
          <span>Email</span>
          <span>Role</span>
          <span>Last Login</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <div style={{ padding: 60, textAlign: "center" }}>
            <div
              style={{
                width: 32,
                height: 32,
                border: `3px solid ${C.slate200}`,
                borderTop: `3px solid ${C.forest600}`,
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.slate400 }}>
              Loading users...
            </p>
          </div>
        ) : fetchError ? (
          <div style={{ padding: 60, textAlign: "center" }}>
            <AlertCircle size={32} color="#DC2626" style={{ margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: C.forest800, marginBottom: 16 }}>
              {fetchError}
            </p>
            <button
              type="button"
              onClick={fetchUsers}
              style={{
                background: C.forest600,
                color: C.cream100,
                border: "none",
                borderRadius: 6,
                padding: "8px 20px",
                cursor: "pointer",
                fontFamily: "var(--font-inter)",
                fontSize: 13,
              }}
            >
              Retry
            </button>
          </div>
        ) : users.length === 0 ? (
          <div style={{ padding: 60, textAlign: "center" }}>
            <UserPlus size={40} color={C.slate300} style={{ margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 16, color: C.slate500, marginBottom: 12 }}>
              No users found
            </p>
            <Link href="/admin/users/new" style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.forest600 }}>
              Create first user
            </Link>
          </div>
        ) : (
          users.map((user) => {
            const roleStyle = ROLE_STYLES[user.role];
            return (
              <div
                key={user.id}
                className="user-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: gridColumns,
                  padding: "14px 20px",
                  alignItems: "center",
                  borderTop: `1px solid ${C.slate100}`,
                  background: C.cream100,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: roleStyle.avatarBg,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 700, color: roleStyle.color }}>
                      {getInitials(user.full_name)}
                    </span>
                  </div>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700, color: C.forest800 }}>
                    {user.full_name}
                    {!user.is_active && (
                      <span style={{ fontSize: 11, fontWeight: 400, color: C.slate400, marginLeft: 6 }}>(Inactive)</span>
                    )}
                  </span>
                </div>

                <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate500 }}>{user.email}</span>

                <span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      background: roleStyle.badgeBg,
                      color: roleStyle.color,
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      padding: "4px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {user.role === "Super Admin" && <Crown size={10} />}
                    {user.role}
                  </span>
                </span>

                <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: C.slate400 }}>
                  {formatLastLogin(user.last_login_at)}
                </span>

                <span>
                  <span
                    style={{
                      background: user.is_active ? "rgba(74,186,138,0.10)" : C.cream200,
                      color: user.is_active ? C.forest600 : C.slate400,
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </span>

                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Link href={`/admin/users/${user.id}/edit`} style={{ ...actionButtonStyle, textDecoration: "none" }} title="Edit user">
                    <Pencil size={15} color={C.forest600} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleActive(user)}
                    disabled={updatingId === user.id}
                    style={actionButtonStyle}
                    title={user.is_active ? "Deactivate" : "Activate"}
                  >
                    {updatingId === user.id ? (
                      <Loader2 size={16} color={C.slate400} style={{ animation: "spin 0.8s linear infinite" }} />
                    ) : user.is_active ? (
                      <UserX size={15} color="#DC2626" />
                    ) : (
                      <UserCheck size={15} color={C.forest600} />
                    )}
                  </button>
                  {deletingId === user.id ? (
                    <Loader2
                      size={15}
                      color={C.slate400}
                      style={{ animation: "spin 0.8s linear infinite" }}
                    />
                  ) : (
                    <button
                      onClick={() => deleteUser(user)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        padding: 4,
                      }}
                      title="Delete user permanently"
                    >
                      <Trash2 size={15} color="#DC2626" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      </>
      )}
    </div>
  );
}
