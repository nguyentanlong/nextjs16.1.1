// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE_L = process.env.NEXT_PUBLIC_API_BASE_L;
const API_BASE_A = process.env.NEXT_PUBLIC_API_BASE_A;
const API_BASE_SUBCATA = `/subcategories/subcate`

// ===== Helper =====
export async function fetcher(url: string) {
    try {
        const res = await fetch(url, { cache: "no-store" });

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
    const data = await fetcher(`${API_BASE || API_BASE_L}`);
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
    /*const res = await fetch(`${API_BASE_A}/${slug}`, {
        next: { revalidate: 259200 }, // ⭐ quan trọng
    });

    if (!res.ok) {
        throw new Error("Fetch product failed");
    }

    return res.json();*/
}
// ===== Lấy 1 sản phẩm theo slug =====
export async function fetchProductBySlug(slug: string): Promise<Product> {
    return fetcher(`${API_BASE || API_BASE_L}/product/${slug}`);
}
// Fetch chi tiết sản phẩm theo id
export async function fetchProductById(id: string): Promise<Product> {
    return fetcher(`${API_BASE || API_BASE_L}${id}`);
    /*const res = await fetch(`${API_BASE || API_BASE_L}${id}`, { next: { revalidate: 3600 }, });
    if (!res.ok) console.log("Lỗi fetchProductById")//.error(error)//throw new Error("Không thể fetch dữ liệu sản phẩm");
    const json = await res.json();
    return json.data;*/
}

// src/lib/api.tsx

/*export interface ProductRelate {
    id: string;
    productName: string;
    price: string;
    media: string[];
    categories: number;
}*/

// =========================
// Kiểu 1: Lấy trực tiếp từ bảng products
// =========================

// Giả sử mình có sẵn danh sách products trong memory (mock data)
export async function fetchRelatedProductsLocal(
    subCategoryId: number): Promise<Product[]> {
    console.log("👉 Bắt đầu fetch sản phẩm theo danh mục:", subCategoryId);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}`,
        {
            method: "GET", headers: { "Content-Type": "application/json" },
            cache: "no-store",//next: { revalidate: 3600 },
        });
    // console.log("📡 Status code từ API:", res.status);
    if (!res.ok) {
        throw new Error("Không lấy được danh sách sản phẩm");
    }
    const json = await res.json();
    // console.log("📦 JSON trả về từ API:", json);
    // const allProducts: Product[] = await res.json();
    // API trả về { data: [...] } 
    const allProducts: Product[] = json.data;
    // console.log("📊 Tổng số sản phẩm nhận được:", allProducts?.length);
    // console.log("🔍 Sản phẩm mẫu (phần tử đầu tiên):", allProducts?.[0]);
    if (!Array.isArray(allProducts)) {
        // console.error("API không trả về mảng sản phẩm:", json); return [];
    }
    // allProducts.filter((p) => p.subCategoryId === subCategoryId)
    const filtered = allProducts.filter((p) => {
        // console.log("🧾 Kiểm tra sản phẩm:", p);
        // console.log("➡️ p.subCategoryId:", p.subCategoryId, " | cần lọc:", subCategoryId);
        // console.log(typeof p.subCategoryId, p.subCategoryId);
        // console.log(typeof subCategoryId, subCategoryId);
        // console.table(allProducts.map(p => ({ id: p.id, subCategoryId: p.subCategoryId })));
        return p.subCategoryId === subCategoryId;
    });
    console.log("✅ Số sản phẩm sau khi lọc:", filtered.length);
    // console.log("👉 stock param nhận vào:", categories);
    // console.log("📦 JSON trả về từ API:", json);
    // console.log("🔍 Sản phẩm đầu tiên:", allProducts?.[0]);
    return allProducts.filter((p) => p.subCategoryId === subCategoryId);
}
// src/lib/api.ts
export async function searchProduct(name: string) {
    const res = await fetch(
        `${API_BASE || API_BASE_L}/subcategories/search/like/${encodeURIComponent(
            name
        )}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }
    // console.log("Res...   ", res);
    const data = await res.json();
    // console.log(data); // đây mới là dữ liệu JSON từ API
    return data;
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