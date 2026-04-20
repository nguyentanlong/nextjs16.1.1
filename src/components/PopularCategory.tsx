import Link from "next/link";

export default function PopularCategory() {
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
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/inverter-bien-tan.webp"
                            alt="Joyoung"
                        />
                        <p>Joyoung Official Store</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/camera-ngoai-troi-wifi-4mp-tp-link-c520ws.webp"
                            alt="Bear"
                        />
                        <p>Bear Official Store VN</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/inverter-bien-tan.webp"
                            alt="Mỹ Hảo"
                        />
                        <p>Mỹ Hảo Chính Hãng</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/camera-ngoai-troi-wifi-4mp-tp-link-c520ws.webp"
                            alt="Joyoung"
                        />
                        <p>Joyoung Official Store</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/inverter-bien-tan.webp"
                            alt="Bear"
                        />
                        <p>Bear Official Store VN</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/camera-ngoai-troi-wifi-4mp-tp-link-c520ws.webp"
                            alt="Mỹ Hảo"
                        />
                        <p>Mỹ Hảo Chính Hãng</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/inverter-bien-tan.webp"
                            alt="Joyoung"
                        />
                        <p>Joyoung Official Store</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/camera-ngoai-troi-wifi-4mp-tp-link-c520ws.webp"
                            alt="Bear"
                        />
                        <p>Bear Official Store VN</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/inverter-bien-tan.webp"
                            alt="Mỹ Hảo"
                        />
                        <p>Mỹ Hảo Chính Hãng</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/camera-ngoai-troi-wifi-4mp-tp-link-c520ws.webp"
                            alt="Joyoung"
                        />
                        <p>Joyoung Official Store</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/camera-ngoai-troi-wifi-4mp-tp-link-c520ws.webp"
                            alt="Bear"
                        />
                        <p>Bear Official Store VN</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/inverter-bien-tan.webp"
                            alt="Mỹ Hảo"
                        />
                        <p>Mỹ Hảo Chính Hãng</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/camera-ngoai-troi-wifi-4mp-tp-link-c520ws.webp"
                            alt="Joyoung"
                        />
                        <p>Joyoung Official Store</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/inverter-bien-tan.webp"
                            alt="Bear"
                        />
                        <p>Bear Official Store VN</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/camera-ngoai-troi-wifi-4mp-tp-link-c520ws.webp"
                            alt="Mỹ Hảo"
                        />
                        <p>Mỹ Hảo Chính Hãng</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/inverter-bien-tan.webp"
                            alt="Bear"
                        />
                        <p>Bear Official Store VN</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/inverter-bien-tan.webp"
                            alt="Bear"
                        />
                        <p>Bear Official Store VN</p>
                    </Link>
                    <Link href="#" className="shop-item">
                        <img
                            src="https://cameramattroi.com/wp-content/uploads/2025/11/inverter-bien-tan.webp"
                            alt="Bear"
                        />
                        <p>Bear Official Store VN</p>
                    </Link>
                    {/* Thêm thoải mái bao nhiêu shop cũng được, tự động trượt */}
                </div>
                <button className="carousel-prev">&lt;</button>
                <button className="carousel-next">{">"}</button>
            </div>
        </>

    );
}