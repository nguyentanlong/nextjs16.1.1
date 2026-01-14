// src/components/Header.tsx
'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';

// import useSWR from 'swr';
// import { swrFetcher } from '@/lib/api';

// Kiểu dữ liệu cho menu
interface NavItem {
    id: string | number;
    label: string;
    href: string;
}

// Dữ liệu giả để hiển thị menu
const mockMenu: NavItem[] = [
    { id: 1, label: 'Trang chủ', href: '/' },
    { id: 2, label: 'Sản phẩm', href: '/products' },
    { id: 3, label: 'Khuyến mãi', href: '/deals' },
];

// Dữ liệu giả cho danh mục
const mockCategories = [
    { id: 1, name: 'Laptop & PC', href: '/category/laptop' },
    { id: 2, name: 'Mobile & Tablet', href: '/category/mobile' },
    { id: 3, name: 'Accessories', href: '/category/accessories' },
];

export default function Header() {
    // Dữ liệu động từ API (đệ bật lại sau)
    // const { data: menuData, error, isLoading } = useSWR<NavItem[]>('/navigation', swrFetcher);
    // const { data: categoryData } = useSWR('/categories', swrFetcher);

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
                                <a href="#">Tiếng Việt</a>
                                <a href="#">English</a>
                            </div>
                        </div>
                        {/* Dropdown tài khoản */}
                        <div className="dropdown" id="account-dropdown">
                            <button className="dropbtn">
                                Tài khoản của bạn <span className="arrow">v</span>
                            </button>
                            <div className="dropdown-menu">
                                <a href="#">Đăng nhập</a>
                                <a href="#">Đăng ký miễn phí</a>
                                <hr />
                                <a href="#">Đơn hàng của tôi</a>
                                <a href="#">Đổi mật khẩu</a>
                                <a href="#">Đăng xuất</a>
                            </div>
                        </div>
                    </div>
                    {/* Bên phải */}
                    <div className="topbar-right">
                        <a href="product-detail.html" className="highlight">
                            Mã giảm giá
                        </a>
                        <a href="#">Hướng dẫn</a>
                        <a href="tel:0328732676" className="hotline">
                            Hotline: 0328.73.2676
                        </a>
                    </div>
                </div>
            </div>
            {/* MAIN HEADER MỚI */}
            <header className="main-header">
                <div className="container">
                    {/* Logo */}
                    <a href="#" className="logo">
                        <img
                            src="https://pantravel.vn/wp-content/uploads/2024/07/cuc-quang-hien-tuong-dep-nhat-cua-tu-nhien-1536x864.jpg"
                            alt="Muamau"
                            height={44}
                        />
                        {/* Nếu không có ảnh thì dùng text */}
                        {/*<span class="logo-m">M</span>ua nhiều thứ */}
                    </a>
                    {/* Categories Dropdown */}
                    <div className="category-dropdown" id="category-dropdown">
                        <button className="category-btn">
                            Danh mục sản phẩm <span className="arrow">v</span>
                        </button>
                        <div className="category-menu">
                            <a href="product-detail.html">Điện thoại &amp; Phụ kiện</a>
                            <a href="#">Laptop - Máy tính</a>
                            <a href="product-detail.html">Đồ gia dụng</a>
                            <a href="#">Thời trang nữ</a>
                            <a href="#">Thời trang nam</a>
                            <a href="#">Mẹ &amp; Bé</a>
                            <a href="#">Sức khỏe - Làm đẹp</a>
                            <a href="#">Thể thao - Dã ngoại</a>
                            <a href="#">Xem tất cả Danh mục Right Arrow</a>
                        </div>
                    </div>
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
