import { NextResponse } from "next/server";

export async function GET() {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

    try {
        const res = await fetch(`${API_BASE}/categories/cate`, {
            next: { revalidate: 259200, } // luôn lấy dữ liệu mới
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Don't get categories" }, { status: res.status });
        }

        const data = await res.json();
        // console.log("Data api subcate: ", data);
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error("❌ Error fetching categories:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
