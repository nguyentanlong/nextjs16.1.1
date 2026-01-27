// src/app/admin/page.tsx
"use client";
import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
export default function AdminDashboard() {
    return (
        <><main>
            <AdminSidebar />
            <AdminHeader />
        </main>
        </>
    );
}
