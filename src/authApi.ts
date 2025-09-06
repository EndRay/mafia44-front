import {API_BASE_URL} from "./roomApi";

export async function fetchCsrfToken(): Promise<string> {
  const r = await fetch(`${API_BASE_URL}/csrf/`, { credentials: "include" });
  if (!r.ok) throw new Error(`CSRF fetch failed: ${r.status}`);
  const { csrfToken } = await r.json();
  return csrfToken as string;
}

export async function login(username: string, password: string) {
  const csrfToken = await fetchCsrfToken();
  const res = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({username, password}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail);
  return data;
}

export async function register(username: string, password: string) {
  const csrfToken = await fetchCsrfToken();
  const res = await fetch(`${API_BASE_URL}/register/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({username, password}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail);
  return data;
}

export async function logout() {
  const csrfToken = await fetchCsrfToken();
  const res = await fetch(`${API_BASE_URL}/logout/`, {
    method: "POST",
    credentials: "include",
    headers: {"X-CSRFToken": csrfToken},
  });
  return res.json();
}

export async function me() {
  const res = await fetch(`${API_BASE_URL}/me/`, {credentials: "include"});
  return res.json();
}