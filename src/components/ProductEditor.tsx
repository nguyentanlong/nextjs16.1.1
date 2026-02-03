"use client";

import React, { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor),
    { ssr: false, });

interface Product {
    id?: number;
    name: string;
    price: number;
    subCategoryId?: number;
    description: string;
}

interface ProductEditorProps {
    initialProduct?: Product;
    onSave: (product: Product) => void;
}

export default function ProductEditor({ initialProduct, onSave }: ProductEditorProps) {
    const [product, setProduct] = useState<Product>(
        initialProduct || { name: "", price: 0, subCategoryId: undefined, description: "" }
    );

    const handleChange = (field: keyof Product, value: any) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(product);
    };
    // const handleSave = (data: any) => { console.log("Saved product:", data); }

    const tinymceCDN = `https://cdn.tiny.cloud/1/${process.env.NEXT_PUBLIC_TINYMCE_API_KEY}/tinymce/6/tinymce.min.js`;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tên sản phẩm */}
            <div>
                <label className="block font-medium">Tên sản phẩm</label>
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                    required
                />
            </div>

            {/* Giá sản phẩm */}
            <div>
                <label className="block font-medium">Giá</label>
                <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                    required
                />
            </div>

            {/* SubCategoryId */}
            <div>
                <label className="block font-medium">SubCategory ID</label>
                <input
                    type="number"
                    value={product.subCategoryId || ""}
                    onChange={(e) => handleChange("subCategoryId", Number(e.target.value))}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Mô tả chi tiết bằng TinyMCE */}
            <div>
                <label className="block font-medium">Mô tả chi tiết</label>
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY} // cần đăng ký API key miễn phí
                    value={product.description}
                    tinymceScriptSrc={tinymceCDN}
                    init={{
                        height: 500,
                        menubar: true,
                        //base_url: "/tinymce", // nơi chứa plugins, skins, themes//
                        base_url: `https://cdn.tiny.cloud/1/${process.env.NEXT_PUBLIC_TINYMCE_API_KEY}/tinymce/6`,
                        plugins: [
                            "advlist autolink lists link image media charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime table paste help wordcount emoticons", "image"],
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
