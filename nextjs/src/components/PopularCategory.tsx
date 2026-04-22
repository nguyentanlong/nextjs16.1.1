"use client"
import { Category, normalizeImage } from "@/lib/api";
import Link from "next/link";
import AppImage from "./ImageCatagory";
import { slugifyCategory } from "@/lib/slugify";

export default function PopularCategory({ categories }: { categories: Category[] }) {
    return (
        <>
            {/* PHỐ MUA SẮM */}
            <div className="section-header">
                <h2>Phố mua sắm</h2>
                <Link href="#" className="view-all">
                    Xem tất cả
                </Link>
            </div>
            <div className="shops-carousel">
                <div className="carousel-track">
                    {categories.map((sc) => (
                        <Link key={sc.id} href={`/${sc.slugCate || slugifyCategory(sc.categoryName)}`} className="shop-item">
                            <AppImage src={normalizeImage(sc.image)}
                                alt={sc.categoryName}
                                width={100}
                                height={100}
                                className="cat-item"
                                key={sc.id} />
                            <span className="categories-name">{sc.categoryName}</span>
                        </Link>

                    ))}
                    {/* Thêm thoải mái bao nhiêu shop cũng được, tự động trượt */}
                </div>
                <button className="carousel-prev">&lt;</button>
                <button className="carousel-next">{">"}</button>
            </div>
        </>

    );
}