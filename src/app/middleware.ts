/*import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
})

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}

*/
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";


// const protectedAdminRoutes = ["/admin", "/admin/users", "/admin/products"];//bảo vệ route admin....
// export function middleware(req: NextRequest) {
//     const { pathname } = req.nextUrl;

//     // Lấy token từ cookie (ví dụ authToken)
//     const token = req.cookies.get("authToken")?.value;

//     // Nếu đã đăng nhập mà vẫn vào /login → redirect sang /account
//     if (pathname.startsWith("/login") && token) {
//         const url = req.nextUrl.clone();
//         url.pathname = "/account"; // trang account của đệ
//         return NextResponse.redirect(url);
//     }

//     // Nếu chưa đăng nhập mà vào /account → redirect sang /login
//     if (pathname.startsWith("/account") && !token) {
//         const url = req.nextUrl.clone();
//         url.pathname = "/login";
//         return NextResponse.redirect(url);
//     }

//     // Các route khác cho qua
//     return NextResponse.next();
// }

// // Cấu hình matcher để middleware chỉ chạy cho các route cần
// export const config = {
//     matcher: ["/login", "/account"],
// };

// khi thêm vào bảo vệ route admin .. có thêm thư viện jwt
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    const token = ""//;request.cookies.get("accessToken")?.value;
    const { pathname } = request.nextUrl;

    console.log("👉 Middleware check:", { token, pathname });
    // Các route public không cần token
    const publicPaths = ["/login", "/register", "/", "/product", "/:slug.html"];
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Nếu chưa có token → redirect về /login
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role?: string };

        // Bảo vệ route /admin
        if (pathname.startsWith("/admin")) {
            if (decoded?.role === "admin") {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL("/403", request.url));
        }

        // Bảo vệ route /dashboard
        if (pathname.startsWith("/dashboard")) {
            if (decoded?.role === "staff" || decoded?.role === "admin") {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL("/403", request.url));
        }

        // Bảo vệ route /profile
        if (pathname.startsWith("/profile")) {
            if (decoded?.role === "user" || decoded?.role === "staff" || decoded?.role === "admin") {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL("/403", request.url));
        }

        // Các route khác cho qua
        return NextResponse.next();
    } catch (err) {
        console.error("👉 Token verify error:", err);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

/*export function middleware(request: NextRequest) {
    console.log("👉 Middleware đã chạy cho:", request.nextUrl.pathname);
    return NextResponse.redirect(new URL("/login", request.url));
}*/

export const config = {
    matcher: [
        "/",
        "/admin/:path*",
        "/admin",
        // "/home",
        "/login",
        "/register",
        "/product/:path*",
        "/:slug.html", // match product detail dạng slug.html
    ],
};
