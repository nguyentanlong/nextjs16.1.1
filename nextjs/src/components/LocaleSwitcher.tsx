// src/components/LocaleSwitcher.tsx
'use client';

import Link from 'next/link';

export default function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
    // Component chuyển ngôn ngữ đơn giản
    const otherLocale = currentLocale === 'vi' ? 'en' : 'vi';

    return (
        <div className="locale-switcher">
            <Link href={`/${otherLocale}`} prefetch={false}>
                {otherLocale.toUpperCase()}
            </Link>
        </div>
    );
}
