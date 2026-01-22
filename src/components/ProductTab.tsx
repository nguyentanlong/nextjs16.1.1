"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductTabsProps {
    description: string;
}

export default function ProductTabs({ description }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<"desc" | "video" | "guide">("desc");

    return (
        <div className="product-tabs">
            <div className="tab-buttons">
                <button
                    className={`tab-btn ${activeTab === "desc" ? "active" : ""}`}
                    onClick={() => setActiveTab("desc")}
                >
                    Nội dung chi tiết
                </button>
                <button
                    className={`tab-btn ${activeTab === "video" ? "active" : ""}`}
                    onClick={() => setActiveTab("video")}
                >
                    Video hướng dẫn
                </button>
                <button
                    className={`tab-btn ${activeTab === "guide" ? "active" : ""}`}
                    onClick={() => setActiveTab("guide")}
                >
                    Hướng dẫn lắp đặt
                </button>
            </div>

            <div className="tab-content">
                {activeTab === "desc" && (
                    <div id="desc" className="tab-pane active">
                        <p>{description}</p>
                    </div>
                )}

                {activeTab === "video" && (
                    <div id="video" className="tab-pane active">
                        <iframe
                            width="100%"
                            height={500}
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            frameBorder={0}
                            allowFullScreen
                        />
                    </div>
                )}

                {activeTab === "guide" && (
                    <div id="guide" className="tab-pane active">
                        <h3>Hướng dẫn lắp đặt nhanh</h3>
                        <Image
                            src="https://cameramattroi.com/wp-content/uploads/2025/10/camera-nlmt-pccc-manh-phat.webp"
                            alt="Hướng dẫn lắp đặt"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
