// src/app/[slug]/page.tsx
import { Metadata } from "next";
import { slugifyProduct } from "@/lib/slugify";
import Link from "next/link";

interface Product {
    id: string;
    productName: string;
    shortDescription: string;
    description: string;
    media: string[];
    price: string;
    stock: number;
}

async function getProducts(): Promise<Product[]> {
    const res = await fetch("https://api.tonkliplock1000.com", {
        next: { revalidate: 3600 }, // cache 1h để build nhanh và tốt SEO
    });
    const json = await res.json();
    return json.data;
}

async function getProductBySlug(slug: string): Promise<Product | null> {
    const products = await getProducts();
    return products.find((p) => slugifyProduct(p.productName) === slug) || null;
}

// ✅ Fix: params là Promise, cần await
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) return { title: "Sản phẩm không tồn tại" };
    return {
        title: product.productName,
        description: product.shortDescription,
    };
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) return <div>Không tìm thấy sản phẩm</div>;

    return (
        <section className="product-detail">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link href="/">Trang chủ</Link> &gt; <Link href="#">Danh mục</Link> &gt;{" "}
                    <span>{product.productName}</span>
                </div>

                <div className="product-grid">
                    {/* Cột trái: Hình ảnh */}
                    <div className="product-images">
                        <div className="main-image">
                            <img src={product.media[0]} alt={product.productName} id="main-img" />
                        </div>
                        <div className="thumbnail-list">
                            {product.media.slice(1).map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${product.productName} thumbnail ${i}`}
                                    className={`thumb ${i === 0 ? "active" : ""}`}
                                    data-img={img}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Cột phải: Thông tin */}
                    <div className="product-info">
                        <h1>{product.productName}</h1>
                        <div className="product-meta">
                            <span className="brand">
                                Thương hiệu: <strong>EZVIZ</strong>
                            </span>
                            <span className="sku">Mã SP: {product.id}</span>
                        </div>
                        <div className="price-box">
                            <span className="price">
                                {Number(product.price).toLocaleString("vi-VN")} ₫
                            </span>
                            <span className="old-price">
                                {Number(product.price).toLocaleString("vi-VN")} ₫
                            </span>
                            <span className="discount">-20%</span>
                        </div>
                        <div className="short-desc">
                            <p>{product.shortDescription}</p>
                        </div>
                        <div className="actions">
                            <button className="btn-buy">Mua ngay</button>
                            <button className="btn-cart">Thêm vào giỏ hàng</button>
                        </div>
                        <div className="support">
                            <p>
                                Hotline tư vấn: <strong>0934 181 151</strong>
                            </p>
                            <p>Giao hàng miễn phí nội thành HCM</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="product-tabs">
                    <div className="tab-buttons">
                        <button className="tab-btn active" data-tab="desc">
                            Nội dung chi tiết
                        </button>
                        <button className="tab-btn" data-tab="video">
                            Video hướng dẫn
                        </button>
                        <button className="tab-btn" data-tab="guide">
                            Hướng dẫn lắp đặt
                        </button>
                    </div>
                    <div className="tab-content">
                        <div id="desc" className="tab-pane active">
                            <p>{product.description}</p>
                        </div>
                        <div id="video" className="tab-pane">
                            <iframe
                                width="100%"
                                height={500}
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                frameBorder={0}
                                allowFullScreen
                            />
                        </div>
                        <div id="guide" className="tab-pane">
                            <h3>Hướng dẫn lắp đặt nhanh</h3>
                            <img
                                src="https://i.imgur.com/ezviz-install.jpg"
                                alt="Hướng dẫn lắp đặt"
                                style={{ width: "100%", borderRadius: 12 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Sản phẩm liên quan */}
                <div className="related-products">
                    <h2>Sản phẩm cùng danh mục</h2>
                    <div className="related-carousel">
                        <div className="carousel-track" id="related-track">
                            {product.media.map((img, i) => (
                                <div key={i} className="related-card">
                                    <img src={img} alt={`Sản phẩm liên quan ${i}`} />
                                    <h4>
                                        {product.productName} {i}
                                    </h4>
                                    <p className="price">
                                        {Number(product.price).toLocaleString("vi-VN")} ₫
                                    </p>
                                </div>
                            ))}
                        </div>
                        <span
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                color: "orange",
                                paddingTop: 15,
                            }}
                        >
                            Xem Tất cả
                        </span>
                    </div>
                    <button className="carousel-prev">Left Arrow</button>
                    <button className="carousel-next">Right Arrow</button>
                </div>
            </div>
        </section>
    );
}

// ✅ generateStaticParams để build sẵn slug cho SEO
export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((p) => ({ slug: slugifyProduct(p.productName) }));
}
