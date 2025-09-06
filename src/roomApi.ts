import {ensureCsrf, getCookie} from "./authApi";

export const API_BASE_URL = "https://endray.eu.pythonanywhere.com";

export async function fetchRooms() {
  const res = await fetch(`${API_BASE_URL}/rooms/`, {credentials: "include"});
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail);
  return data['rooms'];
}

export async function createRoom(room_name: string) {
  await ensureCsrf();
  const res = await fetch(`${API_BASE_URL}/create_room/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")!,
    },
    body: JSON.stringify({room_name}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail);
  return data;
}

export async function joinRoom(room_id: string) {
  await ensureCsrf();
  const res = await fetch(`${API_BASE_URL}/join_room/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")!,
    },
    body: JSON.stringify({room_id}),
  });
  if (!res.ok) throw new Error((await res.json()).detail);
}

export async function leaveRoom(room_id: string) {
  await ensureCsrf();
  const res = await fetch(`${API_BASE_URL}/leave_room/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")!,
    },
    body: JSON.stringify({room_id}),
  });
  if (!res.ok) throw new Error((await res.json()).detail);
}

export async function deleteRoom(room_id: string) {
  await ensureCsrf();
  const res = await fetch(`${API_BASE_URL}/delete_room/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")!,
    },
    body: JSON.stringify({room_id}),
  });
  if (!res.ok) throw new Error((await res.json()).detail);
}

export async function startGame(room_id: string) {
  await ensureCsrf();
  const res = await fetch(`${API_BASE_URL}/start_game/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")!,
    },
    body: JSON.stringify({room_id}),
  });
  if (!res.ok) throw new Error((await res.json()).detail);
}