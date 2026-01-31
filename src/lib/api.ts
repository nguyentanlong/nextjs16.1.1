// src/lib/api.ts
/*import axios from 'axios';

// Tạo axios instance dùng chung—giúp quản lý baseURL, timeout, headers bảo mật
export const api = axios.create({
    baseURL: 'https://api.tonkliplock1000.com', // Base URL của NestJS backend
    timeout: 10_000, // Timeout để tránh treo request
    headers: {
        'Content-Type': 'application/json',
        // Có thể thêm Authorization ở đây nếu sau này có token
    },
});

// Interceptor request—có thể thêm token, trace-id, hoặc locale header
api.interceptors.request.use((config) => {
    // Ví dụ: thêm header bảo mật hoặc locale nếu cần
    // config.headers['X-Client'] = 'tonkliplock-store';
    return config;
});

// Interceptor response—chuẩn hoá lỗi, logging
api.interceptors.response.use(
    (res) => res,
    (error) => {
        // Ghi log hoặc chuyển đổi lỗi về dạng dễ hiểu
        // Ví dụ: nếu 401 thì có thể trigger refresh token (sau này)
        return Promise.reject(error);
    }
);

// Fetcher cho SWR—nhận path và trả về data
export const swrFetcher = async (path: string) => {
    const res = await api.get(path);
    return res.data;
};*/

import { error } from "console";

// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export interface Product {
    id: string;
    productName: string;
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

// Fetch tất cả sản phẩm cho trang chủ
export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}`, {
        cache: "no-store",// next: { revalidate: 3600 },
    });
    if (!res.ok) {
        const text = await res.text(); // log nội dung lỗi từ backend 
        console.error("Fetch products error:", res.status, text);
    }//throw new Error("Không thể fetch dữ liệu sản phẩm");
    const json = await res.json();
    return json.data;
}

// Fetch chi tiết sản phẩm theo id
export async function fetchProductById(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}${id}`, { next: { revalidate: 3600 }, });
    if (!res.ok) console.error(error)//throw new Error("Không thể fetch dữ liệu sản phẩm");
    const json = await res.json();
    return json.data;
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