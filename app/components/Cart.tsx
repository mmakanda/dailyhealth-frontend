"use client";
import { createContext, useContext, useState, ReactNode, useRef } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  requiresRx?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  function addItem(item: Omit<CartItem, "quantity">) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  }
  function removeItem(id: number) { setItems((prev) => prev.filter((i) => i.id !== id)); }
  function updateQty(id: number, qty: number) {
    if (qty < 1) { removeItem(id); return; }
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  }
  function clearCart() { setItems([]); }
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

async function verifyPrescription(
  file: File,
  rxItemNames: string[]
): Promise<{ valid: boolean; reason: string }> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("rx_items", JSON.stringify(rxItemNames));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/prescriptions/verify`,
      { method: "POST", body: formData }
    );
    if (!response.ok) throw new Error("Server error");
    return await response.json();
  } catch {
    return { valid: false, reason: "Verification failed. Please try a clearer image." };
  }
}

function RxUploadModal({ onConfirm, onSkip, onClose, rxItemNames }: {
  onConfirm: (file: File) => void;
  onSkip: () => void;
  onClose: () => void;
  rxItemNames: string[];
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{ valid: boolean; reason: string } | null>(null);

  function handleFile(f: File) {
    setFile(f);
    setVerifyResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }

  async function handleVerifyAndSubmit() {
    if (!file) return;
    setVerifying(true);
    setVerifyResult(null);
    const result = await verifyPrescription(file, rxItemNames);
    setVerifying(false);
    setVerifyResult(result);
    if (result.valid) onConfirm(file);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={onClose} />
      <div style={{
        position: "relative", zIndex: 1, background: "white",
        borderRadius: "var(--radius-lg)", padding: "2rem",
        width: "min(460px, 92vw)", boxShadow: "var(--shadow-lg)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.3rem", color: "var(--black)" }}>Prescription Required</h2>
            <p style={{ fontSize: 13, color: "var(--gray-dark)", marginTop: 4 }}>
              Upload your prescription — our AI will verify it covers your cart items.
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--gray-mid)", marginLeft: 12 }}>×</button>
        </div>

        <div style={{ background: "#fff3e0", border: "1px solid #ffcc80", borderRadius: 8, padding: "10px 14px", marginBottom: "1rem", fontSize: 13, color: "#e65100" }}>
          <strong>Verifying prescription covers:</strong> {rxItemNames.join(", ")}
        </div>

        <div style={{
          border: `2px dashed ${verifyResult?.valid === false ? "#ef4444" : verifyResult?.valid ? "#22c55e" : "var(--green-light)"}`,
          borderRadius: "var(--radius)", padding: "1.5rem", textAlign: "center", marginBottom: "1rem",
          background: preview ? "var(--green-pale)" : "white", cursor: "pointer", transition: "all 0.2s",
        }}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        >
          {preview ? (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Prescription preview"
                style={{ maxHeight: 160, maxWidth: "100%", borderRadius: 8, objectFit: "contain" }} />
              <p style={{ fontSize: 12, color: "var(--green-mid)", marginTop: 8, fontWeight: 600 }}>{file?.name}</p>
            </div>
          ) : (
            <div>
              <svg width="40" height="40" fill="none" stroke="var(--green-mid)" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: 8 }}>
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)" }}>Tap to upload prescription</p>
              <p style={{ fontSize: 12, color: "var(--gray-mid)", marginTop: 4 }}>Photo or scan — JPG, PNG accepted</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>

        {verifyResult && (
          <div style={{
            background: verifyResult.valid ? "#f0fdf4" : "#fef2f2",
            border: `1px solid ${verifyResult.valid ? "#86efac" : "#fca5a5"}`,
            borderRadius: 8, padding: "10px 14px", marginBottom: "1rem",
            fontSize: 13, color: verifyResult.valid ? "#166534" : "#991b1b",
            display: "flex", alignItems: "flex-start", gap: 8,
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{verifyResult.valid ? "✅" : "❌"}</span>
            <span>{verifyResult.reason}</span>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={handleVerifyAndSubmit} disabled={!file || verifying} style={{
            background: file && !verifying ? "var(--green-mid)" : "var(--gray-light)",
            color: file && !verifying ? "white" : "var(--gray-mid)",
            border: "none", borderRadius: 8, padding: "13px",
            fontSize: 14, fontWeight: 700, cursor: file && !verifying ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {verifying ? (
              <>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Verifying prescription…
              </>
            ) : (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verify & Send Order
              </>
            )}
          </button>
          <button onClick={onSkip} style={{
            background: "none", border: "1.5px solid var(--gray-light)", borderRadius: 8,
            padding: "11px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "var(--gray-dark)",
          }}>
            Continue without prescription (OTC items only)
          </button>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

function RxSendReminderModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
      <div style={{
        position: "relative", zIndex: 1, background: "white",
        borderRadius: "var(--radius-lg)", padding: "2rem",
        width: "min(400px, 92vw)", boxShadow: "var(--shadow-lg)", textAlign: "center",
      }}>
        <div style={{ fontSize: 48, marginBottom: "1rem" }}>📋</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.2rem", color: "var(--black)", marginBottom: 8 }}>
          One Last Step!
        </h2>
        <p style={{ fontSize: 14, color: "var(--gray-dark)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
          Your order has been sent to WhatsApp. <strong>Please now send your prescription photo</strong> in the same WhatsApp chat so our pharmacist can complete your order.
        </p>
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "12px", marginBottom: "1.25rem", fontSize: 13, color: "#166534", textAlign: "left" }}>
          <strong>How to send the photo:</strong>
          <ol style={{ margin: "8px 0 0 16px", padding: 0, lineHeight: 1.8 }}>
            <li>Go to the WhatsApp chat that just opened</li>
            <li>Tap the 📎 attachment icon</li>
            <li>Select your prescription photo</li>
            <li>Send it to complete your order</li>
          </ol>
        </div>
        <button onClick={onClose} style={{
          width: "100%", background: "var(--green-mid)", color: "white",
          border: "none", borderRadius: 8, padding: "13px",
          fontSize: 14, fontWeight: 700, cursor: "pointer",
        }}>
          Got it, IGot it, I'll send the photo nowapos;ll send the photo now
        </button>
      </div>
    </div>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQty, total, count, clearCart } = useCart();
  const [showRxModal, setShowRxModal] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const hasRx = items.some((i) => i.requiresRx);
  const rxItems = items.filter((i) => i.requiresRx);
  const otcItems = items.filter((i) => !i.requiresRx);

  function buildWhatsAppMsg(includeRxNote: boolean) {
    const lines = items.map((i) => `- ${i.name} x${i.quantity} = $${(i.price * i.quantity).toFixed(2)}${i.requiresRx ? " [Rx]" : ""}`);
    return [
      "Hello Daily Health Pharmacy, I would like to place an order:",
      "",
      ...lines,
      "",
      `Total: $${total.toFixed(2)}`,
      includeRxNote ? "%0A⚠️ Prescription verified by AI — I am sending the prescription photo now." : "",
      "",
      "Please confirm availability and payment details. Thank you.",
    ].filter(Boolean).join("%0A");
  }

  function sendOrder(includeRxNote: boolean) {
    window.open(`https://wa.me/263786176284?text=${buildWhatsAppMsg(includeRxNote)}`, "_blank");
    clearCart();
    onClose();
    if (includeRxNote) setShowReminder(true);
  }

  function handleCheckout() {
    if (hasRx) { setShowRxModal(true); return; }
    sendOrder(false);
  }

  function handleRxConfirm(_file: File) {
    setShowRxModal(false);
    sendOrder(true);
  }

  function handleRxSkip() {
    setShowRxModal(false);
    const otcOnly = otcItems.map((i) => `- ${i.name} x${i.quantity} = $${(i.price * i.quantity).toFixed(2)}`);
    const msg = [
      "Hello Daily Health Pharmacy, I would like to order the following OTC items:",
      "",
      ...otcOnly,
      "",
      `Total: $${otcItems.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}`,
      "",
      `Note: ${rxItems.map(i => i.name).join(", ")} removed — no prescription available.`,
      "",
      "Please confirm availability and payment. Thank you.",
    ].join("%0A");
    window.open(`https://wa.me/263786176284?text=${msg}`, "_blank");
    clearCart();
    onClose();
  }

  return (
    <>
      {showReminder && <RxSendReminderModal onClose={() => setShowReminder(false)} />}
      {open && (
        <>
          {showRxModal && (
            <RxUploadModal
              onConfirm={handleRxConfirm}
              onSkip={handleRxSkip}
              onClose={() => setShowRxModal(false)}
              rxItemNames={rxItems.map(i => i.name)}
            />
          )}
          <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", justifyContent: "flex-end" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={onClose} />
            <div style={{
              position: "relative", zIndex: 1, background: "white",
              width: "min(420px, 100vw)", height: "100%",
              display: "flex", flexDirection: "column", boxShadow: "var(--shadow-lg)",
            }}>
              <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--green-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", color: "var(--black)" }}>
                  Your Cart {count > 0 && <span style={{ fontSize: 14, background: "var(--green-mid)", color: "white", borderRadius: 12, padding: "2px 8px", marginLeft: 8 }}>{count}</span>}
                </h2>
                <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "var(--gray-mid)" }}>×</button>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
                {items.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--gray-mid)" }}>
                    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: 12, opacity: 0.4 }}>
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p style={{ fontSize: 14 }}>Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    {hasRx && (
                      <div style={{ background: "#fff3e0", border: "1px solid #ffcc80", borderRadius: 8, padding: "10px 12px", marginBottom: "1rem", fontSize: 13, color: "#e65100" }}>
                        Your cart contains prescription items. You will need to upload and verify a prescription at checkout.
                      </div>
                    )}
                    {items.map((item) => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--gray-light)" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--black)", display: "flex", alignItems: "center", gap: 6 }}>
                            {item.name}
                            {item.requiresRx && <span style={{ fontSize: 10, background: "var(--red-cross)", color: "white", padding: "1px 6px", borderRadius: 3, fontWeight: 700 }}>Rx</span>}
                          </div>
                          <div style={{ fontSize: 13, color: "var(--green-dark)", fontWeight: 700, marginTop: 2 }}>${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: 28, height: 28, border: "1.5px solid var(--green-light)", borderRadius: 6, background: "white", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                          <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: 28, height: 28, border: "1.5px solid var(--green-light)", borderRadius: 6, background: "white", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gray-mid)", fontSize: 18, padding: "0 4px" }}>×</button>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {items.length > 0 && (
                <div style={{ padding: "1.5rem", borderTop: "1px solid var(--green-light)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.3rem", color: "var(--green-dark)" }}>${total.toFixed(2)}</span>
                  </div>
                  <button onClick={handleCheckout} style={{
                    width: "100%", background: "#25D366", color: "white",
                    border: "none", borderRadius: 8, padding: "14px",
                    fontSize: 15, fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.355A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                    {hasRx ? "Checkout (Prescription Required)" : "Order via WhatsApp"}
                  </button>
                  <p style={{ fontSize: 11, color: "var(--gray-mid)", textAlign: "center", marginTop: 8 }}>Opens WhatsApp with your order pre-filled</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
