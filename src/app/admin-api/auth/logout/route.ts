
import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function POST(req: Request) {

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

    const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();


    const response = NextResponse.json(data, { status: res.status });

    response.cookies.set("refreshToken", "", {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 0,
    });
    response.cookies.set("accessToken", "", {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 0,
    });


    return response;
}
