import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    // Gọi API backend
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tonkliplock1000.com";
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    console.log("API_BASE:", API_BASE);

    if (!res.ok) {
        return NextResponse.json({ error: "Sai tài khoản hoặc mật khẩu" }, { status: 401 });
    }

    const data = await res.json();

    // Tạo response và set cookie bảo mật
    const response = NextResponse.json({ user: data.user });

    response.cookies.set("authToken", data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60, // 1h
    });

    response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 24 * 2, // 7 ngày
    });

    return response;
}
