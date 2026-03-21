import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// 👉 decode JWT (không cần thư viện)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;
function parseJwt(token: string) {
    try {
        const base64 = token.split(".")[1];
        const decoded = JSON.parse(
            Buffer.from(base64, "base64").toString("utf-8")
        );
        return decoded;
    } catch {
        return null;
    }
}

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Lấy token từ cookie
    const token = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // 👉 không có token → bỏ qua
    /*if (!token || !refreshToken) {
        return NextResponse.next();
    }*/
    let isExpired = false;

    if (!token && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Nếu route là /admin → kiểm tra role
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { role?: string };
            // Nếu token đã hết hạn → redirect về login 
            /*if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
                // console.log("👉 Token expired");
                isExpired = true;
                // return NextResponse.redirect(new URL("/", request.url));

            }*/
            // console.log("Vào if(Token)");
            if (["admin", "staff", "user"].includes(decoded?.role || "")) {//if (decoded?.role === "admin" || decoded?.role === "staff" || decoded?.role === "user") {
                // Nếu đã ở /admin thì cho đi tiếp, không redirect nữa 
                if (pathname.startsWith("/admin")) {
                    return NextResponse.next();
                }
                // Nếu đang ở /login thì redirect sang /admin 
                if (pathname.startsWith("/login")) {
                    return NextResponse.redirect(new URL("/admin", request.url));
                }
            } else {
                return NextResponse.redirect(new URL("/register", request.url)); // Không đủ quyền
            }
        } catch (err: any) {
            if (err.name === "TokenExpiredError") {
                // console.log("👉 Token expired");
                isExpired = true;
                const response = NextResponse.redirect(new URL("/", request.url));
                response.cookies.delete("accessToken");
                return response;
            }
            console.error("JWT verify error:", err);
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    const decoded = parseJwt(token ?? "");
    const now = Math.floor(Date.now() / 1000);

    // 👉 còn hạn → đi tiếp
    if (decoded?.exp && decoded.exp - now > 60) {
        return NextResponse.next();
    }

    // 🔥 hết hạn → refresh
    try {
        const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });
        console.log("Token còn 1 phút");
        if (!refreshRes.ok) {
            return NextResponse.next();
        }
        // 🔥 sắp hết hạn → refresh
        try {
            const refreshRes = await fetch(`${API_BASE || API_BASE_L}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!refreshRes.ok) {
                return NextResponse.next();
            }

            const data = await refreshRes.json();

            const res = NextResponse.next();

            res.cookies.set("accessToken", data.accessToken, {
                httpOnly: true,
                path: "/",
            });

            res.cookies.set("refreshToken", data.refreshToken, {
                httpOnly: true,
                path: "/",
            });

            return res;
        } catch (err) {
            console.error("Refresh token error:", err);
            return NextResponse.next();
        }
        // return NextResponse.next();
    }
export const config = {
        matcher: [
            // "/",
            "/admin/:path*",
            "/admin",
            "/product-editor-client",
            "/api/products/:path*",
            // "/home",
            // "/login",
            // "/register",
            // "/product/:path*",
            // "/:slug.html", // match product detail dạng slug.html
        ],
    };