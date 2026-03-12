// hooks/useSubCategories.ts
import { useState, useEffect } from "react";
import { fetchSubCategories } from "@/lib/api"; // đường dẫn tuỳ bạn

import type { SubCategory } from "@/styles/types";

export function useSubCategories() {
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchSubCategories();
                console.log("Data của hook: ", data);
                setSubCategories(data);
            } catch (err) {
                console.error("Error fetching subcategories:", err);
            } finally {
                setLoading(false);
            }
        };
        console.log("Subcategiries của hook: ", subCategories);
        console.log("LoadDate của hook: ", loadData);
        loadData();
    }, []);

    return { subCategories, loading };
}
