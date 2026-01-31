// src/components/ProductGrid.tsx
import Link from 'next/link';

interface Product {
    id: string;
    productName: string;
    shortDescription: string;
    description: string;
    media: string[];
    price: string;
    stock: number;
    // nếu API có thêm trường discountPercent thì mình dùng, còn không thì bỏ qua
    discountPercent?: number;
    subCategoryId: number;
}

export default function ProductGrid({ products }: { products: Product[] }) {
    if (!products || products.length === 0) {
        return <div>Chưa có sản phẩm nào</div>;
    }

    return (
        <section aria-label="Danh sách sản phẩm" className="product-grid">
            <div className="grid">
                {products.map((p) => (
                    <div key={p.id} className="suggestion-card">
                        <Link href={`/product/${p.id}`} className="product-link">
                            {/* Badge phần trăm giảm giá nếu có */}
                            {p.discountPercent && (
                                <div className="badge-percent">-{p.discountPercent}%</div>
                            )}

                            {/* Hình ảnh sản phẩm */}
                            {p.media && p.media.length > 0 ? (
                                <img src={p.media[0]} alt={p.productName} />
                            ) : (
                                <div className="placeholder" />
                            )}

                            {/* Badges cố định (đệ có thể thay đổi sau) */}
                            <div className="badges">
                                <span className="badge-discount">Discount Extra</span>
                                <span className="badge-official">Official Sale</span>
                            </div>

                            {/* Tên sản phẩm */}
                            <h3>{p.productName}</h3>

                            {/* Giá và số lượng tồn kho */}
                            <div className="price">
                                <span className="price-new">
                                    {Number(p.price).toLocaleString('vi-VN')} ₫
                                </span>
                                <span className="sold">Còn {p.stock} sản phẩm</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
