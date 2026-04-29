"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/chat", label: "AI Assistant" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      background: "var(--white)",
      borderBottom: "2.5px solid var(--green-light)",
      position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 2px 12px rgba(30,107,30,0.08)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: 72,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/logo.png"
            alt="Daily Health Pharmacy"
            width={180}
            height={58}
            style={{ objectFit: "contain", height: 58, width: "auto" }}
            priority
          />
        </Link>

        <ul style={{ display: "flex", alignItems: "center", gap: "2rem", listStyle: "none" }}>
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link href={l.href} style={{
                  textDecoration: "none",
                  color: active ? "var(--green-mid)" : "var(--charcoal)",
                  fontWeight: 600, fontSize: 14, letterSpacing: 0.3,
                  borderBottom: active ? "2.5px solid var(--green-mid)" : "2.5px solid transparent",
                  paddingBottom: 2, transition: "color 0.2s",
                }}>
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/chat"
              style={{
                background: "var(--red-cross)", color: "white",
                padding: "9px 22px", borderRadius: 6,
                textDecoration: "none", fontWeight: 700, fontSize: 14,
                transition: "background 0.2s", display: "inline-block",
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
