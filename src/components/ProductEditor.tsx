"use client";
import React, { useEffect, useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
import dynamic from "next/dynamic";
import Image from "next/image";
const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor),
    { ssr: false, });

interface SubCategory { id: number; categoryName: string; }
interface Product {
    id?: string;              // id là varchar(36)
    productName: string;      // ✅ đúng tên cột
    price: number;            // decimal(10,2)
    subCategoryId?: number;   // int
    shortDescription: string;
    description: string;      // text
    keywords: string[]; // ✅ mảng string
    // có thể thêm shortDescription, keywords, stock… nếu cần
    files?: File[]; // ✅ thêm để lưu danh sách file
}


interface ProductEditorProps {
    initialProduct?: Product;
    onSave: (product: Product) => void;
}

export default function ProductEditor({ initialProduct, onSave }: ProductEditorProps) {
    const [product, setProduct] = useState<Product>(
        initialProduct || { productName: "", price: 0, subCategoryId: undefined, shortDescription: "", description: "", keywords: [] }
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
        const formData = new FormData();
        formData.append("productName", product.productName);
        formData.append("price", product.price.toString());
        if (product.subCategoryId) {
            formData.append("subCategoryId", product.subCategoryId.toString());
        }
        formData.append("shortDescription", product.shortDescription);
        formData.append("description", product.description);
        // keywords là mảng → stringify để backend parse 
        formData.append("keywords", JSON.stringify(product.keywords));
        const fileInput = document.querySelector<HTMLInputElement>("#productFiles");
        if (fileInput?.files) {
            for (const file of fileInput.files) {
                formData.append("files", file);
            }
        }
        const res = await fetch("/api/products", {
            method: "POST",
            body: formData,
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            console.log("✅ Product created:", data);
            alert("Thêm sản phẩm thành công!");
        }
        else {
            const err = await res.json();
            console.error("❌ Error:", err);
            alert("Có lỗi khi thêm sản phẩm");
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
                <input type="text"
                    placeholder="Nhập từ khóa, cách nhau bởi dấu phẩy"
                    value={product.keywords.join(", ")}
                    onChange={(e) => handleChange("keywords", e.target.value.split(",").map(k => k.trim()))}
                    className="border rounded px-2 py-1 w-full" />
            </div>
            {/* short description */}
            <div>
                <label className="block font-medium">Mô tả ngắn</label>
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY} // cần đăng ký API key miễn phí
                    value={product.shortDescription}
                    tinymceScriptSrc={tinymceCDN}//"https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.3.0/tinymce.min.js"
                    init={{
                        height: 250,
                        menubar: true,
                        // base_url: "/tinymce", // nơi chứa plugins, skins, themes//
                        base_url: `https://cdn.tiny.cloud/1/${process.env.NEXT_PUBLIC_TINYMCE_API_KEY}/tinymce/6`,//"https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.3.0/",
                        plugins: "advlist autolink lists link image media charmap preview anchor " +
                            "searchreplace visualblocks code fullscreen " +
                            "insertdatetime table help wordcount emoticons",
                        toolbar: "undo redo | formatselect | bold italic underline forecolor backcolor | " +
                            "alignleft aligncenter alignright alignjustify | " +
                            "bullist numlist outdent indent | link image media | " +
                            "table charmap emoticons | removeformat | preview fullscreen help",
                        // Cho phép chọn ảnh từ local 
                        file_picker_types: "image",
                        /*file_picker_callback: (callback: (url: string, meta?: { alt?: string }) => void,
                            value: string,
                            meta: { filetype: string }*/
                        file_picker_callback: (callback: (url: string, meta?: Record<string, any>) => void,
                            value: string,
                            meta: Record<string, any>) => {
                            const input = document.createElement("input");
                            input.setAttribute("type", "file");
                            input.setAttribute("accept", "image/*");

                            input.onchange = (event: Event) => {
                                const target = event.target as HTMLInputElement;
                                const file = target.files?.[0]; if (!file) return;

                                const reader = new FileReader();
                                reader.onload = function () {
                                    // Chèn ảnh dạng Base64 vào nội dung
                                    callback(reader.result as string, { alt: file.name });
                                };
                                reader.readAsDataURL(file);
                            };

                            input.click();
                        }
                    }}
                    onEditorChange={(content) => handleChange("shortDescription", content)}
                />
            </div>
            {/* Mô tả chi tiết bằng TinyMCE */}
            <div>
                <label className="block font-medium">Nội dung chi tiết</label>
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY} // cần đăng ký API key miễn phí
                    value={product.description}
                    tinymceScriptSrc={tinymceCDN}//"https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.3.0/tinymce.min.js"
                    init={{
                        height: 500,
                        menubar: true,
                        // base_url: "/tinymce", // nơi chứa plugins, skins, themes//
                        base_url: `https://cdn.tiny.cloud/1/${process.env.NEXT_PUBLIC_TINYMCE_API_KEY}/tinymce/6`,//"https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.3.0/",
                        plugins: "advlist autolink lists link image media charmap preview anchor " +
                            "searchreplace visualblocks code fullscreen " +
                            "insertdatetime table help wordcount emoticons",
                        toolbar: "undo redo | formatselect | bold italic underline forecolor backcolor | " +
                            "alignleft aligncenter alignright alignjustify | " +
                            "bullist numlist outdent indent | link image media | " +
                            "table charmap emoticons | removeformat | preview fullscreen help",
                        // Cho phép chọn ảnh từ local 
                        file_picker_types: "image",
                        /*file_picker_callback: (callback: (url: string, meta?: { alt?: string }) => void,
                            value: string,
                            meta: { filetype: string }*/
                        file_picker_callback: (callback: (url: string, meta?: Record<string, any>) => void,
                            value: string,
                            meta: Record<string, any>) => {
                            const input = document.createElement("input");
                            input.setAttribute("type", "file");
                            input.setAttribute("accept", "image/*");

                            input.onchange = (event: Event) => {
                                const target = event.target as HTMLInputElement;
                                const file = target.files?.[0]; if (!file) return;

                                const reader = new FileReader();
                                reader.onload = function () {
                                    // Chèn ảnh dạng Base64 vào nội dung
                                    callback(reader.result as string, { alt: file.name });
                                };
                                reader.readAsDataURL(file);
                            };

                            input.click();
                        }
                    }}
                    onEditorChange={(content) => handleChange("description", content)}
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
