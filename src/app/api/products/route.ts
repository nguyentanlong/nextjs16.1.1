import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;

export async function POST(req: Request) {
    try {
        // lấy accessToken từ request browser
        const authorization = req.headers.get("authorization");
        console.log("authorization trong api/products:  ", authorization);
        const res = await fetch(`${API_BASE}/addProduct`, {
            method: "POST",
            headers: {
                ...(authorization ? { Authorization: authorization } : {})
                // Authorization: authorization ?? "",
                // forward nguyên content-type để giữ boundary
                // "Content-Type": req.headers.get("content-type") || "",
            },
            body: req.body, // ⭐ forward stream
            duplex: "half",
        } as RequestInit & { duplex: "half" });

        const text = await res.text();
        console.log("text trong api products: ", text);
        return new NextResponse(text, {
            status: res.status,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        console.error("Proxy error:", err);

        return NextResponse.json(
            { message: "Proxy server error" },
            { status: 500 }
        );
    }
}