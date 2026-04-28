// src/app/danh-muc/[slug]/page.tsx
import { Suspense } from "react";
import { fetchProductsBySubCategory } from "@/lib/api";
import ProductsBySubCategoryClient from "@/components/ProductsBySubCategoryClient";

const LIMIT = 10;

export default async function SubCategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string, categoryName: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { slug, categoryName } = await params;
    const { page: pageParam } = await searchParams;
    const currentPage = Math.max(1, Number(pageParam || 1));

    return (
        <div>
            <h1>Danh mục: {slug} {categoryName}</h1>
            <Suspense
                key={`${slug}-${currentPage}`}
                fallback={<SubCategorySkeleton />}
            >
                <SubCategorySection slug={slug} currentPage={currentPage} />
            </Suspense>
        </div>
    );
}

// ✅ Fetch xong mới render — KHÔNG hardcode skeleton ở đây
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

    // ✅ Truyền data thật xuống client
    return (
        <ProductsBySubCategoryClient
            products={products}
            total={total}
            currentPage={currentPage}
            slug={slug}
        />
    );
}

// ✅ Skeleton chỉ nằm trong fallback của Suspense
function SubCategorySkeleton() {
    return (
        <div className="suggestion-grid">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="suggestion-card">
                    <div className="product-link">
                        <div className="badge-percent" style={{ background: "#e0e0e0", color: "transparent" }}>-50%</div>
                        <div style={{ width: 100, height: 90, background: "#e0e0e0", borderRadius: 4 }} />
                        <div className="badges">
                            <span className="badge-discount" style={{ background: "#e0e0e0", color: "transparent" }}>Khuyến mãi</span>
                            <span className="badge-official" style={{ background: "#e0e0e0", color: "transparent" }}>Cửa hàng</span>
                        </div>
                        <h3 style={{ background: "#e0e0e0", color: "transparent", borderRadius: 4 }}>&nbsp;</h3>
                        <div className="price">
                            <span className="price-new" style={{ background: "#e0e0e0", color: "transparent", borderRadius: 4 }}>000.000 ₫</span>
                            <span className="sold" style={{ background: "#e0e0e0", color: "transparent", borderRadius: 4 }}>0 sản phẩm</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}