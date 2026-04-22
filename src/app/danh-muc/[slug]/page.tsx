// src/app/danh-muc/[slug]/page.tsx
import { Suspense } from "react";
import { fetchProductsBySubCategory } from "@/lib/api";
import ProductsBySubCategoryClient from "@/components/ProductsClientSub";

const LIMIT = 10;

// ✅ Bước 1: page nhận cả params (slug) và searchParams (page)
export default async function SubCategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    // ✅ Bước 2: await cả 2 vì Next.js 15+ chúng là Promise
    const { slug } = await params;
    const { page: pageParam } = await searchParams;
    const currentPage = Math.max(1, Number(pageParam || 1));

    return (
        <div>
            <h1>Danh mục: {slug}</h1>

            {/* ✅ Bước 3: Suspense với key=page để reset khi đổi trang */}
            <Suspense
                key={`${slug}-${currentPage}`}
                fallback={<div>Đang tải sản phẩm...</div>}
            >
                <SubCategorySection
                    slug={slug}
                    currentPage={currentPage}
                />
            </Suspense>
        </div>
    );
}

// ✅ Bước 4: async server component — fetch + truyền data xuống client
async function SubCategorySection({
    slug,
    currentPage,
}: {
    slug: string;
    currentPage: number;
}) {
    const res = await fetchProductsBySubCategory(slug, currentPage, LIMIT);
    const products = res?.data ?? [];
    const total = res?.total ?? 0;

    return (
        <>
            <div className="suggestion-grid">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="suggestion-card">
                        <div className="product-link">

                            {/* badge-percent placeholder */}
                            <div className="badge-percent" style={{ background: "#e0e0e0", color: "transparent" }}>
                                -50%
                            </div>

                            {/* ảnh placeholder */}
                            <div style={{ width: 100, height: 90, background: "#e0e0e0", borderRadius: 4 }} />

                            {/* badges placeholder */}
                            <div className="badges">
                                <span className="badge-discount" style={{ background: "#e0e0e0", color: "transparent" }}>
                                    Discount Extra
                                </span>
                                <span className="badge-official" style={{ background: "#e0e0e0", color: "transparent" }}>
                                    Official Sale
                                </span>
                            </div>

                            {/* tên sản phẩm placeholder */}
                            <h3 style={{ background: "#e0e0e0", color: "transparent", borderRadius: 4 }}>
                                &nbsp;
                            </h3>

                            {/* giá placeholder */}
                            <div className="price">
                                <span
                                    className="price-new"
                                    style={{ background: "#e0e0e0", color: "transparent", borderRadius: 4 }}
                                >
                                    000.000 ₫
                                </span>
                                <span
                                    className="sold"
                                    style={{ background: "#e0e0e0", color: "transparent", borderRadius: 4 }}
                                >
                                    0 sản phẩm
                                </span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}