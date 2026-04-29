import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", color: "white", padding: "4rem 2rem 2rem" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "3rem", marginBottom: "3rem",
      }}>
        {/* Brand */}
        <div>
          <Image
            src="/logo.png"
            alt="Daily Health Pharmacy"
            width={160}
            height={52}
            style={{ objectFit: "contain", height: 52, width: "auto", filter: "brightness(0) invert(1)" }}
          />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: "1rem", lineHeight: 1.7 }}>
            Your trusted pharmacy partner — quality medicines, expert advice, and AI-powered health assistance. Serving Zimbabwe since 2010.
          </p>
          {/* Social / contact badges */}
          <div style={{ display: "flex", gap: 12, marginTop: "1.25rem" }}>
            {[
              { label: "WhatsApp", color: "#25d366" },
              { label: "EcoCash", color: "#e91e8c" },
              { label: "MCAZ Licensed", color: "var(--green-bright)" },
            ].map((b) => (
              <span key={b.label} style={{
                fontSize: 11, fontWeight: 700, padding: "3px 10px",
                borderRadius: 12, background: b.color, color: "white",
                letterSpacing: 0.3,
              }}>{b.label}</span>
            ))}
          </div>
        </div>

        <FooterCol title="Services" links={[
          { href: "/products", label: "Buy Medicines" },
          { href: "/chat", label: "AI Assistant" },
          { href: "/contact", label: "Prescription Filling" },
          { href: "/contact", label: "Health Advice" },
        ]} />
        <FooterCol title="Products" links={[
          { href: "/products", label: "Pain Relief" },
          { href: "/products", label: "Antibiotics" },
          { href: "/products", label: "Vitamins" },
          { href: "/products", label: "Baby Care" },
        ]} />
        <FooterCol title="Company" links={[
          { href: "/contact", label: "Contact Us" },
          { href: "/contact", label: "Find a Branch" },
          { href: "/chat", label: "WhatsApp Orders" },
          { href: "/contact", label: "About Us" },
        ]} />
      </div>

      <div style={{
        maxWidth: 1200, margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "1.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "0.5rem",
      }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          © {new Date().getFullYear()} Daily Health Pharmacy · Zimbabwe
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          MCAZ Licensed · All products approved
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "1rem" }}>{title}</h4>
      {links.map((l) => (
        <Link key={l.label} href={l.href} style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 14, textDecoration: "none", marginBottom: 8, transition: "color 0.2s" }}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}
