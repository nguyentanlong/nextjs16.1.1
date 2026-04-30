"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
/*import '../app/admin/font-css.css';
import '../app/admin/material-dashboard.css';
import '../app/admin/nucleo-icons.css';
import '../app/admin/nucleo-svg.css';*/
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useContext } from "react";

export default function AdminSidebar() {
    const { user, loading } = useAuth();
    const pathname = usePathname()
    const navClass = (href: string) =>
        `nav-link ${pathname === href ? "active bg-gradient-dark text-white" : "text-dark"}`;
    // console.log("SIDEBAR USER:", user);
    if (loading) {
        return (
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2  bg-white my-2">
                <div>Đang tải thông tin người dùng...</div>
            </aside>);
    }
    // Nếu không có user (chưa login), có thể ẩn sidebar hoặc báo lỗi 
    if (!user) {
        return (
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2  bg-white my-2">
                <div>Bạn chưa đăng nhập</div>
            </aside>);
    }
    const isAdmin = user?.role === "admin";
    const isStaff = user?.role === "staff";
    const isAdminOrStaff = isAdmin || isStaff;


    const linkHref = isAdminOrStaff ? "/admin/addProduct" : "/admin/comments";
    const linkText = isAdminOrStaff ? "Danh mục" : "Lượt comment";

    return (
        <>
            <aside
                className="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 bg-white my-2"
                id="sidenav-main"
            >
                <div className="sidenav-header">
                    <i
                        className="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                        aria-hidden="true"
                        id="iconSidenav"
                    />
                    {/* Link logo giữ nguyên trỏ ra ngoài */}

                    <Link
                        className="navbar-brand px-4 py-3 m-0"
                        href="/"
                        target="_blank"
                    >
                        <Image
                            src="/logo-manh-phat-van-ban.png"
                            alt="Tấn Long"
                            width={100}
                            height={32}
                            style={{ width: "100%", height: "auto" }}
                            className="navbar-brand-img"
                        />
                        <span className="ms-1 text-sm text-dark">Tấn Long</span>
                    </Link>
                </div>

                <hr className="horizontal dark mt-0 mb-2" />

                <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link className={navClass("/admin")} href="/admin">
                                <i className="material-symbols-rounded opacity-5">dashboard</i>
                                <span className="nav-link-text ms-1">Quản trị</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className={navClass(linkHref)} href={linkHref}>
                                <i className="material-symbols-rounded opacity-5">table_view</i>
                                <span className="nav-link-text ms-1">{linkText}</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={navClass(isAdminOrStaff ? "/admin/addProduct" : "/admin/likes")}
                                href={isAdminOrStaff ? "/admin/addProduct" : "/admin/likes"}
                            >
                                <i className="material-symbols-rounded opacity-5">receipt_long</i>
                                <span className="nav-link-text ms-1">
                                    {isAdminOrStaff ? "Thêm sản phẩm" : "Lượt like"}
                                </span>
                            </Link>
                        </li>

                        {isAdminOrStaff && (
                            <li className="nav-item">
                                <Link className={navClass("/admin/san-pham")} href="/admin/san-pham">
                                    <i className="material-symbols-rounded opacity-5">view_in_ar</i>
                                    <span className="nav-link-text ms-1">Sản phẩm</span>
                                </Link>
                            </li>
                        )}

                        <li className="nav-item mt-3">
                            <h6 className="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-5">
                                Hệ thống
                            </h6>
                        </li>

                        <li className="nav-item">
                            <Link className={navClass("/admin/profile")} href="/admin/profile">
                                <i className="material-symbols-rounded opacity-5">person</i>
                                <span className="nav-link-text ms-1">Profile</span>
                            </Link>
                        </li>

                        {isAdmin && (
                            <li className="nav-item">
                                <Link className={navClass("/admin/nhan-vien")} href="/admin/nhan-vien">
                                    <i className="material-symbols-rounded opacity-5">login</i>
                                    <span className="nav-link-text ms-1">Nhân viên</span>
                                </Link>
                            </li>
                        )}

                        {isAdmin && (
                            <li className="nav-item">
                                <Link className={navClass("/admin/them-nhan-vien")} href="/admin/them-nhan-vien">
                                    <i className="material-symbols-rounded opacity-5">assignment</i>
                                    <span className="nav-link-text ms-1">Thêm nhân viên</span>
                                </Link>
                            </li>
                        )}

                    </ul>
                </div>

                <div className="sidenav-footer position-absolute w-100 bottom-0">
                    <div className="mx-3">
                        {/* 2 link này trỏ ra ngoài nên giữ <a> */}
                        <Link
                            className="btn btn-outline-dark mt-4 w-100"
                            href="/"
                            type="button"
                        >
                            Tài liệu
                        </Link>
                        <Link
                            className="btn bg-gradient-dark w-100"
                            href="tel:+84328732676"
                            type="button"
                        >
                            Hỗ trợ:{" "}
                            {(isAdminOrStaff) ? "0328 73 2676" : "038 542 9989"}
                        </Link>
                    </div>
                </div>

            </aside>
        </>
    );
}