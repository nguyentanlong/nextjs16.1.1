import { NextResponse } from "next/server";
import { cookies } from "next/headers";



export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;

    try {
        const formData = await req.formData();

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
        return new NextResponse(text, {
            status: res.status,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err: any) {
        return NextResponse.json(
            { message: "Proxy server error", detail: err?.message },
            { status: 500 }
        );
    }
}