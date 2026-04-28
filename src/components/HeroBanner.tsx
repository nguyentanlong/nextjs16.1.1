// src/components/HeroBanner.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { normalizeImage } from "@/lib/api";
import Image from "next/image";

const SLIDES = [
    { src: "/images/camera-manh-phat-slide.webp", alt: "Năng lượng mặt trời" },
    { src: "/images/binh-chua-chay-manh-phat-slide.webp", alt: "Thiết bị pccc" },
    { src: "/images/bao-ho-lao-dong-manh-phat-slide.webp", alt: "Camera giám sát 306" },
];

const AUTO_PLAY_INTERVAL = 4000; // 4 giây

export default function HeroBanner() {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto play
    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, AUTO_PLAY_INTERVAL);
    };

    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    useEffect(() => {
        startTimer();
        return () => stopTimer(); // cleanup khi unmount
    }, []);

    const goTo = (index: number) => {
        setCurrent(index);
        // Reset timer khi click thủ công
        stopTimer();
        startTimer();
    };

    const goPrev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
    const goNext = () => goTo((current + 1) % SLIDES.length);

    return (
        <section className="hero-banner">
            <div className="hero-container">

                {/* Bên trái: 2 banner nhỏ */}
                <div className="hero-left">
                    <a href="#" className="banner-small banner-freeship">
                        <Image
                            src={normalizeImage("/images/co-dien-manh-phat.webp")}
                            alt="Camera-giam-sat"
                            width={800}
                            height={600}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </a>
                    <a href="#" className="banner-small banner-clean">
                        <Image
                            src={normalizeImage("/images/w-electronic-slide-1.webp")}
                            alt="Thiết bị pccc"
                            width={800}
                            height={600}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </a>
                </div>

                {/* Bên phải: Slider */}
                <div className="hero-slider">
                    <div className="slides">
                        {SLIDES.map((slide, i) => (
                            <Image
                                key={slide.src}
                                src={normalizeImage(slide.src)}
                                alt={slide.alt}
                                width={800}
                                height={600}
                                style={{ width: "100%", height: "auto" }}
                                className={i === current ? "active" : ""}
                                // ✅ Preload ảnh đầu tiên, lazy load các ảnh còn lại
                                priority={i === 0}
                            />
                        ))}
                    </div>

                    {/* Nút prev/next */}
                    <button className="prev" onClick={goPrev} aria-label="Ảnh trước">
                        <i className="fa-solid fa-angle-left" style={{ color: "#ff3300" }} />
                    </button>
                    <button className="next" onClick={goNext} aria-label="Ảnh tiếp theo">
                        <i className="fa-solid fa-angle-right" style={{ color: "#ff3300" }} />
                    </button>

                    {/* Dots */}
                    <div className="dots">
                        {SLIDES.map((_, i) => (
                            <span
                                key={i}
                                className={`dot ${i === current ? "active" : ""}`}
                                onClick={() => goTo(i)}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}