import { fetchAllProducts } from "./api";

export function slugifyProduct(name: string): string {
    // Chuyển về lowercase
    const lower = name.toLowerCase();

    // Loại bỏ dấu bằng normalize + regex
    const noDiacritics = lower
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")   // xử lý riêng chữ đ
        .replace(/Đ/g, "d");  // nếu có chữ hoa

    // Thay khoảng trắng bằng dấu gạch ngang
    const slug = noDiacritics.replace(/\s+/g, "-");

    return slug + ".html";
}
export function slugifyCategory(categoryName: string): string {
    return categoryName
        .toLowerCase()
        .replace(/đ/g, "d") // xử lý chữ đ
        .replace(/Đ/g, "D") // xử lý chữ Đ
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
        .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
        .trim()
        .replace(/\s+/g, "-"); // thay space bằng -
    // + ".html";
}
const subCategoryMap: Record<string, number> = {
    "thiet-bi-an-ninh.html": 1,
    "binh-chua-chay.html": 2,
    "camera-quan-sat.html": 3,
};

export function getSubCategoryIdBySlug(slug: string): number {
    return subCategoryMap[slug] || 0;
}
export async function generateStaticParams() {
    const products = await fetchAllProducts();
    return products.map((p) => ({ slug: slugifyProduct(p.productName) }));
}
