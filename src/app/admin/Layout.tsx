// src/app/admin/layout.tsx
// "use client";


import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';

export default function Sidebar({ children }: { children: React.ReactNode }) {

    return (<>
        <AuthProvider><html lang="vi">
            <body><div className="g-sidenav-show  bg-gray-100">
                <AdminSidebar />
                <AdminHeader />
                <main>{children}</main>
            </div>
                <Script src="./material-dashdoard.min.js" />
                <Script src="./perfect-scrollbar.min.js" />
            </body>
        </html></AuthProvider>

    </>
    );
}
