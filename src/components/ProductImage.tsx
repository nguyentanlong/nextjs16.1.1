"use client";

import { useState } from "react";
import Image from "next/image";
import { normalizeImage } from "@/lib/api";

interface ProductImagesProps {
    productName: string;
    media: string[];
}

export default function ProductImages({ productName, media }: ProductImagesProps) {
    const [mainImg, setMainImg] = useState(media[0]);
    // Lấy phần mở rộng để kiểm tra
    const ext = mainImg?.split(".").pop()?.toLowerCase();
    const isVideo = ["mp4", "webm", "ogg"].includes(ext || "");
    return (

        <div className="product-images">
            <div className="main-image">
                {/*<Image
                    src={mainImg}
                    alt={productName}
                    id="main-img"
                    width={578}
                    height={578}
                />*/}
                {isVideo ? (
                    <video
                        src={normalizeImage(mainImg)}//.startsWith("/") ? mainImg : `/${mainImg}`
                        controls
                        width={578}
                        height={578}
                    />
                ) : (
                    <Image
                        src={normalizeImage(mainImg)}//.startsWith("/") ? mainImg : `/${mainImg}`
                        alt={productName}
                        width={578}
                        height={578}
                    />
                )}
            </div>
            <div className="thumbnail-list">
                {/*media.map((img, i) => (
                    <Image
                        key={i}
                        src={img}
                        alt={`${productName} thumbnail ${i}`}
                        width={80}
                        height={80}
                        className={`thumb ${img === mainImg ? "active" : ""}`}
                        onClick={() => setMainImg(img)}
                    />
                ))*/}
                {media.map((m, idx) => {
                    const extThumb = m.split(".").pop()?.toLowerCase();
                    const isVideoThumb = ["mp4", "webm", "ogg"].includes(extThumb || "");
                    return (
                        <div key={idx} onClick={() => setMainImg(m)}>
                            {isVideoThumb ? (
                                <video
                                    src={normalizeImage(m)}//.startsWith("/") ? m : `/${m}`
                                    width={100}
                                    height={100}
                                />
                            ) : (
                                <Image
                                    src={normalizeImage(m)}//.startsWith("/") ? m : `/${m}`
                                    alt={`${productName}-${idx}`}
                                    width={100}
                                    height={100}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
