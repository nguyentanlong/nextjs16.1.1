export default function Header() {
    return (<>
        {/* HERO BANNER SECTION */}
        <section className="hero-banner">
            <div className="hero-container">
                {/* Bên trái: 2 banner nhỏ */}
                <div className="hero-left">
                    <a href="#" className="banner-small banner-freeship">
                        <img
                            src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/1/30/1142340/Honda-Wr-V.jpeg"
                            alt="Freeship 0đ"
                        />
                    </a>
                    <a href="#" className="banner-small banner-clean">
                        <img
                            src="https://hondaotovovankiet.vn/wp-content/uploads/2023/10/Honda_crv_2023_hondaotovovankiet.vn_.png"
                            alt="Nhà sạch đẹp xinh"
                        />
                    </a>
                </div>
                {/* Bên phải: Slider lớn 3 ảnh */}
                <div className="hero-slider">
                    <div className="slides">
                        <img
                            src="https://eutrip.vn/view/admin/Themes/kcfinder/upload/images/tour-du-lich-ngam-cuc-quang-eutrip.jpg"
                            alt="Slide 1"
                            className="active"
                        />
                        <img
                            src="https://eutrip.vn/view/admin/Themes/kcfinder/upload/images/tour-du-lich-ngam-cuc-quang-7.jpg"
                            alt="Slide 2"
                        />
                        <img
                            src="https://eutrip.vn/view/admin/Themes/kcfinder/upload/images/tour-du-lich-ngam-cuc-quang-eutrip-14.jpg"
                            alt="Slide 3"
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