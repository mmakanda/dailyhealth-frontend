"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
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

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

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

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQty, total, count, clearCart } = useCart();

  function checkout() {
    if (items.length === 0) return;
    const lines = items.map((i) => `• ${i.name} x${i.quantity} = $${(i.price * i.quantity).toFixed(2)}`);
    const msg = [
      "Hello Daily Health Pharmacy, I would like to place an order:",
      "",
      ...lines,
      "",
      `Total: $${total.toFixed(2)}`,
      "",
      "Please confirm availability and payment details. Thank you.",
    ].join("%0A");
    window.open(`https://wa.me/263786176284?text=${msg}`, "_blank");
    clearCart();
    onClose();
  }

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", justifyContent: "flex-end" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={onClose} />
      <div style={{
        position: "relative", zIndex: 1, background: "white",
        width: "min(420px, 100vw)", height: "100%",
        display: "flex", flexDirection: "column",
        boxShadow: "var(--shadow-lg)",
      }}>
        {/* Header */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--green-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", color: "var(--black)" }}>
            Your Cart {count > 0 && <span style={{ fontSize: 14, background: "var(--green-mid)", color: "white", borderRadius: 12, padding: "2px 8px", marginLeft: 8 }}>{count}</span>}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "var(--gray-mid)" }}>×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--gray-mid)" }}>
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: 12, opacity: 0.4 }}>
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p style={{ fontSize: 14 }}>Your cart is empty</p>
              <p style={{ fontSize: 12, marginTop: 4 }}>Browse products to add items</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--gray-light)" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--black)" }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: "var(--green-dark)", fontWeight: 700, marginTop: 2 }}>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: 28, height: 28, border: "1.5px solid var(--green-light)", borderRadius: 6, background: "white", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: 28, height: 28, border: "1.5px solid var(--green-light)", borderRadius: 6, background: "white", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gray-mid)", fontSize: 18, padding: "0 4px" }}>×</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "1.5rem", borderTop: "1px solid var(--green-light)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.3rem", color: "var(--green-dark)" }}>${total.toFixed(2)}</span>
            </div>
            <button onClick={checkout} style={{
              width: "100%", background: "#25D366", color: "white",
              border: "none", borderRadius: 8, padding: "14px",
              fontSize: 15, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.355A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              Order via WhatsApp
            </button>
            <p style={{ fontSize: 11, color: "var(--gray-mid)", textAlign: "center", marginTop: 8 }}>
              Opens WhatsApp with your order pre-filled
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
