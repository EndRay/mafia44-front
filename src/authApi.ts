import {API_BASE_URL} from "./roomApi";

export function getCookie(name: string) {
  // Simple cookie reader
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export async function ensureCsrf() {
  // Set the csrftoken cookie
  await fetch(`${API_BASE_URL}/csrf/`, {credentials: "include"});
}

export async function login(username: string, password: string) {
  await ensureCsrf();
  const res = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")!,
    },
    body: JSON.stringify({username, password}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail);
  return data;
}

export async function register(username: string, password: string) {
  await ensureCsrf();
  const res = await fetch(`${API_BASE_URL}/register/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")!,
    },
    body: JSON.stringify({username, password}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail);
  return data;
}

export async function logout() {
  await ensureCsrf(); // not strictly necessary for POST logout, but safe
  const res = await fetch(`${API_BASE_URL}/logout/`, {
    method: "POST",
    credentials: "include",
    headers: {"X-CSRFToken": getCookie("csrftoken")!},
  });
  return res.json();
}

export async function me() {
  const res = await fetch(`${API_BASE_URL}/me/`, {credentials: "include"});
  return res.json();
}