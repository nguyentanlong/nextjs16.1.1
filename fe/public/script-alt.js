// Hàm bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
    return str
        .normalize("NFD") // tách dấu
        .replace(/[\u0300-\u036f]/g, "") // xoá dấu
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

// Hàm xử lý tên file thành alt
function generateAltFromFilename(filename) {
    // lấy phần tên file (bỏ đường dẫn)
    let name = filename.split("/").pop().split(".")[0];
    // bỏ dấu tiếng Việt
    name = removeVietnameseTones(name);
    // thay khoảng trắng bằng dấu -
    name = name.replace(/\s+/g, "-");
    return name;
}

// Áp dụng cho tất cả thẻ img
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        if (img.src) {
            const altText = generateAltFromFilename(img.src);
            img.alt = altText;
        }
    });
});