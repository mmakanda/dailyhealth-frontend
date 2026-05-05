import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{
        minHeight: "70vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "4rem 2rem", textAlign: "center",
        background: "var(--green-pale)",
      }}>
        <div style={{
          width: 80, height: 80, background: "var(--green-mid)", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem",
        }}>
          <svg width="40" height="40" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "5rem", fontWeight: 900,
          color: "var(--green-mid)", lineHeight: 1, marginBottom: "0.5rem",
        }}>404</h1>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700,
          color: "var(--black)", marginBottom: "1rem",
        }}>Page Not Found</h2>
        <p style={{ fontSize: "1rem", color: "var(--gray-dark)", maxWidth: 420, lineHeight: 1.7, marginBottom: "2rem" }}>
          The page you are looking for does not exist or has been moved.
          Let us help you find what you need.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/products" className="btn-secondary">Browse Products</Link>
          <Link href="/chat" className="btn-secondary">Ask AI Assistant</Link>
        </div>
        <p style={{ marginTop: "2rem", fontSize: 14, color: "var(--gray-mid)" }}>
          Need help? WhatsApp us on{" "}
          <a href="https://wa.me/263786176284" style={{ color: "var(--green-mid)", fontWeight: 700 }}>
            +263 78 617 6284
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
}
