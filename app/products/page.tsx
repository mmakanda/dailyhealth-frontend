"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { getProducts, type Product } from "../lib/api";
import { useCart } from "../components/Cart";

const CATEGORIES = ["All", "Pain Relief", "Antibiotics", "Vitamins", "Skincare", "Baby & Mother", "Wellness"];

const PRODUCT_IMAGES: Record<string, string> = {
  "pain relief":   "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
  "antibiotics":   "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80",
  "vitamins":      "https://images.unsplash.com/photo-1550572017-edd951aa8ca0?w=400&q=80",
  "wellness":      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80",
  "skincare":      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
  "baby & mother": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80",
  "default":       "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80",
};

const STATIC_PRODUCTS: (Product & { category: string; unit: string; badge: string })[] = [
  { id: 1, name: "Panado 500mg", description: "Paracetamol tablets - Pack of 20", price: 1.50, stock: 100, category: "Pain Relief", unit: "pack", badge: "OTC" },
  { id: 2, name: "Amoxicillin 500mg", description: "Capsules - Pack of 21", price: 4.80, stock: 40, category: "Antibiotics", unit: "pack", badge: "Rx" },
  { id: 3, name: "Vitamin C 1000mg", description: "Effervescent tablets - 20 tabs", price: 3.20, stock: 80, category: "Vitamins", unit: "tube", badge: "OTC" },
  { id: 4, name: "Ibuprofen 400mg", description: "Anti-inflammatory - 24 tabs", price: 2.10, stock: 60, category: "Pain Relief", unit: "pack", badge: "OTC" },
  { id: 5, name: "Zinc + Multivitamin", description: "Immune support - 30 capsules", price: 5.50, stock: 50, category: "Vitamins", unit: "bottle", badge: "OTC" },
  { id: 6, name: "ORS Sachets", description: "Oral Rehydration Salts - 10 sachets", price: 0.90, stock: 120, category: "Wellness", unit: "pack", badge: "OTC" },
];

function guessCategory(name: string, desc: string): string {
  const text = `${name} ${desc}`.toLowerCase();
  if (text.includes("vitamin") || text.includes("zinc") || text.includes("multivit")) return "Vitamins";
  if (text.includes("amoxicillin") || text.includes("antibiotic") || text.includes("cipro")) return "Antibiotics";
  if (text.includes("panado") || text.includes("ibuprofen") || text.includes("paracetamol") || text.includes("pain")) return "Pain Relief";
  if (text.includes("lotion") || text.includes("cream") || text.includes("skin")) return "Skincare";
  if (text.includes("baby") || text.includes("infant")) return "Baby & Mother";
  return "Wellness";
}

function getProductImage(category: string): string {
  return PRODUCT_IMAGES[category.toLowerCase()] || PRODUCT_IMAGES["default"];
}

function PillIcon({ color, accent }: { color: string; accent: string }) {
  return (
    <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
      <rect x="14" y="8" width="20" height="32" rx="4" fill={color} />
      <rect x="18" y="14" width="12" height="3" rx="1.5" fill={accent} />
      <rect x="20" y="20" width="8" height="2" rx="1" fill={accent} />
      <rect x="20" y="25" width="8" height="2" rx="1" fill={accent} />
    </svg>
  );
}

function ProductCard({ product, onAddToCart }: {
  product: Product & { category: string; unit: string; badge: string };
  onAddToCart: () => void;
}) {
  const isRx = product.badge === "Rx";
  const imgUrl = getProductImage(product.category);
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{ background: "var(--white)", border: "1.5px solid var(--gray-light)", borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all 0.25s", cursor: "pointer", display: "flex", flexDirection: "column" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--green-mid)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--gray-light)"; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; (e.currentTarget as HTMLDivElement).style.transform = ""; }}
    >
      <div style={{ position: "relative", height: 160, overflow: "hidden", background: "var(--green-pale)" }}>
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgUrl} alt={product.name} onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PillIcon color={isRx ? "#ffcdd2" : "#c8e6c9"} accent={isRx ? "#c62828" : "#2e7d32"} />
          </div>
        )}
        <span style={{ position: "absolute", top: 10, right: 10, background: isRx ? "var(--red-cross)" : "var(--green-mid)", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>{product.badge}</span>
        {product.stock === 0 && <span style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.6)", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>Out of stock</span>}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)", padding: "1.5rem 0.75rem 0.5rem" }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>{product.category}</span>
        </div>
      </div>
      <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--black)", marginBottom: 4 }}>{product.name}</div>
        <div style={{ fontSize: 12, color: "var(--gray-mid)", marginBottom: 12, flex: 1 }}>{product.description}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 900, color: "var(--green-dark)" }}>
            ${product.price.toFixed(2)}<span style={{ fontSize: 11, fontWeight: 400, color: "var(--gray-mid)" }}> /{product.unit}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onAddToCart(); }} disabled={product.stock === 0}
            style={{ background: product.stock === 0 ? "var(--gray-light)" : "var(--green-mid)", color: product.stock === 0 ? "var(--gray-mid)" : "white", border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 13, fontWeight: 700, cursor: product.stock === 0 ? "not-allowed" : "pointer" }}>
            + Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterPanel({ products, activeCategory, setActiveCategory, inStockOnly, setInStockOnly, noRxOnly, setNoRxOnly, onSelect }: {
  products: (Product & { category: string; unit: string; badge: string })[];
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  noRxOnly: boolean;
  setNoRxOnly: (v: boolean) => void;
  onSelect?: () => void;
}) {
  return (
    <>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--black)", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--green-light)" }}>Categories</h3>
      {CATEGORIES.map((cat) => (
        <div key={cat} onClick={() => { setActiveCategory(cat); onSelect?.(); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer" }}>
          <input type="radio" readOnly checked={activeCategory === cat} style={{ accentColor: "var(--green-mid)", width: 16, height: 16 }} />
          <label style={{ fontSize: 14, color: "var(--charcoal)", cursor: "pointer" }}>
            {cat}<span style={{ fontSize: 12, color: "var(--gray-mid)", marginLeft: 4 }}>({cat === "All" ? products.length : products.filter(p => p.category === cat).length})</span>
          </label>
        </div>
      ))}
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--black)", marginTop: "1.5rem", marginBottom: "1rem" }}>Availability</h3>
      <div onClick={() => setInStockOnly(!inStockOnly)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer" }}>
        <input type="checkbox" readOnly checked={inStockOnly} style={{ accentColor: "var(--green-mid)", width: 16, height: 16 }} />
        <label style={{ fontSize: 14, color: "var(--charcoal)", cursor: "pointer" }}>In Stock</label>
      </div>
      <div onClick={() => setNoRxOnly(!noRxOnly)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer" }}>
        <input type="checkbox" readOnly checked={noRxOnly} style={{ accentColor: "var(--green-mid)", width: 16, height: 16 }} />
        <label style={{ fontSize: 14, color: "var(--charcoal)", cursor: "pointer" }}>No Prescription</label>
      </div>
    </>
  );
}

export default function ProductsPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<(Product & { category: string; unit: string; badge: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [toast, setToast] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [noRxOnly, setNoRxOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data.length === 0) {
          setProducts(STATIC_PRODUCTS);
        } else {
          setProducts(data.map((p) => ({
            ...p,
            category: guessCategory(p.name, p.description),
            unit: "pack",
            badge: guessCategory(p.name, p.description) === "Antibiotics" ? "Rx" : "OTC",
          })));
        }
      })
      .catch(() => {
        setError("Could not connect to pharmacy server. Showing sample products.");
        setProducts(STATIC_PRODUCTS);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (inStockOnly && p.stock === 0) return false;
    if (noRxOnly && p.badge === "Rx") return false;
    return true;
  });

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  const filterProps = { products, activeCategory, setActiveCategory, inStockOnly, setInStockOnly, noRxOnly, setNoRxOnly };

  return (
    <>
      <Navbar />
      <div style={{ position: "fixed", top: 90, right: 24, background: "var(--green-mid)", color: "white", padding: "12px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, zIndex: 200, transition: "transform 0.3s", transform: toast ? "translateX(0)" : "translateX(120%)", boxShadow: "var(--shadow-md)" }}>{toast}</div>
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={() => setSidebarOpen(false)} />
          <div style={{ position: "relative", zIndex: 1, background: "white", width: 280, padding: "1.5rem", overflowY: "auto", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>Filters</h3>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--gray-mid)" }}>x</button>
            </div>
            <FilterPanel {...filterProps} onSelect={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
      <div style={{ background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "white" }}>Our Products</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", marginTop: "0.5rem" }}>Quality medicines - MCAZ approved, competitively priced.</p>
          {error && <p style={{ marginTop: "0.5rem", fontSize: 13, color: "var(--red-cross)", background: "var(--red-light)", padding: "6px 12px", borderRadius: 6, display: "inline-block" }}>Warning: {error}</p>}
        </div>
      </div>
      <div style={{ display: "none", padding: "1rem 1.5rem", borderBottom: "1px solid var(--green-light)" }} className="mobile-filter-bar">
        <button onClick={() => setSidebarOpen(true)} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--green-pale)", border: "1.5px solid var(--green-light)", borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 700, color: "var(--green-dark)", cursor: "pointer" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 4h18M7 12h10M11 20h2" /></svg>
          Filter - {activeCategory}
        </button>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 2rem", display: "grid", gridTemplateColumns: "240px 1fr", gap: "2.5rem" }} className="products-layout">
        <aside style={{ background: "var(--white)", border: "1.5px solid var(--green-light)", borderRadius: "var(--radius-lg)", padding: "1.5rem", height: "fit-content" }} className="desktop-sidebar">
          <FilterPanel {...filterProps} />
        </aside>
        <div>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {[1,2,3,4,5,6].map(i => <div key={i} style={{ height: 300, background: "var(--gray-light)", borderRadius: "var(--radius-lg)", animation: "pulse 1.5s infinite" }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--gray-mid)" }}>
              <p style={{ fontSize: "1.1rem" }}>No products found for this filter.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={() => {
                  addItem({ id: p.id, name: p.name, price: p.price });
                  showToast(`${p.name} added to cart`);
                }} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <WhatsAppFloat />
      <style>{`
        @media (max-width: 768px) {
          .products-layout { grid-template-columns: 1fr !important; padding: 1.5rem 1rem !important; }
          .desktop-sidebar { display: none !important; }
          .mobile-filter-bar { display: block !important; }
        }
      `}</style>
    </>
  );
}
