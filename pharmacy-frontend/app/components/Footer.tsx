import Link from "next/link";

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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, background: "var(--green-mid)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 20, height: 20, position: "relative" }}>
                <div style={{ position: "absolute", width: 6, height: 20, left: 7, top: 0, background: "white", borderRadius: 2 }} />
                <div style={{ position: "absolute", width: 20, height: 6, left: 0, top: 7, background: "white", borderRadius: 2 }} />
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900, color: "white" }}>DAILY HEALTH</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--green-bright)", letterSpacing: 1 }}>PHARMACY</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: "1rem", lineHeight: 1.6 }}>
            Bulawayo's trusted pharmacy. Quality medicines, expert advice, and AI-powered health assistance — serving you since 2010.
          </p>
          <p style={{ marginTop: "0.75rem", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>90 Herbert Chitepo Street, CBD, Bulawayo</p>
        </div>

        <FooterCol title="Services" links={[
          { href: "/products", label: "Buy Medicines" },
          { href: "/chat", label: "AI Assistant" },
          { href: "/contact", label: "Prescription Filling" },
        ]} />
        <FooterCol title="Products" links={[
          { href: "/products", label: "Pain Relief" },
          { href: "/products", label: "Antibiotics" },
          { href: "/products", label: "Vitamins" },
          { href: "/products", label: "Baby Care" },
        ]} />
        <FooterCol title="Company" links={[
          { href: "/contact", label: "Contact Us" },
          { href: "/contact", label: "About Us" },
          { href: "/chat", label: "WhatsApp Orders" },
        ]} />
      </div>

      <div style={{
        maxWidth: 1200, margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "1.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>© {new Date().getFullYear()} Daily Health Pharmacy · Bulawayo, Zimbabwe</p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>MCAZ Licensed · All products approved</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>{title}</h4>
      {links.map((l) => (
        <Link key={l.label} href={l.href} style={{ display: "block", color: "rgba(255,255,255,0.75)", fontSize: 14, textDecoration: "none", marginBottom: 8 }}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}
