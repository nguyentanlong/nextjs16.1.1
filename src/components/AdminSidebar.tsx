"use client";
import { useAuth } from "@/context/AuthContext";
import '../app/admin/font-css.css';
import '../app/admin/material-dashboard.css'; import '../app/admin/nucleo-icons.css'; import '../app/admin/nucleo-svg.css';

export default function AdminSidebar() {
    const { user } = useAuth();
    const isAdminOrStaff = user?.role === "admin";
    const isStaff = user?.role === "staff";
    // const isUser = user?.role === "user";
    return (<>
        <aside
            className="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2  bg-white my-2"
            id="sidenav-main"
        >
            <div className="sidenav-header">
                <i
                    className="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                    aria-hidden="true"
                    id="iconSidenav"
                />
                <a
                    className="navbar-brand px-4 py-3 m-0"
                    href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
                    target="_blank"
                >
                    <img
                        src="../favicon.icon"
                        className="navbar-brand-img"
                        width={26}
                        height={26}
                        alt="main_logo"
                    />
                    <span className="ms-1 text-sm text-dark">Tấn Long</span>
                </a>
            </div>
            <hr className="horizontal dark mt-0 mb-2" />
            <div
                className="collapse navbar-collapse  w-auto "
                id="sidenav-collapse-main"
            >
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a
                            className="nav-link active bg-gradient-dark text-white"
                            href="../pages/dashboard.html"
                        >
                            <i className="material-symbols-rounded opacity-5">dashboard</i>
                            <span className="nav-link-text ms-1">Quản trị</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="../pages/tables.html">
                            <i className="material-symbols-rounded opacity-5">table_view</i>
                            <span className="nav-link-text ms-1">{(isAdminOrStaff || isStaff) ? "Danh mục" : "Lượt comment"}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="../pages/billing.html">
                            <i className="material-symbols-rounded opacity-5">receipt_long</i>
                            <span className="nav-link-text ms-1">{(isAdminOrStaff || isStaff) ? "Danh mục con" : "Lượt like"}</span>
                        </a>
                    </li>
                    {(isAdminOrStaff || isStaff) && <li className="nav-item">
                        <a
                            className="nav-link text-dark"
                            href="../pages/virtual-reality.html"
                        >
                            <i className="material-symbols-rounded opacity-5">view_in_ar</i>
                            <span className="nav-link-text ms-1">Sản phẩm</span>
                        </a>
                    </li>}
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-5">
                            Hệ thống
                        </h6>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="../pages/profile.html">
                            <i className="material-symbols-rounded opacity-5">person</i>
                            <span className="nav-link-text ms-1">Profile</span>
                        </a>
                    </li>
                    {isAdminOrStaff && (<li className="nav-item">
                        <a className="nav-link text-dark" href="../pages/sign-in.html">
                            <i className="material-symbols-rounded opacity-5">login</i>
                            <span className="nav-link-text ms-1">Nhân viên</span>
                        </a>
                    </li>)}
                    {isAdminOrStaff && (<li className="nav-item">
                        <a className="nav-link text-dark" href="../pages/sign-up.html">
                            <i className="material-symbols-rounded opacity-5">assignment</i>
                            <span className="nav-link-text ms-1">Thêm nhân viên</span>
                        </a>
                    </li>)}
                </ul>
            </div>
            <div className="sidenav-footer position-absolute w-100 bottom-0 ">
                <div className="mx-3">
                    <a
                        className="btn btn-outline-dark mt-4 w-100"
                        href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-dashboard?ref=sidebarfree"
                        type="button"
                    >
                        Tài liệu
                    </a>
                    <a
                        className="btn bg-gradient-dark w-100"
                        href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree"
                        type="button"
                    >
                        Hỗ trợ:{" "}
                        {(isAdminOrStaff || isStaff) ? "0328 73 2676" : "038 542 9989"}
                    </a>
                </div>
            </div>
            {/* <main>{children}</main> */}
        </aside>
    </>);
}