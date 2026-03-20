import { useEffect, useState } from "react";
import { searchProducts } from "@/lib/api";

export function useSearchProduct(keyword: string) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword.trim()) {
            setProducts([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            setLoading(true);

            const result = await searchProducts(keyword);
            setProducts(result);

            setLoading(false);
        }, 400); // 🔥 debounce

        return () => clearTimeout(delayDebounce);
    }, [keyword]);

    return { products, loading };
}