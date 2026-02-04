import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST() {
    // Tạo response rỗng
    /*const response = NextResponse.json({ message: "Đã logout thành công. Tạm biệt dệ9" });

    // Xóa cookie accessToken
    response.cookies.set("accessToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 0, // hết hạn ngay lập tức
    });

    // Xóa cookie refreshToken
    response.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 0,
    });
    // response.cookies.delete("accessToken");
    //   response.cookies.delete("accessToken");
    return response;*/
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE; // Lấy refreshToken từ cookie của frontend 
    // // (Next.js có thể đọc cookie từ request) 
    // // Nhưng ở API route, mình phải đọc từ headers hoặc cookies // 
    // Ví dụ: // 
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
    });
    const data = await res.json();
    return NextResponse.json(data);
}
