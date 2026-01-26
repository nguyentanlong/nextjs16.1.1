// src/app/[slug]/page.tsx
// "use client";
import { Metadata } from "next";
import { slugifyProduct } from "@/lib/slugify";
import Link from "next/link";
import { fetchProducts, Product, fetchRelatedProductsLocal } from "@/lib/api";
import Image from "next/image";
import ProductImages from "@/components/ProductImage";
import ProductTabs from "@/components/ProductTab";
import RelatedProducts from "@/components/RelateProducts";
import { notFound } from "next/navigation";

/*interface Product {
    id: string;
    productName: string;
    shortDescription: string;
    description: string;
    media: string[];
    price: string;
    stock: number;
}

async function getProducts(): Promise<Product[]> {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    const res = await fetch(`${API_BASE}`, {
        next: { revalidate: 3600 }, // cache 1h để build nhanh và tốt SEO
    });
    const json = await res.json();
    return json.data;
}
*/
async function getProductBySlug(slug: string): Promise<Product | null> {
    const products = await fetchProducts();
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

    if (!product) return {
        title: process.env.NEXT_PUBLIC_API_TITLE,
        description: process.env.NEXT_PUBLIC_API_DESCRIPT
    };
    return {
        title: product.productName,
        description: product.shortDescription,
        keywords: product.keywords,
    };
}

/*export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) return <div>Không tìm thấy sản phẩm</div>;*/
export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params; // unwrap Promise
    return (<ProductDetail slug={slug} />);

}
async function ProductDetail({ slug }: { slug: string }) {
    const products = await fetchProducts();
    // const product = products.find((p) => slugifyProduct(p.productName) === params.slug);
    const product = products.find((p) => slugifyProduct(p.productName) === slug);
    if (!product) { // xử lý trường hợp không tìm thấy sản phẩm 
        return notFound();
    } // hoặc redirect, hoặc render fallback }
    // Lấy sản phẩm cùng danh mục 
    const relatedProducts = await fetchRelatedProductsLocal(product.stock);
    // const [mainImg, setMainImg] = useState(product?.media?.[0] ?? "/favicon.ico");
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
                    <ProductImages productName={product.productName} media={product.media} />

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
                <ProductTabs description={product.description} />

                {/* Sản phẩm liên quan */}
                {/* ... phần ảnh sản phẩm, tabs */}
                <RelatedProducts stock={product.stock} products={relatedProducts} />
            </div>
        </section>

    );
}

// ✅ generateStaticParams để build sẵn slug cho SEO
export async function generateStaticParams() {
    const products = await fetchProducts();
    return products.map((p) => ({ slug: slugifyProduct(p.productName) }));
}
