import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// 👉 decode JWT (không cần thư viện)
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
    // refresh nhưng phải gọi API profile
    /*try {
        // 👉 test accessToken
        const res = await fetch(`${API_BASE}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            return NextResponse.next(); // ✅ token còn sống
        }

        // 🔥 nếu 401 → refresh
        if (res.status === 401) {
            const refreshRes = await fetch(`${API_BASE || API_BASE_L}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
                credentials: "include",
            });

            if (!refreshRes.ok) {
                return NextResponse.next(); // ❌ refresh fail
            }

            const data = await refreshRes.json();

            const response = NextResponse.next();

            // 🔥 set lại cookie
            response.cookies.set("accessToken", data.accessToken, {
                httpOnly: true,
                secure: false,//process.env.NODE_ENV === 'production',//https: true
                sameSite: 'lax',//'none',//https: none
                path: '/',
                maxAge: 60 * 15,
            });

            response.cookies.set("refreshToken", data.refreshToken, {
                httpOnly: true,
                secure: false,//process.env.NODE_ENV === 'production',//https: true
                sameSite: 'lax',//'none',//https: none
                path: '/',
                maxAge: 60 * 15,
            });

            return response;
        }

        return NextResponse.next();
    } catch (err) {
        console.error("Middleware error:", err);
        return NextResponse.next();
    }*/


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