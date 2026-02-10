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
    // console.log("API_BASE:", API_BASE);
    // console.log("👉 Backend response headers:", Array.from(res.headers.entries()));
    // console.log("document.cookie:   ", document.cookie);


    if (!res.ok) {
        return NextResponse.json({ error: "Sai tài khoản hoặc mật khẩu R" }, { status: res.status });
        console.log("Login response status:", res.status);
        console.log("Login response body:", await res.text());

    }

    const data = await res.json();
    // Lấy cookie từ backend 
    const setCookie = res.headers.get("set-cookie");
    // Tạo response và set cookie bảo mật
    const response = NextResponse.json({ user: data.user });//user: data.user hoặc là data
    // console.log("kết quả Respone:  ", response);
    console.log("kết quả Data:  ", data);
    //forwward cookie
    // if (setCookie) { response.headers.set("set-cookie", setCookie); } 
    //đoạn trên chỉ láy accessToken 
    // Set lại cookie ở đây 
    response.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 15,
    });
    response.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });
    return response;
}
