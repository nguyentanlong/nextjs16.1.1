import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const body = await req.json();
    // Gọi API backend
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include", // bắt buộc để cookie được lưu
    });

    if (!res.ok) {
        return NextResponse.json({ error: "Sai tài khoản hoặc mật khẩu R" }, { status: res.status });

    }

    const data = await res.json();

    const setCookie = res.headers.get("set-cookie");

    const response = NextResponse.json({
        user: data.user,
    });
    response.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: false,//process.env.NODE_ENV === 'production',//https: true
        sameSite: 'lax',//'none',//https: none
        path: '/',
        maxAge: 60 * 15,
    });
    response.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: false,//process.env.NODE_ENV === 'production',
        sameSite: 'lax',//'none',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });
    return response;
}
