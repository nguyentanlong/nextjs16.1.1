// src/components/Pagination.tsx
import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    // baseUrl để build href — ví dụ "" (trang chủ) hoặc "/danh-muc/abc"
    // mặc định dùng ?page= relative
    basePath?: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    basePath = "",
}: PaginationProps) {
    if (totalPages <= 1) return null;

    // Tạo danh sách trang rút gọn: 1 ... 4 5 6 ... 10
    const delta = 2;
    const pages: (number | "...")[] = [];

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            pages.push(i);
        } else if (
            i === currentPage - delta - 1 ||
            i === currentPage + delta + 1
        ) {
            pages.push("...");
        }
    }

    const href = (page: number) =>
        basePath ? `${basePath}?page=${page}` : `?page=${page}`;

    return (
        <ul className="pagination">
            {/* Nút « */}
            <li>
                {currentPage > 1 ? (
                    <Link href={href(currentPage - 1)} scroll={false}>«</Link>
                ) : (
                    <a style={{ pointerEvents: "none", opacity: 0.4 }}>«</a>
                )}
            </li>

            {/* Các số trang */}
            {pages.map((p, i) =>
                p === "..." ? (
                    <li key={`ellipsis-${i}`}>
                        <a style={{ border: "none", pointerEvents: "none" }}>...</a>
                    </li>
                ) : (
                    <li key={p}>
                        <Link
                            href={href(p)}
                            className={currentPage === p ? "active" : ""}
                            scroll={false}
                        >
                            {p}
                        </Link>
                    </li>
                )
            )}

            {/* Nút » */}
            <li>
                {currentPage < totalPages ? (
                    <Link href={href(currentPage + 1)} scroll={false}>»</Link>
                ) : (
                    <a style={{ pointerEvents: "none", opacity: 0.4 }}>»</a>
                )}
            </li>
        </ul>
    );
}