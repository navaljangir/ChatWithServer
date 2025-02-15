'use server'
import { cookies } from "next/headers";
import { useAuthStore } from "../store/authStore";

export async function getUserMeLoader() {
  const cookie = await cookies();
  const authToken = cookie.get("jwt")?.value;
  const url = new URL("/api/users/me", process.env.BASE_URL_BACKEND);

  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    useAuthStore.getState().setUser(data.id);
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data.id, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
