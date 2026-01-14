// src/lib/i18n.ts
// Helper dịch text tĩnh theo locale

export const translations = {
    vi: {
        cart: 'Giỏ hàng',
        search: 'Tìm kiếm...',
        welcome: 'Chào mừng đến Tonkliplock Store',
    },
    en: {
        cart: 'Cart',
        search: 'Search...',
        welcome: 'Welcome to Tonkliplock Store',
    },
};

export function t(locale: 'vi' | 'en', key: keyof typeof translations['vi']) {
    return translations[locale][key];
}
