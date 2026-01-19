/*import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
})

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}

*/
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Lấy token từ cookie (ví dụ authToken)
    const token = req.cookies.get("authToken")?.value;

    // Nếu đã đăng nhập mà vẫn vào /login → redirect sang /account
    if (pathname.startsWith("/login") && token) {
        const url = req.nextUrl.clone();
        url.pathname = "/account"; // trang account của đệ
        return NextResponse.redirect(url);
    }

    // Nếu chưa đăng nhập mà vào /account → redirect sang /login
    if (pathname.startsWith("/account") && !token) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // Các route khác cho qua
    return NextResponse.next();
}

// Cấu hình matcher để middleware chỉ chạy cho các route cần
export const config = {
    matcher: ["/login", "/account"],
};
