"use client";
import { useState, useEffect } from "react";
import {
    TextInput,
    NumberInput,
    Textarea,
    MultiSelect,
    Select,
    Checkbox,
    Button,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";

export default function AddProductForm() {
    const [productName, setProductName] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(980000);
    const [stock, setStock] = useState<number>(0);
    const [N0, setN0] = useState<number>(1);
    // const [deleted, setDeleted] = useState(false);
    // const [subCategory, setSubCategory] = useState<string | null>(null);
    const [subCategories, setSubCategories] = useState<string[]>([]);
    // const [subCategoryOptions, setSubCategoryOptions] = useState<
    //     { value: string; label: string }[]
    // >([]);
    // ✅ Fake data cho subCategoryOptions 
    const subCategoryOptions = [{ value: "1", label: "Điện thoại" },
    { value: "2", label: "Laptop" },
    { value: "3", label: "Phụ kiện" },
    { value: "4", label: "Máy ảnh" },];
    const [files, setFiles] = useState<File[]>([]);

    // Fetch danh mục con từ API
    /*useEffect(() => {
        async function fetchSubCategories() {
            const res = await fetch("https://api.tonkliplock1000.com/subcategories", {
                credentials: "include",
            });
            const data = await res.json();
            setSubCategoryOptions(
                data.map((sc: any) => ({ value: sc.id, label: sc.name }))
            );
        }
        fetchSubCategories();
    }, []);*/

    // Chọn nhiều file
    function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        setFiles(Array.from(e.target.files));
    }

    // Submit form
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("keywords", JSON.stringify(keywords));
        formData.append("shortDescription", shortDescription);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("stock", stock.toString());
        formData.append("N0", N0.toString());
        // formData.append("createdBy", "userId123"); // lấy từ AuthContext thực tế
        // formData.append("subCategory", subCategory || "");
        formData.append("subCategories", JSON.stringify(subCategories));
        // formData.append("deleted", deleted ? "true" : "false");

        // ✅ gửi nhiều file trong cùng payload
        files.forEach((file) => {
            formData.append("media", file);
        });

        const res = await fetch("https://api.tonkliplock1000.com/addProduct", {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        if (res.ok) {
            alert("Thêm sản phẩm thành công!");
        } else {
            const err = await res.json();
            alert("Lỗi thêm sản phẩm: " + err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextInput label="Tên sản phẩm" value={productName} onChange={(e) => setProductName(e.currentTarget.value)} required />
            <MultiSelect label="Keywords" data={[]} value={keywords} onChange={setKeywords} placeholder="Nhập từ khóa..." />
            <Textarea label="Mô tả ngắn" value={shortDescription} onChange={(e) => setShortDescription(e.currentTarget.value)} />
            <RichTextEditor value={description} onChange={setDescription} />
            <input type="file" multiple onChange={handleFiles} />
            <ul>{files.map((f, i) => <li key={i}>{f.name}</li>)}</ul>
            <NumberInput label="Giá" value={price} onChange={(val) => setPrice(val || 0)} />
            <NumberInput label="Tồn kho" value={stock} onChange={(val) => setStock(val || 0)} />
            <NumberInput label="N0" value={N0} onChange={(val) => setN0(val || 1)} required />
            {/* <Select label="Danh mục con" data={subCategoryOptions} value={subCategory} onChange={setSubCategory} /> */}
            {/* <MultiSelect label="Danh mục liên quan" data={subCategoryOptions} value={subCategories} onChange={setSubCategories} /> */}
            <MultiSelect
                label="Danh mục liên quan"
                data={subCategoryOptions}
                value={subCategories}
                onChange={setSubCategories}
            />
            {/* <Checkbox label="Đã xóa" checked={deleted} onChange={(e) => setDeleted(e.currentTarget.checked)} /> */}
            <Button type="submit">Thêm sản phẩm</Button>
        </form>
    );
}
