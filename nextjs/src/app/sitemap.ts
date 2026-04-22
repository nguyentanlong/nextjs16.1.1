import type { MetadataRoute } from 'next'
import { fetchAllProducts } from '@/lib/api'

export interface Product {
    id: string;
    productName: string;
    price: number;
    stock: number;
    shortDescription: string;
    media: string[];
    slugP: string; // thêm dòng này
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await fetchAllProducts()

    const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
        url: `${p.slugP}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const, // dùng literal type
        priority: 0.8,
    }))

    return [
        {
            url: 'https://tanlong.work.gd/',
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: 'https://tanlong.work.gd/tat-ca-san-pham',
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        ...productUrls,
    ]
}
