const URL = "http://localhost:8080";
import { getJWTToken } from "./session";

export async function fetchCommentsByPost(postId) {
  const response = await fetch(`${URL}/api/comments/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${getJWTToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Fehler beim Laden der Kommentare");
  }

  return await response.json(); // Array<CommentResponseDTO>
}

export async function createComment({ postId, authorId, text }) {
  const response = await fetch(`${URL}/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getJWTToken()}`,
    },
    body: JSON.stringify({ postId, authorId, text }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Kommentar erstellen fehlgeschlagen: " + errorText);
  }

  return await response.json(); // CommentResponseDTO
}
