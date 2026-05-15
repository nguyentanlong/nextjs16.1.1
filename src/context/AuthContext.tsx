"use client";

import { setAuthToken } from "@/lib/fetchWithAuth";
import { usePathname } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

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
    const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

    function normalizeUser(data: any) {
        return data?.user?.user ?? data?.user ?? data ?? null;
    }

    const pathname = usePathname();

    // Load user theo pathname
    useEffect(() => {
        if (pathname.startsWith("/admin") || pathname.startsWith("/product-editor-client")) {
            console.log("AuthContext Chạy");
            async function loadUser() {
                try {
                    const res = await fetch("/api/auth/me", { credentials: "include" });
                    if (!res.ok) return;
                    const data = await res.json();
                    setUser(normalizeUser(data));
                    setLoading(false);
                } catch (err) {
                    console.error("Load user error:", err);
                    setUser(null);
                }
            }
            loadUser();
        }
    }, [pathname]);
    useEffect(() => {
        setAuthToken(accessToken);
    }, [accessToken]);
    // ✅ fetchMe dùng chung
    const fetchMe = useCallback(async (): Promise<boolean> => {
        try {
            const res = await fetch("/api/auth/me", { credentials: "include" });
            const data = await res.json();

            console.log("fetchMe raw:", JSON.stringify(data));

            if (res.ok) {
                const normalized = normalizeUser(data);
                console.log("fetchMe normalized:", JSON.stringify(normalized));
                setUser(normalized);
                return true;
            } else {
                setUser(null);
                return false;
            }
        } catch {
            setUser(null);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);


    // ✅ Thêm hàm decode JWT (không cần verify, chỉ đọc payload)
    // ✅ Thêm hàm decode JWT (không cần verify, chỉ đọc payload)
    function decodeJwt(token: string): any {
        try {
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload));
        } catch {
            return null;
        }
    }

    const refreshToken = useCallback(async () => {
        try {
            console.log("🔄 Auto refreshing token...");
            const res = await fetch("/api/auth/refresh", {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                console.log("✅ Token refreshed");

                if (data.accessToken) {
                    setAccessToken(data.accessToken);

                    // ✅ Decode JWT để lấy user info — không cần fetchMe
                    const payload = decodeJwt(data.accessToken);
                    console.log("JWT payload:", JSON.stringify(payload));

                    if (payload?.sub && payload?.role) {
                        const userFromToken = {
                            id: payload.sub,
                            role: payload.role,
                            email: payload.email ?? "",
                        };
                        console.log("✅ User từ JWT:", JSON.stringify(userFromToken));
                        setUser(userFromToken);
                        return; // ← không cần fetchMe nữa
                    }
                }

                // Fallback: fetchMe nếu không decode được
                await new Promise(resolve => setTimeout(resolve, 500));
                await fetchMe();
            } else {
                console.log("❌ Refresh failed → logout");
                logout();
            }
        } catch (err) {
            console.error("Refresh error:", err);
        }
    }, [fetchMe]);

    // ✅ Setup auto refresh mỗi 13 phút
    const setupRefreshTimer = useCallback(() => {
        if (refreshTimerRef.current) {
            clearInterval(refreshTimerRef.current);
        }
        refreshTimerRef.current = setInterval(() => {
            refreshToken();
        }, 13 * 60 * 1000);
    }, [refreshToken]);

    useEffect(() => {
        fetchMe();
        setupRefreshTimer();
        return () => {
            if (refreshTimerRef.current) {
                clearInterval(refreshTimerRef.current);
            }
        };
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            if (!res.ok) throw new Error("Sai thông tin đăng nhập");

            const loginData = await res.json();
            console.log("login response:", JSON.stringify(loginData));

            // ✅ Lấy accessToken từ response body — không dùng document.cookie
            if (loginData.accessToken) {
                setAccessToken(loginData.accessToken);
                setAuthToken(loginData.accessToken); // sync vào fetchWithAuth
            }

            const res1 = await fetch("/api/auth/me", {
                credentials: "include",
                cache: "no-store",
            });
            const data1 = await res1.json();
            setUser(normalizeUser(data1));

        } catch (err) {
            console.error("❌ Login error:", err);
        } finally {
            setLoading(false);
        }
    };
    /* const login = async (email: string, password: string) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            if (!res.ok) throw new Error("Sai thông tin đăng nhập");
            const res1 = await fetch("/api/auth/me", { credentials: "include", cache: "no-store" });
            const data1 = await res1.json();
            const normalized = normalizeUser(data1);
            setUser(normalized);
            const tokenMatch = document.cookie.match(/(?:^|;\s*)accessToken=([^;]+)/);
            if (tokenMatch) {
                setAccessToken(decodeURIComponent(tokenMatch[1]));
            }
            /*const res1 = await fetch("/api/auth/me", {
                credentials: "include",
                cache: "no-store",
            });
            const data1 = await res1.json();
            setUser(normalizeUser(data1));* /
        } catch (err) {
            console.error("❌ Login error:", err);
        } finally {
            setLoading(false);
        }
    };*/

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        setAccessToken(null);
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