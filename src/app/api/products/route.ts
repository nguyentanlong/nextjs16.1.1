import { NextResponse } from "next/server";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import type { NextRequest } from "next/server";

export async function POST(req: Request) {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    // const cookieHeader = req.headers.get("cookie") || "";
    // const token = localStorage.getItem("accessToken"); // token đã lưu khi login
    // const token = request.cookies.get("accessToken")?.value;
    const token = req.headers.get("authorization"); // lấy từ request gốc
    // const formData = await req.formData(); // vì backend dùng FilesInterceptor nên phải gửi multipart/form-data

    try {
        const res = await fetch(`${API_BASE}/addProduct`, {
            method: "POST",
            headers: {
                // cookie: cookieHeader, // forward cookie để backend kiểm tra jwt + role
                // "Content-Type": "application/json", //"Authorization":
                // `Bearer ${token}`, // thêm dòng này
                "Content-Type": req.headers.get("content-type") || "",
                "Authorization": token ?? "",
            },
            body: req.body, // ⭐ QUAN TRỌNG NHẤT
            duplex: "half",
        } as any);
        // cache: "no-store",
        // });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("❌ Error creating product:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
