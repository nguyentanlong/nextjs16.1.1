// src/components/PopularCategory.tsx
"use client";

import { useState, useRef } from "react";
import { Category, normalizeImage } from "@/lib/api";
import Link from "next/link";
import AppImage from "./ImageCatagory";
import { slugifyCategory } from "@/lib/slugify";

// shop-item: flex: 0 0 160px + gap: 20px = 180px
const ITEM_WIDTH = 180;

export default function PopularCategory({ categories }: { categories: Category[] }) {
    const [offset, setOffset] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    if (!categories || categories.length === 0) return null;

    const getVisibleCount = () => {
        if (!trackRef.current) return 5;
        return Math.floor(trackRef.current.offsetWidth / ITEM_WIDTH);
    };

    const maxOffset = Math.max(0, categories.length - getVisibleCount());

    const scrollPrev = () => setOffset((prev) => Math.max(0, prev - 1));
    const scrollNext = () => setOffset((prev) => Math.min(maxOffset, prev + 1));

    return (
        <>
            {/* PHỐ MUA SẮM */}
            <div className="section-header">
                <h2>Phố mua sắm</h2>
                <Link href="/san-pham" className="view-all">Xem tất cả</Link>
            </div>

            <div className="shops-carousel">

                <button
                    className="carousel-prev"
                    onClick={scrollPrev}
                    aria-label="Trước"
                    style={{ opacity: offset === 0 ? 0.3 : 1 }}
                >
                    &lt;
                </button>

                {/* Wrapper clip overflow */}
                <div style={{ overflow: "hidden", flex: 1 }}>
                    <div
                        className="carousel-track"
                        ref={trackRef}
                        style={{
                            transform: `translateX(-${offset * ITEM_WIDTH}px)`,
                            transition: "transform 0.5s ease",
                        }}
                    >
                        {categories.map((sc) => (
                            <Link
                                key={sc.id}
                                href={`/${sc.slugCate || slugifyCategory(sc.categoryName)}`}
                                className="shop-item"
                            >
                                <AppImage
                                    src={normalizeImage(sc.image)}
                                    alt={sc.categoryName}
                                    width={100}
                                    height={100}
                                    className="cat-item"
                                />
                                <span className="categories-name">{sc.categoryName}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <button
                    className="carousel-next"
                    onClick={scrollNext}
                    aria-label="Tiếp"
                    style={{ opacity: offset >= maxOffset ? 0.3 : 1 }}
                >
                    &gt;
                </button>

            </div>
        </>
    );
}