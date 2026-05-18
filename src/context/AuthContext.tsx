// src/context/AuthContext.tsx
"use client";

import { usePathname } from "next/navigation";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { setAuthToken } from "@/lib/fetchWithAuth";

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

function normalizeUser(data: any): User | null {
    return data?.user?.user ?? data?.user ?? data ?? null;
}

function decodeJwt(token: string): any {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch { return null; }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();

    // ✅ Sync accessToken vào fetchWithAuth mỗi khi thay đổi
    useEffect(() => {
        setAuthToken(accessToken);
    }, [accessToken]);

    // ✅ fetchMe — lấy user info từ server
    const fetchMe = useCallback(async (): Promise<boolean> => {
        try {
            const res = await fetch("/api/auth/me", { credentials: "include" });
            const data = await res.json();
            if (res.ok) {
                const normalized = normalizeUser(data);
                setUser(normalized);
                return true;
            }
            setUser(null);
            return false;
        } catch {
            setUser(null);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // ✅ refreshToken — gọi API refresh, decode JWT để lấy user
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
                    setAuthToken(data.accessToken); // ✅ sync ngay

                    // ✅ Decode JWT để lấy user — không cần fetchMe
                    const payload = decodeJwt(data.accessToken);
                    if (payload?.sub && payload?.role) {
                        setUser({
                            id: payload.sub,
                            role: payload.role,
                            email: payload.email ?? "",
                        });
                        return;
                    }
                }

                // Fallback fetchMe nếu không decode được
                await new Promise(resolve => setTimeout(resolve, 300));
                await fetchMe();
            } else {
                console.log("❌ Refresh failed → logout");
                await logout();
            }
        } catch (err) {
            console.error("Refresh error:", err);
        }
    }, [fetchMe]);

    // ✅ Setup auto refresh mỗi 13 phút
    const setupRefreshTimer = useCallback(() => {
        if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = setInterval(() => {
            refreshToken();
        }, 13 * 60 * 1000);
    }, [refreshToken]);

    // Load user theo pathname (admin pages)
    useEffect(() => {
        if (pathname.startsWith("/admin") || pathname.startsWith("/product-editor-client")) {
            console.log("AuthContext Chạy");
            fetchMe();
        }
    }, [pathname]);

    // Mount: fetch user + setup timer
    useEffect(() => {
        fetchMe();
        setupRefreshTimer();
        return () => {
            if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
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

            // ✅ Lấy accessToken từ response body
            if (loginData.accessToken) {
                setAccessToken(loginData.accessToken);
                setAuthToken(loginData.accessToken); // ✅ sync ngay

                // ✅ Decode JWT để lấy user ngay — không cần fetchMe
                const payload = decodeJwt(loginData.accessToken);
                if (payload?.sub && payload?.role) {
                    setUser({
                        id: payload.sub,
                        role: payload.role,
                        email: payload.email ?? "",
                    });
                    return;
                }
            }

            // Fallback fetchMe
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

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        setAccessToken(null);
        setAuthToken(null); // ✅ clear token trong fetchWithAuth
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