import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");

  const saveAccessToken = useCallback((t) => {
    setAccessToken(t || "");
    if (t) localStorage.setItem("accessToken", t);
    else localStorage.removeItem("accessToken");
  }, []);

  useEffect(() => {
    // Try refresh on load if no access token
    if (!accessToken) {
      api.post("/auth/refresh", {}, { withCredentials: true })
        .then(res => {
          if (res.data?.accessToken) saveAccessToken(res.data.accessToken);
        })
        .catch(() => {});
    }
  }, []); // eslint-disable-line

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password }, { withCredentials: true });
    saveAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password }, { withCredentials: true });
    saveAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  const fetchMe = async () => {
    const res = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    setUser(res.data.user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch {}
    saveAccessToken("");
    setUser(null);
  };

  // Axios 401 -> try refresh once
  useEffect(() => {
    const id = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config;
        if (error?.response?.status === 401 && !original._retry) {
          original._retry = true;
          try {
            const r = await api.post("/auth/refresh", {}, { withCredentials: true });
            if (r.data?.accessToken) {
              saveAccessToken(r.data.accessToken);
              original.headers = original.headers || {};
              original.headers.Authorization = `Bearer ${r.data.accessToken}`;
              return api(original);
            }
          } catch {}
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(id);
  }, [saveAccessToken]);

  const value = { user, accessToken, login, register, fetchMe, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
