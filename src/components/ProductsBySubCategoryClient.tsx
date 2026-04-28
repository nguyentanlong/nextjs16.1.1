"use client";

import Image from "next/image";
import { fetchProductsBySubCategory, normalizeImage } from "@/lib/api";
import Link from "next/link";
import Pagination from "./Pagination";

export default function ProductsBySubCategoryClient({
    products,
    total,
    currentPage,
    slug,
}: {
    products: any[];
    total: number;
    currentPage: number;
    slug: string;
}) {
    const limit = 10;
    const totalPages = Math.ceil(total / limit);

    if (!products || products.length === 0) {
        return <div>Không có sản phẩm nào.</div>;
    }

    return (
        <><div className="suggestion-grid">
            {/* {loading && <div>Đang tải...</div>} */}
            {products.map((p) => (
                <div key={p.id} className="suggestion-card">
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
                            <span className="badge-discount">Khuyến mãi</span>
                            <span className="badge-official">Cửa hàng</span>
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