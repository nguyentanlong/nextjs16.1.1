import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.formData(); // vì có avatar (file upload)
    // Regex kiểm tra
    const phoneRegex = /^(0|\+84)(\d{9})$/; // số VN: bắt đầu 0 hoặc +84, sau đó 9 số
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    const fullName = body.get("fullName")?.toString().trim();
    const username = body.get("username")?.toString().trim();
    const phone = body.get("phone")?.toString().trim();
    const email = body.get("email")?.toString().trim();
    const password = body.get("password")?.toString();
    const address = body.get("address")?.toString().trim();
    const avatar = body.get("avatar") as File;

    // Validation
    if (!fullName) return NextResponse.json({ error: "Không được để trống" }, { status: 400 });
    if (!phone || !phoneRegex.test(phone)) return NextResponse.json({ error: "Số điện thoại không hợp lệ" }, { status: 400 });
    if (!username) return NextResponse.json({ error: "Không được để trống" }, { status: 400 });
    if (!email || !emailRegex.test(email)) return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });
    if (!password || !passwordRegex.test(password))
        return NextResponse.json({ error: "Mật khẩu =>8 ký tự, có chữ hoa, thường và ký tự đặt biệt" }, { status: 400 });
    if (!address) return NextResponse.json({ error: "Địa chỉ không để trống" }, { status: 400 });
    if (!avatar || !avatar.type.startsWith("image/")) return NextResponse.json({ error: "Phải chọn hình ảnh" }, { status: 400 });

    // Gọi API backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/register`, {
        method: "POST",
        body, // gửi multipart/form-data
    });

    if (!res.ok) {
        // return NextResponse.json({ error: "Đăng ký thất bại" }, { status: 400 });
        const errText = await res.text(); // log chi tiết lỗi từ backend 
        console.error("Register error:", errText);
        return NextResponse.json({ error: errText }, { status: res.status });
    }

    const data = await res.json();

    // Tạo response và set cookie bảo mật
    const response = NextResponse.json({ user: data.user });

    response.cookies.set("authToken", data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60, // 1h
    });

    response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 ngày
    });

    return response;
}
