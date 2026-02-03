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
    console.log("API_BASE:", API_BASE);

    if (!res.ok) {
        return NextResponse.json({ error: "Sai tài khoản hoặc mật khẩu" }, { status: 401 });
    }

    const data = await res.json();

    // Tạo response và set cookie bảo mật
    const response = NextResponse.json({ user: data.user });

    response.cookies.set("accessToken", data.accessToken, {//authToken
        httpOnly: true,
        secure: true,//trên dev thì bỏ bởi ko localhost không có https
        //domain: ".cameramatroi.com", // cho phép dùng ở cả api. và www. nếu deloy backend ở subdomain
        sameSite: "none",// khi có domain đỗi lax hoặc strict sẽ ổn định hơn
        path: "/",
        maxAge: 60 * 60, // 1h
    });

    response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,//trên dev thì bỏ bởi ko localhost không có https
        //domain: ".cameramatroi.com", // cho phép dùng ở cả api. và www. nếu deloy backend ở subdomain
        sameSite: "none",// khi có domain đỗi lax hoặc strict sẽ ổn định hơn
        path: "/",
        maxAge: 60 * 60 * 24 * 2, // 7 ngày
    });
    return response;
}
