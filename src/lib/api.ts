import { slugifyCategory } from "./slugify";

// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE_L = process.env.NEXT_PUBLIC_API_BASE_L;

// ===== Helper =====
export async function fetcher(url: string, options?: RequestInit) {
    try {
        const res = await fetch(url, { ...options, next: { revalidate: 259200 }, });

        const contentType = res.headers.get("content-type") || "";

        // ❗ Nếu không phải JSON → bỏ
        if (!contentType.includes("application/json")) {
            /*const text = await res.text();
            console.error("❌ Not JSON:", text);*/
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
export interface SubCategory { id: number; categoryName: string; slugSub: string; image: string; }
export interface Category { id: number; categoryName: string; slugCate: string; image: string; }
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
export async function fetchProductsHome(page = 1, limit = 8) {
    try {
        const res = await fetch(
            `${API_BASE}/home?page=${page}&limit=${limit}`,
            /*{
                cache: "no-store",
            }*/{ next: { revalidate: 259200, } }
        );
        // const res = await fetcher(`${API_BASE || API_BASE_L}/home?page=${page}&limit=${limit}`);
        // return data?.data ?? []
        const text = await res.text();
        if (!text) return { data: [], total: 0 };

        const json = JSON.parse(text);

        return {
            data: json?.data ?? [],
            total: json?.total ?? 0,
        };
    } catch (err) {
        console.error("Fetch products error:", err);
        return { data: [], total: 0 };
    }
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
            { next: { revalidate: 259200, } }
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
            { next: { revalidate: 259200, } }
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
        const res = await fetch(`${API_BASE || API_BASE_L}/subcategories/subcate`, {
            // có thể thêm { credentials: "include" } nếu cần
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch subcategories: ${res.status}`);
        }

        const data = await res.json();

        // Luôn đảm bảo trả về mảng
        const subcategories = Array.isArray(data)
            ? data
            : data.subcategories ?? [];

        // Chuẩn hóa dữ liệu để tránh mismatch
        return subcategories.map((sc: any) => ({
            id: sc.id,
            categoryName: sc.categoryName,
            // nếu slugSub không có, tạo slug từ categoryName
            slugSub: sc.slugSub || slugifyCategory(sc.categoryName),
            image: normalizeImage(sc.image),
        }));
    } catch (err) {
        console.error("❌ Error fetching subcategories:", err);
        return []; // fallback an toàn
    }
}
export async function fetchCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_BASE || API_BASE_L}/categories/cate`, {
            // có thể thêm { credentials: "include" } nếu cần
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status}`);
        }

        const data = await res.json();

        // Luôn đảm bảo trả về mảng
        const categories = Array.isArray(data)
            ? data
            : data.categories ?? [];

        // Chuẩn hóa dữ liệu để tránh mismatch
        return categories.map((sc: any) => ({
            id: sc.id,
            categoryName: sc.categoryName,
            // nếu slugSub không có, tạo slug từ categoryName
            slugCate: sc.slugCate || slugifyCategory(sc.categoryName),
            image: normalizeImage(sc.image),
        }));
    } catch (err) {
        console.error("❌ Error fetching categories:", err);
        return []; // fallback an toàn
    }
}
export async function fetchProductsBySubCategory(
    slug: string,
    page = 1,
    limit = 10
) {
    try {
        const res = await fetch(
            `${API_BASE}/subcategoryp/${slug}?page=${page}&limit=${limit}`,
            { next: { revalidate: 259200, } }
        );

        const text = await res.text();
        if (!text) return { data: [], total: 0, categoryName: "" };

        const json = JSON.parse(text);

        return {
            data: json?.data ?? [],
            total: json?.total ?? 0,
            categoryName: json?.categoryName ?? "",
        };
    } catch (err) {
        console.error("Fetch subcategory error:", err);
        return { data: [], total: 0, categoryName: "" };
    }
}

// Lấy danh sách sản phẩm cho admin (có phân trang + search)
export async function fetchAdminProducts(page = 1, limit = 10, search = "") {
    const res = await fetch(
        `${API_BASE}/all`,//home?page=${page}&limit=${limit}&search=${search}
        { cache: "no-store" } // ✅ admin cần data mới nhất, không cache
    );
    if (!res.ok) return { data: [], total: 0 };
    return res.json();
}

// Xóa sản phẩm (soft delete)
export async function deleteProduct(id: string, token: string) {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
}

// Fetch sản phẩm theo id cho trang admin edit
export async function fetchProductByIdEdit(id: string) {
    try {
        const res = await fetch(
            `${API_BASE}/${id}`,
            { cache: "no-store" } // ✅ luôn lấy data mới nhất
        );
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}