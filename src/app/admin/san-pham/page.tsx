// src/app/admin/san-pham/page.tsx
import { fetchAdminProducts } from "@/lib/api";
import ProductTable from "@/components/ProductTable";

export default async function AdminProductPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; search?: string }>;
}) {
    const { page: p, search = "" } = await searchParams;
    const page = Math.max(1, Number(p || 1));

    const res = await fetchAdminProducts(page, 10, search);
    const products = res?.data ?? [];
    const total = res?.total ?? 0;

    return (
        <div style={{ padding: "24px" }}>
            <h2>Quản lý sản phẩm</h2>
            <ProductTable
                products={products}
                total={total}
                currentPage={page}
                search={search}
            />
        </div>
    );
}