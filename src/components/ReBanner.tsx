export default function ReBanner() {
    return (
        <>
            {/* ==================== BANNER ĐÔI SIÊU ĐẸP ==================== */}
            <section className="double-banner">
                <div className="banner-container">
                    {/* Banner trái */}
                    <a href="#" className="banner-item left">
                        <img
                            src="https://www.trieuhaotravel.vn/Uploads/images/nttnhu/HQ%208-min_1.png_medium.webp"
                            alt="Webcams 2024"
                            className="banner-bg"
                        />
                        <div className="banner-content">
                            <span className="banner-tag">NEW TECHNOLOGIES</span>
                            <h2>WEBCAMS 2024</h2>
                            <p>Auctor litore ultrices suscipit malesuada nunc a netus</p>
                            <button className="btn-shop">Shop more</button>
                        </div>
                    </a>
                    {/* Banner phải */}
                    <a href="#" className="banner-item right">
                        <img
                            src="https://www.trieuhaotravel.vn/Uploads/images/nttnhu/HQ%207-min_1.png_medium.webp"
                            alt="Leather Cases"
                            className="banner-bg"
                        />
                        <div className="banner-content">
                            <span className="banner-tag">APPLE ACCESSORIES</span>
                            <h2>LEATHER CASES</h2>
                            <p>Condimentum curabitur vestibulum dapibus porttitor adipiscing</p>
                            <button className="btn-shop">Shop more</button>
                        </div>
                    </a>
                </div>
            </section>
        </>

    );
}