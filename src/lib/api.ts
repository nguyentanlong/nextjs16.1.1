// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE_L = process.env.NEXT_PUBLIC_API_BASE_L;
const API_BASE_A = process.env.NEXT_PUBLIC_API_BASE_A;
const API_BASE_SUBCATA = `/subcategories/subcate`

// ===== Helper =====
export async function fetcher(url: string) {
    try {
        const res = await fetch(url, { next: { revalidate: 259200 }, });

        const contentType = res.headers.get("content-type") || "";

        // ❗ Nếu không phải JSON → bỏ
        if (!contentType.includes("application/json")) {
            const text = await res.text();
            console.error("❌ Not JSON:", text);
            return null;
        }

        const text = await res.text();

        if (!text) {
            console.warn("⚠️ Empty response:", url);
            return null;
        }

        return JSON.parse(text);
    } catch (err) {
        console.error("❌ Fetch error:", err);
        return null;
    }
}

export interface Product {
    id: string;
    productName: string;
    slugP: string;
    shortDescription: string;
    description: string;
    media: string[];
    price: number;
    stock: number;
    N0: number;
    keywords: string[];
    discountPercent: number;
    subCategoryId: number;
}
export interface SubCategory { id: number; categoryName: string; image: string; }
// Fetch sản phẩm cho trang chủ
export async function fetchProducts(): Promise<Product[]> {
    const data = await fetcher(`${API_BASE || API_BASE_L}/home`);
    return data?.data ?? []; // ✅ luôn array
    /*const res = await fetch(`${API_BASE || API_BASE_L}`, {
        next: { revalidate: 259200 },//3 ngày
    });

    if (!res.ok) {
        const text = await res.text(); // log nội dung lỗi từ backend 
        console.error("Fetch products error:", res.status, text);
    }//throw new Error("Không thể fetch dữ liệu sản phẩm");
    const json = await res.json();
    return json.data;*/
}
// Fetch tất cả sản phẩm 
export async function fetchAllProducts(): Promise<Product[]> {
    const data = await fetcher(`${API_BASE || API_BASE_L}/all`);
    return data?.data ?? []
}
// ===== Lấy 1 sản phẩm theo slug =====
export async function fetchProductBySlug(slug: string): Promise<Product> {
    return fetcher(`${API_BASE || API_BASE_L}/product/${slug}`);
}
// Fetch chi tiết sản phẩm theo id
export async function fetchProductById(id: string): Promise<Product> {
    return fetcher(`${API_BASE || API_BASE_L}${id}`);
}

/*export async function searchProduct(keyword: string) {
    if (!keyword.trim()) return [];

    const data = await fetcher(
        `${API_BASE}/products/search/like/${encodeURIComponent(keyword)}`
    );

    return data?.data ?? []; // 🔥 luôn array
}*/
export async function searchProducts(keyword: string) {
    if (!keyword.trim()) return [];

    try {
        const res = await fetch(
            `${API_BASE}/search/like?q=${encodeURIComponent(keyword)}`,
            {
                cache: "no-store", // search không cache
            }
        );

        const text = await res.text();

        if (!text) return [];

        const data = JSON.parse(text);

        return data?.data ?? data ?? [];
    } catch (err) {
        console.error("Search error:", err);
        return [];
    }
}
export async function fetchRelatedProducts(productId: string) {
    if (!productId) return [];

    try {
        const res = await fetch(
            `${API_BASE}/related/${productId}`,
            {
                cache: "no-store",
            }
        );

        const text = await res.text();
        if (!text) return [];

        const data = JSON.parse(text);

        return data?.data ?? data ?? [];
    } catch (err) {
        console.error("Related products error:", err);
        return [];
    }
}



// =========================
// ========================= // Kiểu 2: Gọi API backend (khi có endpoint riêng) // =========================
// export async function fetchRelatedProductsAPI(categoryId: string): Promise<Product[]> {
// const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/products/related?categoryId=${categoryId}`, {
// method: "GET", headers: {
//  "Content-Type": "application/json" }, cache: "no-store", });
// if (!res.ok) {
// throw new Error("Không lấy được sản phẩm liên quan"); }
// const data = await res.json();
// return data.products as Product[]; }
export function normalizeImage(image: string) {
    const img = image.trim();
    if (img.startsWith("http://") || img.startsWith("https://")) {
        return img;
    }
    if (img.startsWith("/")) {
        return img;
    }
    return `/${img}`;
}

//fetch subcategories
export async function fetchSubCategories(): Promise<SubCategory[]> {
    try {
        const res = await fetch(`${API_BASE || API_BASE_L}/subcategories/subcate`); // có thể thêm { credentials: "include" } nếu cần
        if (!res.ok) {
            throw new Error(`Failed to fetch subcategories: ${res.status}`);
        }
        const data = await res.json();
        // console.log("data trong lib/api:  ", data);
        if (Array.isArray(data)) {
            return data;
        }

        // Nếu backend trả về object có field subcategories
        return data.subcategories ?? [];
        // return data//data.subcategories ?? []; // đảm bảo trả về mảng
    } catch (err) {
        console.error("❌ Error fetching subcategories:", err);
        return []; // hoặc throw err nếu muốn xử lý bên ngoài
    }
}