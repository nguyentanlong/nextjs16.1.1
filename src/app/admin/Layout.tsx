"use client"
import Script from "next/script";
import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import { useState } from "react";
/*import './font-css.css';
import './material-dashboard.css';
import './nucleo-icons.css';
import './nucleo-svg.css';*/

export default function AdminPage({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        // <AuthProvider>
        <>
            <div className="g-sidenav-show bg-gray-100" style={{ display: "flex", minHeight: '100vh' }}>

                {/* Khung 1 - Sidebar (position: fixed, width: 250px) */}
                <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Khung 2 - Toàn bộ phần bên phải: Header + nội dung */}
                {/* main-content là class của material-dashboard, tự có margin-left: 250px */}
                <div className="main-content position-relative h-100 border-radius-lg"
                    style={{ minHeight: '100vh', width: '100%' }}
                >
                    <AdminHeader onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
                    <main className="container-fluid py-4">
                        {children}
                    </main>
                </div>

            </div>

        </>
        // </AuthProvider>
    );
}
