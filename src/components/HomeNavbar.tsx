"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HomeNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Click ra ngoài → đóng menu
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const close = () => setIsOpen(false);
    return (
        <>
            <nav>
                <div className="logo">
                    <Image src="/window.svg" alt="logo" width={64} height={64} />
                    <h1>Tấn Long</h1>
                </div>
                <ul>
                    <li>
                        <Link href="/tan-long">Giới thiệu</Link>
                    </li>
                    <li>
                        <Link href="/san-pham">Sản phẩm</Link>
                    </li>
                    <li>
                        <Link href="/tin-tuc">Tin tức</Link>
                    </li>
                    <li>
                        <Link href="/ien-he">Liên hệ</Link>
                    </li>
                </ul>
                <div
                    className={`bieutuong ${isOpen ? "bieutuong-active" : ""}`}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span className="line" />
                    <span className="line" />
                    <span className="line" />
                </div>
            </nav>
            <div ref={menuRef}>
                <div className={`menudienthoai ${isOpen ? "menudienthoai-open" : ""}`}>
                    <ul>
                        <li>
                            <Link href="/tan-long">Giới thiệu</Link>
                        </li>
                        <li>
                            <Link href="/san-pham">Sản phẩm</Link>
                        </li>
                        <li>
                            <Link href="/tin-tuc">Tin tức</Link>
                        </li>
                        <li>
                            <Link href="/ien-he">Liên hệ</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}