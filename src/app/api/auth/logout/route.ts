/*import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
export async function POST(req: Request) {
    /*    const cookieHeader = req.headers.get("cookie");
    let refreshToken: string | undefined;
    if (cookieHeader) {
        const cookies = Object.fromEntries(cookieHeader.split(";").map(c => { const [key, ...v] = c.trim().split("="); return [key, v.join("=")]; })); refreshToken = cookies["refreshToken"];
    }
    console.log("👉 RefreshToken:", refreshToken);
    const secure = process.env.NODE_ENV === "production";
    // Gọi backend logout 
    const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
    });
    const data = await res.json();
    // Tạo response 
    const response = NextResponse.json(data, { status: res.status });
    // Xoá cookie ở frontend domain 
    response.headers.set(
        "set-cookie", [`accessToken=; Path=/; HttpOnly; ${secure ? "Secure;" : ""}; SameSite=None; Max-Age=0`, `refreshToken=; Path=/; HttpOnly; ${secure ? "Secure;" : ""}; SameSite=None; Max-Age=0`,].join(", "));
    return response;
}*/
import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function POST(req: Request) {
    // Lấy cookie từ request headers
    const cookieHeader = req.headers.get("cookie");
    let refreshToken: string | undefined;

    if (cookieHeader) {
        const cookies = Object.fromEntries(
            cookieHeader.split(";").map((c) => {
                const [key, ...v] = c.trim().split("=");
                return [key, v.join("=")];
            })
        );
        refreshToken = cookies["refreshToken"];
    }

    console.log("👉 RefreshToken logut:", refreshToken);

    // Gọi backend logout với refreshToken
    const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();

    // Tạo response và xoá cookie ở frontend domain
    const response = NextResponse.json(data, { status: res.status });
    const secure = process.env.NODE_ENV === "production";

    response.headers.set(
        "set-cookie",
        [
            `accessToken=; Path=/; HttpOnly; ${secure ? "Secure;" : ""} SameSite=None; Max-Age=0`,
            `refreshToken=; Path=/; HttpOnly; ${secure ? "Secure;" : ""} SameSite=None; Max-Age=0`,
        ].join(", ")
    );

    return response;
}
