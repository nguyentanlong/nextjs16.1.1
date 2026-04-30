// src/components/ProductTable.tsx
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/lib/api";


interface Props {
  products: Product[];
  total: number;
  currentPage: number;
  search: string;
}

const LIMIT = 10;

export default function ProductTable({ products, total, currentPage, search }: Props) {
  const router = useRouter();
  const { accessToken } = useAuth(); // ✅ lấy token từ AuthContext để gọi API xóa
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(search);
  const totalPages = Math.ceil(total / LIMIT);

  // ── Xóa sản phẩm ─────────────────────────────────────────
  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa sản phẩm "${name}"?`)) return;
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (res.ok) {
      startTransition(() => router.refresh()); // ✅ refresh server component
    } else {
      alert("Xóa thất bại!");
    }
  }

  // ── Search ───────────────────────────────────────────────
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      router.push(`?search=${searchInput}&page=1`);
    });
  }

  return (
    <>
      {/* Search */}
      <form onSubmit={handleSearch} style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Tìm tên sản phẩm..."
          style={{ padding: "6px 12px", borderRadius: 4, border: "1px solid #ccc", flex: 1 }}
        />
        <button type="submit" style={{ padding: "6px 16px", borderRadius: 4, background: "#8839ef", color: "#fff", border: "none", cursor: "pointer" }}>
          Tìm
        </button>
        {search && (
          <button type="button" onClick={() => { setSearchInput(""); router.push("?page=1"); }}
            style={{ padding: "6px 12px", borderRadius: 4, border: "1px solid #ccc", cursor: "pointer" }}>
            Xóa
          </button>
        )}
      </form>

      {/* Table wrapper responsive */}
      <div style={{ overflowX: "auto", borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700, background: "#fff" }}>
          <thead>
            <tr style={{ background: "#8839ef", color: "#fff" }}>
              <th style={th}>STT</th>
              <th style={th}>Tên sản phẩm</th>
              <th style={th}>Keyword</th>
              <th style={th}>Mô tả ngắn</th>
              <th style={th}>Hiển thị</th>
              <th style={th}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: 24, color: "#888" }}>
                  Không có sản phẩm nào
                </td>
              </tr>
            ) : (
              products.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f0ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafafa")}
                >
                  {/* STT */}
                  <td style={td}>{(currentPage - 1) * LIMIT + i + 1}</td>

                  {/* Tên sản phẩm */}
                  <td style={{ ...td, fontWeight: 500, minWidth: 160 }}>
                    {p.productName}
                  </td>

                  {/* Keywords */}
                  <td style={{ ...td, minWidth: 140 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {(p.keywords ?? []).map((kw, j) => (
                        <span key={j} style={{
                          background: "#00897b", color: "white",
                          borderRadius: 4, padding: "2px 6px", fontSize: 12
                        }}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Mô tả ngắn — strip HTML */}
                  <td style={{ ...td, minWidth: 200, maxWidth: 300 }}>
                    <div style={{
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden",
                      fontSize: 13, color: "#555"
                    }}
                      dangerouslySetInnerHTML={{
                        __html: p.shortDescription ?? ""
                      }}
                    />
                  </td>

                  {/* Hiển thị */}
                  <td style={{ ...td, textAlign: "center" }}>
                    <span style={{
                      display: "inline-block", padding: "2px 10px", borderRadius: 12,
                      fontSize: 12, fontWeight: 600,
                      // background: p.isActive ? "#e6f9f0" : "#ffeaea",
                      // color: p.isActive ? "#27ae60" : "#e74c3c",
                    }}>
                      {p.N0}
                    </span>
                  </td>

                  {/* Thao tác */}
                  <td style={{ ...td, textAlign: "center", whiteSpace: "nowrap" }}>
                    <Link
                      href={`/admin/san-pham/${p.id}`}
                      style={{
                        display: "inline-block", marginRight: 8,
                        padding: "4px 12px", borderRadius: 4,
                        background: "#3498db", color: "#fff",
                        textDecoration: "none", fontSize: 13,
                      }}
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.productName)}
                      disabled={isPending}
                      style={{
                        padding: "4px 12px", borderRadius: 4, border: "none",
                        background: "#e74c3c", color: "#fff",
                        cursor: isPending ? "not-allowed" : "pointer", fontSize: 13,
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20, gap: 8 }}>
        {currentPage > 1 && (
          <Link href={`?page=${currentPage - 1}&search=${search}`}
            style={pageBtn}>«</Link>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link key={p} href={`?page=${p}&search=${search}`}
            style={{ ...pageBtn, background: p === currentPage ? "#8839ef" : "#fff", color: p === currentPage ? "#fff" : "#333" }}>
            {p}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link href={`?page=${currentPage + 1}&search=${search}`}
            style={pageBtn}>»</Link>
        )}
      </div>
    </>
  );
}

// ── Styles ───────────────────────────────────────────────────
const th: React.CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: 600,
  fontSize: 14,
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "10px 16px",
  fontSize: 14,
  verticalAlign: "top",
};

const pageBtn: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: 4,
  border: "1px solid #ddd",
  textDecoration: "none",
  color: "#333",
  background: "#fff",
  fontSize: 14,
};