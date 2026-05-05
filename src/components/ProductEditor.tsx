"use client";
import React, { useContext, useEffect, useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";

import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
// import { ca } from "zod/locales";
import dynamic from "next/dynamic";
import TinyEditor from "./ProductEdit";
const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor),
    { ssr: false, });
// Tự định nghĩa type cho handler
type TinyMCEUploadHandler = (
    blobInfo: { blob: () => Blob; filename: () => string }
) => Promise<string>;

const uploadHandler: TinyMCEUploadHandler = async (blobInfo) => {
    try {
        const formData1 = new FormData();
        formData1.append('filesDesc', blobInfo.blob(), blobInfo.filename());

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload-description`, {
            method: 'POST',
            body: formData1,
        });

        const data = await res.json();
        // Nếu backend trả về mảng [{ location: '...' }]
        // Nếu backend trả về mảng
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Upload failed: no file returned");
        }

        // Vì backend trả về mảng [{ location: '...' }]
        return data[0].location;
    } catch (err: any) {
        throw new Error("Upload failed: " + err.message);
    }
};


interface SubCategory { id: number; categoryName: string; }
interface Product {
    id?: string;              // id là varchar(36)
    productName: string;      // ✅ đúng tên cột
    price: number | 2676;            // decimal(10,2)
    subCategoryId?: number | 2;   // int
    shortDescription: string;
    description: string;      // text
    keywords: string[]; // ✅ mảng string
    stock: number | 3;
    N0: number | 5;
    // có thể thêm shortDescription, keywords, stock… nếu cần
    files?: File[]; // ✅ thêm để lưu danh sách file

}


interface ProductEditorProps {
    initialProduct?: Product;
    // onSave: (product: Product) => void;
}

export default function ProductEditor({ initialProduct }: ProductEditorProps) {//sau initalProduct , onSave
    const [product, setProduct] = useState<Product>(() =>
        initialProduct ?? {
            productName: "",
            price: 2676,
            subCategoryId: undefined,
            shortDescription: "",
            description: "",
            keywords: [],
            stock: 3,
            N0: 5,
            files: []
        }
    );
    const auth = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    if (!auth) {
        throw new Error("AuthContext chưa được wrap bằng Provider");
    }

    const { accessToken } = auth;
    const [keywordInput, setKeywordInput] = useState(
        (initialProduct?.keywords || []).join(", ")
    );
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    // Fetch subcategories khi mount 
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const res = await fetch("/api/subcategories");//,{ credentials: "include" }
                // console.log("Res trong ProductEditor: ", res);
                if (res.ok) {
                    const data = await res.json(); setSubCategories(data);
                    // backend trả về mảng subcategories 
                }
            } catch (err) {
                console.error("❌ Error fetching subcategories:", err);
            }
        }; fetchSubCategories();
    }, []);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    useEffect(() => {
        if (product.files) {
            const urls = product.files.map((file) => URL.createObjectURL(file));
            setPreviewUrls(urls);
            // cleanup: revoke tất cả khi files thay đổi hoặc component unmount 
            return () => { urls.forEach((url) => URL.revokeObjectURL(url)); };
        }
    }, [product.files]);
    const handleChange = (field: keyof Product, value: any) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // onSave(product);
        if (isSubmitting) return; // chặn double submit
        setIsSubmitting(true);

        const formData = new FormData();
        try {
            formData.append("productName", product.productName ?? "Nguyễn Tấn Long");
            formData.append("price", product.price.toString() ?? "2676");
            if (product.subCategoryId) {
                formData.append("subCategoryId", product.subCategoryId.toString() ?? "2");
            }
            formData.append("shortDescription", product.shortDescription ?? "145 DT 741, kp Phước Trung, p Phước Bình, Đồng Nai");
            formData.append("description", product.description) ?? "Thiết kế website, software, camera, năng lượng mặt trời, pccc";
            formData.append("stock", product.stock?.toString() ?? "0"); // ✅ thêm dòng này
            formData.append("N0", product.N0?.toString() ?? "5");
            product.keywords.forEach(k => {
                if (k.trim()) {
                    formData.append("keywords", k.trim());
                }
            });


            // File mới nếu có chọn lại
            const fileInput = document.querySelector<HTMLInputElement>("#productFiles");
            if (fileInput?.files) {
                for (const file of fileInput.files) {
                    formData.append("files", file);
                }
            }

            // ✅ Nếu có product.id → PUT (cập nhật), không có → POST (tạo mới)
            const isEdit = !!product.id;
            const url = isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products";
            const method = isEdit ? "PUT" : "POST";
            // ✅ LOG 1 — xem url và method
            console.log("=== SUBMIT ===");
            console.log("method:", method);
            console.log("url:", url);
            console.log("product.id:", product.id);

            // ✅ LOG 2 — xem toàn bộ fields trong formData
            console.log("--- FormData fields ---");
            for (const [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`  ${key}: [File] name=${value.name} size=${value.size} type=${value.type}`);
                } else {
                    console.log(`  ${key}: "${value}"`);
                }
            }
            const res = await fetch(url, {
                method,
                body: formData,
                credentials: "include",
            });
            // ✅ LOG 3 — xem response từ route handler
            console.log("--- Response ---");
            console.log("status:", res.status);
            console.log("statusText:", res.statusText);

            const text = await res.text();
            console.log("body:", text);
            if (res.ok) {
                alert(isEdit ? "Cập nhật sản phẩm thành công!" : "Thêm sản phẩm thành công!");
                if (isEdit) {
                    // Quay lại danh sách sau khi sửa
                    window.location.href = "/admin/san-pham";
                }
            } else {
                const err = await res.json().catch(() => ({}));
                console.error("❌ Error:", err);
                // console.log("Status:", res.status);           // thêm dòng này
                // console.log("Status text:", res.statusText);  // thêm dòng này
                // const text = await res.text();                // dùng text thay vì json
                alert(isEdit ? "Có lỗi khi cập nhật sản phẩm" : "Có lỗi khi thêm sản phẩm");
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    // const handleSave = (data: any) => { console.log("Saved product:", data); }

    const tinymceCDN = `https://cdn.tiny.cloud/1/${process.env.NEXT_PUBLIC_TINYMCE_API_KEY}/tinymce/6/tinymce.min.js`;

    return (
        <form onSubmit={handleSubmit} className="formaddproduct">
            {/* Tên sản phẩm */}
            <div>
                <label className="block font-medium">Tên sản phẩm</label>
                <input
                    type="text"
                    value={product.productName}
                    onChange={(e) => handleChange("productName", e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                    required
                />
            </div>
            {/* Upload hình ảnh / video */}
            <div>
                <label className="block font-medium">Hình ảnh / Video sản phẩm (tối đa 10 file)</label>
                <input id="productFiles"
                    type="file"
                    accept="image/*,video/*" // ✅ cho phép tất cả định dạng ảnh và video 
                    multiple // ✅ cho phép chọn nhiều file 
                    className="border rounded px-2 py-1 w-full"
                    onChange={(e) => {
                        const files = e.target.files;
                        const arr = files ? Array.from(files) : [];
                        console.log("FILES:", arr.length)
                        if (files && files.length > 10) {
                            alert("Bạn chỉ được chọn tối đa 10 file!");
                            e.target.value = ""; return;
                        }
                        setProduct((prev) => ({ ...prev, files: files ? Array.from(files) : [] }));
                    }} />
                {/* Preview */}
                <div className="flex flex-wrap gap-4 mt-2">
                    {product.files?.map((file, idx) => {
                        const url = previewUrls[idx];
                        if (!url) return null;

                        if (file.type.startsWith("image/")) {
                            return (
                                <Image
                                    key={idx}
                                    src={url}
                                    alt={file.name}
                                    width={200}
                                    height={200}
                                    className="object-cover rounded"
                                />
                            );
                        } else if (file.type.startsWith("video/")) {
                            return (
                                <video
                                    key={idx}
                                    src={url}
                                    controls
                                    width={200}
                                    height={200}
                                    className="object-cover rounded"
                                />
                            );
                        }
                        return null;
                    })}
                </div>

            </div>


            {/* Giá sản phẩm */}
            <div>
                <label className="block font-medium">Giá</label>
                <input
                    type="number"
                    placeholder="Ví dụ 1250000"
                    value={product.price === 0 ? "ví dụ: 1250000" : product.price}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                    required
                />
            </div>
            <div>
                <label className="block font-medium">Kho</label>
                <input
                    type="number"
                    placeholder="5"
                    value={product.price === 0 ? "5" : product.stock}
                    onChange={(e) => handleChange("stock", Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                    required
                />
                <label className="block font-medium">Hiển thị</label>
                <input
                    type="number"
                    placeholder="5"
                    value={product.N0 === 0 ? "5" : product.N0}
                    onChange={(e) => handleChange("N0", Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                    required
                />
            </div>

            {/* SubCategoryId */}
            <div>
                <label className="block font-medium">Danh mục</label>
                {/* <input
                    type="number"
                    value={product.subCategoryId || ""}
                    onChange={(e) => handleChange("subCategoryId", Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                /> */}
                <select value={product.subCategoryId || ""}
                    onChange={(e) => handleChange("subCategoryId", Number(e.target.value))}
                    className="otimizeselect"
                >
                    <option value="">-- Chọn Danh Mục --</option>
                    {subCategories.map((sc) => (
                        <option key={sc.id} value={sc.id}>
                            {sc.categoryName}
                        </option>
                    ))}
                </select>
            </div>
            {/* key word */}
            <div>
                <label className="block font-medium">Keywords</label>
                <input type="text" placeholder='Nhập: "từ khóa 1", "từ khóa 2"'
                    value={keywordInput}
                    onChange={(e) => {
                        const value = e.target.value;
                        setKeywordInput(value);
                        // convert sang array nhưng KHÔNG phá input
                        const arr = value
                            .split(",")
                            .map(k => k.trim())
                            .filter(Boolean);

                        handleChange("keywords", arr);
                    }}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            {/* short description */}
            <div>
                <label className="block font-medium">Mô tả ngắn</label>
                <TinyEditor
                    value={product.shortDescription}
                    onChange={(content) => handleChange("shortDescription", content)}
                    height={250}
                    enableLocalImage={true}
                />
            </div>
            {/* Mô tả chi tiết bằng TinyMCE */}
            <div>
                <label className="block font-medium">Nội dung chi tiết</label>
                <TinyEditor
                    value={product.description}
                    onChange={(content) => handleChange("description", content)}
                    height={500}
                    enableUpload={true}
                />
            </div>

            {/* Nút lưu */}
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Lưu sản phẩm
            </button>
        </form>
    );
}