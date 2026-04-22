"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProductsBySubCategory, normalizeImage } from "@/lib/api";
import Link from "next/link";

export default function ProductsBySubCategoryClient({
    initialProducts,
    total,
    slug,
}: {
    initialProducts: any[];
    total: number;
    slug: string;
}) {
    const [products, setProducts] = useState(initialProducts);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const limit = 10;
    const totalPages = Math.ceil(total / limit);

    // 👉 fetch khi đổi page
    useEffect(() => {
        if (page === 1) {
            setProducts(initialProducts);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            const res = await fetchProductsBySubCategory(slug, page, limit);
            setProducts(res.data);
            setLoading(false);
        };

        fetchData();
    }, [page, slug]);

    return (
        <>
            {loading && <div>Đang tải...</div>}
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
            <div className="phan-trang">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Sau
                </button>

                <span>
                    {page} / {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Tiếp
                </button>
            </div>
        </>
    );
}