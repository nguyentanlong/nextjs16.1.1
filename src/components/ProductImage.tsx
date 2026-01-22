"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImagesProps {
    productName: string;
    media: string[];
}

export default function ProductImages({ productName, media }: ProductImagesProps) {
    const [mainImg, setMainImg] = useState(media[0]);

    return (

        <div className="product-images">
            <div className="main-image">
                <Image
                    src={mainImg}
                    alt={productName}
                    id="main-img"
                    width={578}
                    height={578}
                />
            </div>
            <div className="thumbnail-list">
                {media.map((img, i) => (
                    <Image
                        key={i}
                        src={img}
                        alt={`${productName} thumbnail ${i}`}
                        width={80}
                        height={80}
                        className={`thumb ${img === mainImg ? "active" : ""}`}
                        onClick={() => setMainImg(img)}
                    />
                ))}
            </div>
        </div>
    );
}
