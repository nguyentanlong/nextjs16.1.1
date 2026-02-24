// src/context/AuthContext.tsx
"use client";

/*import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    id: string;
    email: string;
    role: "admin" | "staff" | "user";
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    async function login(email: string, password: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include", // để cookie HTTP-only được gửi kèm
        });

        if (!res.ok) throw new Error("Sai thông tin");

        const data = await res.json();
        setUser(data.user); // lưu user vào state
    }

    async function logout() {
        try { // ✅ Gọi API logout để hủy session/token ở backend 
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`,
                {
                    method: "POST",
                    credentials: "include", // gửi cookie để backend biết session nào cần hủy 
                });

            // setUser(null);
            // console.log(JSON.stringify({}));
        }
        catch (err) { console.error("Logout API error:", err); }
        // document.cookie = "accessToken=; Max-Age=0; path=/;";// xóa thủ công
        document.cookie = "accessToken=; Max-Age=0; path=/;";
        localStorage.removeItem("accessToken"); // nếu có lưu 
        sessionStorage.removeItem("accessToken");
        // ✅ Xóa user trong context 
        setUser(null);
        // ❌ Không cần tự document.cookie nữa 
        // // Vì backend đã hủy token, middleware sẽ không cho truy cập nữa
        // ✅ Xóa cookie accessToken (nếu backend không có API logout) 
        // document.cookie = "accessToken=; Max-Age=0; path=/;"; 
        // // ✅ Xóa user trong context
        // setUser(null);
        // Đặt flag logout 
        // localStorage.setItem("isLoggedOut", "true");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}*/
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
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Tạo context 
/*export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: async () => { },
});*/

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // const [loading, setLoading] = useState(true);
    // ✅ Tự động khôi phục user khi Provider mount 
    // const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;
    console.log("AuthContext flag bắt đầu:   ", loading);
    useEffect(() => {
        const fetchMe = async () => {
            /*const cookieHeader = document.cookie || "";
            const token = cookieHeader
                .split(";")
                .find((c) => c.trim().startsWith("accessToken="))
                ?.split("=")[1];

            if (!token) {
                console.error("No token found");
                return null;
            }*/
            try {
                const res = await fetch(`/api/auth/me`, {
                    /*headers: {
                        Authorization: `Bearer ${token}`,
                    },*/
                    method: "GET",
                    credentials: "include",
                });

                /*if (!res.ok) {
                    console.error("AuthContext Profile fetch failed", res.status);
                    return;
                }*/
                const data = await res.json();
                console.log("👉 AuthContext restored user:", data.user);
                console.log("👉 Debug token:", data.debugToken);
                setUser(data.user);
            } catch (err) {
                console.error("❌ Error restoring user:", err);
            } finally { setLoading(false); }
        };
        fetchMe();
    }, []);
    console.log("AuthContext flag kết thúc:   ", loading);
    console.log("👉 AuthContext Ngoài login");
    const login = async (email: string, password: string) => {
        // console.log("AuthContext Bắt đầu login...");
        try {
            const res = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include", // để cookie HTTP-only được lưu
            });

            console.log("AuthContext Response status:", res.status);
            // 👉 Debug: in ra raw response trước khi parse JSON 
            // const raw = await res.text();
            // console.log("Raw response:", raw);
            console.log("👉 AuthContext Fetch response status:", res.status);
            console.log("👉 AuthContext Fetch response headers:", Array.from(res.headers.entries()));

            if (!res.ok) {
                throw new Error("AuthContext Sai thông tin đăng nhập AC");
            }

            const data = await res.json();
            //hoặc 
            //             const { data: { user } } = await res.json();
            // setUser(user);

            // ✅ cập nhật state user từ response
            // console.log("AuthContext Login response data:", data);
            // console.log("👉 AuthContext User set in context (data.data.user):", data.data.user);
            setUser(data.data.user);

        } catch (err) {
            console.error("❌ Login error:", err);
        } finally { setLoading(false); }
    };

    const logout = async () => {
        await fetch(`/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        setUser(null); // xoá state user
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, loading, }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};

