// src/components/ProductsHome.tsx
import { fetchAllProducts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { normalizeImage } from "@/lib/api";

export default async function WholeProducts() {
    const products = await fetchAllProducts();

    return (
        <div className="suggestion-grid">
            Tất cả sản phẩm
            {products.map((p: any) => (
                <div key={p.id} className="suggestion-card">
                    <Link href={`/${p.slugP}`} className="product-link">
                        {p.discountPercent && (
                            <div className="badge-percent">-50%</div>
                        )}
                        {p.media && p.media.length > 0 ? (
                            (() => {
                                const src = p.media[0];
                                const ext = src.split(".").pop()?.toLowerCase();
                                const isVideo = ["mp4", "webm", "ogg"].includes(ext || "");
                                return isVideo ? (
                                    <video
                                        src={normalizeImage(src)}
                                        controls
                                        width={100}
                                        height={90}
                                    />
                                ) : (
                                    <Image
                                        src={normalizeImage(src)}
                                        alt={String(p.productName ?? p.slugP ?? "0328732676")}
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
        </div>
    );
}