"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function ContactPage() {
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", subject: "Medicine enquiry", message: "" });

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  function handleSubmit() {
    if (!form.firstName || !form.message) {
      showToast("Please fill in your name and message.");
      return;
    }

    // Build WhatsApp message
    const text = [
      "Hello Daily Health Pharmacy,",
      "",
      `Name: ${form.firstName} ${form.lastName}`.trim(),
      form.phone ? `Phone: ${form.phone}` : "",
      `Subject: ${form.subject}`,
      "",
      form.message,
    ].filter(Boolean).join("%0A");

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/263786176284?text=${text}`, "_blank");

    showToast("Opening WhatsApp to send your message...");
    setForm({ firstName: "", lastName: "", phone: "", subject: "Medicine enquiry", message: "" });
  }

  return (
    <>
      <Navbar />

      {/* Toast */}
      <div style={{
        position: "fixed", top: 90, right: 24,
        background: "var(--green-mid)", color: "white",
        padding: "12px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600,
        zIndex: 200, transition: "transform 0.3s",
        transform: toast ? "translateX(0)" : "translateX(120%)",
        boxShadow: "var(--shadow-md)",
      }}>
        {toast}
      </div>

      {/* Page Hero */}
      <div style={{ background: "var(--green-pale)", padding: "3rem 2rem", borderBottom: "2px solid var(--green-light)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 900, color: "var(--black)" }}>Contact Us</h1>
          <p style={{ color: "var(--gray-dark)", marginTop: "0.5rem" }}>We&apos;re here to help. Visit us, call us, or send a message.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>

        {/* Contact Info */}
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 900, color: "var(--black)", marginBottom: "1.5rem" }}>Get in Touch</h2>

          {[
            {
              icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
              title: "Our Address",
              lines: ["90 Herbert Chitepo Street (Bulawayo HQ)", "CBD, Bulawayo · More branches coming soon"],
            },
            {
              icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
              title: "Phone",
              lines: ["+263 78 617 6284", "+263 78 617 6284 (WhatsApp)"],
            },
            {
              icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              title: "Email",
              lines: ["info@dailyhealthpharmacy.co.zw"],
            },
          ].map((item) => (
            <div key={item.title} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: "1.75rem" }}>
              <div style={{ width: 46, height: 46, background: "var(--green-mid)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d={item.icon} />
                </svg>
              </div>
              <div>
                <h4 style={{ fontWeight: 700, color: "var(--black)", fontSize: 14, marginBottom: 3 }}>{item.title}</h4>
                {item.lines.map((l) => <p key={l} style={{ color: "var(--gray-dark)", fontSize: 14, lineHeight: 1.5 }}>{l}</p>)}
              </div>
            </div>
          ))}

          {/* Hours Card */}
          <div style={{ background: "var(--green-pale)", border: "1.5px solid var(--green-light)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginTop: "2rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--black)", marginBottom: "1rem" }}>Trading Hours</h3>
            {[
              { day: "Monday – Friday", time: "7:30 AM – 6:00 PM", open: true },
              { day: "Saturday", time: "8:00 AM – 5:00 PM", open: false },
              { day: "Sunday & Public Holidays", time: "9:00 AM – 1:00 PM", open: false },
              { day: "WhatsApp Orders", time: "24 / 7", open: false },
            ].map((r) => (
              <div key={r.day} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--green-light)", fontSize: "13.5px" }}>
                <span style={{ color: "var(--gray-dark)" }}>{r.day}</span>
                <span style={{ fontWeight: 600, color: "var(--charcoal)" }}>
                  {r.time}
                  {r.open && (
                    <span style={{ color: "var(--green-mid)", fontWeight: 700, fontSize: 12, background: "var(--green-light)", padding: "2px 8px", borderRadius: 4, marginLeft: 8 }}>
                      Open
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ background: "var(--white)", border: "1.5px solid var(--gray-light)", borderRadius: "var(--radius-lg)", padding: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 900, color: "var(--black)", marginBottom: "1.5rem" }}>Send a Message</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
            <FormField label="First Name" value={form.firstName} placeholder="John" onChange={(v) => setForm({ ...form, firstName: v })} />
            <FormField label="Last Name" value={form.lastName} placeholder="Moyo" onChange={(v) => setForm({ ...form, lastName: v })} />
          </div>
          <FormField label="Phone Number" value={form.phone} placeholder="+263 78 617 6284" onChange={(v) => setForm({ ...form, phone: v })} type="tel" />

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 6, letterSpacing: 0.3 }}>Subject</label>
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--gray-light)", borderRadius: 8, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--charcoal)", background: "var(--white)" }}
            >
              <option>Medicine enquiry</option>
              <option>Order status</option>
              <option>Prescription submission</option>
              <option>General question</option>
            </select>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 6, letterSpacing: 0.3 }}>Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can we help you?"
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--gray-light)", borderRadius: 8, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--charcoal)", background: "var(--white)", height: 100, resize: "vertical" }}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.355A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
            Send via WhatsApp
          </button>
          <p style={{ fontSize: 12, color: "var(--gray-mid)", marginTop: 10, textAlign: "center" }}>
            This will open WhatsApp with your message pre-filled. You can review before sending.
          </p>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function FormField({
  label, value, placeholder, onChange, type = "text",
}: {
  label: string; value: string; placeholder: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 6, letterSpacing: 0.3 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--gray-light)", borderRadius: 8, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--charcoal)", background: "var(--white)" }}
      />
    </div>
  );
}
