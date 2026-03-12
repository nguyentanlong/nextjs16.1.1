"use client";
import React, { useContext, useEffect, useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { ca } from "zod/locales";
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
    // có thể thêm shortDescription, keywords, stock… nếu cần
    files?: File[]; // ✅ thêm để lưu danh sách file
}


interface ProductEditorProps {
    initialProduct?: Product;
    onSave: (product: Product) => void;
}

export default function ProductEditor({ initialProduct, onSave }: ProductEditorProps) {
    const [product, setProduct] = useState<Product>(() =>
        initialProduct ?? {
            productName: "",
            price: 2676,
            subCategoryId: undefined,
            shortDescription: "",
            description: "",
            keywords: [],
            stock: 3,
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
            formData.append("productName", product.productName ?? "từ nextjs");
            formData.append("price", product.price.toString() ?? "2676");
            if (product.subCategoryId) {
                formData.append("subCategoryId", product.subCategoryId.toString() ?? "2");
            }
            formData.append("shortDescription", product.shortDescription ?? "từ nextjs");
            formData.append("description", product.description) ?? "từ nextjs";
            // keywords là mảng → stringify để backend parse 
            // formData.append("keywords", JSON.stringify(product.keywords));
            /*product.keywords.forEach(k => {
                formData.append("keywords", k.trim());
            });*/
            formData.append("stock", product.stock?.toString() ?? "0"); // ✅ thêm dòng này
            /*            if (product.files && product.files.length > 0) {
                            product.files.forEach(file => {
                                formData.append("files", file); // ✅ đúng key cho Multer FilesInterceptor
                            });
                        }*/
            product.keywords.forEach(k => {
                if (k.trim()) {
                    formData.append("keywords", k.trim());
                }
            });

            const fileInput = document.querySelector<HTMLInputElement>("#productFiles");
            if (fileInput?.files) {
                for (const file of fileInput.files) {
                    // console.log("APPEND:", file.name);
                    formData.append("files", file);
                }
            }
            // Log tất cả key/value trong FormData 
            /*for (const [key, value] of formData.entries()) {
                console.log("FormData:", key, value);
            }*/

            const res = await fetch("/api/products", {
                method: "POST",
                headers: { Authorization: `Bearer ${accessToken}` },
                body: formData,
                credentials: "include",
            });
            // console.log("AccessToken in ProductEditor:", accessToken);
            // const text = await res.text();
            // console.log("Response raw body:", text);
            // try {
            //     const data = JSON.parse(text);
            //     console.log("Parsed JSON:", data);
            // }
            // catch { console.log("Response is not JSON"); }
            if (res.ok) {
                const data = await res.json();
                console.log("✅ Product created:", data);
                alert("Thêm sản phẩm thành công!");
            }
            else {
                // const err = await res.json();
                // console.error("❌ Error:", err);
                alert("Có lỗi khi thêm sản phẩm");
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
                        // images_upload_url: 'https://api.tonkliplock1000.com/api/mediaasset',
                        // automatic_uploads: true,
                        // Cho phép chọn ảnh từ local 
                        // file_picker_types: "image",
                        /*file_picker_callback: (callback: (url: string, meta?: { alt?: string }) => void,
                            value: string,
                            meta: { filetype: string }*/
                        /* file_picker_callback: (callback: (url: string, meta?: Record<string, any>) => void,
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
                         }*/
                        automatic_uploads: true,
                        images_upload_handler: uploadHandler,
                        // Viết hàm với type đã định nghĩa

                        /*images_upload_handler: async (
                            blobInfo: { blob: () => Blob; filename: () => string },
                            success: (url: string) => void,
                            failure: (err: string) => void
                        ) => {
                            try {
                                const formData = new FormData();
                                // chú ý: key phải là 'filesDesc' để khớp với interceptor
                                formData.append('filesDesc', blobInfo.blob(), blobInfo.filename());

                                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload-description`, {
                                    method: 'POST',
                                    body: formData,
                                    // credentials: 'include',
                                });

                                const data = await res.json();
                                // API trả về [{ location: '/uploads/YYYY-MM-DD/filename.png' }]
                                success(data[0].location);
                            } catch (err: any) {
                                failure("Upload failed: " + err.message);
                            }
                        },*/
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
