"use client";
import { useEffect, useState, useCallback } from "react";
import { getProducts, type Product } from "../lib/api";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const ADMIN_PASSWORD = "dailyhealth2024";

interface ProductForm {
  name: string; description: string; price: string; stock: string;
}
const empty: ProductForm = { name: "", description: "", price: "", stock: "" };

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  const loadProducts = useCallback(async () => { const data = await getProducts(); setProducts(data); }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (authed) { loadProducts(); }
  }, [authed, loadProducts]);

  function handleLogin() {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(""); }
    else setPwError("Incorrect password.");
  }

  async function handleSave() {
    if (!form.name || !form.price || !form.stock) { showToast("Name, price and stock are required."); return; }
    setLoading(true);
    try {
      const body = { name: form.name, description: form.description, price: parseFloat(form.price), stock: parseInt(form.stock) };
      const url = editId ? `${API}/products/${editId}` : `${API}/products/`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Failed");
      showToast(editId ? "Product updated!" : "Product added!");
      setForm(empty); setEditId(null); loadProducts();
    } catch { showToast("Error saving product."); }
    finally { setLoading(false); }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      await fetch(`${API}/products/${id}`, { method: "DELETE" });
      showToast("Product deleted."); loadProducts();
    } catch { showToast("Error deleting product."); }
  }

  function handleEdit(p: Product) {
    setEditId(p.id);
    setForm({ name: p.name, description: p.description, price: String(p.price), stock: String(p.stock) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!authed) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--green-pale)" }}>
      <div style={{ background: "white", borderRadius: "var(--radius-lg)", padding: "2.5rem", width: 360, boxShadow: "var(--shadow-lg)", border: "1.5px solid var(--green-light)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 900, color: "var(--black)", marginBottom: "0.5rem" }}>Admin Login</h1>
        <p style={{ fontSize: 13, color: "var(--gray-mid)", marginBottom: "1.5rem" }}>Daily Health Pharmacy</p>
        <label style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", display: "block", marginBottom: 6 }}>Password</label>
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="Enter admin password"
          style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--gray-light)", borderRadius: 8, fontSize: 14, marginBottom: 8, boxSizing: "border-box" }} />
        {pwError && <p style={{ color: "var(--red-cross)", fontSize: 13, marginBottom: 8 }}>{pwError}</p>}
        <button onClick={handleLogin} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Login</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>
      <div style={{ position: "fixed", top: 24, right: 24, background: "var(--green-mid)", color: "white", padding: "12px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, zIndex: 200, transition: "transform 0.3s", transform: toast ? "translateX(0)" : "translateX(120%)", boxShadow: "var(--shadow-md)" }}>{toast}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 900, color: "var(--black)" }}>Product Admin</h1>
          <p style={{ color: "var(--gray-mid)", fontSize: 13 }}>Daily Health Pharmacy - {products.length} products</p>
        </div>
        <button onClick={() => setAuthed(false)} style={{ background: "none", border: "1.5px solid var(--gray-light)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, color: "var(--gray-dark)" }}>Logout</button>
      </div>
      <div style={{ background: "white", border: "1.5px solid var(--green-light)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--black)", marginBottom: "1.25rem" }}>{editId ? "Edit Product" : "Add New Product"}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          {[
            { label: "Product Name *", key: "name", placeholder: "e.g. Paracetamol 500mg", type: "text" },
            { label: "Description", key: "description", placeholder: "e.g. Pain relief 20 tablets", type: "text" },
            { label: "Price (USD) *", key: "price", placeholder: "2.50", type: "number" },
            { label: "Stock Quantity *", key: "stock", placeholder: "100", type: "number" },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", display: "block", marginBottom: 6 }}>{label}</label>
              <input type={type} value={form[key as keyof ProductForm]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--gray-light)", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={handleSave} disabled={loading} className="btn-primary" style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
          </button>
          {editId && <button onClick={() => { setEditId(null); setForm(empty); }} className="btn-secondary">Cancel</button>}
        </div>
      </div>
      <div style={{ background: "white", border: "1.5px solid var(--green-light)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--green-light)", display: "grid", gridTemplateColumns: "1fr 2fr 80px 80px 120px", gap: "1rem", fontSize: 12, fontWeight: 700, color: "var(--gray-mid)", textTransform: "uppercase", letterSpacing: 0.5 }}>
          <span>Name</span><span>Description</span><span>Price</span><span>Stock</span><span>Actions</span>
        </div>
        {products.map((p, i) => (
          <div key={p.id} style={{ padding: "1rem 1.5rem", borderBottom: i < products.length - 1 ? "1px solid var(--gray-light)" : "none", display: "grid", gridTemplateColumns: "1fr 2fr 80px 80px 120px", gap: "1rem", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "var(--black)" }}>{p.name}</span>
            <span style={{ fontSize: 13, color: "var(--gray-dark)" }}>{p.description}</span>
            <span style={{ fontWeight: 700, color: "var(--green-dark)" }}>${p.price.toFixed(2)}</span>
            <span style={{ fontSize: 13, color: p.stock === 0 ? "var(--red-cross)" : "var(--green-mid)", fontWeight: 600 }}>{p.stock === 0 ? "Out" : p.stock}</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => handleEdit(p)} style={{ background: "var(--green-pale)", border: "1px solid var(--green-light)", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 700, color: "var(--green-dark)", cursor: "pointer" }}>Edit</button>
              <button onClick={() => handleDelete(p.id, p.name)} style={{ background: "var(--red-light)", border: "1px solid #ffcdd2", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 700, color: "var(--red-cross)", cursor: "pointer" }}>Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
