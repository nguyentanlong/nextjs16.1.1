"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugifyProduct } from "@/lib/slugify";

interface Product {
    id: string;
    productName: string;
    price: number;
    media: string[];
    stock: number;
    subCategoryID: number;
}

interface RelatedProductsProps {
    subCategoryID: number;
    products: Product[];
}

export default function RelatedProducts({ subCategoryID, products }: RelatedProductsProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const items = products.length;
    const visible = 5; // số item hiển thị cùng lúc

    useEffect(() => {
        const track = trackRef.current;
        if (!track || items === 0) return;

        const update = () => {
            const width = track.children[0].clientWidth + 20; // cộng margin
            track.style.transform = `translateX(-${index * width}px)`;
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [index, items]);

    const handleNext = () => {
        setIndex((prev) => (prev < items - visible ? prev + 1 : 0));
    };

    const handlePrev = () => {
        setIndex((prev) => (prev > 0 ? prev - 1 : items - visible));
    };

    return (
        <div className="related-products">
            <h2>Sản phẩm cùng danh mục</h2>
            <div className="related-carousel">
                <div className="carousel-track" ref={trackRef}>
                    {products.map((p, i) => (
                        <Link key={p.id} href={`/${slugifyProduct(p.productName)}`}>
                            <div className="related-card">
                                <Image
                                    src={p.media[0]}
                                    alt={`Sản phẩm liên quan ${i}`}
                                    width={100}
                                    height={100}
                                />
                                <h4>{p.productName}</h4>
                                <p className="price">{Number(p.price).toLocaleString("vi-VN")} ₫</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <button className="carousel-prev" onClick={handlePrev}>&lt;</button>
                <button className="carousel-next" onClick={handleNext}>{">"}</button>
                <span
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        color: "orange",
                        paddingTop: 15,
                    }}
                >
                    Xem Tất cả
                </span>
            </div>

        </div>
    );
}
