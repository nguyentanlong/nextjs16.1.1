// src/app/admin/layout.tsx
// "use client";


// import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import './font-css.css';
import './material-dashboard.css';
import './nucleo-icons.css';
import './nucleo-svg.css';

export default function AdminPage({ children }: { children: React.ReactNode }) {

    return (
        // <AuthProvider>
        <>
            <div className="g-sidenav-show bg-gray-100" style={{ minHeight: '100vh' }}>

                {/* Khung 1 - Sidebar (position: fixed, width: 250px) */}
                <AdminSidebar />

                {/* Khung 2 - Toàn bộ phần bên phải: Header + nội dung */}
                {/* main-content là class của material-dashboard, tự có margin-left: 250px */}
                <div className="main-content position-relative h-100 border-radius-lg"
                    style={{ minHeight: '100vh' }}
                >
                    <AdminHeader />
                    <main className="container-fluid py-4">
                        {children}
                    </main>
                </div>

            </div>

            <Script src="./material-dashdoard.min.js" />
            <Script src="./perfect-scrollbar.min.js" />
        </>
        // </AuthProvider>
    );
}
