import Image from "next/image";
import Link from "next/link";

export default function ReBanner() {
    return (
        <>
            {/* ==================== BANNER ĐÔI SIÊU ĐẸP ==================== */}
            <section className="double-banner">
                <div className="banner-container">
                    {/* Banner trái */}
                    <Link href="#" className="banner-item left">
                        <Image
                            src="/images/binh-chua-chay-goc-nuoc-figo.webp"
                            alt="binh chua chay goc nuoc"
                            width={800}
                            height={600}
                            style={{ width: "100%", height: "auto" }}
                            className="banner-bg"
                        />
                        <div className="banner-content">
                            <span className="banner-tag">Sản phẩm mới</span>
                            <h2>Bình chữa cháy gốc nước</h2>
                            <p>Chữa cháy được tất cả loại đám cháy</p>
                            <button className="btn-shop">Xem nhiều hơn</button>
                        </div>
                    </Link>
                    {/* Banner phải */}
                    <Link href="#" className="banner-item right">
                        <Image
                            src="/images/binh-chua-chay-goc-nuoc-manh-phat.webp"
                            alt="bình chữa cháy gốc nước"
                            width={800}
                            height={600}
                            style={{ width: "100%", height: "auto" }}
                            className="banner-bg"
                        />
                        <div className="banner-content">
                            <span className="banner-tag">PCCC</span>
                            <h2>Thiết bị chữa cháy</h2>
                            <p>Có tem kiểm định chất lượng của nhà nước</p>
                            <button className="btn-shop">Xem nhiều hơn</button>
                        </div>
                    </Link>
                </div>
            </section>
        </>

    );
}