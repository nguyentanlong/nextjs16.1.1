// src/app/admin/layout.tsx
import React from "react";

function AdminHeader() {
    return (
        <header className="admin-header">
            <h1>Quản trị hệ thống</h1>
            <div className="admin-tools">
                <input type="text" placeholder="Tìm kiếm ..." />
                <nav>
                    <a href="#">settings</a>
                    <a href="#">notifications</a>
                    <a href="#">account_circle</a>
                </nav>
            </div>
        </header>
    );
}

function AdminSidebar() {
    return (
        <aside className="admin-sidebar">
            <ul>
                <li>Danh mục</li>
                <li>Danh mục con</li>
                <li>Sản phẩm</li>
                <li>Nhân viên</li>
                <li>Thêm nhân viên</li>
                <li>Hỗ trợ khẩn cấp</li>
            </ul>
            <button className="admin-docs">Tài liệu</button>
        </aside>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="admin-wrapper">
            <AdminHeader />
            <div className="admin-body">
                <AdminSidebar />
                <main className="admin-content">{children}</main>
            </div>
        </div>
    );
}
