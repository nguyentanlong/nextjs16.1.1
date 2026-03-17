import { NextResponse } from "next/server";
import { cookies } from "next/headers";



export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;
    try {
        // lấy accessToken từ request browser
        // const authorization = req.headers.get("authorization");
        // console.log("authorization trong api/products:  ", authorization);
        // Đọc formData từ request
        const formData = await req.formData();
        const res = await fetch(`${API_BASE}/addProduct`, {
            method: "POST",
            headers: {
                // ...(authorization ? { Authorization: authorization } : {})
                Authorization: `Bearer ${token}`,
            },
            body: formData,//req.body, // ⭐ forward stream
            credentials: "include",
            duplex: "half",
        } as RequestInit & { duplex: "half" });

        const text = await res.text();
        console.log("text trong api products: ", text);
        console.log("content-type:", req.headers.get("content-type"));
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