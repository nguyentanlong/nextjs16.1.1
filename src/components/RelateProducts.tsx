// src/components/RelateProducts.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { normalizeImage } from "@/lib/api";

// related-card: flex: 0 0 160px + gap: 20px = 180px (điều chỉnh nếu CSS khác)
const ITEM_WIDTH = 180;
const VISIBLE = 5;

interface RelatedProductsProps {
    products: any[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    const [index, setIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    if (!products || products.length === 0) {
        return (
            <div className="related-products">
                <h2>Sản phẩm chung danh mục</h2>
                <div>Không có sản phẩm chung danh mục</div>
            </div>
        );
    }

    const maxIndex = Math.max(0, products.length - VISIBLE);

    const handlePrev = () => setIndex((prev) => Math.max(0, prev - 1));
    const handleNext = () => setIndex((prev) => Math.min(maxIndex, prev + 1));

    return (
        <div className="related-products">
            <h2>Sản phẩm chung danh mục</h2>

            <div className="related-carousel">

                <button
                    className="carousel-prev"
                    onClick={handlePrev}
                    aria-label="Trước"
                    style={{ opacity: index === 0 ? 0.3 : 1 }}
                >
                    &lt;
                </button>

                {/* Wrapper clip */}
                <div style={{ overflow: "hidden", flex: 1 }}>
                    <div
                        className="carousel-track"
                        ref={trackRef}
                        style={{
                            transform: `translateX(-${index * ITEM_WIDTH}px)`,
                            transition: "transform 0.5s ease",
                        }}
                    >
                        {products.map((p) => {
                            const src = p.media?.[0] ?? null;
                            const ext = src?.split(".").pop()?.toLowerCase();
                            const isVideo = ["mp4", "webm", "ogg"].includes(ext || "");

                            return (
                                <Link key={p.id} href={`/${p.slugP}`}>
                                    <div className="related-card">
                                        {src ? (
                                            isVideo ? (
                                                <video
                                                    src={normalizeImage(src)}
                                                    controls
                                                    width={100}
                                                    height={100}
                                                />
                                            ) : (
                                                <Image
                                                    src={normalizeImage(src)}
                                                    alt={String(p.productName ?? p.slugP ?? "product")}
                                                    width={100}
                                                    height={100}
                                                />
                                            )
                                        ) : (
                                            <div className="placeholder" />
                                        )}
                                        <h4>{p.productName}</h4>
                                        <p className="price">
                                            {Number(p.price).toLocaleString("vi-VN")} ₫
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <button
                    className="carousel-next"
                    onClick={handleNext}
                    aria-label="Tiếp"
                    style={{ opacity: index >= maxIndex ? 0.3 : 1 }}
                >
                    &gt;
                </button>

            </div>

            {/* ✅ Đổi span → Link */}
            <div style={{ display: "flex", justifyContent: "end", paddingTop: 15 }}>
                <Link href="/tat-ca-san-pham" style={{ color: "orange" }}>
                    Xem Tất cả
                </Link>
            </div>
        </div>
    );
}