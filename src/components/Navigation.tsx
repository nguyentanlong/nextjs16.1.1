// src/components/Navigation.tsx
'use client';
import { useSubCategories } from '@/hook/useSubcategories';
import { fetchSubCategories, SubCategory } from '@/lib/api';
import { slugifyProduct } from '@/lib/slugify';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/*const categories = [
    { id: 1, name: 'Điện thoại & Phụ kiện', href: '/category/phone' },
    { id: 2, name: 'Laptop - Máy tính', href: '/category/laptop' },
    { id: 3, name: 'Đồ gia dụng', href: '/category/home' },
    { id: 4, name: 'Thời trang nữ', href: '/category/women' },
    { id: 5, name: 'Thời trang nam', href: '/category/men' },
    { id: 6, name: 'Mẹ & Bé', href: '/category/mom-baby' },
    { id: 7, name: 'Sức khỏe - Làm đẹp', href: '/category/beauty' },
    { id: 8, name: 'Thể thao - Dã ngoại', href: '/category/sport' },
    { id: 9, name: 'Xem tất cả Danh mục', href: '/categories' },
];*/

/*export default function Navigation({ SubCategory }: { SubCategory: SubCategory[] }) {
    const [subCategoriesHome, setSubCategoriesHome] = useState<SubCategory[]>([]);
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchSubCategories();
            // console.log("data trong category.tsx:  ", data);
            setSubCategoriesHome(data);
        };
        loadData();
    }, []);*/
export default function Navigation() {
    const { subCategories, loading } = useSubCategories();

    if (loading) return <div>Loading...</div>;
    return (
        <div className="category-dropdown" id="category-dropdown">
            <button className="category-btn">
                Danh Mục<span className="arrow">v</span>
            </button>
            <div className="category-menu">
                {subCategories.map((sc) => (
                    <Link key={sc.id} href={`/${slugifyProduct(sc.categoryName)}`}>
                        {sc.categoryName}
                    </Link>
                ))}
            </div>
        </div>
    );
}
