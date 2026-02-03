import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // Lấy token từ cookie
    const token = request.cookies.get("accessToken")?.value;

    // Redirect "/" → "/home" 
    /*if (pathname === "/home" || pathname === "/trang-chu") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Các route public không cần token
    const publicPaths = ["/login", "/register", "/", "/product", "/:slug.html"];
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }*/

    // const token = localStorage.getItem("token");
    // Nếu đã đăng nhập mà vẫn vào /login → redirect sang /account
    console.log("👉 Middleware bắt đầu:", { token, pathname });
    if (!token && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Nếu route là /admin → kiểm tra role
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { role?: string };
            // Nếu token đã hết hạn → redirect về login 
            /*if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
                console.log("👉 Token expired");
                return NextResponse.redirect(new URL("/", request.url));
            }*/
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
                console.log("👉 Token expired");
                const response = NextResponse.redirect(new URL("/", request.url));
                response.cookies.delete("accessToken");
                return response;
            }
            console.error("JWT verify error:", err);
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
    // if (token && pathname === "/login") {
    //     return NextResponse.redirect(new URL("/admin", request.url));
    // }
    console.log("👉 Middleware check cuối:", { token, pathname });
    /*if (pathname.startsWith("/login") && (token)) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin"; // trang account của đệ
        return NextResponse.redirect(url);
    }*/
    // Các route khác (có token) → cho phép
    return NextResponse.next();
}
export const config = {
    matcher: [
        // "/",
        "/admin/:path*",
        "/admin",
        // "/home",
        // "/login",
        // "/register",
        // "/product/:path*",
        // "/:slug.html", // match product detail dạng slug.html
    ],
};