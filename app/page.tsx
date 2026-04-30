"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #f0f8f0 0%, #e6f4e6 50%, #f9fdf9 100%)",
        padding: "5rem 2rem", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative green circle */}
        <div style={{
          position: "absolute", right: -120, top: -120, width: 500, height: 500,
          background: "radial-gradient(circle, rgba(58,154,58,0.07) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        {/* Decorative red accent */}
        <div style={{
          position: "absolute", left: -60, bottom: -60, width: 300, height: 300,
          background: "radial-gradient(circle, rgba(204,26,26,0.04) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 440px", gap: "5rem", alignItems: "center" }}>
          {/* Left copy */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--green-light)", color: "var(--green-dark)",
              padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
              letterSpacing: 0.5, marginBottom: "1.5rem",
            }}>
              <span style={{ width: 8, height: 8, background: "var(--green-bright)", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 0 3px rgba(58,154,58,0.2)" }} />
              Trusted Pharmacy · Zimbabwe
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)", fontSize: "3.6rem", fontWeight: 900,
              color: "var(--black)", lineHeight: 1.1, marginBottom: "1.25rem", letterSpacing: -1,
            }}>
              Your Health,{" "}
              <em style={{ color: "var(--green-mid)", fontStyle: "normal" }}>Our Priority</em>{" "}
              Every Day.
            </h1>

            <p style={{ fontSize: "1.1rem", color: "var(--gray-dark)", marginBottom: "2.5rem", lineHeight: 1.75, maxWidth: 520 }}>
              Quality medicines, expert pharmacist advice, and an AI assistant that knows our exact stock and prices — available 24/7 wherever you are in Zimbabwe.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <Link href="/products" className="btn-primary">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Browse Products
              </Link>
              <Link href="/chat" className="btn-secondary">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Ask the AI Assistant
              </Link>
            </div>

            {/* Trust row */}
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "MCAZ Licensed" },
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Open 7 Days" },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "WhatsApp Orders 24/7" },
                { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "EcoCash & ZIPIT" },
              ].map((b) => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <svg width="16" height="16" fill="none" stroke="var(--green-mid)" strokeWidth="2" viewBox="0 0 24 24">
                    <path d={b.icon} />
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-dark)" }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Logo showcase card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              background: "white", borderRadius: "var(--radius-lg)", padding: "2.5rem 2rem",
              boxShadow: "0 12px 48px rgba(30,107,30,0.15)", width: "100%",
              border: "1.5px solid var(--green-light)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem",
            }}>
              <Image
                src="/logo.png"
                alt="Daily Health Pharmacy"
                width={260}
                height={160}
                style={{ objectFit: "contain", width: "100%", height: "auto", maxWidth: 260 }}
                priority
              />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 14, color: "var(--gray-dark)", lineHeight: 1.6 }}>
                  Serving Zimbabwe since 2010.<br />
                  Quality medicines. Expert advice. Delivered with care.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
                {[
                  { num: "800+", label: "Products" },
                  { num: "14+", label: "Years" },
                  { num: "24/7", label: "WhatsApp" },
                  { num: "100%", label: "MCAZ" },
                ].map((s) => (
                  <div key={s.label} style={{
                    background: "var(--green-pale)", borderRadius: 10,
                    padding: "10px 8px", textAlign: "center",
                    border: "1px solid var(--green-light)",
                  }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 900, color: "var(--green-mid)" }}>{s.num}</div>
                    <div style={{ fontSize: 11, color: "var(--gray-mid)", fontWeight: 600, letterSpacing: 0.5, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND — logo red accent stripe */}
      <div style={{
        background: "linear-gradient(90deg, var(--green-dark) 0%, var(--green-mid) 50%, var(--green-dark) 100%)",
        padding: "3rem 2rem",
        borderTop: "4px solid var(--red-cross)",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {[
            { num: "5,000+", label: "Happy Customers" },
            { num: "800+", label: "Products Available" },
            { num: "24/7", label: "WhatsApp Support" },
            { num: "14+", label: "Years of Service" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.6rem", fontWeight: 900, color: "white", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 6, fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding: "5rem 2rem", background: "var(--white)" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--green-bright)", marginBottom: "0.75rem" }}>Why Choose Us</p>
        <h2 style={{ textAlign: "center", fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 900, color: "var(--black)", marginBottom: "0.75rem" }}>
          Healthcare Made Convenient
        </h2>
        <p style={{ textAlign: "center", color: "var(--gray-dark)", fontSize: "1rem", maxWidth: 520, margin: "0 auto 3rem" }}>
          We combine trusted pharmaceutical expertise with modern technology to serve you better, wherever you are.
        </p>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.75rem" }}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} accent={i % 3 === 2 ? "red" : "green"} />
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function FeatureCard({ feature, accent }: { feature: typeof features[0]; accent: string }) {
  const iconBg = accent === "red" ? "var(--red-cross)" : "var(--green-mid)";
  return (
    <div style={{
      padding: "2rem", borderRadius: "var(--radius-lg)",
      border: "1.5px solid var(--green-light)", background: "var(--green-pale)",
      transition: "all 0.25s",
    }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--green-mid)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
        (e.currentTarget as HTMLDivElement).style.transform = "";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--green-light)";
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 12, background: iconBg,
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem",
      }}>
        <svg width="26" height="26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d={feature.icon} />
        </svg>
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--black)", marginBottom: "0.6rem" }}>{feature.title}</h3>
      <p style={{ fontSize: "0.9rem", color: "var(--gray-dark)", lineHeight: 1.65 }}>{feature.desc}</p>
    </div>
  );
}

const features = [
  {
    title: "Verified Medicines",
    desc: "All products are MCAZ-approved and sourced from licensed suppliers. Quality and authenticity you can count on.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "AI-Powered Chat",
    desc: "Get instant, accurate answers about medicines, stock levels, and prices from our 24/7 AI health assistant.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  },
  {
    title: "Multiple Locations",
    desc: "Growing across Zimbabwe — visit your nearest branch or order online for convenient collection or delivery.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "WhatsApp Orders",
    desc: "Order via WhatsApp and pay with EcoCash or ZIPIT. Simple, fast, and familiar — no app downloads needed.",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    title: "EcoCash & ZIPIT",
    desc: "Pay securely with EcoCash, ZIPIT, or cash. Transparent pricing with no hidden charges.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Expert Pharmacists",
    desc: "Our qualified pharmacists provide personalised advice on dosing, interactions, and overall wellness.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];
