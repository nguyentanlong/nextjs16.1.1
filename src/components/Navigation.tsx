// src/components/Navigation.tsx
'use client';
import Link from 'next/link';

const categories = [
    { id: 1, name: 'Điện thoại & Phụ kiện', href: '/category/phone' },
    { id: 2, name: 'Laptop - Máy tính', href: '/category/laptop' },
    { id: 3, name: 'Đồ gia dụng', href: '/category/home' },
    { id: 4, name: 'Thời trang nữ', href: '/category/women' },
    { id: 5, name: 'Thời trang nam', href: '/category/men' },
    { id: 6, name: 'Mẹ & Bé', href: '/category/mom-baby' },
    { id: 7, name: 'Sức khỏe - Làm đẹp', href: '/category/beauty' },
    { id: 8, name: 'Thể thao - Dã ngoại', href: '/category/sport' },
    { id: 9, name: 'Xem tất cả Danh mục', href: '/categories' },
];

export default function Navigation() {
    return (
        <div className="category-dropdown" id="category-dropdown">
            <button className="category-btn">
                Danh Mục Sản Phẩm<span className="arrow">v</span>
            </button>
            <div className="category-menu">
                {categories.map((cat) => (
                    <Link key={cat.id} href={cat.href}>
                        {cat.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
