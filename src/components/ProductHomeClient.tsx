// src/components/ProductHomeClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { normalizeImage } from "@/lib/api";
import { altImage } from "@/lib/slugify";
import Pagination from "./Pagination";

export default function ProductsHomeClient({
    products,
    total,
    currentPage,
    limit,
}: {
    products: any[];
    total: number;
    currentPage: number;
    limit: number;
}) {
    const totalPages = Math.ceil(total / limit);

    return (
        <>
            {/* {loading && <div>Đang tải...</div>} */}
            <div className="suggestion-grid">
                {products.map((p) => (
                    <div key={p.id} className="suggestion-card" suppressHydrationWarning>
                        <Link href={`/${p.slugP}`} className="product-link">
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
                                    // ✅ tách alt ra biến riêng, đảm bảo luôn là string thuần
                                    const altText = altImage(p.productName)
                                        ? String(p.productName)
                                        : String(p.slugP ?? "product");

                                    return isVideo ? (
                                        <video src={normalizeImage(src)} controls width={100} height={90} />
                                    ) : (
                                        <Image
                                            src={normalizeImage(src)}
                                            alt={altText}
                                            width={100}
                                            height={90}
                                            // ✅ key = src để React biết đây là ảnh khác nhau giữa các sản phẩm
                                            key={src}
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
            </div>
            {/* ✅ Dùng Pagination component */}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
    );
}