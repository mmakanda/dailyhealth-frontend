"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function HomePage() {
  const [splashDone, setSplashDone] = useState(false);
  const [splashFade, setSplashFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSplashFade(true), 2200);
    const t2 = setTimeout(() => setSplashDone(true), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {/* ── SPLASH SCREEN ── */}
      {!splashDone && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "#1e6b1e",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          opacity: splashFade ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: splashFade ? "none" : "all",
        }}>
          <div style={{ animation: "splashPop 0.5s ease forwards", opacity: 0 }}>
            <Image src="/logo.png" alt="Daily Health Pharmacy" width={220} height={130}
              style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} priority />
          </div>
          <p style={{
            color: "rgba(255,255,255,0.8)", fontSize: 15, fontFamily: "var(--font-body)",
            marginTop: "1.5rem", letterSpacing: 2, textTransform: "uppercase",
            animation: "splashPop 0.5s 0.3s ease forwards", opacity: 0,
          }}>Your Health, Our Priority</p>
          <div style={{
            marginTop: "2.5rem", width: 48, height: 3, background: "rgba(255,255,255,0.3)",
            borderRadius: 2, overflow: "hidden",
          }}>
            <div style={{
              height: "100%", background: "white", borderRadius: 2,
              animation: "splashBar 2s ease forwards",
            }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes splashPop { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        @keyframes splashBar { from{width:0%} to{width:100%} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroFade { from{opacity:0} to{opacity:1} }
      `}</style>

      <Navbar />

      {/* ── HERO WITH VIDEO BACKGROUND ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Hero background photo - real pharmacy stock photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.png"
          alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", zIndex: 0,
          }}
        />
        {/* Dark green overlay for readability */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(135deg, rgba(5,30,5,0.80) 0%, rgba(15,55,15,0.70) 50%, rgba(0,0,0,0.60) 100%)",
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 3,
          maxWidth: 1200, margin: "0 auto", padding: "7rem 2rem 5rem",
          display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center",
          width: "100%",
          animation: "heroFade 1s 2.5s both",
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
              color: "white", padding: "6px 16px", borderRadius: 20,
              fontSize: 13, fontWeight: 600, letterSpacing: 0.5, marginBottom: "1.5rem",
              border: "1px solid rgba(255,255,255,0.25)",
            }}>
              <span style={{ width: 8, height: 8, background: "#7dde7d", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 0 3px rgba(125,222,125,0.3)" }} />
              Trusted Pharmacy · Zimbabwe
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 900, color: "white", lineHeight: 1.1,
              marginBottom: "1.25rem", letterSpacing: -1,
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}>
              Your Health,{" "}
              <em style={{ color: "#7dde7d", fontStyle: "normal" }}>Our Priority</em>{" "}
              Every Day.
            </h1>

            <p style={{
              fontSize: "1.1rem", color: "rgba(255,255,255,0.85)",
              marginBottom: "2.5rem", lineHeight: 1.75, maxWidth: 520,
            }}>
              Quality medicines, expert pharmacist advice, and an AI assistant available 24/7 — wherever you are in Zimbabwe.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <Link href="/products" className="btn-primary" style={{ background: "#2d7d2d", border: "none" }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Browse Products
              </Link>
              <Link href="/chat" style={{
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                color: "white", padding: "14px 28px", borderRadius: 8,
                border: "1.5px solid rgba(255,255,255,0.4)",
                fontWeight: 700, fontSize: 15, textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Ask AI Assistant
              </Link>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "MCAZ Licensed" },
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Open 7 Days" },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "WhatsApp 24/7" },
                { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "EcoCash & ZIPIT" },
              ].map((b) => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <svg width="15" height="15" fill="none" stroke="#7dde7d" strokeWidth="2" viewBox="0 0 24 24">
                    <path d={b.icon} />
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats card */}
          <div style={{
            background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "var(--radius-lg)", padding: "2rem 1.5rem",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
            minWidth: 220,
          }}>
            {[
              { num: "800+", label: "Products" },
              { num: "14+", label: "Years" },
              { num: "24/7", label: "WhatsApp" },
              { num: "100%", label: "MCAZ" },
            ].map((s) => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.1)", borderRadius: 10,
                padding: "14px 10px", textAlign: "center",
                border: "1px solid rgba(255,255,255,0.15)",
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 900, color: "#7dde7d" }}>{s.num}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 0.5, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "heroFade 1s 3s both",
        }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div style={{
        background: "linear-gradient(90deg, var(--green-dark) 0%, var(--green-mid) 50%, var(--green-dark) 100%)",
        padding: "2.5rem 2rem",
        borderTop: "4px solid var(--red-cross)",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", textAlign: "center" }}>
          {[
            { num: "5,000+", label: "Happy Customers" },
            { num: "800+", label: "Products Available" },
            { num: "24/7", label: "WhatsApp Support" },
            { num: "14+", label: "Years of Service" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 900, color: "white", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 5, fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section style={{ padding: "5rem 2rem", background: "var(--white)" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--green-bright)", marginBottom: "0.75rem" }}>Why Choose Us</p>
        <h2 style={{ textAlign: "center", fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 900, color: "var(--black)", marginBottom: "0.75rem" }}>
          Healthcare Made Convenient
        </h2>
        <p style={{ textAlign: "center", color: "var(--gray-dark)", fontSize: "1rem", maxWidth: 520, margin: "0 auto 3rem" }}>
          We combine trusted pharmaceutical expertise with modern technology to serve you better.
        </p>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.75rem" }}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} accent={i % 3 === 2 ? "red" : "green"} />
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr auto"] {
            grid-template-columns: 1fr !important;
          }
          section > div[style*="grid-template-columns: 1fr auto"] > div:last-child {
            display: none !important;
          }
        }
      `}</style>
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
      <div style={{ width: 52, height: 52, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
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
  { title: "Verified Medicines", desc: "All products are MCAZ-approved and sourced from licensed suppliers. Quality and authenticity you can count on.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "AI-Powered Chat", desc: "Get instant, accurate answers about medicines, stock levels, and prices from our 24/7 AI health assistant.", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
  { title: "Multiple Locations", desc: "Growing across Zimbabwe — visit your nearest branch or order online for convenient collection or delivery.", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  { title: "WhatsApp Orders", desc: "Order via WhatsApp and pay with EcoCash or ZIPIT. Simple, fast, and familiar — no app downloads needed.", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
  { title: "EcoCash & ZIPIT", desc: "Pay securely with EcoCash, ZIPIT, or cash. Transparent pricing with no hidden charges.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Expert Pharmacists", desc: "Our qualified pharmacists provide personalised advice on dosing, interactions, and overall wellness.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
];
