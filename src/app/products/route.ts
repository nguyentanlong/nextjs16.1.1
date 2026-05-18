// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;

    // ✅ Ưu tiên Authorization header từ fetchWithAuth
    // Fallback về cookie nếu không có header
    const authHeader = req.headers.get("authorization");
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("accessToken")?.value;
    const token = authHeader?.replace("Bearer ", "") || cookieToken;

    console.log("token source:", authHeader ? "header" : "cookie");
    console.log("token:", token ? `có (${token.slice(0, 20)}...)` : "KHÔNG CÓ");
    console.log("Full token:", token);

    // ✅ Log để so sánh
    console.log("=== POST /api/products ===");
    console.log("authHeader token (30 chars):", authHeader?.slice(7, 37));
    console.log("cookieToken (30 chars):", cookieToken?.slice(0, 30));
    console.log("token dùng (30 chars):", token?.slice(0, 30));
    console.log("token source:", authHeader ? "header" : "cookie");
    // ✅ Decode để xem exp
    try {
        const payload = JSON.parse(Buffer.from(token!.split('.')[1], 'base64').toString());
        console.log("token payload:", JSON.stringify(payload));
    } catch { console.log("decode failed"); }

    try {
        const formData = await req.formData();

        const res = await fetch(`${API_BASE}/addProduct`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
            duplex: "half",
        } as RequestInit & { duplex: "half" });

        const text = await res.text();
        console.log("Backend status:", res.status);
        console.log("Backend response:", text);

        return new NextResponse(text, {
            status: res.status,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error("Proxy error:", err);
        return NextResponse.json(
            { message: "Proxy server error" },
            { status: 500 }
        );
    }
}