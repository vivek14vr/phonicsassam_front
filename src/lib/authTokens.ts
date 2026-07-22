const ACCESS_KEY = "komal_access_token";
const REFRESH_KEY = "komal_refresh_token";

type TokenListener = (accessToken: string | null) => void;

let memoryAccessToken: string | null = null;
let memoryRefreshToken: string | null = null;
const listeners = new Set<TokenListener>();

function notify() {
  for (const listener of listeners) listener(memoryAccessToken);
}

export function subscribeAccessToken(listener: TokenListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getAccessToken() {
  return memoryAccessToken;
}

export function getRefreshToken() {
  return memoryRefreshToken;
}

export function loadStoredTokens() {
  if (typeof window === "undefined") return;
  memoryAccessToken = sessionStorage.getItem(ACCESS_KEY);
  memoryRefreshToken = localStorage.getItem(REFRESH_KEY);
  notify();
}

export function setAuthTokens(accessToken: string, refreshToken: string) {
  memoryAccessToken = accessToken;
  memoryRefreshToken = refreshToken;
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
  }
  notify();
}

export function clearAuthTokens() {
  memoryAccessToken = null;
  memoryRefreshToken = null;
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    // Migrate away from legacy single-token key.
    localStorage.removeItem("komal_admin_token");
  }
  notify();
}
