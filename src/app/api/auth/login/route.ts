import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;
    const isProd = process.env.NODE_ENV === "production";

    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: "Sai tài khoản hoặc mật khẩu R" },
            { status: res.status }
        );
    }

    const data = await res.json();

    // ✅ Thêm accessToken vào body để client lấy được
    const response = NextResponse.json({
        user: data.user,
        accessToken: data.accessToken,
    });

    response.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: '/',
        maxAge: 60 * 15,
    });

    response.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    return response;
}