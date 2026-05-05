"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart, CartDrawer } from "./Cart";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/chat", label: "AI Assistant" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

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
            <button onClick={() => setCartOpen(true)} style={{
              position: "relative", background: "none", border: "1.5px solid var(--green-light)",
              borderRadius: 8, padding: "8px 14px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              color: "var(--charcoal)", fontWeight: 600, fontSize: 14,
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--green-mid)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--green-light)")}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
              {count > 0 && (
                <span style={{
                  background: "var(--red-cross)", color: "white",
                  borderRadius: "50%", width: 18, height: 18,
                  fontSize: 11, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {count}
                </span>
              )}
            </button>
          </li>
          <li>
            <Link href="/chat" style={{
              background: "var(--red-cross)", color: "white",
              padding: "9px 22px", borderRadius: 6,
              textDecoration: "none", fontWeight: 700, fontSize: 14,
              transition: "background 0.2s", display: "inline-block",
            }}>
              Order Now
            </Link>
          </li>
        </ul>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}
