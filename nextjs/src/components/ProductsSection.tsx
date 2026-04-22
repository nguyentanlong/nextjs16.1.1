// src/components/ProductsSection.tsx
import { fetchProductsHome } from "@/lib/api";
import ProductsHomeClient from "./ProductHomeClient";

const LIMIT = 8;

// async server component — fetch trên server, không tốn tài nguyên client
export default async function ProductsSection({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const page = Math.max(1, Number(searchParams?.page || 1));

    const res = await fetchProductsHome(page, LIMIT);
    // ✅ fallback rõ ràng nếu API trả về undefined/null
    const products = res?.data ?? [];
    const total = res?.total ?? 0;

    return (
        <ProductsHomeClient
            products={products}
            total={total}
            currentPage={page}
            limit={LIMIT}
        />
    );
}