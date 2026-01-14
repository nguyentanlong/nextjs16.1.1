// src/components/SearchBar.tsx
'use client';

export default function SearchBar() {
    return (
        <form className="search-bar" role="search" aria-label="Tìm kiếm sản phẩm">
            <input
                type="text"
                name="q"
                placeholder="I am shopping for..."
                aria-label="Search input"
            />
            <button type="submit" aria-label="Search">
                🔍
            </button>
        </form>
    );
}
