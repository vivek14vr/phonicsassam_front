"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "@/lib/api";
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  loadStoredTokens,
  setAuthTokens,
  subscribeAccessToken,
} from "@/lib/authTokens";
import type { Admin } from "@/lib/types";

type AuthContextValue = {
  /** Short-lived access token (JWT). */
  token: string | null;
  admin: Admin | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  /** @deprecated Prefer login(); kept for compatibility. */
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadStoredTokens();
    setTokenState(getAccessToken());

    const unsub = subscribeAccessToken((next) => setTokenState(next));

    async function bootstrap() {
      try {
        if (getAccessToken()) {
          const data = await api.get<{ admin: Admin }>("/auth/me");
          setAdmin(data.admin);
          return;
        }

        if (getRefreshToken()) {
          const access = await api.refreshAccessToken();
          if (access) {
            const data = await api.get<{ admin: Admin }>("/auth/me");
            setAdmin(data.admin);
          } else {
            setAdmin(null);
          }
        }
      } catch {
        clearAuthTokens();
        setAdmin(null);
      } finally {
        setReady(true);
      }
    }

    void bootstrap();
    return unsub;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.post<{
      accessToken: string;
      refreshToken: string;
      admin: Admin;
    }>("/auth/login", { email, password }, null, { skipAuth: true });

    setAuthTokens(data.accessToken, data.refreshToken);
    setAdmin(data.admin);
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();
    try {
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken }, null, { skipAuth: true });
      }
    } catch {
      // Still clear local session if revoke fails.
    } finally {
      clearAuthTokens();
      setAdmin(null);
    }
  }, []);

  const setToken = useCallback((next: string | null) => {
    if (!next) {
      clearAuthTokens();
      setAdmin(null);
      return;
    }
    // Legacy helper — access token only; prefer login().
    setAuthTokens(next, getRefreshToken() || next);
  }, []);

  const value = useMemo(
    () => ({
      token,
      admin,
      ready,
      login,
      logout,
      setToken,
    }),
    [token, admin, ready, login, logout, setToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
