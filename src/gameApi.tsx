import {API_BASE_URL} from "./roomApi";
import {fetchCsrfToken} from "./authApi";

export async function fetchGameStage(room_id: string) {
  const csrfToken = await fetchCsrfToken();
  const res = await fetch(`${API_BASE_URL}/game_stage/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({room_id}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail);
  return data["game_stage"];
}

export async function fetchHistory(room_id: string) {
  const csrfToken = await fetchCsrfToken();
  const res = await fetch(`${API_BASE_URL}/game_history?room_id=${room_id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail);
  return data["history"];
}

export async function submitAction(room_id: string, selected_cards: number[]) {
  const csrfToken = await fetchCsrfToken();
  const res = await fetch(`${API_BASE_URL}/submit_action/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({room_id, selected_cards}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail);
}

export async function shootCard(room_id: string, card_position: number) {
  const csrfToken = await fetchCsrfToken();
  const res = await fetch(`${API_BASE_URL}/shoot_card/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({room_id, card_position}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail);
}