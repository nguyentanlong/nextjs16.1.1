// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;// || process.env.NEXT_PUBLIC_API_BASE_L;

// ✅ PUT — cập nhật sản phẩm
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    console.log("=== PUT /api/admin/products/[id] ĐƯỢC GỌI ==="); // ← thêm dòng này
    console.log("id:", id);
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    // ✅ Log để xem URL thực sự gọi là gì
    console.log("PUT URL:", `${API_BASE}/${id}`);
    console.log("Token:", token ? "có" : "không có");

    try {
        const formData = await req.formData();

        const res = await fetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
            // credentials: "include",
            duplex: "half",
        } as RequestInit & { duplex: "half" });

        const text = await res.text();
        return new NextResponse(text, {
            status: res.status,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error("PUT proxy error:", err);
        return NextResponse.json({ message: "Proxy server error" }, { status: 500 });
    }
}

// ✅ DELETE — xóa sản phẩm
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    console.log("=== PUT /api/admin/products/[id] ĐƯỢC GỌI ==="); // ← thêm dòng này
    console.log("id:", id);
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    try {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            // credentials: "include",
        });

        const text = await res.text();
        return new NextResponse(text, {
            status: res.status,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error("DELETE proxy error:", err);
        return NextResponse.json({ message: "Proxy server error" }, { status: 500 });
    }
}