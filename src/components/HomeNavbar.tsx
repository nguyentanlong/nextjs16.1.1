import Image from "next/image";
import Link from "next/link";

export default function HomeNavbar() {
    return (
        <>
            <nav>
                <div className="logo">
                    <Image src="/window.svg" alt="logo" width={64} height={64} />
                    <h1>LOGO</h1>
                </div>
                <ul>
                    <li>
                        <Link href="#">Giới thiệu</Link>
                    </li>
                    <li>
                        <Link href="#">Sản phẩm</Link>
                    </li>
                    <li>
                        <Link href="#">Tin tức</Link>
                    </li>
                    <li>
                        <Link href="#">Liên hệ</Link>
                    </li>
                </ul>
                <div className="hamburger">
                    <span className="line" />
                    <span className="line" />
                    <span className="line" />
                </div>
            </nav>
            <div className="menubar">
                <ul>
                    <li>
                        <Link href="#">Giới thiệu</Link>
                    </li>
                    <li>
                        <Link href="#">Sản phẩm</Link>
                    </li>
                    <li>
                        <Link href="#">Tin tức</Link>
                    </li>
                    <li>
                        <Link href="#">Liên hệ</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}