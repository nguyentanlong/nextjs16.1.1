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

    return (
        <ProductsHomeClient
            products={res.data}
            total={res.total}
            currentPage={page}
            limit={LIMIT}
        />
    );
}