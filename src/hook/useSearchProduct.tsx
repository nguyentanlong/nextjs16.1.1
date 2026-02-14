// hooks/useSearchProduct.ts
import { useState, useEffect } from "react";
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
}
