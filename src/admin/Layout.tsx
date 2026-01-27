// src/app/admin/layout.tsx
// "use client";

import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
    const { user } = useAuth();

    const isAdminOrStaff = user?.role === "admin" || user?.role === "staff";

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
                        src="../assets/img/logo-ct-dark.png"
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
                            <span className="nav-link-text ms-1">{isAdminOrStaff ? "Danh mục" : "Lượt comment"}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="../pages/billing.html">
                            <i className="material-symbols-rounded opacity-5">receipt_long</i>
                            <span className="nav-link-text ms-1">{isAdminOrStaff ? "Danh mục con" : "Lượt like"}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link text-dark"
                            href="../pages/virtual-reality.html"
                        >
                            <i className="material-symbols-rounded opacity-5">view_in_ar</i>
                            {isAdminOrStaff && <span className="nav-link-text ms-1">Sản phẩm</span>}
                        </a>
                    </li>
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
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="../pages/sign-in.html">
                            <i className="material-symbols-rounded opacity-5">login</i>
                            {isAdminOrStaff && (<span className="nav-link-text ms-1">Nhân viên</span>)}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="../pages/sign-up.html">
                            <i className="material-symbols-rounded opacity-5">assignment</i>
                            {isAdminOrStaff && (<span className="nav-link-text ms-1">Thêm nhân viên</span>)}
                        </a>
                    </li>
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
                        Hỗ trợ khẩn cấp:{" "}
                        {isAdminOrStaff ? "038 73 2676" : "038 542 9989"}
                    </a>
                </div>
            </div>
        </aside>
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            {/* Navbar */}
            <nav
                className="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl"
                id="navbarBlur"
                data-scroll="true"
            >
                <div className="container-fluid py-1 px-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                            <li className="breadcrumb-item text-sm">
                                <a className="opacity-5 text-dark" href="javascript:;">
                                    Pages
                                </a>
                            </li>
                            <li
                                className="breadcrumb-item text-sm text-dark active"
                                aria-current="page"
                            >
                                Trang
                            </li>
                        </ol>
                    </nav>
                    <div
                        className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                        id="navbar"
                    >
                        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                            <div className="input-group input-group-outline">
                                <label className="form-label">Tìm kiếm ...</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                            <a
                                href="javascript:;"
                                className="nav-link text-body p-0"
                                id="iconNavbarSidenav"
                            >
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line" />
                                    <i className="sidenav-toggler-line" />
                                    <i className="sidenav-toggler-line" />
                                </div>
                            </a>
                        </li>
                        <li className="nav-item px-3 d-flex align-items-center">
                            <a href="javascript:;" className="nav-link text-body p-0">
                                <i className="material-symbols-rounded fixed-plugin-button-nav">
                                    settings
                                </i>
                            </a>
                        </li>
                        <li className="nav-item dropdown pe-3 d-flex align-items-center">
                            <a
                                href="javascript:;"
                                className="nav-link text-body p-0"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="material-symbols-rounded">notifications</i>
                            </a>
                            <ul
                                className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <li className="mb-2">
                                    <a
                                        className="dropdown-item border-radius-md"
                                        href="javascript:;"
                                    >
                                        <div className="d-flex py-1">
                                            <div className="my-auto">
                                                <img
                                                    src="../assets/img/team-2.jpg"
                                                    className="avatar avatar-sm  me-3 "
                                                />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="text-sm font-weight-normal mb-1">
                                                    <span className="font-weight-bold">New message</span>{" "}
                                                    from Laur
                                                </h6>
                                                <p className="text-xs text-secondary mb-0">
                                                    <i className="fa fa-clock me-1" />
                                                    13 minutes ago
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        className="dropdown-item border-radius-md"
                                        href="javascript:;"
                                    >
                                        <div className="d-flex py-1">
                                            <div className="my-auto">
                                                <img
                                                    src="../assets/img/small-logos/logo-spotify.svg"
                                                    className="avatar avatar-sm bg-gradient-dark  me-3 "
                                                />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="text-sm font-weight-normal mb-1">
                                                    <span className="font-weight-bold">New album</span> by
                                                    Travis Scott
                                                </h6>
                                                <p className="text-xs text-secondary mb-0">
                                                    <i className="fa fa-clock me-1" />1 day
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item border-radius-md"
                                        href="javascript:;"
                                    >
                                        <div className="d-flex py-1">
                                            <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                                                <svg
                                                    width="12px"
                                                    height="12px"
                                                    viewBox="0 0 43 36"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                >
                                                    <title>credit-card</title>
                                                    <g
                                                        stroke="none"
                                                        strokeWidth={1}
                                                        fill="none"
                                                        fillRule="evenodd"
                                                    >
                                                        <g
                                                            transform="translate(-2169.000000, -745.000000)"
                                                            fill="#FFFFFF"
                                                            fillRule="nonzero"
                                                        >
                                                            <g transform="translate(1716.000000, 291.000000)">
                                                                <g transform="translate(453.000000, 454.000000)">
                                                                    <path
                                                                        className="color-background"
                                                                        d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                                                        opacity="0.593633743"
                                                                    />
                                                                    <path
                                                                        className="color-background"
                                                                        d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                                                    ></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="text-sm font-weight-normal mb-1">
                                                    Payment successfully completed
                                                </h6>
                                                <p className="text-xs text-secondary mb-0">
                                                    <i className="fa fa-clock me-1" />2 days
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a
                                href="../pages/sign-in.html"
                                className="nav-link text-body font-weight-bold px-0"
                            >
                                <i className="material-symbols-rounded">account_circle</i>
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
            {/* End Navbar */}
            {/*   Core JS Files   */}
        </main>
    </>
    );
}
