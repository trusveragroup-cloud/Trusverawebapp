"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV } from "@/lib/data";
import { C } from "@/lib/colors";

function dropdownItemProps(sub: string | { label: string; href: string }) {
  return typeof sub === "string" ? { label: sub, href: "#" } : sub;
}

function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="TrusVera Group"
      width={150}
      height={44}
      style={{ objectFit: "contain", objectPosition: "left center" }}
      priority
    />
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(8,28,19,0.97)" : "rgba(8,28,19,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          height: 70,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />

        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {NAV.map((item) => (
            <div
              key={item.label}
              style={{ position: "relative" }}
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
            >
              {item.dropdown ? (
                <>
                  <button className="nav-link">
                    {item.label}
                    <ChevronDown size={14} />
                  </button>
                  {activeDropdown === item.label && (
                    <div
                      className={`dropdown-menu${item.dropdown.length === 1 && !item.dropdown[0].group ? " dropdown-single" : ""}`}
                    >
                      {item.dropdown.map((group, gi) => (
                        <div key={gi}>
                          {group.group && <div className="dropdown-group-title">{group.group}</div>}
                          {group.items.map((sub) => {
                            const { label, href } = dropdownItemProps(sub);
                            const isActive = pathname === href;
                            return (
                              <a
                                key={label}
                                href={href}
                                className="dropdown-item"
                                style={isActive ? { color: C.gold500, fontWeight: 600 } : undefined}
                              >
                                {label}
                              </a>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : item.href.startsWith("/") ? (
                <Link
                  href={item.href}
                  className="nav-link"
                  style={pathname === item.href ? { color: C.gold500, fontWeight: 600 } : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="nav-link"
                  style={pathname === item.href ? { color: C.gold500, fontWeight: 600 } : undefined}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
          <Link href="/contact" className="btn-gold" style={{ fontSize: 13, padding: "10px 18px", marginLeft: 12 }}>
            Schedule a Consultation
          </Link>
        </div>

        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen((v) => !v)}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} color="#fff" /> : <Menu size={22} color="#fff" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 0,
            right: 0,
            background: C.forest900,
            padding: 20,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {NAV.map((item) =>
            item.dropdown ? (
              <div key={item.label} style={{ padding: "8px 12px" }}>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{item.label}</div>
                {item.dropdown.map((group, gi) => (
                  <div key={gi} style={{ paddingLeft: 12, marginBottom: 8 }}>
                    {group.items.map((sub) => {
                      const { label, href } = dropdownItemProps(sub);
                      const isActive = pathname === href;
                      return (
                        <a
                          key={label}
                          href={href}
                          style={{
                            display: "block",
                            padding: "6px 0",
                            fontSize: 13,
                            color: isActive ? C.gold500 : "rgba(255,255,255,0.6)",
                            fontWeight: isActive ? 600 : 400,
                            textDecoration: "none",
                          }}
                        >
                          {label}
                        </a>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : item.href.startsWith("/") ? (
              <Link
                key={item.label}
                href={item.href}
                className="nav-link"
                style={pathname === item.href ? { color: C.gold500, fontWeight: 600 } : undefined}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                style={pathname === item.href ? { color: C.gold500, fontWeight: 600 } : undefined}
              >
                {item.label}
              </a>
            )
          )}
          <Link href="/contact" className="btn-gold" style={{ fontSize: 13, padding: "10px 18px", marginTop: 8, justifyContent: "center" }}>
            Schedule a Consultation
          </Link>
        </div>
      )}
    </nav>
  );
}
