"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Inbox, FileText, Settings, Users, LogOut, Bell, type LucideIcon } from "lucide-react";
import { C } from "@/lib/colors";

const BARE_ROUTES = ["/admin/login", "/admin/forgot-password"];

function HexagonIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7" fill={C.forest800} />
    </svg>
  );
}

const NAV_ITEMS: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Contacts", icon: Inbox, href: "/admin/contacts" },
  { label: "Blogs", icon: FileText, href: "/admin/blogs" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
  { label: "Users", icon: Users, href: "/admin/users" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
          background: C.forest600,
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ padding: "24px 16px 16px" }}>
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

        <div style={{ marginTop: 8, padding: "0 8px", flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.label} href={item.href} style={{ textDecoration: "none", display: "block" }}>
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

        <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
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
