import { apiUrlUser } from "./api.mjs";

export function fetchWithAuth() {
  const token = localStorage.getItem("token");
  const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
  };
  return fetch(apiUrlUser, { ...name, id, headers });
}