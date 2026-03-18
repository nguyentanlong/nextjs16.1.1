// hooks/useSearchProduct.ts
/*import { useState, useEffect } from "react";
import { searchProduct } from "@/lib/api"; // giả sử bạn có hàm này

export function useSearchProduct(query: string) {
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (query.trim()) {
                try {
                    const data = await searchProduct(query);
                    setResults(data);
                } catch (err) {
                    console.error(err);
                }
            } else {
                setResults([]);
            }
        }, 300); // debounce 300ms

        return () => clearTimeout(timeout);
    }, [query]);

    return results;
}*/
import { useEffect, useState } from "react";
import { searchProduct } from "@/lib/api";

export function useSearchProduct(keyword: string) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword.trim()) {
            setProducts([]);
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);

            const res = await searchProduct(keyword);
            setProducts(res);

            setLoading(false);
        }, 400); // 🔥 debounce 400ms

        return () => clearTimeout(timeout);
    }, [keyword]);

    return { products, loading };
}