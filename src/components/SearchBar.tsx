// src/components/SearchBar.tsx
'use client';

import { searchProduct } from "@/lib/api";
import { useEffect, useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (query.trim()) {
                try {
                    const data = await searchProduct(query); setResults(data);
                } catch (err) { console.error(err); }
            }
            else { setResults([]); }
        }, 300); // debounce 300ms 
        return () => clearTimeout(timeout);
    }, [query]);
    return (
        // <form className="search-bar" role="search" aria-label="Tìm kiếm sản phẩm">
        //     <input
        //         type="text"
        //         name="q"
        //         placeholder="I am shopping for..."
        //         aria-label="Search input"
        //     />
        //     <button type="submit" aria-label="Search">
        //         🔍
        //     </button>
        <form className="search-form" role="search">
            <div className="search-wrapper">
                <input id="searchBox" type="text"
                    placeholder="Nhập từ khóa cần tìm"
                    aria-label="Tìm kiếm sản phẩm" value={query} onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">🔍</button>
            </div>
            {results.length > 0 && (
                <ul id="suggestBox"
                    style={{
                        // display: "none",
                        position: "absolute",
                        background: "rgb(164 81 246)",
                        border: "1px solid #ddd",
                        marginTop: 5,
                        width: "auto",
                        listStyle: "none",
                        padding: 0,
                        color: 'aliceblue',
                    }}
                >
                    {results.map((item, idx) => (
                        <li
                            key={idx}
                            style={{ padding: "8px", cursor: "pointer" }}
                            onClick={() => setQuery(item.categoryName)} // lấy categoryName
                        >
                            {/* Hiển thị categoryName */}
                            <strong>{item.categoryName}</strong>

                            {/* Nếu có products thì hiển thị thêm productName */}
                            {item.products && item.products.length > 0 && (
                                <ul style={{ marginLeft: 15 }}>
                                    {item.products.map((p: any, pIdx: number) => (
                                        <li
                                            key={pIdx}
                                            style={{ fontSize: "1em", color: "#ffffff", cursor: "pointer" }}
                                            onClick={() => setQuery(p.productName)}
                                        >
                                            {p.productName}
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
