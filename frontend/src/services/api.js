const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

async function fetchJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

export async function getProducts() {
  const data = await fetchJson("/products/");
  return data.items ?? [];
}

export async function getProduct(slug) {
  return fetchJson(`/products/${slug}/`);
}

export async function getOrders() {
  const data = await fetchJson("/orders/");
  return data.items ?? [];
}

export async function getProfile() {
  return fetchJson("/profile/");
}
