"use client";

import ProductEditor from "@/components/ProductEditor";

export default function ProductEditorClient() {
    const handleSave = async (product: any) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/addProduct`, {
            method: product.id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
            credentials: "include",
        });

        if (!res.ok) {
            console.error("Lỗi khi lưu sản phẩm");
            return;
        }

        const data = await res.json();
        console.log("Sản phẩm đã lưu:", data);
    };

    return <ProductEditor onSave={handleSave} />;
}
