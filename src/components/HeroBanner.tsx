import { normalizeImage } from "@/lib/api";
import Image from "next/image";

export default function Header() {
    return (<>
        {/* HERO BANNER SECTION */}
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
                {/* Bên phải: Slider lớn 3 ảnh */}
                <div className="hero-slider">
                    <div className="slides">
                        <Image
                            src={normalizeImage("/images/camera-manh-phat-slide.webp")}
                            alt="Năng lượng mặt trời"
                            width={800}
                            height={500}
                            style={{ width: "100%", height: "auto" }}
                            className="active"
                        />
                        <Image
                            src={normalizeImage("/images/binh-chua-chay-manh-phat-slide.webp")}
                            alt="Thiết bị pccc"
                            width={800}
                            height={600}
                            style={{ width: "100%", height: "auto" }}
                        />
                        <Image
                            src={normalizeImage("/images/bao-ho-lao-dong-manh-phat-slide.webp")}
                            alt="Camera giám sát 306"
                            width={800}
                            height={600}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </div>
                    {/* Nút prev/next */}
                    <button className="prev">
                        <i className="fa-solid fa-angle-left" style={{ color: "#ff3300" }} />
                    </button>
                    <button className="next">
                        <i className="fa-solid fa-angle-right" style={{ color: "#ff3300" }} />
                    </button>
                    {/* Dots */}
                    <div className="dots">
                        <span className="dot active" data-slide={0} />
                        <span className="dot" data-slide={1} />
                        <span className="dot" data-slide={2} />
                    </div>
                </div>
            </div>
        </section>
    </>
    );
}