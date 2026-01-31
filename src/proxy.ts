import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

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

    if (pathname.startsWith("/login") && (token)) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin"; // trang account của đệ
        return NextResponse.redirect(url);
    }

    // Nếu route là /admin → kiểm tra role
    if (token && pathname.startsWith("/admin")) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role?: string };

            if (decoded?.role === "admin" || decoded?.role === "staff" || decoded?.role === "user") {
                return NextResponse.next(); // Cho phép
            } else {
                return NextResponse.redirect(new URL("/register", request.url)); // Không đủ quyền
            }
        } catch (err) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
    console.log("👉 Middleware check cuối:", { token, pathname });
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