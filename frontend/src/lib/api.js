// src/lib/api.js
const URL = "http://localhost:8080";
import { saveSession } from "./session";

export async function signIn({ email, password }) {
  const response = await fetch(`${URL}/users/signin`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(
      `Error while fetching, status: ${response.status}, message: ${response.message}`
    );
  }

  const data = await response.json();
  // erwartet: { token, user: { id, username, email } } oder ähnlich
  saveSession(data);
  return data;
}

export async function signUp({ email, username, password }) {
  const response = await fetch(`${URL}/users/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });

  if (!response.ok) {
    throw new Error(`Error while fetching, status: ${response.status}`);
  }

  const data = await response.json();
  // optional: direkt einloggen
  saveSession(data);
  return data;
}
