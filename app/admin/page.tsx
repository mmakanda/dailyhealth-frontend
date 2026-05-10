"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Product {
  id: number; name: string; description: string; price: number; stock: number;
}
interface ProductForm {
  name: string; description: string; price: string; stock: string;
}
const empty: ProductForm = { name: "", description: "", price: "", stock: "" };

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) { setLoginError("Invalid credentials"); return; }
      const data = await res.json();
      setToken(data.access_token);
      sessionStorage.setItem("admin_token", data.access_token);
    } catch {
      setLoginError("Login failed — check connection");
    }
  }

  const authHeaders = () => ({ "Authorization": `Bearer ${token}`, "Content-Type": "application/json" });

  const loadProducts = useCallback(async () => {
    if (!token) return;
    const res = await fetch(`${API}/products/`);
    if (res.ok) setProducts(await res.json());
  }, [token]);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => { if (token) loadProducts(); }, [token, loadProducts]);

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const body = { name: form.name, description: form.description, price: parseFloat(form.price), stock: parseInt(form.stock) };
    const url = editId ? `${API}/products/${editId}` : `${API}/products/`;
    const method = editId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
    if (res.status === 403) { showToast("Admin access required"); setLoading(false); return; }
    if (res.ok) { showToast(editId ? "Updated" : "Created"); setForm(empty); setEditId(null); loadProducts(); }
    setLoading(false);
  }

  async function deleteProduct(id: number) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`${API}/products/${id}`, { method: "DELETE", headers: authHeaders() });
    if (res.ok) { showToast("Deleted"); loadProducts(); }
    else if (res.status === 403) showToast("Admin access required");
  }

  function logout() { sessionStorage.removeItem("admin_token"); setToken(null); }

  if (!token) return (
    <div style={{ maxWidth: 380, margin: "10vh auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.4rem", marginBottom: "1.5rem" }}>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input value={username} onChange={e => setUsername(e.target.value)}
          placeholder="Username" required autoComplete="username"
          style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Password" required autoComplete="current-password"
          style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }} />
        {loginError && <p style={{ color: "red", margin: "0 0 10px" }}>{loginError}</p>}
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Login
        </button>
      </form>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.4rem" }}>Product Admin</h1>
        <button onClick={logout} style={{ padding: "6px 14px", cursor: "pointer" }}>Logout</button>
      </div>
      {toast && <div style={{ background: "#dcfce7", padding: "10px", marginBottom: "1rem", borderRadius: "4px" }}>{toast}</div>}
      <form onSubmit={saveProduct} style={{ marginBottom: "2rem", display: "grid", gap: "8px" }}>
        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" required style={{ padding: "8px" }} />
        <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" style={{ padding: "8px" }} />
        <input value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="Price" type="number" step="0.01" required style={{ padding: "8px" }} />
        <input value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} placeholder="Stock" type="number" required style={{ padding: "8px" }} />
        <button type="submit" disabled={loading} style={{ padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {editId ? "Update" : "Add Product"}
        </button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm(empty); }} style={{ padding: "10px" }}>Cancel</button>}
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{["Name","Price","Stock","Actions"].map(h => <th key={h} style={{ textAlign:"left", padding:"8px", borderBottom:"2px solid #e5e7eb" }}>{h}</th>)}</tr></thead>
        <tbody>{products.map(p => (
          <tr key={p.id}>
            <td style={{ padding:"8px", borderBottom:"1px solid #e5e7eb" }}>{p.name}</td>
            <td style={{ padding:"8px", borderBottom:"1px solid #e5e7eb" }}>${p.price}</td>
            <td style={{ padding:"8px", borderBottom:"1px solid #e5e7eb" }}>{p.stock}</td>
            <td style={{ padding:"8px", borderBottom:"1px solid #e5e7eb" }}>
              <button onClick={() => { setEditId(p.id); setForm({name:p.name, description:p.description, price:String(p.price), stock:String(p.stock)}); }} style={{ marginRight:"8px", padding:"4px 10px", cursor:"pointer" }}>Edit</button>
              <button onClick={() => deleteProduct(p.id)} style={{ padding:"4px 10px", background:"#dc2626", color:"#fff", border:"none", borderRadius:"4px", cursor:"pointer" }}>Delete</button>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
