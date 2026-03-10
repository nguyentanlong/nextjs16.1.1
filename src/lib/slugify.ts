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
