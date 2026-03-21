"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    accessToken: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    // const [refreshToken, setRefreshToken] = useState<string | null>(null);
    /*if (typeof window === "undefined") {
  console.warn("⚠️ Skip fetch on server:", url);
  return null;
}*/
    function normalizeUser(data: any) {
        return data?.user?.user ?? data?.user ?? data ?? null;
    }
    // Khôi phục user từ localStorage khi mount
    useEffect(() => {

        async function loadUser() {
            try {
                const res = await fetch("/api/auth/me", {
                    credentials: "include",
                });
                // ❗ nếu không OK → bỏ qua
                if (!res.ok) {
                    /*console.warn("Not logged in:", res.status);
                    setUser(null);*/
                    return;
                }
                /*if (!res.ok) {
                    setUser(null);
                    return;
                }*/
                const data = await res.json();
                setUser(normalizeUser(data));//(data.user ?? null);
                setLoading(false);
                // console.log("Data USEEFFECT AuthContext  ", normalizeUser(data));
            } catch (err) {
                console.error("Load user error:", err);
                setUser(null);
            }
        }
        /*  const text = await res.text();
          if (!text) return;

          const data = JSON.parse(text);

          setUser(normalizeUser(data ?? null));//data.user
      } catch (err) {
          console.error("Auth error:", err);
      }
  };*/
        loadUser();
    }, []);

    /* useEffect(() => {
         async function restoreUser() {
             try {
                 const res = await fetch("/api/auth/me", {
                     method: "GET",
                     credentials: "include",
                 });
 
                 if (!res.ok) {
                     setUser(null);
                     return;
                 }
 
                 const data = await res.json();
                 setUser(data.data.user);
 
             } catch (err) {
                 console.error("restore user error", err);
             } finally {
                 setLoading(false);
             }
         }
 
         restoreUser();
     }, []);*/

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            // const data = await res.json();
            if (!res.ok) throw new Error("Sai thông tin đăng nhập");

            // Sau khi login thành công, gọi /api/auth/me
            // const resME = await fetch(`/api/auth/me`, { credentials: "include" });
            // if (!resME.ok) throw new Error("Không lấy được thông tin user");
            const res1 = await fetch("/api/auth/me", {
                credentials: "include",
                cache: "no-store"
            })
            // fetch('/api/auth/me').then(r => r.json()).then(console.log)
            const data1 = await res.json()

            // setUser(data.user)
            // const dataME = await resME.json();
            // console.log("dataMe  ", dataME.data);

            // localStorage.setItem("user", JSON.stringify(user));
            // console.log("data.data.user  ", data.data.user);
            // console.log("Data LOGIN AuthContext:  ", data1);
            setUser(normalizeUser(data1));
            // console.log("Data LOGIN AuthContext normalizeUser:  ", normalizeUser(data1));
            // setAccessToken(data.data.accessToken);
            // setRefreshToken(data.data.refreshToken);
            // localStorage.setItem("refreshToken", data.refreshToken);
            // localStorage.setItem("user", JSON.stringify(data.data.user)); // ✅ lưu đúng user
            // setUser(data.user);
        } catch (err) {
            console.error("❌ Login error:", err);
        } finally {
            setLoading(false);
        }
    };
    // Hàm refresh token
    /*const refresh = async () => {
        const res = await fetch("/api/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                refreshToken: localStorage.getItem("refreshToken"),
            }),
        });

        if (!res.ok) throw new Error("Refresh failed");
        const data = await res.json();
        setAccessToken(data.data.accessToken);
        localStorage.setItem("accessToken", data.data.accessToken);
        return data.accessToken;
    };*/


    // Hàm fetch wrapper có auto refresh
    /*const authFetch = async (url: string, options: any = {}) => {
        const token = localStorage.getItem("accessToken");
        const headers = {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
        };

        let res = await fetch(url, { ...options, headers });

        if (res.status === 401) {
            alert("Refresh token");
            try {
                const newToken = await refresh();
                const retryHeaders = {
                    ...(options.headers || {}),
                    Authorization: `Bearer ${newToken}`,
                };
                res = await fetch(url, { ...options, headers: retryHeaders });
            } catch (err) {
                // Refresh fail → logout
                setAccessToken(null);
                setRefreshToken(null);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                throw err;
            }
        }

        return res;
    };*/
    const logout = async () => {
        await fetch(`/api/auth/logout`, { method: "POST", credentials: "include" });
        setAccessToken(null); // ✅ clear token khi logout
        // localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};


