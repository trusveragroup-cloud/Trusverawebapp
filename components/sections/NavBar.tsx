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
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (label: string) =>
    setOpenSection((prev) => (prev === label ? null : label));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) setOpenSection(null);
  }, [mobileOpen]);

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
                            const isExternal = href.startsWith("http");
                            return (
                              <a
                                key={label}
                                href={href}
                                className="dropdown-item"
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
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
        <>
          <style>{`
            @keyframes navMobileSlide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>
          <div
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
            style={{ position: "fixed", top: 70, left: 0, right: 0, bottom: 0, zIndex: 90 }}
          />
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 0,
              right: 0,
              zIndex: 95,
              background: C.forest900,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              maxHeight: "calc(100vh - 70px)",
              overflowY: "auto",
              animation: "navMobileSlide 0.25s ease",
            }}
          >
            {NAV.map((item) =>
              item.dropdown ? (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => toggleSection(item.label)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 20px",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#fff",
                      background: "none",
                      border: "none",
                      borderBottom: `1px solid ${C.borderLight}`,
                      cursor: "pointer",
                      fontFamily: "var(--font-inter), sans-serif",
                      textAlign: "left",
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      color="#fff"
                      style={{
                        transform: openSection === item.label ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                  <div
                    style={{
                      maxHeight: openSection === item.label ? 500 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    {item.dropdown.map((group, gi) => (
                      <div key={gi}>
                        {group.items.map((sub) => {
                          const { label, href } = dropdownItemProps(sub);
                          const isActive = pathname === href;
                          const isExternal = href.startsWith("http");
                          return (
                            <a
                              key={label}
                              href={href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noopener noreferrer" : undefined}
                              onClick={() => setMobileOpen(false)}
                              style={{
                                display: "block",
                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                                fontSize: 14,
                                color: isActive ? C.gold500 : "rgba(255,255,255,0.6)",
                                fontWeight: isActive ? 600 : 400,
                                textDecoration: "none",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                fontFamily: "var(--font-inter), sans-serif",
                              }}
                            >
                              {label}
                            </a>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={item.label} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                  {item.href.startsWith("/") ? (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        padding: "14px 20px",
                        fontSize: 15,
                        fontWeight: 600,
                        color: pathname === item.href ? C.gold500 : "#fff",
                        textDecoration: "none",
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        padding: "14px 20px",
                        fontSize: 15,
                        fontWeight: 600,
                        color: pathname === item.href ? C.gold500 : "#fff",
                        textDecoration: "none",
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              )
            )}
            <div style={{ padding: 20 }}>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-gold"
                style={{ fontSize: 13, padding: "10px 18px", justifyContent: "center" }}
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
