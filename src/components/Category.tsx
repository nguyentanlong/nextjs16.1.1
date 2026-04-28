// src/components/Category.tsx
"use client";

import { useRef, useState } from "react";
import { SubCategory, normalizeImage } from "@/lib/api";
import Link from "next/link";
import AppImage from "./ImageCatagory";
import { slugifyCategory } from "@/lib/slugify";

const ITEM_WIDTH = 130; // width của 1 cat-item + gap (110px + 20px gap)

export default function Category({ subCategories }: { subCategories: SubCategory[] }) {
    const [offset, setOffset] = useState(0); // số item đã dịch chuyển
    const trackRef = useRef<HTMLDivElement>(null);

    if (!subCategories || subCategories.length === 0) {
        return <div>Chưa có Danh Mục</div>;
    }

    // Tính số item hiển thị được trong viewport
    const getVisibleCount = () => {
        if (!trackRef.current) return 5;
        return Math.floor(trackRef.current.offsetWidth / ITEM_WIDTH);
    };

    const maxOffset = Math.max(0, subCategories.length - getVisibleCount());

    const scrollPrev = () => {
        setOffset((prev) => Math.max(0, prev - 1));
    };

    const scrollNext = () => {
        setOffset((prev) => Math.min(maxOffset, prev + 1));
    };

    return (
        <section className="categories-section">
            <div className="container">
                <h2>Danh mục</h2>
                <div className="categories-carousel">

                    <button
                        className="carousel-prev"
                        onClick={scrollPrev}
                        aria-label="Danh mục trước"
                        style={{ opacity: offset === 0 ? 0.3 : 1 }}
                    >
                        &lt;
                    </button>

                    {/* Wrapper để clip overflow */}
                    <div style={{ overflow: "hidden", flex: 1 }}>
                        <div
                            className="carousel-track"
                            ref={trackRef}
                            style={{
                                // ✅ Dùng đúng transform như CSS cũ đang kỳ vọng
                                transform: `translateX(-${offset * ITEM_WIDTH}px)`,
                                transition: "transform 0.5s ease",
                            }}
                        >
                            {subCategories.map((sc) => (
                                <Link
                                    key={sc.id}
                                    href={`/danh-muc/${sc.slugSub || slugifyCategory(sc.categoryName)}`}
                                >
                                    <AppImage
                                        src={normalizeImage(sc.image)}
                                        alt={sc.categoryName}
                                        width={100}
                                        height={100}
                                        className="cat-item"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <button
                        className="carousel-next"
                        onClick={scrollNext}
                        aria-label="Danh mục tiếp"
                        style={{ opacity: offset >= maxOffset ? 0.3 : 1 }}
                    >
                        &gt;
                    </button>

                </div>
            </div>
        </section>
    );
}