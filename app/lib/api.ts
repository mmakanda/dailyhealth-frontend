const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface Order {
  id: number;
  // extend as your backend grows
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/orders/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function sendChatMessage(message: string): Promise<string> {
  const res = await fetch(`${API_BASE}/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Chat request failed");
  const data = await res.json();
  return data.response as string;
}

export async function loginUser(
  username: string,
  password: string
): Promise<{ access_token: string; token_type: string }> {
  const params = new URLSearchParams({ username, password });
  const res = await fetch(`${API_BASE}/auth/login?${params}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function registerUser(
  username: string,
  password: string
): Promise<{ message: string }> {
  const params = new URLSearchParams({ username, password });
  const res = await fetch(`${API_BASE}/auth/register?${params}`, {
    method: "POST",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Registration failed");
  }
  return res.json();
}
