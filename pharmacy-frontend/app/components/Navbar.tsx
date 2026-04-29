"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", id: "home" },
  { href: "/products", label: "Products", id: "products" },
  { href: "/chat", label: "AI Assistant", id: "chat" },
  { href: "/contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      background: "var(--white)",
      borderBottom: "2px solid var(--green-light)",
      position: "sticky", top: 0, zIndex: 100,
      boxShadow: "var(--shadow-sm)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: 72,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{
            width: 44, height: 44, background: "var(--green-mid)",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <LogoCross />
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900, color: "var(--black)", letterSpacing: -0.5 }}>DAILY </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900, color: "var(--black)" }}>HEALTH</span>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--green-mid)", letterSpacing: 1, textTransform: "uppercase" }}>PHARMACY</div>
          </div>
        </Link>

        {/* Links */}
        <ul style={{ display: "flex", alignItems: "center", gap: "2rem", listStyle: "none" }}>
          {links.map((l) => (
            <li key={l.id}>
              <Link
                href={l.href}
                style={{
                  textDecoration: "none",
                  color: pathname === l.href ? "var(--green-mid)" : "var(--charcoal)",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: 0.3,
                  borderBottom: pathname === l.href ? "2px solid var(--green-mid)" : "2px solid transparent",
                  paddingBottom: 2,
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/chat"
              style={{
                background: "var(--green-mid)", color: "white",
                padding: "8px 20px", borderRadius: 6,
                textDecoration: "none", fontWeight: 700, fontSize: 14,
                transition: "background 0.2s",
              }}
            >
              Order Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function LogoCross() {
  return (
    <div style={{ width: 20, height: 20, position: "relative" }}>
      <div style={{ position: "absolute", width: 6, height: 20, left: 7, top: 0, background: "white", borderRadius: 2 }} />
      <div style={{ position: "absolute", width: 20, height: 6, left: 0, top: 7, background: "white", borderRadius: 2 }} />
    </div>
  );
}
