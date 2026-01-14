export default function Footer() {
    return (
        <>
            {/* ==================== FOOTER SIÊU ĐẸP ==================== */}
            <footer className="site-footer">
                <div className="container footer-container">
                    {/* Cột 1: Logo + Mô tả */}
                    <div className="footer-col logo-col">
                        <h2 className="footer-logo">
                            MANH <span>PHÁT</span>
                        </h2>
                        <p className="footer-desc">
                            Manh Phát được thành lập với mong muốn tạo ra một môi trường làm việc
                            chuyên nghiệp, và cung cấp giải pháp tối ưu trong lĩnh vực camera giám
                            sát, năng lượng mặt trời, và điện cơ.
                        </p>
                        <div className="footer-contact">
                            <p>
                                <span>Location</span> 51, ĐT744, kp Phú Thọ, p Phú An, HCM
                            </p>
                            <p>
                                <span>Phone</span> Phone: 0934 181 151
                            </p>
                            <p>
                                <span>Email</span> congtytnhcodienmanhphat@gmail.com
                            </p>
                        </div>
                    </div>
                    {/* Cột 2: Bản đồ Google Maps */}
                    <div className="footer-col map-col">
                        <h3>CHỈ ĐƯỜNG</h3>
                        <div className="map-wrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610934259323!2d106.7894596148005!3d10.83445779228892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e1e6396e13%3A0x74b745b6f0e1c8c!2sCTY%20TNHH%20C%C6%A0%20%C4%90I%E1%BB%86N%20MANH%20PH%C3%81T!5e0!3m2!1svi!2s!4v1710000000000"
                                width="100%"
                                height={300}
                                style={{ border: 0 }}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                    {/* Cột 3: Liên kết mạng xã hội */}
                    <div className="footer-col social-col">
                        <h3>LIÊN KẾT</h3>
                        <ul className="social-links">
                            <li>
                                <a href="#">Facebook kỹ thuật</a>
                            </li>
                            <li>
                                <a href="#">Facebook kinh doanh</a>
                            </li>
                            <li>
                                <a href="#">Zalo kỹ thuật</a>
                            </li>
                            <li>
                                <a href="#">Zalo kinh doanh</a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Dòng copyright */}
                <div className="footer-bottom">
                    <div className="container">
                        <p>
                            © 2025 Manh Phát. Đã đăng ký bản quyền. Design with Love by Đệ tử
                            &amp; Sư phụ
                        </p>
                    </div>
                </div>
            </footer>
        </>

    );
}