"use client"
import { fetchSubCategories, SubCategory, normalizeImage } from "@/lib/api";
import { slugifyProduct } from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AppImage from "./ImageCatagory";

export default function Category({ SubCategory }: { SubCategory: SubCategory[] }) {
    // interface SubCategory { id: number; categoryName: string; image: string; }
    const [subCategoriesHome, setSubCategoriesHome] = useState<SubCategory[]>([]);
    if (!SubCategory || SubCategory.length === 0) {
        return <div>Chưa có Danh Mục</div>;
    }
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchSubCategories();
            setSubCategoriesHome(data);
        };
        loadData();
    }, []);
    return (
        <>
            {/* ==================== DANH MỤC + PHỐ MUA SẮM ==================== */}
            <section className="categories-section">
                <div className="container">
                    <div className="categories-carousel">
                        <h2>Danh mục</h2>
                        <div className="carousel-track">
                            {subCategoriesHome.map((sc) => (
                                <AppImage src={normalizeImage(sc.image)}
                                    alt={sc.categoryName}
                                    width={100}
                                    height={100}
                                    className="cat-item"
                                    key={sc.id} />
                                // <Link key={sc.id} href={`/${slugifyProduct(sc.categoryName)}`} className="cat-item">
                                //     <Image
                                //         src={normalizeImage(sc.image ? sc.image : "uploads/subcategories/xuong-thue-nguyen-tan-long-1773219281651.jpg")}
                                //         alt={sc.categoryName}
                                //         width={100}
                                //         height={100}
                                //     />
                                //     <p>{sc.categoryName}</p>
                                // </Link>
                            ))}
                            <button className="carousel-prev">&lt;</button>
                            <button className="carousel-next">{">"}</button>
                        </div>


                    </div>
                </div>
            </section>
        </>
    );
}