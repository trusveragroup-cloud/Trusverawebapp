"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Inbox, FileText, Settings, Users, LogOut, Bell,
  Newspaper, UserCircle, Tag, Mail, type LucideIcon,
} from "lucide-react";
import { C } from "@/lib/colors";
import { AdminProvider, useAdmin } from "@/lib/admin-context";

const BARE_ROUTES = ["/admin/login", "/admin/forgot-password", "/admin/set-password", "/admin/auth-handler"];

function HexagonIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7" fill={C.forest800} />
    </svg>
  );
}

type NavItem = { label: string; icon: LucideIcon; href: string };
type NavGroup = { label: string | null; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
  {
    label: null,
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
      { label: "Contacts", icon: Inbox, href: "/admin/contacts" },
      { label: "Blogs", icon: FileText, href: "/admin/blogs" },
    ],
  },
  {
    label: "BYTESPHERE",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/admin/bytesphere/dashboard" },
      { label: "Articles", icon: Newspaper, href: "/admin/bytesphere/articles" },
      { label: "Blogs", icon: FileText, href: "/admin/bytesphere/blogs" },
      { label: "Authors", icon: UserCircle, href: "/admin/bytesphere/authors" },
      { label: "Taxonomy", icon: Tag, href: "/admin/bytesphere/taxonomy" },
      { label: "Subscribers", icon: Mail, href: "/admin/bytesphere/subscribers" },
      { label: "Contacts", icon: Inbox, href: "/admin/bytesphere/contacts" },
    ],
  },
  {
    label: "SHARED",
    items: [
      { label: "Settings", icon: Settings, href: "/admin/settings" },
      { label: "Users", icon: Users, href: "/admin/users" },
    ],
  },
];

const BS_NAV_PERMISSIONS: Record<string, string> = {
  "/admin/bytesphere/dashboard": "view_bs_dashboard",
  "/admin/bytesphere/articles": "view_bs_articles",
  "/admin/bytesphere/blogs": "view_bs_blogs",
  "/admin/bytesphere/authors": "view_bs_authors",
  "/admin/bytesphere/taxonomy": "view_bs_taxonomy",
  "/admin/bytesphere/subscribers": "view_bs_subscribers",
  "/admin/bytesphere/contacts": "view_bs_contacts",
};

function activeHrefFor(pathname: string): string | null {
  let best: string | null = null;
  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      const matches = pathname === item.href || pathname.startsWith(item.href + "/");
      if (matches && (best === null || item.href.length > best.length)) {
        best = item.href;
      }
    }
  }
  return best;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeHref = activeHrefFor(pathname);
  const { can, loading } = useAdmin();

  const hasBsAccess =
    loading || Object.values(BS_NAV_PERMISSIONS).some((p) => can(p));

  const visibleGroups = NAV_GROUPS.filter((group) => group.label !== "BYTESPHERE" || hasBsAccess).map(
    (group) => {
      if (group.label !== "BYTESPHERE") return group;
      return {
        ...group,
        items: group.items.filter(
          (item) => loading || can(BS_NAV_PERMISSIONS[item.href])
        ),
      };
    }
  );

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  if (BARE_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          width: 220,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#132A13",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 100,
        }}
      >
        <style>{`
          .sidebar-nav-scroll::-webkit-scrollbar { width: 0; }
        `}</style>
        <div style={{ padding: "24px 16px 16px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: C.gold500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HexagonIcon />
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.cream50, fontFamily: "var(--font-inter)" }}>
              TrusVera
            </span>
          </div>
          <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>

        <div
          className="sidebar-nav-scroll"
          style={{
            marginTop: 8,
            padding: "0 8px",
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
            scrollbarWidth: "none",
          }}
        >
          {visibleGroups.map((group) => (
            <div key={group.label ?? "root"}>
              {group.label && (
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(254,253,251,0.35)",
                    padding: "16px 12px 6px",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {group.label}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeHref === item.href;
                return (
                  <Link key={item.href} href={item.href} style={{ textDecoration: "none", display: "block" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: isActive ? "10px 12px 10px 9px" : "10px 12px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontFamily: "var(--font-inter)",
                        marginBottom: 2,
                        background: isActive ? "rgba(200,151,62,0.10)" : "transparent",
                        borderLeft: isActive ? `3px solid ${C.gold500}` : "none",
                        color: isActive ? C.gold400 : "rgba(254,253,251,0.55)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                          e.currentTarget.style.color = "rgba(254,253,251,0.80)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "rgba(254,253,251,0.55)";
                        }
                      }}
                    >
                      <Icon size={18} strokeWidth={1.75} color={isActive ? C.gold400 : "rgba(254,253,251,0.55)"} />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0, marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: C.gold500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                color: C.forest800,
              }}
            >
              SA
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.cream50 }}>Super Admin</div>
              <div style={{ fontSize: 11, color: "rgba(254,253,251,0.45)" }}>super_admin</div>
            </div>
          </div>
          <div
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, cursor: "pointer" }}
          >
            <LogOut size={14} color="rgba(254,253,251,0.35)" />
            <span style={{ fontSize: 12, color: "rgba(254,253,251,0.35)" }}>Sign out</span>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: 220, width: "calc(100% - 220px)", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            height: 56,
            flexShrink: 0,
            background: C.white,
            borderBottom: `1px solid ${C.borderLight}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 32,
          }}
        >
          <div />
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingRight: 32 }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Bell size={20} color={C.textMuted} />
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: C.gold500,
                  fontSize: 9,
                  fontWeight: 600,
                  color: C.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                3
              </div>
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: C.forest600,
                fontSize: 12,
                fontWeight: 600,
                color: C.cream50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              SA
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
      </div>
    </div>
  );
}
