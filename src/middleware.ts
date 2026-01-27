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

    // ✅ Redirect từ "/" sang "/home"
    // if (pathname === "/") {
    //     return NextResponse.redirect(new URL("/home", request.url));
    // }

    // ✅ Các route không cần xác thực
    const publicPaths = ["/login", "/register", "/", "/product", "/[slug]"];
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // ✅ Kiểm tra token
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // ✅ Bảo vệ route /admin và các trang con
    if (pathname.startsWith("/admin")) {
        try {
            // const decoded = jwt.decode(token) as { role?: string };
            //an toàn hơn
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role?: string };

            if (decoded?.role === "admin" || decoded?.role === "staff") {
                return NextResponse.next(); // Cho phép truy cập
            } else {
                return NextResponse.redirect(new URL("/403", request.url)); // Không đủ quyền
            }
        } catch (err) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // ✅ Các route còn lại (có token) → cho phép
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/admin/:path*", "/", "/login", "/register", "/product/:path*", "/[slug]/:path*"],
};
