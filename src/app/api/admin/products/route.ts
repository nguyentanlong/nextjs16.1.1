import { NextResponse } from "next/server";
import { cookies } from "next/headers";



export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;
    // ✅ LOG để debug
    // ✅ Log TẤT CẢ cookies để tìm đúng tên
    const allCookies = cookieStore.getAll();
    console.log("All cookies:", allCookies.map(c => `${c.name}=${c.value.slice(0, 20)}...`));
    // Thử các tên phổ biến
    const token1 =
        cookieStore.get("accessToken")?.value ||
        cookieStore.get("token")?.value ||
        cookieStore.get("jwt")?.value ||
        cookieStore.get("access_token")?.value;

    console.log("Token found:", token ? `có (${token.slice(0, 20)}...)` : "KHÔNG CÓ");
    console.log("=== POST /api/admin/products ===");
    console.log("API_BASE:", API_BASE);
    console.log("token:", token1 ? `có (${token1.slice(0, 20)}...)` : "KHÔNG CÓ TOKEN");
    try {
        const formData = await req.formData();
        // ✅ LOG formData
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`  ${key}: [File] ${value.name} (${value.size} bytes)`);
            } else {
                console.log(`  ${key}: "${value}"`);
            }
        }

        console.log("Calling:", `${API_BASE}/addProduct`);
        const res = await fetch(`${API_BASE}/addProduct`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
            // credentials: "include",
            duplex: "half",
        } as RequestInit & { duplex: "half" });

        const text = await res.text();
        console.log("Backend status:", res.status);
        console.log("Backend response:", text);

        return new NextResponse(text, {
            status: res.status,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err: any) {
        console.error("Cause:", err?.cause);
        console.error("Proxy error:", err?.message);
        return NextResponse.json(
            { message: "Proxy server error", detail: err?.message },
            { status: 500 }
        );
    }
}