import { NextResponse } from "next/server";

export async function POST() {
    // Tạo response rỗng
    const response = NextResponse.json({ message: "Đã logout thành công. Tạm biệt dệ9" });

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
    response.cookies.delete("accessToken");
    //   response.cookies.delete("accessToken");
    return response;
}
