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
/*import React, { createContext, useContext, useEffect, useState } from "react";

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
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
            const resME = await fetch(`/api/auth/me`, {
                method: "GET",
                credentials: "include",
            });

            const dataME = await resME.json();
            console.log("👉 AuthContext API ME restored user:", dataME.user);
            console.log("👉 API ME Debug token:", dataME.debugToken);

            if (!resME.ok) throw new Error("API ME Không lấy được thông tin user");
            console.log("👉 AuthContext API ME restored user:", dataME.user);
            console.log("👉 API ME Debug token:", dataME.debugToken);

            if (!res.ok) {
                throw new Error("AuthContext Login Sai thông tin đăng nhập AC");
            }

            const data = await res.json();
            localStorage.setItem("user", JSON.stringify(user));
            setUser(data.data.user);

        } catch (err) {
            console.error("❌ Login error:", err);
        } finally { setLoading(false); }
    }


    const logout = async () => {
        await fetch(`/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        console.log("locaolStorage login;  ", localStorage.setItem("user", JSON.stringify(user)));
        localStorage.removeItem("user");
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
};*/
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Khôi phục user từ localStorage khi mount
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser && savedUser !== "undefined") {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (!res.ok) throw new Error("Sai thông tin đăng nhập");

            // Sau khi login thành công, gọi /api/auth/me
            const resME = await fetch(`/api/auth/me`, { credentials: "include" });
            if (!resME.ok) throw new Error("Không lấy được thông tin user");

            const dataME = await resME.json();
            console.log("dataMe  ", dataME);
            const data = await res.json();
            // localStorage.setItem("user", JSON.stringify(user));
            // console.log("data.data.user  ", data.data.user);
            setUser(data.data.user);
            localStorage.setItem("user", JSON.stringify(data.data.user)); // ✅ lưu đúng user
        } catch (err) {
            console.error("❌ Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await fetch(`/api/auth/logout`, { method: "POST", credentials: "include" });
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};


