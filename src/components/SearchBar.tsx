"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchProduct } from "@/hook/useSearchProduct";
import Link from "next/link";
import { slugifyProduct } from "@/lib/slugify";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [showSuggest, setShowSuggest] = useState(false);
    const results = useSearchProduct(query);
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
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggest(true);
                    }}
                />
                <button type="submit">🔍</button>
            </div>

            {showSuggest && results.length > 0 && (
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
                    {results.map((item, idx) => (
                        <li
                            key={idx}
                            style={{ padding: "8px", cursor: "pointer" }}
                        // onClick={() => handleCategoryClick(item.categoryName)}
                        >
                            <strong><Link href={`/${slugifyProduct(item.categoryName)}`}>{item.categoryName}</Link></strong>
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
                                            <Link href={`/${slugifyProduct(p.productName)}`} >{/*className="product-link"*/}
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
