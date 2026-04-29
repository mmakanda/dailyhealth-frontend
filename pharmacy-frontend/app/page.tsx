import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, var(--green-pale) 0%, #e8f5e9 50%, #f9fbe7 100%)",
        padding: "5rem 2rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: -80, top: -80,
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(46,125,50,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "center",
        }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--green-light)", color: "var(--green-dark)",
              padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600,
              letterSpacing: 0.5, marginBottom: "1.5rem",
            }}>
              <span style={{ width: 8, height: 8, background: "var(--green-mid)", borderRadius: "50%", display: "inline-block" }} />
              Serving Bulawayo Since 2010
            </div>
            <h1 style={{
              fontFamily: "var(--font-display)", fontSize: "3.2rem", fontWeight: 900,
              color: "var(--black)", lineHeight: 1.1, marginBottom: "1.25rem", letterSpacing: -1,
            }}>
              Your Health,<br />
              <em style={{ color: "var(--green-mid)", fontStyle: "normal" }}>Our Priority</em><br />
              Every Day.
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--gray-dark)", marginBottom: "2rem", lineHeight: 1.7, maxWidth: 480 }}>
              Bulawayo&apos;s trusted pharmacy delivering quality medicines, health products, and expert advice — now with AI-powered assistance available 24/7.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/products" className="btn-primary">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Browse Products
              </Link>
              <Link href="/chat" className="btn-secondary">Chat with AI Assistant</Link>
            </div>
          </div>

          {/* Right: demo chat card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              background: "white", borderRadius: "var(--radius-lg)", padding: "2rem",
              boxShadow: "var(--shadow-lg)", maxWidth: 340, width: "100%",
              border: "1px solid var(--green-light)",
            }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--black)", marginBottom: "1rem" }}>
                💬 AI Health Assistant
              </h3>
              <ChatBubble role="bot" text="Hello! I'm here to help with medicines, health advice, and orders. How can I assist you today?" />
              <ChatBubble role="user" text="Do you have Panado in stock?" />
              <ChatBubble role="bot" text="Yes! Panado 500mg is in stock at $1.50 per pack. Would you like to place an order?" />
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <input type="text" readOnly placeholder="Ask about medicines..." style={{
                  flex: 1, padding: "8px 12px", border: "1px solid var(--green-light)",
                  borderRadius: 8, fontFamily: "var(--font-body)", fontSize: 13, color: "var(--gray-mid)",
                }} />
                <button style={{ background: "var(--green-mid)", color: "white", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer" }}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <div style={{ background: "var(--green-mid)", padding: "3.5rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {[
            { num: "5,000+", label: "Happy Customers" },
            { num: "800+", label: "Products Available" },
            { num: "24/7", label: "WhatsApp Support" },
            { num: "14+", label: "Years Serving Bulawayo" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 900, color: "white", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 6, fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding: "5rem 2rem", background: "var(--white)" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--green-mid)", marginBottom: "0.75rem" }}>Why Choose Us</p>
        <h2 style={{ textAlign: "center", fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 900, color: "var(--black)", marginBottom: "0.75rem" }}>
          Healthcare Made Convenient
        </h2>
        <p style={{ textAlign: "center", color: "var(--gray-dark)", fontSize: "1rem", maxWidth: 500, margin: "0 auto 3rem" }}>
          We combine trusted pharmaceutical expertise with modern technology to serve you better.
        </p>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {features.map((f) => (
            <div key={f.title} style={{
              padding: "2rem", borderRadius: "var(--radius-lg)",
              border: "1.5px solid var(--green-light)", background: "var(--green-pale)",
              transition: "all 0.25s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                (e.currentTarget as HTMLDivElement).style.transform = "";
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: "var(--green-mid)", display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.25rem",
              }}>
                <svg width="26" height="26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "var(--black)", marginBottom: "0.6rem" }}>{f.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--gray-dark)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function ChatBubble({ role, text }: { role: "bot" | "user"; text: string }) {
  const isBot = role === "bot";
  return (
    <div style={{
      padding: "10px 14px", borderRadius: 12, fontSize: 14, marginBottom: 8,
      maxWidth: "85%",
      background: isBot ? "var(--green-pale)" : "var(--green-mid)",
      color: isBot ? "var(--charcoal)" : "white",
      marginLeft: isBot ? 0 : "auto",
      borderBottomLeftRadius: isBot ? 4 : 12,
      borderBottomRightRadius: isBot ? 12 : 4,
      textAlign: isBot ? "left" : "right",
    }}>
      {text}
    </div>
  );
}

const features = [
  {
    title: "Verified Medicines",
    desc: "All products are MCAZ-approved and sourced from licensed suppliers. Quality you can trust every time.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "AI-Powered Chat",
    desc: "Get instant answers about medicines, interactions, and health tips from our 24/7 AI health assistant.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  },
  {
    title: "Convenient Location",
    desc: "Located at 90 Herbert Chitepo Street, CBD Bulawayo — right in the heart of the city for easy access.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "WhatsApp Orders",
    desc: "Order via WhatsApp and pay with EcoCash. Simple, fast, and familiar — no app downloads needed.",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    title: "EcoCash Payments",
    desc: "Pay securely with EcoCash, ZIPIT, or cash. Transparent pricing with no hidden charges.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Expert Pharmacists",
    desc: "Our qualified pharmacists provide personalised advice on dosing, interactions, and wellness.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];
