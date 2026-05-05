"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { sendChatMessage, type ChatHistory } from "../lib/api";

interface Message {
  role: "bot" | "user";
  text: string;
  time: string;
}

const QUICK_CHIPS = [
  "Do you have Panado in stock?",
  "What are your opening hours?",
  "How do I order via WhatsApp?",
  "What is good for a headache?",
  "Do you accept EcoCash?",
];

function nowTime() {
  return new Date().toLocaleTimeString("en-ZW", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hello! Welcome to Daily Health Pharmacy. I can help you with medicine information, check stock availability, provide health tips, and assist with placing orders. How can I help you today?",
      time: nowTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function handleSend(msg?: string) {
    const text = (msg ?? input).trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", text, time: nowTime() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const history: ChatHistory[] = messages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));
      const response = await sendChatMessage(text, history);
      setMessages((prev) => [...prev, { role: "bot", text: response, time: nowTime() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I'm having trouble connecting right now. Please call the pharmacy directly or try again shortly.",
          time: nowTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <div style={{ background: "var(--green-pale)", padding: "3rem 2rem", borderBottom: "2px solid var(--green-light)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 900, color: "var(--black)" }}>AI Health Assistant</h1>
          <p style={{ color: "var(--gray-dark)", marginTop: "0.5rem" }}>Get instant answers about medicines, stock, and health advice — 24 hours a day.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem" }}>

        {/* Header card */}
        <div style={{
          background: "var(--green-pale)", border: "1.5px solid var(--green-light)",
          borderRadius: "var(--radius-lg)", padding: "1.5rem 2rem",
          marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem",
        }}>
          <div style={{
            width: 52, height: 52, background: "var(--green-mid)", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="26" height="26" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--black)" }}>
              Daily Health AI Assistant
            </h2>
            <p style={{ fontSize: 13, color: "var(--gray-dark)", marginTop: 2 }}>
              <span style={{ width: 8, height: 8, background: "#4caf50", borderRadius: "50%", display: "inline-block", marginRight: 6, boxShadow: "0 0 0 3px rgba(76,175,80,0.2)" }} />
              Online now · Powered by Groq AI · Always available
            </p>
          </div>
        </div>

        {/* Chat window */}
        <div
          ref={chatWindowRef}
          style={{
            background: "var(--white)", border: "1.5px solid var(--green-light)",
            borderRadius: "var(--radius-lg)", height: 420,
            overflowY: "auto", padding: "1.5rem",
            display: "flex", flexDirection: "column", gap: 12,
          }}
        >
          {messages.map((m, i) => (
            <div key={i} style={{
              maxWidth: "75%", display: "flex", flexDirection: "column",
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              alignItems: m.role === "user" ? "flex-end" : "flex-start",
            }}>
              {m.role === "bot" && (
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--green-dark)", marginBottom: 3, letterSpacing: 0.3 }}>
                  Daily Health
                </div>
              )}
              <div style={{
                padding: "10px 14px", borderRadius: 14, fontSize: 14, lineHeight: 1.5,
                background: m.role === "bot" ? "var(--green-pale)" : "var(--green-mid)",
                color: m.role === "bot" ? "var(--charcoal)" : "white",
                border: m.role === "bot" ? "1px solid var(--green-light)" : "none",
                borderBottomLeftRadius: m.role === "bot" ? 4 : 14,
                borderBottomRightRadius: m.role === "user" ? 4 : 14,
              }}>
                {m.text}
              </div>
              <div style={{ fontSize: 11, color: "var(--gray-mid)", marginTop: 4 }}>{m.time}</div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ alignSelf: "flex-start" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--green-dark)", marginBottom: 3 }}>Daily Health</div>
              <div style={{
                display: "flex", gap: 4, alignItems: "center",
                padding: "10px 14px",
                background: "var(--green-pale)", borderRadius: 14, borderBottomLeftRadius: 4,
                border: "1px solid var(--green-light)", width: 54,
              }}>
                {[0, 0.2, 0.4].map((delay, i) => (
                  <span key={i} style={{
                    width: 7, height: 7, background: "var(--green-mid)", borderRadius: "50%",
                    animation: `bounce 1.2s ${delay}s infinite`,
                    display: "inline-block",
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ marginTop: "1rem", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about a medicine, symptom, or place an order..."
            style={{
              flex: 1, padding: "12px 16px",
              border: "1.5px solid var(--green-light)", borderRadius: 10,
              fontFamily: "var(--font-body)", fontSize: 14,
              resize: "none", height: 48, minHeight: 48,
              color: "var(--charcoal)", background: "var(--white)",
              transition: "border-color 0.2s", lineHeight: 1.4,
              outline: "none",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green-mid)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--green-light)")}
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            style={{
              background: loading || !input.trim() ? "var(--gray-light)" : "var(--green-mid)",
              color: loading || !input.trim() ? "var(--gray-mid)" : "white",
              border: "none", borderRadius: 10,
              padding: "12px 20px", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14,
              transition: "background 0.2s", height: 48,
            }}
          >
            Send
          </button>
        </div>

        {/* Quick chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              disabled={loading}
              style={{
                background: "var(--white)", border: "1.5px solid var(--green-mid)",
                color: "var(--green-dark)", padding: "6px 14px", borderRadius: 20,
                fontSize: 13, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "var(--green-pale)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--white)"; }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{ fontSize: 12, color: "var(--gray-mid)", marginTop: "1.5rem", textAlign: "center", lineHeight: 1.5 }}>
          ⚕️ This assistant provides general information only. For medical emergencies, call 999 or visit your nearest clinic. Always consult a qualified pharmacist or doctor for medical advice.
        </p>
      </div>

      <Footer />
      <WhatsAppFloat />

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
