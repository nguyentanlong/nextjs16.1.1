// src/app/admin/layout.tsx
// "use client";


import Script from "next/script";

export default function Sidebar({ children }: { children: React.ReactNode }) {

    return (<>
        <html lang="vi">
            <body className="g-sidenav-show  bg-gray-100">
                <main>{children}</main>
                <Script src="./material-dashdoard.min.js" />
                <Script src="./perfect-scrollbar.min.js" />
            </body>
        </html>
    </>
    );
}
