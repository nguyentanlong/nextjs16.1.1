// src/app/admin/san-pham/[id]/page.tsx
import { fetchProductByIdEdit } from "@/lib/api";
import ProductEditor from "@/components/ProductEditor";
import { notFound } from "next/navigation";

export default async function EditProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await fetchProductByIdEdit(id);

    if (!product) notFound();

    return (
        <div style={{ padding: "24px" }}>
            <h2>Sửa sản phẩm: {product.productName}</h2>
            {/* ✅ Truyền toàn bộ data sản phẩm vào ProductEditor */}
            <ProductEditor initialProduct={product} />
        </div>
    );
}