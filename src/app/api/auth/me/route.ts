import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function GET(req: Request) {
    try {
        // Lấy cookie từ request
        const cookieHeader = req.headers.get("cookie") || "";

        // Nếu token lưu trong cookie accessToken
        const token = cookieHeader
            .split(";")
            .find((c) => c.trim().startsWith("accessToken="))
            ?.split("=")[1];

        if (!token) {
            return NextResponse.json({ error: "No token found" }, { status: 401 });
        }

        // Giải mã JWT để lấy id
        const payload = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
        );
        const userId = payload.sub;
        console.log("userId trong api me:   ", userId);
        // Forward request sang backend kèm Authorization và cookie
        const res = await fetch(`${API_BASE}/auth/profile`, {//?id=${userId}
            headers: {
                Authorization: `Bearer ${token}`,
                Cookie: cookieHeader, // forward luôn cookie nếu backend dùng session
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch profile" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json({ user: data });
    } catch (err) {
        console.error("❌ Error in /api/auth/me:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
