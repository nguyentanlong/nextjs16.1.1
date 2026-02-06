import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // Lấy token từ cookie
    const token = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    // Kiểm tra accessToken hết hạn (ví dụ decode JWT) 
    let isExpired = false;

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
    console.log("RefreshToken:   ", refreshToken)
    // console.log("👉 Request cookies in middleware:", request.cookies.getAll());

    if (!token && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Nếu route là /admin → kiểm tra role
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { role?: string };
            // Nếu token đã hết hạn → redirect về login 
            if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
                // console.log("👉 Token expired");
                // return NextResponse.redirect(new URL("/", request.url));
                isExpired = true;
            }
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