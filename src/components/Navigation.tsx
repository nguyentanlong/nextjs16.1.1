'use client';
import { SubCategory } from '@/styles/types';
import Link from 'next/link';
export default function Navigation({ subCategories }: { subCategories: SubCategory[] }) {

    return (
        <div className="category-dropdown" id="category-dropdown">
            <button className="category-btn">
                Danh Mục<span className="arrow">v</span>
            </button>
            <div className="category-menu">
                {subCategories.map((sc) => (
                    <Link key={sc.id} href={`/danh-muc/${sc.slugSub}`}>{/*-${sc.id}.html*/}
                        {sc.categoryName}
                    </Link>
                ))}
            </div>
        </div>
    );
}