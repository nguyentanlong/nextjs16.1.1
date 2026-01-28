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
    const { pathname } = request.nextUrl;

    // Redirect "/" → "/home" 
    if (pathname === "/home" || pathname === "/trang-chu") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Các route public không cần token
    const publicPaths = ["/login", "/register", "/", "/product", "/:slug.html"];
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Lấy token từ cookie
    const token: string = request.cookies.get("accessToken")?.value || "";
    // Nếu đã đăng nhập mà vẫn vào /login → redirect sang /account
    if (pathname.startsWith("/login") && token) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin"; // trang account của đệ
        return NextResponse.redirect(url);
    }

    // Nếu chưa đăng nhập mà vào /account → redirect sang /login
    // if (pathname.startsWith("/account") && !token) {
    //     const url = request.nextUrl.clone();
    //     url.pathname = "/login";
    //     return NextResponse.redirect(url);
    // }
    if (!token && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Nếu route là /admin → kiểm tra role
    if (pathname.startsWith("/admin")) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role?: string };

            if (decoded?.role === "admin" || decoded?.role === "staff") {
                return NextResponse.next(); // Cho phép
            } else {
                return NextResponse.redirect(new URL("/403", request.url)); // Không đủ quyền
            }
        } catch (err) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Các route khác (có token) → cho phép
    return NextResponse.next();
}

export const config = {
    matcher: [
        // "/",
        "/admin/:path*",
        // "/admin",
        // "/home",
        "/login",
        "/register",
        "/product/:path*",
        "/:slug.html", // match product detail dạng slug.html
    ],
};
