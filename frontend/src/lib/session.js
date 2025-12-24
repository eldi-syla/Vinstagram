import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const STORAGE_KEY = "session";
const SESSION_EVENT = "session-changed";

const sessionAtom = atom(getSession());

export function getJWTToken() {
  return getSession()?.token;
}

export function getSession() {
  const session = localStorage.getItem(STORAGE_KEY);
  return session ? JSON.parse(session) : null;
}

export function saveSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent(SESSION_EVENT, { detail: session }));
}

export function removeSession() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(SESSION_EVENT, { detail: null }));
}

/* ===========================
   🔧 DEV LOGIN (PROVISORISCH)
   =========================== */
export function devLogin() {
  const fakeSession = {
    token: "DEV_JWT_TOKEN",
    user: {
      id: 1,
      username: "admin",
      email: "admin@test.ch"
    }
  };

  saveSession(fakeSession);
}

/* =========================== */

export function useSession() {
  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    const handleSessionChange = (event) => {
      setSession(event.detail);
    };

    window.addEventListener(SESSION_EVENT, handleSessionChange);
    return () => window.removeEventListener(SESSION_EVENT, handleSessionChange);
  }, [setSession]);

  return session;
}

export function useCurrentUser() {
  const session = useSession();
  return session?.user;
}
