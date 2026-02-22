import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;
    try {
        // Lấy cookie từ request
        // console.log("api me link backend:  ", API_BASE);
        const cookieHeader = req.headers.get("cookie") || "";
        console.log("👉 api me CookieHeader:", cookieHeader);

        // Nếu token lưu trong cookie accessToken
        /*const token = cookieHeader
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
        console.log("api me accessToken:  ", token)
        const userId = payload.sub;
        console.log("userId trong api me:   ", userId);*/
        // Forward request sang backend kèm Authorization và cookie
        const res = await fetch(`${API_BASE}/auth/profile`, {//?id=${userId}
            headers: {
                // Authorization: `Bearer ${token}`,
                // build nesjs mới thì bật cookie lên!
                cookie: cookieHeader, // forward luôn cookie nếu backend dùng session
            },
            // credentials: 'include',
            cache: "no-store",
        });
        /*if (!res.ok) {
            const errText = await res.text();
            console.error("❌ Backend error body:", errText);
            return NextResponse.json({ error: "Failed to fetch profile", details: errText })
            // return NextResponse.json({ error: "Failed to fetch profile" }, { status: res.status });
        }*/

        const data = await res.json();
        console.log("Api me data", data);
        return NextResponse.json({ user: data.user, debugToken: data.debugToken });//user:data
    } catch (err) {
        console.error("❌ Error in /api/auth/me:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
        // return NextResponse.json({ user: data });
    }
}
