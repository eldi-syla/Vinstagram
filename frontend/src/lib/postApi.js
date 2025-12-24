const URL = "http://localhost:8080";
import { getJWTToken } from "./session";

export async function fetchPosts() {
  const response = await fetch(`${URL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${getJWTToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Fehler beim Laden der Posts");
  }

  return await response.json(); // Array<PostResponseDTO>
}

export async function createPost({ authorId, text, imageId = null }) {
  const response = await fetch(`${URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getJWTToken()}`,
    },
    body: JSON.stringify({ authorId, text, imageId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Post erstellen fehlgeschlagen: " + errorText);
  }

  return await response.json(); // PostResponseDTO
}
