// src/components/ProductGrid.tsx
'use client';

import useSWR from 'swr';
import axios from 'axios';
import Image from 'next/image';

type Product = {
    id: string | number;
    name: string;
    price: number;
    salePrice?: number;
    imageUrl?: string;
};

const fetcher = (url: string) =>
    axios.get(url, { baseURL: 'https://api.tonkliplock1000.com' }).then((res) => res.data);

export default function ProductGrid({ locale }: { locale: string }) {
    const { data, error, isLoading } = useSWR<Product[]>(`/products?lang=${locale}`, fetcher);

    if (isLoading) return <div>Đang tải sản phẩm...</div>;
    if (error) return <div className="text-red-600">Không tải được dữ liệu.</div>;
    if (!data || data.length === 0) return <div>Chưa có sản phẩm.</div>;

    return (
        <section aria-label="Sản phẩm mới" className="my-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((p) => (
                    <article key={p.id} className="rounded-lg border p-4 shadow-sm">
                        <div className="relative aspect-square mb-3">
                            {p.imageUrl ? (
                                <Image
                                    src={p.imageUrl}
                                    alt={p.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover rounded-md"
                                />
                            ) : (
                                <div className="bg-gray-100 rounded-md w-full h-full" />
                            )}
                        </div>
                        <h3 className="font-medium">{p.name}</h3>
                        <div className="mt-2">
                            {p.salePrice ? (
                                <>
                                    <span className="text-lg font-semibold text-emerald-600">${p.salePrice}</span>
                                    <span className="text-sm text-gray-500 line-through">${p.price}</span>
                                </>
                            ) : (
                                <span className="text-lg font-semibold">${p.price}</span>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
