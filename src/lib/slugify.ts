// import { fetchAllProducts, fetchSubCategories } from "./api";

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
export function altImage(name: string): string {
    // Chuyển về lowercase
    const lower = name.toLowerCase();

    // Loại bỏ dấu bằng normalize + regex
    const noDiacritics = lower
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")   // xử lý riêng chữ đ
        .replace(/Đ/g, "d");  // nếu có chữ hoa

    // Thay khoảng trắng bằng dấu gạch ngang
    const altImages = noDiacritics.replace(/\s+/g, "-");

    return altImages;
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

// utils/validators.ts

// ✅ Validate số điện thoại Việt Nam (bắt đầu bằng 0 hoặc +84, 9-11 số)
export function validatePhoneVN(phone: string): boolean {
    const regex = /^(?:\+84|0)(?:\d{9,10})$/;
    return regex.test(phone);
}

// ✅ Validate email
export function validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ✅ Validate mật khẩu (ít nhất 8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt)
export function validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

// ✅ Validate username (chỉ chữ, số, gạch dưới, từ 3–20 ký tự)
export function validateUsername(username: string): boolean {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
}
