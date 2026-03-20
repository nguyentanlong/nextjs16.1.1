import { fetchProductsHome } from "@/lib/api";
import Link from "next/link"
import { Suspense } from "react";
import ProductsHomeClient from "./ProductHomeClient";
// import ProductsHomeClientSub from "./ProductsHomeClientSub";
export default async function ProductsHome() {

    const res = await fetchProductsHome();
    // if (!products || products.length === 0) {
    //     return <div>Chưa có sản phẩm nào</div>;
    // }
    return (
        <>
            {/* ==================== CÓ THỂ BẠN THÍCH – GRID THẬT SỰ ==================== */}
            <Suspense fallback={<div>Loading products...</div>}>
                <section className="suggestion-section">
                    <div className="container">
                        <div className="section-header">
                            <h4>Sản phẩm nổi bật</h4>
                            <div className="tabs">
                                <Link href={"/tat-ca-san-pham"} className="tab-active">Xem tất cả</Link>
                            </div>
                        </div>
                        {/* GRID 5 CỘT (desktop) */}
                        <div className="suggestion-grid">
                            {/* Sản phẩm 1 */}
                            <ProductsHomeClient
                                initialProducts={res.data}
                                total={res.total}
                            />
                        </div>
                    </div>
                </section>
            </Suspense>
        </>

    )
}