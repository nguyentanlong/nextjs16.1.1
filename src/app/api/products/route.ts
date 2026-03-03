import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    const cookieHeader = req.headers.get("cookie") || "";
    const formData = await req.formData(); // vì backend dùng FilesInterceptor nên phải gửi multipart/form-data

    try {
        const res = await fetch(`${API_BASE}/addProduct`, {
            method: "POST",
            headers: {
                cookie: cookieHeader, // forward cookie để backend kiểm tra jwt + role
            },
            body: formData,
            cache: "no-store",
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("❌ Error creating product:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
