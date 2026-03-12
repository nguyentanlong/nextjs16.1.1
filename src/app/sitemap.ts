import type { MetadataRoute } from 'next'
import { fetchAllProducts } from '@/lib/api'
import { slugifyProduct } from "@/lib/slugify";

export interface Product {
    id: string;
    productName: string;
    price: number;
    stock: number;
    shortDescription: string;
    media: string[];
    slug: string; // thêm dòng này
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await fetchAllProducts()

    const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
        url: `https://tanlong.cameramattroi.com/${slugifyProduct(p.productName)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const, // dùng literal type
        priority: 0.8,
    }))

    return [
        {
            url: 'https://tanlong.cameramattroi.com/',
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: 'https://tanlong.cameramattroi.com/products',
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        ...productUrls,
    ]
}
