// src/components/Header.tsx
'use client';

import Link from 'next/link';
import Navigation from './Navigation';

export default function Header() {
    return (
        <>
            {/* topbar */}
            <div className="topbar">
                <div className="topbar-container">
                    {/* Bên trái: 2 dropdown */}
                    <div className="topbar-left">
                        {/* Dropdown ngôn ngữ */}
                        <div className="dropdown" id="lang-dropdown">
                            <button className="dropbtn">
                                Tiếng Việt <span className="arrow">v</span>
                            </button>
                            <div className="dropdown-menu">
                                <Link href="#">Tiếng Việt</Link>
                                <Link href="#">English</Link>
                            </div>
                        </div>
                        {/* Dropdown tài khoản */}
                        <div className="dropdown" id="account-dropdown">
                            <button className="dropbtn">
                                Tài khoản của bạn <span className="arrow">v</span>
                            </button>
                            <div className="dropdown-menu">
                                <Link href="/login">Đăng nhập</Link>
                                <hr />
                                <Link href="/register">Đăng ký miễn phí</Link>
                                <hr />
                                {/* <Link href="#">Đơn hàng của tôi</Link>
                                <Link href="#">Đổi mật khẩu</Link>
                                <Link href="#">Đăng xuất</Link> */}
                            </div>
                        </div>
                    </div>
                    {/* Bên phải */}
                    <div className="topbar-right">
                        <Link href="/product-detail" className="highlight">
                            Mã giảm giá
                        </Link>
                        <Link href="/guide">Hướng dẫn</Link>
                        {/* tel giữ nguyên a */}
                        <a href="tel:0328732676" className="hotline">
                            Hotline: 0328.73.2676
                        </a>
                    </div>
                </div>
            </div>

            {/* MAIN HEADER */}
            <header className="main-header">
                <div className="container">
                    {/* Logo */}
                    <Link href="/" className="logo">
                        <img
                            src="https://pantravel.vn/wp-content/uploads/2024/07/cuc-quang-hien-tuong-dep-nhat-cua-tu-nhien-1536x864.jpg"
                            alt="Muamau"
                            height={44}
                        />
                    </Link>

                    {/* Navigation tách riêng */}
                    <Navigation />

                    {/* Search Form */}
                    <form className="search-form" role="search">
                        <div className="search-wrapper">
                            <input
                                type="text"
                                placeholder="Nhập từ khóa cần tìm"
                                aria-label="Tìm kiếm sản phẩm"
                            />
                            <button type="submit">Tìm</button>
                        </div>
                    </form>
                </div>
            </header>
        </>
    );
}
