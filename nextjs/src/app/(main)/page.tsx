// src/app/page.tsx

import HeroBanner from '@/components/HeroBanner';
import Category from '@/components/Category';
import PopularCategory from '@/components/PopularCategory';
import ReBanner from '@/components/ReBanner';
import HomeNavbar from '@/components/HomeNavbar';
import { fetchCategories, fetchSubCategories } from '@/lib/api';
import { Suspense } from 'react';
import ProductsSection from '@/components/ProductsSection';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>; // ✅ type là Promise
}) {
  // ✅ await trước khi dùng
  const resolvedParams = await searchParams;
  const currentPage = resolvedParams?.page ?? "1";

  const subCategories = await fetchSubCategories(); // chạy trên server
  const categories = await fetchCategories();

  return (
    <main>
      <HomeNavbar />
      <HeroBanner />
      <Category subCategories={subCategories} />
      <PopularCategory categories={categories} />
      {/*
        key={searchParams.page} → mỗi lần đổi trang, Suspense reset
        → hiện skeleton → fetch xong hiện sản phẩm mới
        Các component trên (Banner, Category...) KHÔNG bị re-render
      */}
      <Suspense
        key={currentPage} // ✅ dùng biến đã await
        fallback={<ProductsSkeleton />}
      >
        <ProductsSection searchParams={{ page: currentPage }} />
      </Suspense>
      <ReBanner />
      {/* <Footer /> */}
    </main>
  );
}
// Skeleton 8 card — hiện trong lúc fetch trang mới
function ProductsSkeleton() {
  return (
    <>
      <div className="suggestion-grid">
        {Array.from({ length: 8 }).map((_, i) => (
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