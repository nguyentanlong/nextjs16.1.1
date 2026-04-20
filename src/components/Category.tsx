"use client"
import { SubCategory, normalizeImage } from "@/lib/api";
// import { slugifyProduct } from "@/lib/slugify";
import Link from "next/link";
import AppImage from "./ImageCatagory";
import { slugifyCategory } from "@/lib/slugify";

export default function Category({ subCategories }: { subCategories: SubCategory[] }) {
    return (
        <>
            {/* ==================== DANH MỤC + PHỐ MUA SẮM ==================== */}
            <section className="categories-section">
                <div className="container">
                    <h2>Danh mục</h2>
                    <div className="categories-carousel">
                        <div className="carousel-track">
                            {subCategories.map((sc) => (
                                <Link key={sc.id} href={`/${sc.slugSub || slugifyCategory(sc.categoryName)}`}>
                                    <AppImage src={normalizeImage(sc.image)}
                                        alt={sc.categoryName}
                                        width={100}
                                        height={100}
                                        className="cat-item"
                                        key={sc.id} />
                                </Link>
                            ))}

                        </div>
                        <button className="carousel-prev">&lt;</button>
                        <button className="carousel-next">{">"}</button>
                    </div>
                </div>
            </section>
        </>
    );
}