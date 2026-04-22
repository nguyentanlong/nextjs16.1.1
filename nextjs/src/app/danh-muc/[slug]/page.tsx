import { fetchProductsBySubCategory } from "@/lib/api";
import Link from "next/link"
import { Suspense } from "react";
import ProductsBySubCategoryClient from "@/components/ProductsClientSub";
export default async function ProductCatagory({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const res = await fetchProductsBySubCategory(slug, 1, 10);

    return (
        <>
            {/* ==================== CÓ THỂ BẠN THÍCH – GRID THẬT SỰ ==================== */}
            <Suspense fallback={<div>Loading products...</div>}>
                <section className="suggestion-section">
                    <div className="container">
                        <div className="section-header">
                            <h4>Sản phẩm </h4>
                            <div className="tabs">
                                <Link href={"/tat-ca-san-pham"} className="tab-active">Xem tất cả</Link>
                            </div>
                        </div>
                        {/* GRID 5 CỘT (desktop) */}
                        <div className="suggestion-grid">
                            {/* Sản phẩm 1 */}
                            <ProductsBySubCategoryClient
                                initialProducts={res.data}
                                total={res.total}
                                slug={slug}
                            />
                        </div>
                    </div>
                </section>
            </Suspense>
        </>

    )
}