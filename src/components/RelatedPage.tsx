"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugifyProduct } from "@/lib/slugify";
import { normalizeImage, Product } from "@/lib/api";

/*interface Product {
    id: string;
    productName: string;
    price: number;
    media: string[];
    stock: number;
    subCategoryId: number;
}*/

interface RelatedProductsProps {
    subCategoryId: number;
    products: Product[];
}

export default function RelatedPage({ subCategoryId, products }: RelatedProductsProps) {
    if (!products || products.length === 0) {
        return <div>Chưa có sản phẩm nào</div>;
    }
    return (
        <>
            {/* ==================== CÓ THỂ BẠN THÍCH – GRID THẬT SỰ ==================== */}
            <Suspense fallback={<div>Loading products...</div>}>
                <section className="suggestion-section">
                    <div className="container">

                        {/* GRID 5 CỘT (desktop) */}
                        <div className="suggestion-grid">
                            {/* Sản phẩm 1 */}
                            {products.map((p) => (
                                <div key={p.id} className="suggestion-card">
                                    <Link href={`/${slugifyProduct(p.productName)}`} className="product-link">
                                        {p.discountPercent && (
                                            <div className="badge-percent">
                                                -50%-{/*p.discountPercent*/}%
                                            </div>
                                        )}

                                        {p.media && p.media.length > 0 ? (
                                            (() => {
                                                const src = p.media[0];
                                                const ext = src.split(".").pop()?.toLowerCase();
                                                const isVideo = ["mp4", "webm", "ogg"].includes(ext || "");

                                                return isVideo ? (
                                                    <video src={normalizeImage(src)} controls width={100} height={90} />
                                                ) : (
                                                    <Image
                                                        src={normalizeImage(src)}
                                                        alt={p.productName}
                                                        width={100}
                                                        height={90}
                                                    />
                                                );
                                            })()
                                        ) : (
                                            <div className="placeholder" />
                                        )}

                                        <div className="badges">
                                            <span className="badge-discount">Discount Extra</span>
                                            <span className="badge-official">Official Sale</span>
                                        </div>
                                        <h3>{p.productName}</h3>
                                        <div className="price">
                                            <span className="price-new">
                                                {Number(p.price).toLocaleString("vi-VN")} ₫
                                            </span>
                                            <span className="sold">{p.stock} sản phẩm</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {/* Copy thêm 18 cái nữa (tổng 20 sp cho đẹp) */}
                            {/* Sư phụ làm sẵn 18 cái dưới đây rồi, đệ chỉ cần dán vào */}
                        </div>

                        {/* <Link href={'/login'}>Test Login</Link> */}
                    </div>
                </section>
            </Suspense>
        </>

    )
}
