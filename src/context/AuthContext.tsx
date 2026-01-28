// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include", // để cookie HTTP-only được gửi kèm
        });

        if (!res.ok) throw new Error("Login failed");

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
            // console.log(JSON.stringify({}));
        }
        catch (err) { console.error("Logout API error:", err); }
        // document.cookie = "accessToken=; Max-Age=0; path=/;";// xóa thủ công
        // ✅ Xóa user trong context 
        setUser(null);
        // ❌ Không cần tự document.cookie nữa 
        // // Vì backend đã hủy token, middleware sẽ không cho truy cập nữa
        // ✅ Xóa cookie accessToken (nếu backend không có API logout) 
        // document.cookie = "accessToken=; Max-Age=0; path=/;"; 
        // // ✅ Xóa user trong context
        // setUser(null);
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
}
