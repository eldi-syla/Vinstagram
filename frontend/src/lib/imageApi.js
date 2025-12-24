const URL = "http://localhost:8080";
import { getJWTToken } from "./session";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${URL}/api/images/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJWTToken()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Upload fehlgeschlagen: " + errorText);
  }

  return await response.json(); // imageId
}

export function getImageUrl(imageId) {
  if (!imageId) return null;
  return `${URL}/api/images/${imageId}`;
}
