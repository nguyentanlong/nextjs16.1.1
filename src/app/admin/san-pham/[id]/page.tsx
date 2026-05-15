// src/app/admin/san-pham/[id]/page.tsx
import { fetchProductByIdEdit } from "@/lib/api";
import ProductEditor from "@/components/ProductEditor";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export default async function EditProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const product = await fetchProductByIdEdit(id, token);
    /*console.log("product.id trong page.:", product?.id);
    console.log("product từ API:", JSON.stringify(product));*/

    if (!product) notFound();

    return (
        <div style={{ padding: "24px" }}>
            <h2>Sửa sản phẩm: {product.productName}</h2>
            {/* ✅ Truyền toàn bộ data sản phẩm vào ProductEditor */}
            <ProductEditor initialProduct={product} />
        </div>
    );
}