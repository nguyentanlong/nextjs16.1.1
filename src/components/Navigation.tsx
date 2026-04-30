'use client';
import { SubCategory } from '@/styles/types';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
export default function Navigation({ subCategories }: { subCategories: SubCategory[] }) {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Click ra ngoài → đóng menu
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div className={`category-dropdown ${isOpen ? "active" : ""}`} id="category-dropdown" ref={dropdownRef} >
            <button className="category-btn" onClick={() => setIsOpen((prev) => !prev)}>
                Danh Mục<span className="arrow"
                // style={{
                //     display: "inline-block",
                //     transition: "transform 0.3s ease",
                //     transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                // }} className ở dưới {`category-menu ${isOpen ? "category-menu-open" : ""}`}
                >v</span>
            </button>
            <div className="category-menu">
                {subCategories.map((sc) => (
                    <Link key={sc.id} href={`/danh-muc/${sc.slugSub}`} onClick={() => setIsOpen(false)}>{/*-${sc.id}.html*/}
                        {sc.categoryName}
                    </Link>
                ))}
            </div>
        </div>
    );
}