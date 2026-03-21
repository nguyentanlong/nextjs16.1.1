import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// 👉 decode JWT (không cần thư viện)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;
const now = Math.floor(Date.now() / 1000);

function parseJwt(token: string) {
    try {
        const base64 = token.split(".")[1];
        const decodedEx = JSON.parse(atob(base64));
        return decodedEx;
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
            // 👉 còn hạn → đi tiếp
            const decodedEx = parseJwt(token ?? "");
            if (decodedEx?.exp && decodedEx.exp - now > 60) {
                return NextResponse.next();
            }
            console.log("🔄 Token sắp hết hạn → refresh");
            const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!refreshRes.ok) {
                console.log("❌ Refresh fail");
                return NextResponse.next();
            }

            const data = await refreshRes.json();
            // 🔥 update request (QUAN TRỌNG)
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set("Authorization", `Bearer ${data.accessToken}`);

            const response = NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
            console.log("accessToken -token:", token);
            response.cookies.set("accessToken", data.accessToken, {
                httpOnly: true,
                secure: false,//process.env.NODE_ENV === 'production',//https: true
                sameSite: 'lax',//'none',//https: none
                path: '/',
                maxAge: 60 * 15,
            });
            console.log("accessToken - data.accessToken:", data.accessToken);
            return response;
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

    // const decoded = parseJwt(token ?? "");

    return NextResponse.next();
}

export const config = {
    matcher: [
        // "/",
        "/admin/:path*",
        "/admin",
        "/product-editor-client",
        "/api/products/:path*",
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        // "/home",
        // "/login",
        // "/register",
        // "/product/:path*",
        // "/:slug.html", // match product detail dạng slug.html
    ],
};