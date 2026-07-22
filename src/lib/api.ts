import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from "./authTokens";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

type RequestOptions = {
  method?: string;
  body?: BodyInit | null;
  token?: string | null;
  headers?: HeadersInit;
  /** Skip Authorization + 401 refresh (login/refresh/logout). */
  skipAuth?: boolean;
};

type AuthTokensResponse = {
  accessToken: string;
  refreshToken: string;
};

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearAuthTokens();
    return null;
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        clearAuthTokens();
        return null;
      }

      const tokens = data as AuthTokensResponse;
      setAuthTokens(tokens.accessToken, tokens.refreshToken);
      return tokens.accessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  const token = options.skipAuth ? null : options.token ?? getAccessToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const doFetch = () =>
    fetch(`${API_URL}${path}`, {
      method: options.method || "GET",
      headers,
      body: options.body,
      cache: "no-store",
    });

  let response = await doFetch();

  const canRefresh =
    !options.skipAuth &&
    path !== "/auth/login" &&
    path !== "/auth/refresh" &&
    path !== "/auth/logout";

  if (response.status === 401 && canRefresh) {
    const nextAccess = await refreshAccessToken();
    if (nextAccess) {
      headers.set("Authorization", `Bearer ${nextAccess}`);
      response = await doFetch();
    }
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { message?: string }).message || "Request failed");
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, token?: string | null) => request<T>(path, { token }),
  post: <T>(
    path: string,
    body?: unknown,
    token?: string | null,
    opts?: { skipAuth?: boolean }
  ) =>
    request<T>(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
      token,
      skipAuth: opts?.skipAuth,
    }),
  put: <T>(path: string, body?: unknown, token?: string | null) =>
    request<T>(path, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
      token,
    }),
  delete: <T>(path: string, body?: unknown, token?: string | null) =>
    request<T>(path, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : null,
      token,
      headers: body ? { "Content-Type": "application/json" } : undefined,
    }),
  refreshAccessToken,
};

export { API_URL };
