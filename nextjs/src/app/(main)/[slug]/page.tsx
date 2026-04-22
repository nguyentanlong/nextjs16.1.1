import Link from "next/link";
import ProductImages from "@/components/ProductImage";
import ProductTabs from "@/components/ProductTab";
import RelatedProducts from "@/components/RelateProducts";
// import { notFound } from "next/navigation";
export const revalidate = 259200;
import { fetchProductBySlug } from "@/lib/api";

export async function generateMetadata({ params }: any) {
    const { slug } = await params;
    const product = await fetchProductBySlug(slug);
    if (!product) return {
        title: "Không tìm thấy sản phẩm",
        description: "Sản phẩm không tồn tại",
    };

    const imageUrl = product.media[0]?.startsWith("http")
        ? product.media[0]
        : `https://api.tonkliplock1000.com/api/${product.media[0]}`;

    function stripHtml(html: string) {
        return html?.replace(/<[^>]*>/g, "").trim() ?? "";
    }//làm cho hiển thị hình ảnh mô tả khi share
    return {
        title: product.productName,
        description: product.shortDescription,
        keywords: product.keywords,
        openGraph: {
            title: product.productName,
            // Dùng trong generateMetadata:
            description: stripHtml(product.shortDescription),
            url: `https://tanlong.work.gd/${product.slugP}`,
            images: [{
                url: imageUrl,
                width: 800,
                height: 630,
                alt: product.productName,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: product.productName,
            description: product.shortDescription,
            images: [{
                url: imageUrl,
                width: 800,
                height: 630,
                alt: product.productName,
            }],//media[0]
        },
    };
}

export default async function ProductDetail({ params }: any) {
    const { slug } = await params;
    const product = await fetchProductBySlug(slug);

    if (!product) return (<div>Không tìm thấy sản phẩm</div>);

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
                        <div className="short-desc" dangerouslySetInnerHTML={{ __html: product.shortDescription }}>
                            {/* <p>{product.shortDescription}</p> */}
                        </div>
                        <div className="actions">
                            <button className="btn-buy">Mua ngay</button>
                            <button className="btn-cart">Thêm vào giỏ hàng</button>
                        </div>
                        <div className="support">
                            <p>
                                Hotline tư vấn: <Link href={"tel:+84328738676"}><strong>0328.73.2676</strong></Link>
                            </p>
                            <p>Giao hàng miễn phí nội thành HCM</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <ProductTabs description={product.description} />

                {/* Sản phẩm liên quan */}
                {/* ... phần ảnh sản phẩm, tabs */}
                <RelatedProducts productId={product.id} />
            </div>
        </section>

    );
}

// ✅ generateStaticParams để build sẵn slug cho SEO
/*export async function generateStaticParams() {
    const products = await fetchProducts();
    return products.map((p) => ({ slug: slugifyProduct(p.productName) }));
}*/