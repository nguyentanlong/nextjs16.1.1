"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchProduct } from "@/hook/useSearchProduct";
import Link from "next/link";

export default function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const [showSuggest, setShowSuggest] = useState(false);
    // const results = useSearchProduct(query);
    const { products, loading } = useSearchProduct(keyword);
    const suggestRef = useRef<HTMLUListElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestRef.current &&
                !suggestRef.current.contains(event.target as Node)
            ) {
                setShowSuggest(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /*const handleCategoryClick = (categoryName: string) => {
        setQuery(categoryName);
        setShowSuggest(false);
        // router.push(`/category/${categoryName}`);
    };

    const handleProductClick = (productName: string) => {
        setQuery(productName);
        setShowSuggest(false);
        // router.push(`/product/${productName}`);
        // <Link href={`/${slugifyProduct(p.productName)}`} className="product-link"></Link>
    };*/

    return (
        <form className="search-form" role="search">
            <div className="search-wrapper">
                <input
                    id="searchBox"
                    type="text"
                    placeholder="Nhập từ khóa cần tìm"
                    aria-label="Tìm kiếm sản phẩm"
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value.trimStart());
                        setShowSuggest(true);
                    }}
                />
                <button type="submit">🔍</button>
            </div>
            {loading && <div>Đang tìm...</div>}

            {!loading && keyword && products.length === 0 && (
                <div>Không tìm thấy sản phẩm</div>
            )}
            {showSuggest && products.length > 0 && (
                <ul
                    id="suggestBox"
                    className="suggestBox"
                    ref={suggestRef}
                    style={{
                        position: "absolute",
                        background: "rgb(164 81 246)",
                        border: "1px solid #ddd",
                        borderRadius: "15px",
                        marginTop: 5,
                        width: "auto",
                        listStyle: "none",
                        padding: 0,
                        color: "aliceblue",
                        maxHeight: "200px",       // giới hạn chiều cao
                        overflowY: "auto",        // bật thanh cuộn dọc
                    }}
                >
                    {products.map((item, idx) => (
                        <li
                            key={idx}
                            style={{ padding: "8px", cursor: "pointer" }}
                        // onClick={() => handleCategoryClick(item.categoryName)}
                        >
                            <strong><Link href={`/${item.slugP}`}>{item.categoryName}</Link></strong>
                            {item.products && item.products.length > 0 && (
                                <ul style={{ marginLeft: 15 }}>
                                    {item.products.map((p: any, pIdx: number) => (
                                        <li
                                            key={pIdx}
                                            style={{
                                                fontSize: "1em",
                                                color: "#ffffff",
                                                cursor: "pointer",
                                            }}
                                        // onClick={() => handleProductClick(p.productName)}
                                        >
                                            <Link href={`/${p.slugP}`} >{/*className="product-link"*/}
                                                {p.productName}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
}
