import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE; // nhớ set trong .env

export async function GET(req: Request) {
    try {
        // Lấy cookie hoặc token từ request
        const cookieHeader = req.headers.get("cookie") || "";
        const token = cookieHeader
            .split(";")
            .find((c) => c.trim().startsWith("accessToken="))
            ?.split("=")[1];

        if (!token) {
            return NextResponse.json({ error: "No token found" }, { status: 401 });
        }

        // Giải mã token để lấy id (ví dụ JWT)
        const payload = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
        );
        const userId = payload.sub; // id nằm trong sub
        console.log("User Id:   ", userId)
        // Gọi API backend để lấy profile
        const res = await fetch(`${API_BASE}/auth/profile?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch profile" }, { status: res.status });
        }

        const data = await res.json();

        // Trả về user cho frontend
        return NextResponse.json({ user: data.user });
    } catch (err) {
        console.error("❌ Error in /api/auth/me:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
